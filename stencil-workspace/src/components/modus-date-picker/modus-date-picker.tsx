import {
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Component,
  Prop,
  State,
  Element,
  Listen,
} from '@stencil/core';
import { IconMap } from '../icons/IconMap';
import ModusDatePickerCalendar from './utils/modus-date-picker.calendar';
import ModusDatePickerState from './utils/modus-date-picker.state';
import { ModusDateInputEventDetails } from '../modus-date-input/utils/modus-date-input.models';

@Component({
  tag: 'modus-date-picker',
  styleUrl: 'modus-date-picker.scss',
  shadow: true,
})
export class ModusDatePicker {
  @Element() element: HTMLElement;

  /** (optional) Label for the field. */
  @Prop() label: string;

  /** Needed for a better control over the state and avoid re-renders */
  @State() _forceUpdate = {};

  @State() _showCalendar = false;
  @State() _showYearArrows = false;

  private _calendar: ModusDatePickerCalendar;
  private _dateInputs: { [key: string]: ModusDatePickerState } = {};
  private _locale = 'default';

  componentWillLoad() {
    this._calendar = new ModusDatePickerCalendar();
  }

  /** Handlers */
  @Listen('calendarIconClicked')
  handleCalendarIconClick(event: CustomEvent<ModusDateInputEventDetails>) {
    const { type } = event.detail;

    Object.keys(this._dateInputs).forEach((d) => this._dateInputs[d].toggleCalendar(d === type ? null : false));

    this.toggleCalendar();
    if (this._showCalendar) {
      this.gotoDateBeingPicked(this._dateInputs[type].getDate());
    }
    this.forceUpdate();
  }

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent): void {
    if (this.element.contains(event.target as HTMLElement) || event.defaultPrevented) {
      return;
    }
    // Collapse when clicked outside
    this.toggleCalendar(false);
  }

  @Listen('valueChange')
  handleDateInputValue(event: CustomEvent<ModusDateInputEventDetails>): void {
    const { type } = event.detail;
    this._dateInputs[type].refresh();
    if (this._showCalendar) {
      this.gotoDateBeingPicked(this._dateInputs[type].getDate());
    }
    this.forceUpdate();
  }

  @Listen('dateInputBlur')
  handleDateInputBlur(): void {
    this.applyDateRangeRules(this._dateInputs['start']?.getDate(), this._dateInputs['end']?.getDate());
  }

  handleSlotChange(): void {
    const dates = Array.from(this.element.querySelectorAll('modus-date-input')) as unknown as HTMLModusDateInputElement[];

    dates?.forEach((d) => {
      this._dateInputs[d.type] = new ModusDatePickerState(d);
    });
  }

  /** Helpers */
  addMonthOffset(offset: number): void {
    this._calendar.addMonthOffset(offset);
    this.forceUpdate();
  }

  addYearOffset(offset: number): void {
    this._calendar.addYearOffset(offset);
    this.forceUpdate();
  }

  applyDateRangeRules(startDate, endDate): void {
    if (!startDate || !endDate) {
      return;
    }
    if (this.isInvalidDateRange(startDate, endDate)) {
      this._dateInputs['start'].setError('Invalid date range');
      this._dateInputs['end'].setError();
    } else {
      this._dateInputs['start'].resetError();
      this._dateInputs['end'].resetError();
    }
  }

  compare(date1: Date, date2: Date): number {
    if (!date1 && !date2) {
      return 0;
    } else if (!date1 && date2) {
      return -1;
    } else if (date1 && !date2) {
      return 1;
    }

    let delta: number;

    delta = date1.getFullYear() - date2.getFullYear();
    if (delta !== 0) {
      return delta;
    }

    delta = date1.getMonth() - date2.getMonth();
    if (delta !== 0) {
      return delta;
    }

    return date1.getDate() - date2.getDate();
  }

  forceUpdate(): void {
    this._forceUpdate = { ...this._forceUpdate };
  }

  findDatePositionsInARange(date: Date, startDate: Date, endDate: Date): { [key: string]: boolean } {
    return {
      start: startDate && this.compare(date, startDate) === 0,
      end: endDate && this.compare(date, endDate) === 0,
      'in-range': startDate && endDate && this.compare(date, startDate) > 0 && this.compare(date, endDate) < 0,
    };
  }

  gotoDateBeingPicked(pickedDate: Date): void {
    if (!this._showCalendar) {
      return;
    }

    const date = pickedDate || new Date();
    this._calendar.gotoDate(date.getFullYear(), date.getMonth());
  }

  isInvalidDateRange = (startDate, endDate) => this.compare(endDate, startDate) < 0;

  pickCalendarDate(date: Date) {
    const currentDateOpen = Object.keys(this._dateInputs).find((d) => this._dateInputs[d].isCalendarOpen());
    this._dateInputs[currentDateOpen].setDate(date);
    this.toggleCalendar(false);
  }

  showYearChange(show = true) {
    this._showYearArrows = show;
  }

  toggleCalendar(val: boolean = null): void {
    if (val !== null) {
      this._showCalendar = val;
      if (!this._showCalendar) {
        Object.keys(this._dateInputs || {}).forEach((d) => {
          this._dateInputs[d].toggleCalendar(false);
        });
      }
    } else {
      this._showCalendar = !!Object.values(this._dateInputs).find((dt) => dt.isCalendarOpen());
    }
  }

  private renderCalendarBody() {
    const today = new Date();
    const startDate = this._dateInputs['start']?.getDate();
    const endDate = this._dateInputs['end']?.getDate();
    const singleDate = this._dateInputs['single']?.getDate();

    return (
      <div class="calendar-body">
        <div class="calendar-days-week grid">
          {this._calendar.getDaysOfWeek(this._locale).map((d) => {
            return <div class="grid-item">{d}</div>;
          })}
        </div>
        <div class="calendar-month-container">
          <div
            class={{
              'calendar-month grid': true,
              'invalid-date-range': this.isInvalidDateRange(startDate, endDate),
            }}>
            {this._calendar.dates.map((date, index) => {
              if (!date) {
                return null;
              }

              const positions = this.findDatePositionsInARange(date, startDate, endDate);

              const isStartDate = positions['start'];
              const isEndDate = positions['end'];
              const isToday = this.compare(date, today) === 0;
              const isSingleDateSelected = singleDate && this.compare(date, singleDate) === 0;
              const isSelected = isStartDate || isEndDate || isSingleDateSelected;
              const isInRange = !isSelected ? positions['in-range'] : false;

              // Only for the last date in the calendar
              const onBlurEvent =
                index === this._calendar.dates.length - 1
                  ? {
                      onBlur: () => {
                        this.toggleCalendar(false);
                      },
                    }
                  : {};

              return (
                <button
                  class={{
                    'calendar-day grid-item': true,
                    selected: isSelected,
                    start: isStartDate && !isEndDate,
                    end: isEndDate && !isStartDate,
                    'current-day': isToday,
                    'range-selected': isInRange,
                  }}
                  tabIndex={0}
                  onClick={() => this.pickCalendarDate(date)}
                  {...onBlurEvent}>
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  private renderCalendarHeader() {
    return (
      <div class="calendar-header">
        <button aria-label="Previous Month" onClick={() => this.addMonthOffset(-1)}>
          <IconMap icon="chevron-left-thick"></IconMap>
        </button>

        <div class="title">
          <span tabIndex={0} class="calendar-title" aria-label="ModusCalendar title" role="title">
            {`${this._calendar?.month} ${this._calendar?.year}`}
          </span>
          <div class="year-icons">
            <button tabIndex={0} aria-label="Previous Year" onClick={() => this.addYearOffset(1)} class="year-up">
              <IconMap icon="triangle-down" size="8"></IconMap>
            </button>
            <button tabIndex={0} aria-label="Next Year" onClick={() => this.addYearOffset(-1)} class="year-down">
              <IconMap size="8" icon="triangle-down"></IconMap>
            </button>
          </div>
        </div>
        <button tabIndex={0} aria-label="Next Month" onClick={() => this.addMonthOffset(1)}>
          <IconMap icon="chevron-right-thick"></IconMap>
        </button>
      </div>
    );
  }

  render() {
    return (
      <div class="modus-date-picker">
        {this.label ? <div class={'label-container'}>{this.label ? <label>{this.label}</label> : null}</div> : null}
        <div class="date-inputs">
          <slot onSlotchange={() => this.handleSlotChange()}></slot>
        </div>
        <div style={{ display: 'inline-flex' }}>
          {this._showCalendar && (
            <nav class="calendar-container" aria-label="Pick a Date">
              {this.renderCalendarHeader()}
              {this.renderCalendarBody()}
            </nav>
          )}
        </div>
      </div>
    );
  }
}

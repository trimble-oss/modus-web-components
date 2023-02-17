import {
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Component,
  Prop,
  Event,
  EventEmitter,
  Method,
  Element,
  Watch,
} from '@stencil/core';
import { IconMap } from '../icons/IconMap';
import {
  validate,
  parseDate,
  parseString,
} from '../modus-date-picker/utils/modus-date-picker.helpers';
import {
  DateInputEventData,
  DateInputType,
} from '../modus-date-picker/utils/modus-date-picker.types';

@Component({
  tag: 'modus-date-input',
  styleUrl: 'modus-date-input.scss',
  shadow: true,
})
export class ModusDateInput {
  @Element() element: HTMLElement;
  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Sets autofocus on the input. */
  @Prop() autoFocusInput: boolean;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) Disables default validation for the date input. */
  @Prop() disableValidation: boolean;

  /** (optional) Custom error text displayed for the input. */
  @Prop() errorText: string;

  /** (optional) Custom helper text displayed below the input. Default is 'dd/mm/yyyy'. */
  @Prop() helperText = 'dd/mm/yyyy';

  /** (optional) Sets input error state. */
  @Prop() invalid: boolean;

  /** (optional) The input's label. */
  @Prop() label: string;

  /** (optional) The input's maximum length. Default is 10. */
  @Prop() maxLength = 10;

  /** (optional) The input's placeholder text. */
  @Prop() placeholder: string;

  /** (optional) Whether the input's content is read-only */
  @Prop() readOnly: boolean;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) Show a calendar icon. Note: Clicking on this icon will only emit an event `calendarIconClicked`.  */
  @Prop() showCalendarIcon: boolean;

  /** (optional) The input's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) Denotes what type of date and the types are 'start','end','single'. Required when using `modus-date-picker`. */
  @Prop() type: DateInputType = 'single';

  /** (optional) The input's valid state text. */
  @Prop() validText: string;

  /** (optional) The input's value. */
  @Prop() value: string;
  @Watch('value')
  handleValueChange(val: string): void {
    this.date = parseDate(val);
    this.valueChange.emit(this.eventData());
  }

  /** An event that fires on calendar icon click. */
  @Event() calendarIconClicked: EventEmitter<DateInputEventData>;

  /** An event that fires on input value out of focus. */
  @Event() dateInputBlur: EventEmitter<DateInputEventData>;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<DateInputEventData>;

  private classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  private date: Date;
  private textInput: HTMLInputElement;

  /** Methods */
  /** Focus the input. */
  @Method()
  async focusInput(): Promise<void> {
    this.textInput.focus();
  }

  /** Gets date object value */
  @Method()
  async getDate(): Promise<Date> {
    return this.date;
  }

  /** Sets value on the input field  */
  @Method()
  async setDate(date: Date): Promise<void> {
    this.value = parseString(date);
    this.focusInput();
  }

  /** Handlers */
  handleCalendarClick(): void {
    this.calendarIconClicked.emit(this.eventData());
  }

  handleDefaultKeyDown(e: KeyboardEvent, callback: () => void) {
    const code = e.code.toUpperCase();
    if (code === 'ENTER' || code === 'SPACE') callback();
  }

  handleBlur(): void {
    this.validate();
    this.dateInputBlur.emit(this.eventData());
  }

  handleOnInput(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.value = (event.currentTarget as HTMLInputElement)?.value;
  }

  // Helpers
  clearValidation(): void {
    this.errorText = null;
    this.invalid = false;
  }

  eventData() {
    return {
      date: this.date,
      type: this.type,
    };
  }

  validate(): void {
    if (this.disableValidation) return;

    this.errorText = validate(this.value, this.required);
    this.invalid = Boolean(this.errorText);
  }

  handleInputKeys(event: KeyboardEvent): boolean {
    // Get the key
    const key = event.key;

    // eslint-disable-next-line no-useless-escape
    const exp = /[0-9\/]+/; // only numbers and '/'
    const regex = new RegExp(exp);

    // Check if key is in the reg exp
    if (!regex.test(key)) {
      // Restrict the special characters
      event.preventDefault();
      return false;
    }
  }

  render() {
    const className = `modus-date-input ${this.disabled ? 'disabled' : ''}`;
    return (
      <div
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-invalid={!!this.errorText || this.invalid}
        aria-label={this.ariaLabel}
        aria-readonly={this.readOnly}
        aria-required={this.required}
        class={className}>
        {this.label || this.required ? (
          <div class={'label-container'}>
            {this.label ? (
              <label htmlFor="date-input">{this.label}</label>
            ) : null}
            {this.required ? <span class="required">*</span> : null}
          </div>
        ) : null}
        <div
          class={`input-container ${
            this.errorText || this.invalid
              ? 'error'
              : this.validText
              ? 'valid'
              : ''
          } ${this.classBySize.get(this.size)}`}>
          <input
            id="date-input"
            aria-placeholder={this.placeholder}
            class={{ 'has-right-icon': this.showCalendarIcon }}
            disabled={this.disabled}
            inputmode="text"
            onInput={(event) => this.handleOnInput(event)}
            placeholder={this.placeholder}
            readonly={this.readOnly}
            ref={(el) => (this.textInput = el as HTMLInputElement)}
            tabIndex={0}
            type="text"
            value={this.value}
            autofocus={this.autoFocusInput}
            onBlur={() => this.handleBlur()}
            maxLength={this.maxLength}
            onKeyPress={(e) => this.handleInputKeys(e)}
          />
          {this.showCalendarIcon && (
            <span
              class="icons"
              tabIndex={0}
              onKeyDown={(e) =>
                this.handleDefaultKeyDown(e, () => this.handleCalendarClick())
              }
              onClick={() => this.handleCalendarClick()}
              role="button"
              aria-label="Open calendar">
              <IconMap icon="calendar" size="16" />
            </span>
          )}
        </div>
        <div class="sub-text">
          {this.errorText ? (
            <label class="error">{this.errorText}</label>
          ) : this.validText ? (
            <label class="valid">{this.validText}</label>
          ) : this.helperText ? (
            <label class="helper">{this.helperText}</label>
          ) : null}
        </div>
      </div>
    );
  }
}

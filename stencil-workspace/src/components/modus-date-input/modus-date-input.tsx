import {
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Component,
  Prop,
  Event,
  EventEmitter,
  Method,
  Element,
  Watch,
  State,
} from '@stencil/core';
import { IconMap } from '../icons/IconMap';
import DateInputFormatter from './utils/modus-date-input.formatter';
import {
  ModusDateInputCalendarIconClickedEvent,
  ModusDateInputEventDetails,
  ModusDateInputType,
} from './utils/modus-date-input.models';

@Component({
  tag: 'modus-date-input',
  styleUrl: 'modus-date-input.scss',
  shadow: true,
})
export class ModusDateInput {
  @Element() element: HTMLElement;

  /** (optional) Regular expression to allow characters while typing the input.
   */
  @Prop() allowedCharsRegex: RegExp | string;

  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Sets autofocus on the input. */
  @Prop() autoFocusInput: boolean;

  // /** (optional) Formats the text while typing in the date input. Default is 'true'. */
  // @Prop() autoFormat = true;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) Disables default validation for the date input. */
  @Prop() disableValidation: boolean;

  /** (optional) Custom error text displayed for the input. */
  @Prop() errorText: string;

  /** (optional) Filler date is used as fillers for parts not in the display format when constructing a full date string, for 'value'. It must be in the ISO String format YYYY-MM-DD. Default is {current year}-01-01. */
  @Prop() fillerDate: string;
  @Watch('fillerDate')
  handleFillerDateChange(val: string): void {
    this._formatter = new DateInputFormatter(val, this.format);
  }

  /**
   * Format string for the date input. Default 'mm/dd/yyyy'.
   * Use 'm','mm' for month, 'd','dd' for date and 'yy','yyyy' for year with any separator that is not a regular expression. */
  @Prop() format = 'mm/dd/yyyy';
  @Watch('format')
  handleFormatChange(val: string): void {
    this._formatter = new DateInputFormatter(this.fillerDate, val);
    this.handleValueChange(this.value);
  }

  /**
   * Alternative formats string for the date input split by | separator.
   * Use 'm','mm' for month, 'd','dd' for date and 'yy','yyyy' for year with any separator that is not a regular expression. */
  @Prop() altFormats: string;
  @Watch('altFormats')
  handleAltFormatsChange(altFormats: string): void {
    if (!altFormats) {
      return;
    }

    this._altFormatters = altFormats.split('|')
      .map(format => format.trim())
      .filter(Boolean)
      .map(format => new DateInputFormatter(this.fillerDate, format));
  }

  /** (optional) Custom helper text displayed below the input. */
  @Prop() helperText: string;

  /** (optional) The input's label. */
  @Prop() label: string;

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
  @Prop() type: ModusDateInputType = 'single';

  /** (optional) The input's valid state text. */
  @Prop() validText: string;

  /** (optional) The minimum date allowed. The date is formatted according to ISO8601 'yyyy-mm-dd'. */
  @Prop() min: string;

  /** (optional) The maximum date allowed. The date is formatted according to ISO8601 'yyyy-mm-dd'. */
  @Prop() max: string;

  /** (optional) A string representing the date entered to the input. The date is formatted according to ISO8601 'yyyy-mm-dd'. The displayed date format will differ from the 'value'. */
  @Prop({ mutable: true }) value: string;
  @Watch('value')
  handleValueChange(val: string): void {
    if (!this._isEditing) {
      this._dateDisplay = this._formatter.formatDisplayString(val);
    }

    this.valueChange.emit({
      value: val,
      type: this.type,
      inputString: this._dateDisplay,
    });
  }

  /** An event that fires on calendar icon click. */
  @Event() calendarIconClicked: EventEmitter<ModusDateInputCalendarIconClickedEvent>;

  /** An event that fires on input value out of focus. */
  @Event() dateInputBlur: EventEmitter<ModusDateInputEventDetails>;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<ModusDateInputEventDetails>;

  private classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  private _dateInput: HTMLInputElement;
  private _dateInputId = `date-input-${Math.random().toString().slice(2, 7)}`;
  private _formatter: DateInputFormatter;
  private _altFormatters: DateInputFormatter[] = [];
  private _isEditing: boolean;

  // TODO: Auto formatting for single tokens 'm' and 'd' is tricky because user can input double digits
  private autoFormat = false;

  @State() _dateDisplay: string;

  componentWillLoad() {
    this.handleFormatChange(this.format);
    this.handleAltFormatsChange(this.altFormats);
    this._dateDisplay = this._formatter.formatDisplayString(this.value);
    this.setDefaultAllowedKeysRegex(this.autoFormat);
  }

  /** Methods */
  /** Focus the input. */
  @Method()
  async focusInput(): Promise<void> {
    this._dateInput.focus();
  }

  /** Validate the input. */
  @Method()
  async validate(): Promise<void> {
    this.validateInput(this._dateDisplay);
  }

  /** Handlers */
  handleCalendarClick(): void {
    this.calendarIconClicked.emit({
      value: this.value,
      type: this.type,
      inputString: this._dateDisplay,
      min: this._formatter.parseIsoToDate(this.min),
      max: this._formatter.parseIsoToDate(this.max),
    });
  }

  handleDefaultKeyDown(e: KeyboardEvent, callback: () => void) {
    const code = e.code.toUpperCase();
    if (code === 'ENTER' || code === 'SPACE') callback();
  }

  handleBlur(): void {
    this._isEditing = false;

    this.checkAltFormats();
    this.validateInput(this._dateDisplay);
    this.dateInputBlur.emit({
      value: this.value,
      type: this.type,
      inputString: this._dateDisplay,
    });
  }

  handleInputKeyPress(event: KeyboardEvent): boolean {
    const keyIsValid = this.keyIsValidDateCharacter(event.key);
    if (!keyIsValid) {
      event.preventDefault();
    }

    return keyIsValid;
  }

  handleInputKeyDown(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === 'enter') {
      this.handleBlur();
    }
  }

  handleOnInput(event: Event): void {
    this._isEditing = true;
    event.stopPropagation();
    event.preventDefault();

    const inputString = (event.currentTarget as HTMLInputElement)?.value;

    this._dateDisplay = inputString;
    this.value = this._formatter.parseDisplayString(this._dateDisplay);
  }

  // Helpers
  clearValidation(): void {
    this.errorText = null;
  }

  /** Check if the input string matches any of the alternative formats. */
  checkAltFormats(): string {
    if (this.value) {
      return;
    }

    // if there is no value for the default format, check the alternative formats
    for (const formatter of this._altFormatters) {
      const result = formatter.parseDisplayString(this._dateDisplay);

      if (result) {
        this._dateDisplay = this._formatter.formatDisplayString(result);
        this.value = result;
        return;
      }
    }
  }

  keyIsValidDateCharacter(key: string): boolean {
    if (!this.allowedCharsRegex) return true;

    const dateCharacterRegex = new RegExp(this.allowedCharsRegex);

    return dateCharacterRegex.test(key);
  }

  setDefaultAllowedKeysRegex(autoFormat: boolean) {
    if (!this.allowedCharsRegex) {
      this.allowedCharsRegex = autoFormat ? /\d/gi : /.*/;
    }
  }

  validateInput(inputString: string | null): void {
    if (this.disableValidation) return;

    if (!inputString) {
      if (this.required) {
        this.errorText = 'Required';
      } else {
        this.clearValidation();
      }
    } else if (!this.value) {
      this.errorText = 'Invalid date';
    } else {
      this.validateMinMax();
    }
  }

  private validateMinMax(): void {
    const min = this._formatter.parseIsoToDate(this.min);
    const max = this._formatter.parseIsoToDate(this.max);
    const value = this._formatter.parseIsoToDate(this.value);
    const messages = this.getMinMaxValidationMessage();

    if (min && min > value) {
      this.errorText = messages.min;
    } else if (max && max < value) {
      this.errorText = messages.max
    } else {
      this.clearValidation();
    }
  }

  private getMinMaxValidationMessage(): { min: string; max: string } {
    const result = { min: '', max: '' };
    const min = this._formatter.parseIsoToDate(this.min);
    const max = this._formatter.parseIsoToDate(this.max);

    if (min) {
      min.setUTCDate(min.getDate() - 1);
      result.min = `Select a date after ${this._formatter.formatDisplayString(min.toISOString())}`;
    }
    if (max) {
      max.setUTCDate(max.getDate() + 1);
      result.max = `Select a date before ${this._formatter.formatDisplayString(max.toISOString())}`;
    }

    return result;
  }

  render() {
    const className = `modus-date-input ${this.disabled ? 'disabled' : ''}`;
    return (
      <div class={className}>
        {this.label || this.required ? (
          <div class="label-container">
            {this.label ? <label htmlFor={this._dateInputId}>{this.label}</label> : null}
            {this.required ? <span class="required">*</span> : null}
          </div>
        ) : null}
        <div
          class={`input-container ${this.errorText ? 'error' : this.validText ? 'valid' : ''} ${this.classBySize.get(
            this.size
          )}`}>
          <input
            aria-invalid={!!this.errorText}
            aria-label={this.ariaLabel}
            aria-required={this.required?.toString()}
            autofocus={this.autoFocusInput}
            class={{ 'has-right-icon': this.showCalendarIcon }}
            disabled={this.disabled}
            id={this._dateInputId}
            onBlur={() => this.handleBlur()}
            onInput={(event) => this.handleOnInput(event)}
            onKeyPress={(e) => this.handleInputKeyPress(e)}
            onKeyDown={(e) => this.handleInputKeyDown(e)}
            placeholder={this.placeholder}
            readonly={this.readOnly}
            ref={(el) => (this._dateInput = el as HTMLInputElement)}
            tabIndex={0}
            type="text"
            value={this._dateDisplay}
          />
          {this.showCalendarIcon && (
            <span
              class="icons"
              tabIndex={0}
              onKeyDown={(e) => this.handleDefaultKeyDown(e, () => this.handleCalendarClick())}
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

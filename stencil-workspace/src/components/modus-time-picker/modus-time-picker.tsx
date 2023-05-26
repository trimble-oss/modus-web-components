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
import TimeInputFormatter from './modus-time-picker.formatter';
import { ModusTimePickerEventDetails } from './modus-time-picker.models';

/**
 * @slot timeZone - Slot for a Time Zone dropdown
 */
@Component({
  tag: 'modus-time-picker',
  styleUrl: 'modus-time-picker.scss',
  shadow: true,
})
export class ModusTimePicker {
  @Element() element: HTMLElement;

  /** (optional) Sets 12/24 hour format for the input string. */
  @Prop() ampm: boolean;
  @Watch('ampm')
  handleAmPmChange(val: boolean): void {
    this.handleAmPmDependencies(val);
  }

  /** (optional) Regular expression to allow characters while typing the input.
   * Default is `/[\d:apm\s]/gi` or `/[\d:]/gi` based on the display format.
   */
  @Prop() allowedCharsRegex: RegExp | string;

  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Formats the text while typing in the input field. */
  @Prop() autoFormat: boolean;

  /** (optional) Sets autofocus on the input. */
  @Prop() autoFocusInput: boolean;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) Disables default validation for the time input. */
  @Prop() disableValidation: boolean;

  /** (optional) Custom error text displayed for the input. */
  @Prop() errorText: string;

  /** (optional) Custom helper text displayed below the input. */
  @Prop() helperText: string;

  /** (optional) The input's label. */
  @Prop() label: string;

  /** (optional) Minimum time (in 24 hour format). */
  @Prop() min: string;

  /** (optional) Maximum time (in 24 hour format). */
  @Prop() max: string;

  /** (optional) The input's placeholder text. */
  @Prop() placeholder: string;

  /** (optional) Whether the input's content is read-only */
  @Prop() readOnly: boolean;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The input's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) The input's valid state text. */
  @Prop() validText: string;

  /** (optional) Value of the time entered into the input. */
  @Prop() value: string;
  @Watch('value')
  handleValueChange(val: string): void {
    if (!this._isEditing) {
      this._timeDisplay = this._formatter.formatTimeDisplay(val);
    }

    this.valueChange.emit({
      value: val,
      inputString: this._timeDisplay,
    });
  }

  /** An event that fires on input value out of focus. */
  @Event() timeInputBlur: EventEmitter<ModusTimePickerEventDetails>;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<ModusTimePickerEventDetails>;

  readonly classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  private _formatter: TimeInputFormatter;
  private _isEditing: boolean;
  private _timeInput: HTMLInputElement;
  private _maxLength = 5;

  @State() _timeDisplay: string;

  // Life cycle methods
  componentWillLoad() {
    this.handleAmPmDependencies(this.ampm);
    this._timeDisplay = this._formatter.formatTimeDisplay(this.value);
  }

  /** Public Methods */
  /** Focus the input. */
  @Method()
  async focusInput(): Promise<void> {
    this._timeInput.focus();
  }

  // Handlers
  handleBlur(): void {
    this._isEditing = false;

    const inputString = this._timeInput?.value;
    this.validateTimeInput(inputString);

    this.timeInputBlur.emit({
      value: this.value,
      inputString,
    });
  }

  handleDefaultKeyDown(e: KeyboardEvent, callback: () => void) {
    const code = e.code.toUpperCase();
    if (code === 'ENTER' || code === 'SPACE') callback();
  }

  handleInputChange(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this._isEditing = true;

    const inputString = (event.currentTarget as HTMLInputElement)?.value;
    this._timeDisplay = this._formatter.autoFormatTimeInput(inputString, this.autoFormat);
    this.value = this._formatter.parseTimeDisplay(this._timeDisplay);
  }

  handleInputKeyPress(event: KeyboardEvent): boolean {
    const key = event.key;
    const keyIsValid = this._formatter.keyIsValidTimeCharacter(key, this.allowedCharsRegex);
    if (!keyIsValid) {
      event.preventDefault();
    }
    return keyIsValid;
  }

  // Helpers

  clearValidation(): void {
    this.errorText = null;
  }

  getAriaControls(): { [key: string]: boolean | string } {
    return {
      'aria-disabled': this.disabled ? 'true' : undefined,
      'aria-invalid': !!this.errorText,
      'aria-label': this.ariaLabel,
      'aria-readonly': this.readOnly,
      'aria-required': this.required,
    };
  }

  handleAmPmDependencies(hasAmPm: boolean): void {
    this._formatter = new TimeInputFormatter(hasAmPm);
    this._maxLength = hasAmPm ? 8 : 5;
  }

  validateTimeInput(inputString: string | null): void {
    if (this.disableValidation) return;

    if (!inputString) {
      if (this.required) this.errorText = 'Required';
      else this.clearValidation();
    } else if (!this.value) this.errorText = 'Invalid time';
    else if (this.min || this.max) {
      const today = new Date();
      const minDate = this._formatter.setTimeOnDate(today, this.min);
      const maxDate = this._formatter.setTimeOnDate(today, this.max);
      const inputDate = this._formatter.setTimeOnDate(today, this.value);

      if (this.min && inputDate < minDate) {
        this.errorText = 'Time input is lesser than minimum time allowed';
      } else if (this.max && inputDate > maxDate) {
        this.errorText = 'Time input is greater than maximum time allowed';
      } else this.clearValidation();
    } else this.clearValidation();
  }

  // Renderers
  private renderTimeInput() {
    return (
      <input
        id="time-input"
        aria-label={this.label ? null : this.ariaLabel}
        aria-placeholder={this.placeholder}
        disabled={this.disabled}
        inputmode="text"
        onInput={(event) => this.handleInputChange(event)}
        placeholder={this.placeholder}
        readonly={this.readOnly}
        ref={(el) => (this._timeInput = el as HTMLInputElement)}
        tabIndex={0}
        type="text"
        value={this._timeDisplay}
        autofocus={this.autoFocusInput}
        onBlur={() => this.handleBlur()}
        maxLength={this._maxLength}
        onKeyPress={(e) => this.handleInputKeyPress(e)}
      />
    );
  }

  private renderSubText() {
    return this.errorText ? (
      <label class="sub-text error">{this.errorText}</label>
    ) : this.validText ? (
      <label class="sub-text valid">{this.validText}</label>
    ) : this.helperText ? (
      <label class="sub-text helper">{this.helperText}</label>
    ) : null;
  }

  render() {
    const ariaControls = this.getAriaControls();
    return (
      <div {...ariaControls} class={{ 'modus-time-picker': true, disabled: this.disabled }}>
        <div class="time-input-wrapper">
          {this.label || this.required ? (
            <div class={'label-container'}>
              {this.label ? <label htmlFor="time-input">{this.label}</label> : null}
              {this.required ? <span class="required">*</span> : null}
            </div>
          ) : null}
          <div
            class={`input-container ${this.errorText ? 'error' : this.validText ? 'valid' : ''} ${this.classBySize.get(
              this.size
            )}`}>
            {this.renderTimeInput()}
          </div>
          {this.renderSubText()}
        </div>
        <div class="time-zone-wrapper">
          <slot name="timeZone"></slot>
        </div>
      </div>
    );
  }
}

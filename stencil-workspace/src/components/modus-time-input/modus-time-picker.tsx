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
import {
  formatTime,
  keyIsValidTimeCharacter,
  parseTime,
} from './modus-time-picker.helpers';
import { TimeInputEventData } from './modus-time-picker.types';

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
  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Sets 12/24 hour format for the input string. */
  @Prop() ampm: boolean;

  /** (optional) Sets autofocus on the input. */
  @Prop() autoFocusInput: boolean;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) Disables default validation for the time input. */
  @Prop() disableValidation: boolean;

  /** (optional) Custom error text displayed for the input. */
  @Prop() errorText: string;

  /** (optional) Custom helper text displayed below the input. */
  @Prop() helperText;

  /** (optional) The input's label. */
  @Prop() label: string;

  /** (optional) The input's maximum length. Default is 10. */
  @Prop() maxLength = 8;

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
    this.displayString = this.isEditing
      ? this.displayString
      : formatTime(val, this.ampm);
    this.valueChange.emit({
      value: val,
      inputString: this.displayString,
    });
  }

  /** An event that fires on input value out of focus. */
  @Event() timeInputBlur: EventEmitter<TimeInputEventData>;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<TimeInputEventData>;

  readonly classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  private displayString: string;
  private isEditing: boolean;
  private textInput: HTMLInputElement;

  componentWillLoad() {
    this.displayString = formatTime(this.value, this.ampm);
  }

  /** Methods */
  /** Focus the input. */
  @Method()
  async focusInput(): Promise<void> {
    this.textInput.focus();
  }

  handleBlur(): void {
    this.isEditing = false;
    const inputString = this.textInput?.value;
    this.validateInput(inputString);
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
    this.isEditing = true;
    this.value = parseTime(
      (event.currentTarget as HTMLInputElement)?.value,
      this.ampm
    );
  }

  handleInputKeyPress(event: KeyboardEvent): boolean {
    const key = event.key;
    const keyIsValid = keyIsValidTimeCharacter(key, this.ampm);
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

  validateInput(inputString: string | null): void {
    if (this.disableValidation) return;

    if (!inputString) {
      if (this.required) this.errorText = 'Required';
      else this.clearValidation();
    } else if (!this.value) this.errorText = 'Invalid time';
    else this.clearValidation();
  }

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
        ref={(el) => (this.textInput = el as HTMLInputElement)}
        tabIndex={0}
        type="text"
        value={this.displayString}
        autofocus={this.autoFocusInput}
        onBlur={() => this.handleBlur()}
        maxLength={this.maxLength}
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
      <div
        {...ariaControls}
        class={{ 'modus-time-picker': true, disabled: this.disabled }}>
        <div class="time-input-wrapper">
          {this.label || this.required ? (
            <div class={'label-container'}>
              {this.label ? (
                <label htmlFor="time-input">{this.label}</label>
              ) : null}
              {this.required ? <span class="required">*</span> : null}
            </div>
          ) : null}
          <div
            class={`input-container ${
              this.errorText ? 'error' : this.validText ? 'valid' : ''
            } ${this.classBySize.get(this.size)}`}>
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

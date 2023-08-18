// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Method, Prop, Watch } from '@stencil/core';
import { IconSearch } from '../icons/icon-search';
import { IconClose } from '../icons/icon-close';
import { IconVisibility } from '../icons/icon-visibility';
import { IconVisibilityOff } from '../icons/icon-visibility-off';

@Component({
  tag: 'modus-text-input',
  styleUrl: 'modus-text-input.scss',
  shadow: true,
})
export class ModusTextInput {
  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Sets autofocus on the input. */
  @Prop() autoFocusInput: boolean;

  /** (optional) Whether the input has a clear button. */
  @Prop() clearable = false;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The input's error state text. */
  @Prop() errorText: string;

  /** (optional) The input's helper text displayed below the input. */
  @Prop() helperText: string;

  /** (optional) Whether the search icon is included. */
  @Prop() includeSearchIcon: boolean;

  /** (optional) Whether the password text toggle icon is included. */
  @Prop() includePasswordTextToggle = true;

  /** (optional) The input's inputmode. */
  @Prop() inputmode: 'decimal' | 'email' | 'numeric' | 'search' | 'tel' | 'text' | 'url';

  /** (optional) The input's label. */
  @Prop() label: string;

  /** (optional) The input's maximum length. */
  @Prop() maxLength: number;

  /** (optional) The input's minimum length. */
  @Prop() minLength: number;

  /** (optional) The input's placeholder text. */
  @Prop() placeholder: string;

  /** (optional) Whether the input's content is read-only */
  @Prop() readOnly: boolean;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The input's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) The input's text alignment. */
  @Prop() textAlign: 'left' | 'right' = 'left';

  /** (optional) The input's type. */
  @Prop() type: 'text' | 'password' = 'text';

  /** (optional) The input's valid state text. */
  @Prop() validText: string;

  /** (optional) The input's value. */
  @Prop({ mutable: true }) value: string;
  @Watch('value')
  watchValue(newValue: string): void {
    this.value = newValue;
  }

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<string>;

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  textInput: HTMLInputElement;
  buttonTogglePassword: HTMLDivElement;

  /** Focus the input. */
  @Method()
  async focusInput(): Promise<void> {
    this.textInput.focus();
  }

  handleClear(): void {
    this.textInput.value = null;
    this.value = null;
    this.valueChange.emit(null);
  }

  handleOnInput(event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).value;
    this.value = value;

    this.valueChange.emit(value);
  }

  handleTogglePassword() {
    if (this.textInput.type === 'password') {
      this.textInput.type = 'text';
      this.buttonTogglePassword.setAttribute('aria-label', 'Hide password.');
    } else {
      this.textInput.type = 'password';
      this.buttonTogglePassword.setAttribute(
        'aria-label',
        'Show password as plain text. ' + 'Warning: this will display your password on the screen.'
      );
    }
  }

  render(): unknown {
    const isPassword = this.type === 'password';
    const showPasswordToggle = !!(this.includePasswordTextToggle && isPassword && this.value?.length);
    const isToggleablePassword = isPassword && this.includePasswordTextToggle;
    const showClearIcon = !isToggleablePassword && this.clearable && !this.readOnly && !!this.value;

    const buildTextInputClassNames = (): string => {
      const classNames = [];

      if (this.includeSearchIcon) {
        classNames.push('has-left-icon');
      }
      if (showClearIcon) {
        classNames.push('has-right-icon');
      }
      classNames.push(`text-align-${this.textAlign}`);
      return classNames.join(' ');
    };

    const buildContainerClassNames = (): string => {
      const classNames = [];
      classNames.push('modus-text-input');

      if (this.disabled) {
        classNames.push('disabled');
      }

      return classNames.join(' ');
    };

    return (
      <div class={buildContainerClassNames()}>
        {this.label || this.required ? (
          <div class={'label-container'}>
            {this.label ? <label>{this.label}</label> : null}
            {this.required ? <span class="required">*</span> : null}
          </div>
        ) : null}
        <div
          class={`input-container ${this.errorText ? 'error' : this.validText ? 'valid' : ''} ${this.classBySize.get(
            this.size
          )}`}
          onClick={() => this.textInput.focus()}>
          {this.includeSearchIcon ? <IconSearch size="16" /> : null}
          <input
            aria-invalid={!!this.errorText}
            aria-label={this.ariaLabel}
            aria-required={this.required?.toString()}
            class={buildTextInputClassNames()}
            disabled={this.disabled}
            inputmode={this.inputmode}
            maxlength={this.maxLength}
            minlength={this.minLength}
            onInput={(event) => this.handleOnInput(event)}
            placeholder={this.placeholder}
            readonly={this.readOnly}
            ref={(el) => (this.textInput = el as HTMLInputElement)}
            tabIndex={0}
            type={this.type}
            value={this.value}
            autofocus={this.autoFocusInput}
          />
          {showPasswordToggle && (
            <div
              class="icons toggle-password"
              role="button"
              aria-label="Show password as plain text. Warning: this will display your password on the screen."
              ref={(el) => (this.buttonTogglePassword = el as HTMLDivElement)}
              onClick={() => this.handleTogglePassword()}>
              <IconVisibility size="16" />
              <IconVisibilityOff size="16" />
            </div>
          )}
          {showClearIcon && (
            <span class="icons clear" role="button" aria-label="Clear entry">
              <IconClose onClick={() => this.handleClear()} size="16" />
            </span>
          )}
        </div>
        {this.errorText ? (
          <label class="sub-text error">{this.errorText}</label>
        ) : this.validText ? (
          <label class="sub-text valid">{this.validText}</label>
        ) : this.helperText ? (
          <label class="sub-text helper">{this.helperText}</label>
        ) : null}
      </div>
    );
  }
}

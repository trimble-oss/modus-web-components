// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Method, Prop } from '@stencil/core';
import { IconClose } from '../../icons/svgs/icon-close';
import { generateElementId } from '../../utils/utils';

@Component({
  tag: 'modus-textarea-input',
  styleUrl: 'modus-textarea-input.scss',
  shadow: true,
})
export class ModusTextareaInput {
  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Capitalization behavior when using a non-traditional keyboard (e.g. microphone, touch screen) */
  @Prop() autocapitalize: boolean | 'none' | 'off' | 'sentences' | 'on' | 'words' | 'characters';

  /** (optional) Whether to activate automatic correction while the user is editing this field in Safari. */
  @Prop() autocorrect: boolean | 'off' | 'on';

  /** (optional) Sets autofocus on the input. */
  @Prop() autoFocusInput: boolean;

  /** (optional) Whether the input has a clear button. */
  @Prop() clearable = false;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) Which action label to present for the enter key on virtual keyboards. */
  @Prop() enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

  /** (optional) The input's error state text. */
  @Prop() errorText: string;

  /** (optional) The input's helper text displayed below the input. */
  @Prop() helperText: string;

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

  /** (optional) Number of rows on textarea */
  @Prop() rows = 5;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The input's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) Whether to enable spell checking. */
  @Prop() spellcheck: boolean;

  /** (optional) The input's text alignment. */
  @Prop() textAlign: 'left' | 'right' = 'left';

  /** (optional) The input's valid state text. */
  @Prop() validText: string;

  /** (optional) The input's value. */
  @Prop({ mutable: true }) value: string;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<string>;

  private inputId = generateElementId() + '_textarea_input';

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  textInput: HTMLTextAreaElement;
  buttonTogglePassword: HTMLDivElement;

  /** Focus the input. */
  @Method()
  async focusInput(): Promise<void> {
    this.textInput.focus();
  }

  handleClearKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    this.handleClear();
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

  get inputAutocapitalize() {
    if (this.autocapitalize === true) {
      return 'on';
    } else if (this.autocapitalize === false) {
      return 'off';
    }
    return this.autocapitalize;
  }

  get inputAutocorrect() {
    if (this.autocorrect === true) {
      return 'on';
    } else if (this.autocorrect === false) {
      return 'off';
    }
    return this.autocorrect;
  }

  render(): unknown {
    const iconSize = this.size === 'large' ? '24' : '16';
    const showClearIcon = this.clearable && !this.readOnly && !!this.value;

    const buildTextInputClassNames = (): string => {
      const classNames = [];

      if (showClearIcon) {
        classNames.push('has-right-icon');
      }
      classNames.push(`text-align-${this.textAlign}`);
      return classNames.join(' ');
    };

    const buildContainerClassNames = (): string => {
      const classNames = [];
      classNames.push('modus-textarea-input');

      if (this.disabled) {
        classNames.push('disabled');
      }

      return classNames.join(' ');
    };

    return (
      <div class={buildContainerClassNames()}>
        {this.label || this.required ? (
          <div class={'label-container'}>
            {this.label ? <label htmlFor={this.inputId}>{this.label}</label> : null}
            {this.required ? <span class="required">*</span> : null}
          </div>
        ) : null}
        <div
          class={`input-container ${this.errorText ? 'error' : this.validText ? 'valid' : ''} ${this.classBySize.get(
            this.size
          )}`}
          onClick={() => this.textInput.focus()}
          part="input-container"
          style={{ height: this.rows + 1 + 'rem' }}>
          <textarea
            id={this.inputId}
            aria-invalid={!!this.errorText}
            aria-label={this.ariaLabel}
            aria-required={this.required?.toString()}
            autoCapitalize={this.inputAutocapitalize}
            autocorrect={this.autocorrect as string}
            class={buildTextInputClassNames()}
            disabled={this.disabled}
            enterkeyhint={this.enterkeyhint}
            maxlength={this.maxLength}
            minlength={this.minLength}
            onInput={(event) => this.handleOnInput(event)}
            placeholder={this.placeholder}
            readonly={this.readOnly}
            ref={(el) => (this.textInput = el as HTMLTextAreaElement)}
            rows={this.rows}
            spellcheck={this.spellcheck}
            tabIndex={0}
            value={this.value}
            autofocus={this.autoFocusInput}
          />
          {showClearIcon && (
            <span
              class="icons clear"
              tabIndex={0}
              onKeyDown={(event) => this.handleClearKeyDown(event)}
              onClick={() => this.handleClear()}
              role="button"
              aria-label="Clear entry">
              <IconClose size={iconSize} />
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

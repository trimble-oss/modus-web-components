// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Method, Prop, State, Watch } from '@stencil/core';
import { generateElementId } from '../../utils/utils';

@Component({
  tag: 'modus-number-input',
  styleUrl: 'modus-number-input.scss',
  shadow: true,
})
export class ModusNumberInput {
  /** Displayed only when the input is not focused. */
  @State() formattedValue = this.getFormattedValue();

  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The input's currency */
  @Prop() currency: string;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The input's error state text. */
  @Prop() errorText: string;

  /** (optional) The input's helper text displayed below the input. */
  @Prop() helperText: string;

  /** (optional) The input's label. */
  @Prop() label: string;

  /** (optional) The input's locale */
  @Prop() locale: string;

  /** (optional) The input's maximum value. */
  @Prop() maxValue: number;

  /** (optional) The input's minimum value. */
  @Prop() minValue: number;

  /** (optional) The input's placeholder text. */
  @Prop() placeholder: string;

  /** (optional) Whether the input's content is read-only */
  @Prop() readOnly: boolean;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The input's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) The input's step. */
  @Prop() step: number;

  /** (optional) The input's text alignment. */
  @Prop() textAlign: 'left' | 'right' = 'left';

  /** (optional) The input's valid state text. */
  @Prop() validText: string;

  /** (optional) The input's value. */
  @Prop({ mutable: true }) value: string;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<string>;

  private inputId = generateElementId() + '_number-input';
  private inputFocused = false;

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);
  input: HTMLInputElement;

  handleOnInput(): void {
    this.value = this.input.value;
    this.valueChange.emit(this.value);
  }

  /** Focus the input. */
  @Method()
  async focusInput(): Promise<void> {
    this.input.focus();
  }

  @Watch('value')
  watchValue(newValue: string, oldValue: string): void {
    if (isNaN(+newValue)) {
      this.value = oldValue;
    } else {
      this.value = newValue;
    }

    // Only updated when the input value is changed programatically by the consumer
    if ((this.currency || this.locale) && !this.inputFocused) {
      this.formattedValue = this.getFormattedValue();
    }
  }

  getFormattedValue() {
    const numericValue = parseFloat((this.value !== undefined ? this.value : '').replace(/[^0-9.-]+/g, ''));
    if (this?.value) {
      let formattedValue;
      if (this.currency && this.locale) {
        formattedValue = new Intl.NumberFormat(this.locale, {
          style: 'currency',
          currency: this.currency,
        }).format(numericValue);
      } else if (this.currency) {
        formattedValue = new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: this.currency,
        }).format(numericValue);
      } else if (this.locale) {
        formattedValue = new Intl.NumberFormat(this.locale).format(numericValue);
      } else {
        formattedValue = numericValue.toString();
      }
      return formattedValue;
    }
    return '';
  }

  handleOnBlur = (): void => {
    if (this.currency || this.locale) {
      this.inputFocused = false;
      this.formattedValue = this.getFormattedValue();
      this.input.type = 'text';
      this.input.value = this.formattedValue;
    }
  };

  handleOnFocus = (): void => {
    if (this.currency || this.locale) {
      this.inputFocused = true;
      this.input.value = this.value !== undefined ? this.value : '';
      this.input.type = 'number';
    }
  };

  render(): unknown {
    const textAlignClassName = `text-align-${this.textAlign}`;
    const buildContainerClassNames = (): string => {
      const classNames = [];
      classNames.push('modus-number-input');

      if (this.disabled) {
        classNames.push('disabled');
      }

      return classNames.join(' ');
    };

    const buildInputContainerClassNames = (): string => {
      const classNames = [];

      classNames.push('input-container');
      classNames.push(this.classBySize.get(this.size));

      if (this.errorText) {
        classNames.push('error');
      }
      if (this.validText) {
        classNames.push('valid');
      }

      return classNames.join(' ');
    };
    const inputType = this.currency || this.locale ? 'text' : 'number';
    const inputAriaProps =
      inputType === 'number'
        ? {
            ariaValuemax: this.maxValue ? parseFloat(this.value).toString() : undefined,
            ariaValuemin: this.minValue ? parseFloat(this.value).toString() : undefined,
            ariaValuenow: this.value ? parseFloat(this.value).toString() : undefined,
          }
        : {};

    return (
      <div class={buildContainerClassNames()}>
        {this.label || this.required ? (
          <div class="label-container">
            {this.label ? <label htmlFor={this.inputId}>{this.label}</label> : null}
            {this.required ? <span class="required">*</span> : null}
            {this.helperText ? <label class="sub-text helper">{this.helperText}</label> : null}
          </div>
        ) : null}
        <div class={buildInputContainerClassNames()} part="input-container">
          <input
            id={this.inputId}
            aria-label={this.ariaLabel}
            aria-invalid={!!this.errorText}
            aria-required={this.required?.toString()}
            class={textAlignClassName}
            disabled={this.disabled}
            max={this.maxValue}
            min={this.minValue}
            onInput={() => this.handleOnInput()}
            onFocusin={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            placeholder={this.placeholder}
            readonly={this.readOnly}
            ref={(el) => (this.input = el as HTMLInputElement)}
            step={this.step}
            tabIndex={0}
            type={inputType}
            value={inputType === 'text' ? this.formattedValue : this.value}
            {...inputAriaProps}></input>
        </div>
        {this.errorText ? (
          <label class="sub-text error">{this.errorText}</label>
        ) : this.validText ? (
          <label class="sub-text valid">{this.validText}</label>
        ) : null}
      </div>
    );
  }
}

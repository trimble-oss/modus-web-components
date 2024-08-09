// eslint-disable-next-line
import { Component, h, Prop, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { generateElementId } from '../../utils/utils';
import { ModusIconMap } from '../../icons/ModusIconMap';
import { NumberInput, CurrencyDisplay, NumberFormatStyle } from 'intl-number-input';

@Component({
  tag: 'modus-number-input',
  styleUrl: 'modus-number-input.scss',
  shadow: true,
})
export class ModusNumberInput {
  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The currency symbol. */
  @Prop() currencySymbol = '';

  /** (optional) The decimal character. */
  @Prop() locale: string;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The input's error state text. */
  @Prop() errorText: string;

  /** (optional) The input's helper text displayed below the input. */
  @Prop() helperText: string;

  /** (optional) The input's label. */
  @Prop() label: string;

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

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  numberInput: HTMLInputElement;
  private inputOptions: NumberInput;

  componentDidLoad() {
    this.formatInputValue();
    this.numberInput.addEventListener('wheel', (event) => this.handleWheel(event), { passive: true });
  }

  @Watch('currencySymbol')
  @Watch('locale')
  watchPropChangeHandler() {
    this.formatInputValue();
  }

  formatInputValue() {
    if (this?.numberInput) {
      this.inputOptions = new NumberInput({
        el: this.numberInput,
        options: {
          formatStyle: 'decimal' as NumberFormatStyle,
          locale: this?.locale,
          valueRange: {
            min: this?.minValue,
            max: this?.maxValue,
          },
          hidePrefixOrSuffixOnFocus: true,
          hideGroupingSeparatorOnFocus: true,
          hideNegligibleDecimalDigitsOnFocus: false,
          autoDecimalDigits: false,
          exportValueAsInteger: false,
          useGrouping: true,
        },
      });
      if (this?.currencySymbol) {
        this.inputOptions?.setOptions({
          formatStyle: 'currency' as NumberFormatStyle,
          currency: this?.currencySymbol,
          currencyDisplay: CurrencyDisplay.Symbol,
        });
      }
      if (!this.value) {
        this.inputOptions?.setValue(this.value as unknown as number);
      }
    }
  }

  extractNumbers(): string {
    const numbers = this.numberInput.value.match(/\d+(\.\d+)?/g);
    return numbers ? numbers.join('') : '';
  }

  handleOnInput(): void {
    this.valueChange.emit(this.extractNumbers());
  }

  /** Focus the input. */
  @Method()
  async focusInput(): Promise<void> {
    this.numberInput.focus();
  }

  @Watch('value')
  watchValue(newValue: string, oldValue: string): void {
    if (isNaN(+newValue)) {
      this.value = oldValue;
    } else {
      this.value = newValue;
    }
  }

  incrementValue() {
    this.inputOptions?.increment();
    this.valueChange.emit(this.extractNumbers());
  }

  decrementValue() {
    this.inputOptions?.decrement();
    this.valueChange.emit(this.extractNumbers());
  }

  handleWheel(event: WheelEvent) {
    if (!this.disabled && !this.readOnly) {
      const delta = Math.sign(event.deltaY);
      if (delta < 0) {
        this.decrementValue();
      } else {
        this.incrementValue();
      }
      this.valueChange.emit(this.extractNumbers());
    }
  }

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
            inputMode="decimal"
            max={this.maxValue}
            min={this.minValue}
            onInput={() => this.handleOnInput()}
            placeholder={this.placeholder}
            readonly={this.readOnly}
            ref={(el) => (this.numberInput = el as HTMLInputElement)}
            step={this.step}
            tabIndex={0}
            type="text"
            value={this.value}></input>
          <div class="value-adjusters">
            <div class="increment" onClick={() => this.incrementValue()}>
              <ModusIconMap icon="caret_up" size="16" />
            </div>
            <div class="decrement" onClick={() => this.decrementValue()}>
              <ModusIconMap icon="caret_down" size="16" />
            </div>
          </div>
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

// eslint-disable-next-line
import { Component, h, Prop, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { formatNumeral, formatCreditCard, FormatNumeralOptions, NumeralThousandGroupStyles } from 'cleave-zen';
import { generateElementId } from '../../utils/utils';
import { ModusIconMap } from '../../icons/ModusIconMap';

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
  @Prop() decimalCharacter: '.' | ',' = '.';

  /** (optional) The number of decimal places. */
  @Prop() decimalPlaces: number;

  /** (optional) The digit group separator. */
  @Prop() digitGroupSeparator: ' ' | ',' | '.' = ',';

  /** (optional) The digit group spacing. */
  @Prop() digitGroupSpacing: NumeralThousandGroupStyles;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The input's error state text. */
  @Prop() errorText: string;

  /** (optional) The input's helper text displayed below the input. */
  @Prop() helperText: string;

  /** (optional) The maximum number of integers allowed. */
  @Prop() integerLimit: number;

  /** (optional) Whether the input is a credit card. */
  @Prop() isCreditCard: boolean;

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

  componentDidLoad() {
    this.formatInputValue();
  }

  @Watch('digitGroupSeparator')
  @Watch('digitGroupSpacing')
  @Watch('decimalCharacter')
  @Watch('decimalPlaces')
  @Watch('currencySymbol')
  @Watch('integerLimit')
  watchPropChangeHandler() {
    this.formatInputValue();
  }

  formatInputValue() {
    if (this.numberInput) {
      const options: FormatNumeralOptions = {
        numeralThousandsGroupStyle: this?.digitGroupSpacing,
        delimiter: this?.digitGroupSeparator,
        numeralDecimalMark: this?.decimalCharacter,
        prefix: this?.currencySymbol,
        numeralIntegerScale: this?.integerLimit,
        numeralDecimalScale: this?.decimalPlaces,
      };
      const formattedValue = this.isCreditCard
        ? formatCreditCard(this.numberInput.value, options)
        : formatNumeral(this.numberInput.value, options);
      this.numberInput.value = formattedValue;
      this.value = formattedValue;
    }
  }

  handleOnInput(): void {
    this.formatInputValue();
    this.valueChange.emit(this.value);
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
    this.updateValue(this.parseValue(this.numberInput.value || '0') + (this.step || 1));
  }

  decrementValue() {
    this.updateValue(this.parseValue(this.numberInput.value || '0') - (this.step || 1));
  }

  handleWheel(event: WheelEvent) {
    event.preventDefault();
    if (!this.disabled && !this.readOnly) {
      const step = this.step || 1;
      const delta = Math.sign(event.deltaY);
      this.updateValue(this.parseValue(this.numberInput.value || '0') + delta * step);
    }
  }

  updateValue(newValue: number) {
    if (this.minValue !== undefined && newValue < this.minValue) {
      newValue = this.minValue;
    }
    if (this.maxValue !== undefined && newValue > this.maxValue) {
      newValue = this.maxValue;
    }
    this.numberInput.value = newValue.toString();
    this.formatInputValue();
    this.valueChange.emit(this.numberInput.value);
  }

  parseValue(value: string): number {
    value = value.replace(this.currencySymbol, '').split(this.digitGroupSeparator).join('');
    value = this.decimalCharacter !== '.' ? value.replace(this.decimalCharacter, '.') : value;
    return parseFloat(value) || 0;
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
            onWheel={(event) => this.handleWheel(event)}
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

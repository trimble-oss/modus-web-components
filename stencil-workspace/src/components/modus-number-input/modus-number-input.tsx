// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Method, Prop, Watch } from '@stencil/core';
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

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);
  numberInput: HTMLInputElement;

  handleOnInput(): void {
    this.value = this.numberInput.value;
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
  private inputFocused = false;

  componentDidLoad(): void {
    if (this.value && !isNaN(+this.value)) {
      this.formatValue(true);
    }
    this.numberInput.addEventListener('wheel', this.handleWheel.bind(this), { passive: true });

    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }

  disconnectedCallback() {
    this.numberInput.removeEventListener('wheel', this.handleWheel);

    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }

  handleDocumentClick(event: MouseEvent): void {
    if (!this.inputFocused && !this.numberInput.contains(event.target as Node)) {
      this.formatValue();
    }
  }

  handleOnBlur(): void {
    this.inputFocused = false;
    this.formatValue();
  }

  handleKeyPress(event: KeyboardEvent): void {
    const charCode = event.charCode;
    const charStr = String.fromCharCode(charCode);

    if (
      !charStr.match(/^[0-9.-]$/) ||
      (charStr === '.' && this.numberInput.value.includes('.')) ||
      (charStr === '-' && this.numberInput.value.includes('-'))
    ) {
      event.preventDefault();
    }
  }

  formatValue(initialSetup = false): void {
    let numericValue = parseFloat(this.value.replace(/[^0-9.-]+/g, ''));
    if (numericValue < this.minValue) {
      numericValue = this.minValue;
    }
    if (numericValue > this.maxValue) {
      numericValue = this.maxValue;
    }

    if (this?.value && this.numberInput) {
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

      if (!initialSetup) {
        this.value = formattedValue;
      }
      if (formattedValue) {
        this.numberInput.value = formattedValue;
      }
      this.valueChange.emit(numericValue.toString());
    }
  }

  handleOnFocus(): void {
    this.inputFocused = true;
    this.numberInput.value = this.value;
  }

  incrementValue() {
    const numericValue = parseFloat(this.value.replace(/[^0-9.-]+/g, ''));
    const newValue = numericValue + this.step;
    this.value = newValue.toString();
  }

  decrementValue() {
    const numericValue = parseFloat(this.value.replace(/[^0-9.-]+/g, ''));
    const newValue = numericValue - this.step;
    this.value = newValue.toString();
  }

  handleWheel(event: WheelEvent) {
    if (this.disabled || this.readOnly) return;

    const isScrollUp = Math.sign(event.deltaY) < 0;

    if (isScrollUp) {
      this.decrementValue();
    } else {
      this.incrementValue();
    }
  }

  handleKeys(event: KeyboardEvent) {
    if (this.disabled || this.readOnly) return;

    if (event.key === 'ArrowUp') {
      this.incrementValue();
    } else if (event.key === 'ArrowDown') {
      this.decrementValue();
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
            aria-valuemax={this.maxValue}
            aria-valuemin={this.minValue}
            aria-valuenow={this.value}
            class={textAlignClassName}
            disabled={this.disabled}
            max={this.maxValue}
            min={this.minValue}
            onInput={() => this.handleOnInput()}
            onFocusin={() => this.handleOnFocus()}
            onBlur={() => this.handleOnBlur()}
            placeholder={this.placeholder}
            readonly={this.readOnly}
            onKeyDown={(event) => this.handleKeys(event)}
            onKeyPress={(event) => this.handleKeyPress(event)}
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

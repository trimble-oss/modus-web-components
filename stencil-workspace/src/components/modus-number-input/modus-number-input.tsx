// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'modus-number-input',
  styleUrl: 'modus-number-input.scss',
  shadow: true,
})
export class ModusNumberInput {
  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

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

  /** (optional) The input's valid state text. */
  @Prop() validText: string;

  /** (optional) The input's value. */
  @Prop({ mutable: true }) value: string;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<string>;

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);
  numberInput: HTMLInputElement;

  handleOnInput(): void {
    this.value = this.numberInput.value;
    this.valueChange.emit(this.value);
  }

  @Watch('value')
  watchValue(newValue: string, oldValue: string): void {
    if (isNaN(+newValue)) {
      this.value = oldValue;
      console.error(`${newValue} is not a number.`);
    } else {
      this.value = newValue;
    }
  }

  render(): unknown {
    const className = `modus-number-input ${this.disabled ? 'disabled' : ''}`;
    const inputContainerClassName = `input-container ${
      this.errorText ? 'error' : this.validText ? 'valid' : ''
    } ${this.classBySize.get(this.size)}`;

    return (
      <div
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-label={this.ariaLabel}
        aria-placeholder={this.placeholder}
        aria-invalid={!!this.errorText}
        aria-readonly={this.readOnly}
        aria-required={this.required}
        aria-valuemax={this.maxValue}
        aria-valuemin={this.minValue}
        aria-valuenow={this.value}
        class={className}>
        {this.label || this.required ? (
          <div class="label-container">
            {this.label ? <label>{this.label}</label> : null}
            {this.required ? <span class="required">*</span> : null}
          </div>
        ) : null}
        <div class={inputContainerClassName}>
          <input
            disabled={this.disabled}
            max={this.maxValue}
            min={this.minValue}
            onInput={() => this.handleOnInput()}
            placeholder={this.placeholder}
            readonly={this.readOnly}
            ref={(el) => (this.numberInput = el as HTMLInputElement)}
            step={this.step}
            tabIndex={0}
            type="number"
            value={this.value}></input>
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

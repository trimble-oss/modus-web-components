// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { generateRandomNumber } from '../../utils/utils';

@Component({
  tag: 'modus-number-input',
  styleUrl: 'modus-number-input.scss',
  shadow: true,
})
export class ModusNumberInput {
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
  @Prop({ mutable: true }) value: number;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<number>;

  accessibilityId: number;
  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large']
  ]);

  numberInput: HTMLInputElement;

  componentWillLoad(): void {
    this.accessibilityId = generateRandomNumber();
  }

  handleOnInput(event: Event): void {
    this.value = (event.currentTarget as HTMLInputElement).valueAsNumber;
    this.valueChange.emit(this.value);
  }

  render(): unknown {
    const className = `modus-number-input ${this.disabled ? 'disabled' : ''}`;
    const inputContainerClassName = `input-container ${this.errorText ? 'error' : this.validText ? 'valid' : ''} ${this.classBySize.get(this.size)}`;

    const inputLabel = `inputLabel${this.accessibilityId}`;
    const inputDesc = `inputDesc${this.accessibilityId}`;

    return (
      <div
        class={className}
        aria-describedby={inputDesc}
        aria-labelledby={inputLabel}
        aria-placeholder={this.placeholder}
        aria-readonly={this.readOnly}
        aria-required={this.required}>
        <div class="label-container">
          {this.label ? <label id={inputLabel}>{this.label}</label> : null}{this.required ? <span class="required">*</span> : null}
        </div>
        <div class={inputContainerClassName}>
          <input
            disabled={this.disabled}
            max={this.maxValue}
            min={this.minValue}
            onInput={(event) => this.handleOnInput(event)}
            placeholder={this.placeholder}
            readonly={this.readOnly}
            ref={(el) => this.numberInput = el as HTMLInputElement}
            step={this.step}
            type="number"
            value={this.value}>
          </input>
        </div>
        {
          this.errorText ? <label class="sub-text error" id={inputDesc}>{this.errorText}</label> :
          this.validText ? <label class="sub-text valid" id={inputDesc}>{this.validText}</label> :
          this.helperText ? <label class="sub-text helper" id={inputDesc}>{this.helperText}</label> :
          null
        }
      </div>
    );
  }
}

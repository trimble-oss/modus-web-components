/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Event, EventEmitter, h, JSX, Prop, State, Watch } from '@stencil/core';
import { createGuid } from '../../utils/utils';

@Component({
  tag: 'modus-select',
  styleUrl: 'modus-select.scss',
  shadow: true,
})
export class ModusSelect {
  /** (optional) The select's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The input's error text. */
  @Prop() errorText: string;

  /** (optional) The input's helper text. */
  @Prop() helperText: string;

  /** (optional) The input label. */
  @Prop() label: string;

  /** The options for the dropdown list. */
  @Prop() options: unknown[] = [];

  /** The options property to render in the dropdown list. */
  @Prop() optionsDisplayProp: string;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The input's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) The input's valid text. */
  @Prop() validText: string;

  /** (optional) The input value. */
  @Prop() value: unknown;
  @Watch('value')
  handleValueChange(newValue: unknown): void {
    this.internalValue = newValue;
  }

  /** The input value state. */
  @State() internalValue: unknown;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<unknown>;

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  connectedCallback(): void {
    this.internalValue = this.value;
  }

  handleItemSelect(option: unknown): void {
    this.valueChange.emit(option);
  }

  handleSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.handleItemSelect(selectedValue);
  }

  renderSubText(): JSX.Element | null {
    if (this.errorText) {
      return <label class="sub-text error">{this.errorText}</label>;
    } else if (this.validText) {
      return <label class="sub-text valid">{this.validText}</label>;
    } else if (this.helperText) {
      return <label class="sub-text helper">{this.helperText}</label>;
    }
    return null;
  }

  renderLabel(): JSX.Element | null {
    return this.label || this.required ? (
      <div class="label-container">
        {this.label ? <label>{this.label}</label> : null}
        {this.required ? <span class="required">*</span> : null}
      </div>
    ) : null;
  }

  renderOptions(): JSX.Element[] {
    return this.options?.map((option) => (
      <option
        value={option[this.optionsDisplayProp]}
        key={createGuid()}
        selected={
          this.internalValue &&
          (typeof option[this.optionsDisplayProp] === 'number'
            ? Number(option[this.optionsDisplayProp]) === Number(this.internalValue)
            : option[this.optionsDisplayProp] === this.internalValue)
        }>
        {option[this.optionsDisplayProp]}
      </option>
    ));
  }

  render(): unknown {
    const selectClass = `${this.classBySize.get(this.size)} ${
      this.errorText ? 'error' : this.validText ? 'valid' : this.disabled ? 'disabled' : ''
    }`;
    return (
      <div
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-label={this.ariaLabel}
        aria-required={this.required}
        class={this.disabled ? 'disabled' : undefined}>
        {this.renderLabel()}
        <span class="input-container">
          <select
            disabled={this.disabled}
            class={selectClass}
            aria-label={this.ariaLabel}
            onChange={(event) => {
              this.handleSelectChange(event);
            }}
            aria-invalid={!!this.errorText}
            aria-required={this.required}>
            {this.renderOptions()}
          </select>
          {this.renderSubText()}
        </span>
      </div>
    );
  }
}

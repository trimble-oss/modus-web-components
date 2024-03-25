/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Event, EventEmitter, h, JSX, Method, Prop, State, Watch } from '@stencil/core';
import { createGuid, generateElementId } from '../../utils/utils';

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

  /** (optional) The input's placeholder. */
  @Prop() placeholder = 'Please Select';

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

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<unknown>;

  /** An event that fires on input blur. */
  @Event() inputBlur: EventEmitter<FocusEvent>;

  @State() internalValue: unknown;
  @State() optionIdMap: Map<string, unknown> = new Map();

  private selectId = generateElementId() + '_select';

  selectInput: HTMLSelectElement;

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  /** Focus the input. */
  @Method()
  async focusInput(): Promise<void> {
    this.selectInput.focus();
  }

  connectedCallback(): void {
    this.internalValue = this.value;
  }

  handleOptionSelect(option: unknown): void {
    this.valueChange.emit(option);
  }

  handleSelectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedId = target.value;
    const option = this.optionIdMap.get(selectedId);
    this.handleOptionSelect(option);
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
        {this.label ? <label htmlFor={this.selectId}>{this.label}</label> : null}
        {this.required ? <span class="required">*</span> : null}
      </div>
    ) : null;
  }

  renderOptions(): JSX.Element[] {
    return this.options?.map((option) => {
      const optionId = createGuid();
      this.optionIdMap.set(optionId, option);
      return (
        <option value={optionId} key={optionId} selected={option === this.internalValue}>
          {option[this.optionsDisplayProp]}
        </option>
      );
    });
  }

  render(): unknown {
    const selectClass = `${this.classBySize.get(this.size)} ${
      this.errorText ? 'error' : this.validText ? 'valid' : this.disabled ? 'disabled' : ''
    }`;
    return (
      <div class={this.disabled ? 'disabled' : undefined}>
        {this.renderLabel()}
        <span class="input-container">
          <select
            part="input"
            ref={(el) => (this.selectInput = el)}
            disabled={this.disabled}
            id={this.selectId}
            class={selectClass}
            aria-label={this.ariaLabel}
            onBlur={(e) => this.inputBlur.emit(e)}
            onChange={(event) => {
              this.handleSelectChange(event);
            }}
            aria-invalid={!!this.errorText}
            aria-required={this.required?.toString()}>
            <option value="" disabled selected>
              {this.placeholder}
            </option>
            {this.renderOptions()}
          </select>
          {this.renderSubText()}
        </span>
      </div>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { generateElementId } from '../../utils/utils';

@Component({
  tag: 'modus-slider',
  styleUrl: 'modus-slider.scss',
  shadow: true,
})
export class ModusSlider {
  /** (optional) The slider's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Whether the slider is disabled. **/
  @Prop() disabled = false;

  /** (optional) The slider's label. */
  @Prop() label: string;

  /** (optional) The slider's maximum value. */
  @Prop() maxValue = 100;

  /** (optional) The slider's minimum value. */
  @Prop() minValue = 0;

  /** (optional) The slider's value. */
  @Prop({ mutable: true }) value = '50';

  /** An event that fires on slider value change. */
  @Event() valueChange: EventEmitter<string>;

  /** An event that fires on slider value input. */
  @Event() valueInput: EventEmitter<string>;

  @State() valuePercent: number;

  private sliderId = generateElementId() + '_slider';

  constructor() {
    this.updateValuePercent();
  }

  componentWillLoad() {
    this.updateValuePercent();
  }

  @Watch('value')
  updateValuePercent() {
    this.valuePercent = ((Number(this.value) - this.minValue) / (this.maxValue - this.minValue)) * 100;
  }

  handleOnChange(event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }

  handleOnInput(event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).value;
    this.value = value;
    this.valueInput.emit(value);
  }

  render(): unknown {
    const className = `modus-slider ${this.disabled ? 'disabled' : ''}`;

    return (
      <div aria-disabled={this.disabled ? 'true' : undefined} aria-label={this.ariaLabel || undefined} class={className}
      style={{ '--value-percent': `${this.valuePercent}%`, marginBottom : '50px', marginTop:'50px'}}>
        {this.label && <label htmlFor={this.sliderId}>{this.label}</label>}
        <input
          class="slider"
          disabled={this.disabled}
          id={this.sliderId}
          max={this.maxValue}
          min={this.minValue}
          onChange={(event) => this.handleOnChange(event)}
          onInput={(event) => this.handleOnInput(event)}
          type="range"
          value={this.value}
        />
      </div>
    );
  }
}

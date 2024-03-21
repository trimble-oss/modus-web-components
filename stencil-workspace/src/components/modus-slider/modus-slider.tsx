// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
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
  @Prop({ mutable: true }) value: string;

  /** An event that fires on slider value change. */
  @Event() valueChange: EventEmitter<string>;

  /** An event that fires on slider value input. */
  @Event() valueInput: EventEmitter<string>;

  private sliderId = generateElementId() + '_slider';

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
      <div aria-disabled={this.disabled ? 'true' : undefined} aria-label={this.ariaLabel} class={className}>
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

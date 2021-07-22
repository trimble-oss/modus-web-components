// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'modus-radio-button',
  styleUrl: 'modus-radio-button.scss',
  shadow: false, // False so that radio buttons of the same group populate the same Shadow DOM.
})
export class ModusRadioButton {
  /** (optional) Whether the radio button is checked. */
  @Prop({ mutable: true }) checked: boolean;

  /** (optional) Whether the radio button is disabled. */
  @Prop() disabled: boolean;

  /** The radio button's id. */
  @Prop() radioId: string;

  /** (optional) The radio button's label. */
  @Prop() label: string;

  /** The radio button's group name. */
  @Prop() name: string;

  /** An event that fires on radio button click. */
  @Event({ composed: false }) buttonClick: EventEmitter<string>;

  radioButtonInput: HTMLInputElement;

  handleButtonClick(): void {
    this.radioButtonInput.checked = !this.radioButtonInput.checked;
    this.checked = this.radioButtonInput.checked;
    this.buttonClick.emit(this.radioId);
  }

  onInputChange(event: Event): void {
    this.checked = (event.target as HTMLInputElement).checked;
  }

  render(): unknown {
    const containerClassName = `modus-radio-button ${this.disabled ? 'disabled' : ''}`;

    return (
      <div class={containerClassName} onClick={() => this.handleButtonClick()}>
        <div class="radio">
          <input
            checked={this.checked}
            disabled={this.disabled}
            name={this.name}
            onChange={(event) => this.onInputChange(event)}
            ref={(el) => this.radioButtonInput = el as HTMLInputElement}
            type="radio">
          </input>
          <span class="checkmark"></span>
          <label>
            {this.label}
          </label>
        </div>
      </div>
    );
  }
}

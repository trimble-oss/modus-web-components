// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

export interface RadioButton {
  checked?: boolean;
  disabled?: boolean;
  id: string;
  label: string;
}

@Component({
  tag: 'modus-radio-group',
  styleUrl: 'modus-radio-group.scss',
  shadow: true,
})
export class ModusRadioGroup {
  /** The currently checked radio button's ID. */
  @Prop() checkedId: string;

  /** The radio button group name. */
  @Prop() name: string;

  /** The radio buttons to render. */
  @Prop() radioButtons: RadioButton[] = [];

  /** Fires on radio button click. */
  @Event() buttonClick: EventEmitter<string>;

  handleButtonClick(event: CustomEvent) {
    this.checkedId = event.detail;
    this.buttonClick.emit(this.checkedId);
  }

  render(): unknown {
    return (
      <div>
        {this.radioButtons.map(radioButton => {
          return (
            <ul>
              <modus-radio-button
                checked={radioButton.checked}
                disabled={radioButton.disabled}
                label={radioButton.label}
                name={this.name}
                radioId={radioButton.id}
                onButtonClick={(event) => this.handleButtonClick(event)}>
              </modus-radio-button>
            </ul>
          )
        })}
      </div>
    );
  }
}

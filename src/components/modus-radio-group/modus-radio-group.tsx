// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import { ModusRadioButton, RadioButton } from './modus-radio-button';

@Component({
  tag: 'modus-radio-group',
  styleUrl: 'modus-radio-group.scss',
  shadow: true,
})
export class ModusRadioGroup {
  /** The ID of the checked radio button. */
  @Prop({ mutable: true }) checkedId: string;

  /** The radio button group name. */
  @Prop() name: string;

  /** The radio buttons to render. */
  @Prop({ mutable: true }) radioButtons: RadioButton[] = [];

  /** Fires on radio button click. */
  @Event() buttonClick: EventEmitter<string>;

  componentWillLoad(): void {
    this.radioButtons.forEach(radioButton => {
      this.checkedId = radioButton.checked ? radioButton.id : this.checkedId;
    });
  }

  private handleButtonClick(id: string) {
    this.setCheckedIdAndUpdateRadioButtons(id);
    this.buttonClick.emit(this.checkedId);
  }

  @Watch('checkedId')
  private setCheckedIdAndUpdateRadioButtons(id: string): void {
    this.checkedId = id;
    this.radioButtons.forEach(radioButton => {
      radioButton.checked = radioButton.id === this.checkedId;
    });
  }

  render(): unknown {
    return (
      <ul>
        {this.radioButtons.map(radioButton => {
          return (
            <ModusRadioButton
              checked={radioButton.checked}
              disabled={radioButton.disabled}
              label={radioButton.label}
              name={this.name}
              id={radioButton.id}
              handleButtonClick={(id) => this.handleButtonClick(id)}>
            </ModusRadioButton>
          )
        })}
      </ul>
    );
  }
}

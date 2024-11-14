// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import { ModusRadioButton, RadioButton } from './modus-radio-button';

@Component({
  tag: 'modus-radio-group',
  styleUrl: 'modus-radio-group.scss',
  shadow: true,
})
export class ModusRadioGroup {
  /** The radio group's aria-label. */
  @Prop() ariaLabel: string | null;

  /** The ID of the checked radio button. */
  @Prop({ mutable: true }) checkedId: string;

  /** The radio button group name. Used to group individual radio elements into one group. */
  @Prop() name: string;

  /** The radio buttons to render. */
  @Prop({ mutable: true }) radioButtons: RadioButton[] = [];

  /** (optional) The size of the radiobutton. */
  @Prop() size?: 'small' | 'medium' = 'medium';

  /** Fires on radio button click. */
  @Event() buttonClick: EventEmitter<string>;

  private radioButtonRefs: HTMLDivElement[] = [];

  componentWillLoad(): void {
    this.radioButtons.forEach((radioButton) => {
      this.checkedId = radioButton.checked ? radioButton.id : this.checkedId;
    });
  }

  private handleButtonClick(id: string) {
    this.setCheckedIdAndUpdateRadioButtons(id);
    this.buttonClick.emit(this.checkedId);
  }

  private handleButtonKeydown(event: KeyboardEvent, id: string) {
    let index = this.radioButtons.findIndex((radioButton) => radioButton.id === id);

    if (event.code === 'Enter') {
      this.handleButtonClick(id);
    } else if (event.code === 'ArrowDown') {
      if (index < this.radioButtons.length - 1) {
        index = index + 1;
      }
      this.handleButtonClick(this.radioButtons[index].id);
      this.radioButtonRefs[index].focus();
    } else if (event.code === 'ArrowUp') {
      if (index > 0) {
        index = index - 1;
      }
      this.handleButtonClick(this.radioButtons[index].id);
      this.radioButtonRefs[index].focus();
    }
  }

  @Watch('checkedId')
  private setCheckedIdAndUpdateRadioButtons(id: string): void {
    this.checkedId = id;
    this.radioButtons.forEach((radioButton) => {
      radioButton.checked = radioButton.id === this.checkedId;
    });
  }

  render(): unknown {
    return (
      <div class="modus-radio-group" aria-label={this.ariaLabel}>
        {this.radioButtons.map((radioButton, index) => {
          return (
            <ModusRadioButton
              ref={(el) => (this.radioButtonRefs[index] = el)}
              size={this.size}
              checked={radioButton.checked}
              disabled={radioButton.disabled}
              label={radioButton.label}
              name={this.name}
              id={radioButton.id}
              handleButtonClick={(id) => this.handleButtonClick(id)}
              handleKeydown={(event, id) => this.handleButtonKeydown(event, id)}></ModusRadioButton>
          );
        })}
      </div>
    );
  }
}

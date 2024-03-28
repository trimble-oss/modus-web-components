import { Component, h, Prop, Element, Event, EventEmitter, Host, Listen } from '@stencil/core';
import { ButtonGroupSelectionType } from './modus-button-group.models';
import { DEFAULT_SELECT__TYPE, SINGLE_SELECT_TYPE } from './modus-button-group.constants';

@Component({
  tag: 'modus-button-group',
  styleUrl: 'modus-button-group.scss',
  shadow: true,
})
export class ModusButtonGroup {
  /** (optional) The selection type of button */
  @Prop() ariaLabel: string;

  /** (optional) Disables the button. */
  @Prop() disabled: boolean;

  /** (optional) The button's aria-label. */
  @Prop() selectionType: ButtonGroupSelectionType = DEFAULT_SELECT__TYPE;

  @Element() host: HTMLElement;

  activeButton: HTMLModusButtonElement | null = null;

  /** Array to store selected buttons */
  selectedButtons: HTMLModusButtonElement[] = [];

  /** Event emitted when a button is clicked */
  @Event() buttonsSelected: EventEmitter<HTMLModusButtonElement[]>;

  componentWillLoad() {
    this.handleSlotChange();
  }

  @Listen('slotchange')
  handleSlotChange() {
    const buttons = this.host.querySelectorAll('modus-button');
    this.renderButtons(buttons);
  }

  renderButtons(buttons: any) {
    buttons.forEach((button: HTMLModusButtonElement) => {
      button.disabled = this.disabled;
      button.buttonStyle = 'outline';
      this.selectionType === SINGLE_SELECT_TYPE ? (button.type = 'toggle') : (button.type = 'button');

      button.addEventListener('click', () => this.handleButtonClick(button));
    });
  }

  handleButtonClick(clickedButton: HTMLModusButtonElement) {
    if (this.selectionType === SINGLE_SELECT_TYPE) {
      this.selectedButtons = [clickedButton];
      if (this.activeButton === clickedButton) {
        this.activeButton.setActive(false);
        this.activeButton = null;
      } else {
        if (this.activeButton) {
          this.activeButton.setActive(false);
        }
        this.activeButton = clickedButton;
        this.activeButton.setActive(true);
      }
    }

    this.buttonsSelected.emit(this.selectedButtons);
  }

  render() {
    return (
      <Host>
        <div class="button-group" aria-label={this.ariaLabel} aria-disabled={this.disabled}>
          <slot />
        </div>
      </Host>
    );
  }
}

import { Component, h, Prop, Element, Event, EventEmitter, Host, Listen, Watch } from '@stencil/core';
import { ButtonGroupSelectionType, ModusButtonGroupButtonClickEvent } from './modus-button-group.models';
import { DEFAULT_SELECTION_TYPE, SINGLE_SELECTION_TYPE, MULTIPLE_SELECTION_TYPE } from './modus-button-group.constants';
import { ButtonColor, ButtonSize, ButtonStyle, ButtonType } from '../modus-button/modus-button.models';

@Component({
  tag: 'modus-button-group',
  styleUrl: 'modus-button-group.scss',
  shadow: true,
})
export class ModusButtonGroup {
  @Element() host: HTMLElement;

  /** Array to store selected buttons */
  selectedButtons: HTMLModusButtonElement[] = [];

  /** (optional) The button group's aria-label. */
  @Prop() ariaLabel: string;

  @Prop() buttonStyle: ButtonStyle = 'outline';

  @Prop() color: ButtonColor = 'primary';

  /** (optional) Disables the button group. */
  @Prop() disabled: boolean;

  /** (optional) The selection type of buttons */
  @Prop() selectionType: ButtonGroupSelectionType = DEFAULT_SELECTION_TYPE;
  @Watch('selectionType')
  selectionTypeChanged(newValue: ButtonGroupSelectionType) {
    if (newValue === DEFAULT_SELECTION_TYPE) {
      this.selectedButtons.forEach((button) => button.setActive(false));
      this.selectedButtons = [];
    }
  }

  /** (optional) The size of the buttons */
  @Prop() size: ButtonSize = 'medium';

  @Watch('disabled')
  @Watch('size')
  protected propsChanged(): void {
    this.setupButtons();
  }

  /** Event emitted when a button is clicked */
  @Event() buttonGroupClick: EventEmitter<ModusButtonGroupButtonClickEvent>;

  /** Event emitted when the selection changes */
  @Event() selectionChange: EventEmitter<HTMLModusButtonElement[]>;

  componentWillLoad() {
    this.setupButtons();
  }

  @Listen('slotchange')
  handleSlotChange() {
    this.setupButtons();
  }

  @Listen('buttonClick')
  handleButtonClick(event: CustomEvent) {
    const clickedButton = event.target as HTMLModusButtonElement;
    if (this.selectionType === DEFAULT_SELECTION_TYPE) {
      return;
    }

    switch (this.selectionType) {
      case SINGLE_SELECTION_TYPE:
        this.toggleSingleSelect(clickedButton);
        break;
      case MULTIPLE_SELECTION_TYPE:
        this.toggleMultiSelect(clickedButton);
        break;
    }

    this.selectionChange.emit(this.selectedButtons);
    this.buttonGroupClick.emit({ button: clickedButton, isSelected: this.selectedButtons.includes(clickedButton) });
  }

  setupButtons() {
    const buttons = this.host.querySelectorAll('modus-button');
    this.renderButtons(buttons);
  }

  renderButtons(buttons: NodeListOf<HTMLModusButtonElement>) {
    const buttonType = this.determineButtonType();
    buttons.forEach((button: HTMLModusButtonElement) => {
      button.disabled = this.disabled;
      button.buttonStyle = this.buttonStyle;
      button.color = this.color;
      button.size = this.size;
      button.type = buttonType;
    });
  }

  determineButtonType(): ButtonType {
    return this.selectionType === DEFAULT_SELECTION_TYPE ? 'button' : 'toggle';
  }

  toggleMultiSelect(clickedButton: HTMLModusButtonElement) {
    const isSelected = this.selectedButtons.includes(clickedButton);
    clickedButton.setActive(!isSelected);
    this.selectedButtons = isSelected
      ? this.selectedButtons.filter((button) => button !== clickedButton)
      : [...this.selectedButtons, clickedButton];
  }

  toggleSingleSelect(clickedButton: HTMLModusButtonElement) {
    const wasActive = this.selectedButtons.includes(clickedButton);
    this.selectedButtons.forEach((button) => button.setActive(false));
    this.selectedButtons = wasActive ? [] : [clickedButton];
    if (!wasActive) clickedButton.setActive(true);
  }

  render() {
    return (
      <Host aria-label={this.ariaLabel} aria-disabled={this.disabled}>
        <slot />
      </Host>
    );
  }
}

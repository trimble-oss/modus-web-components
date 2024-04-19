// eslint-disable-next-line
import { Component, h, Prop, Element, Event, EventEmitter, Host, Listen, Watch } from '@stencil/core';
import { ButtonGroupSelectionType } from './modus-button-group.models';
import { DEFAULT_SELECTION_TYPE, SINGLE_SELECTION_TYPE, MULTIPLE_SELECTION_TYPE } from './modus-button-group.constants';
import { ButtonColor, ButtonSize, ButtonStyle, ButtonType } from '../modus-button/modus-button.models';

@Component({
  tag: 'modus-button-group',
  styleUrl: 'modus-button-group.scss',
  shadow: true,
})
export class ModusButtonGroup {
  /** Array to store selected buttons */
  selectedButtons: HTMLModusButtonElement[] = [];

  @Element() host: HTMLElement;

  /** (optional) The button group's aria-disabled state. */
  @Prop() ariaDisabled: string | null;

  /** (optional) The button group's aria-label. */
  @Prop() ariaLabel: string;

  /** (optional) The style of the buttons in the group */
  @Prop() buttonStyle: ButtonStyle = 'outline';

  /** (optional) The color of the buttons in the group */
  @Prop() color: ButtonColor = 'primary';

  /** (optional) Disables the button group. */
  @Prop({ reflect: true }) disabled: boolean;

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
  protected disabledChanged(): void {
    this.setupButtons(true);
  }

  @Watch('buttonStyle')
  @Watch('color')
  @Watch('size')
  protected sizeChanged(): void {
    this.setupButtons();
  }

  /** Event emitted when a button is clicked */
  @Event() buttonGroupClick: EventEmitter<unknown>;

  /** Event emitted when the selection changes */
  @Event() buttonSelectionChange: EventEmitter<HTMLModusButtonElement[]>;

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

    this.buttonSelectionChange.emit(this.selectedButtons);
    this.buttonGroupClick.emit({ button: clickedButton, isSelected: this.selectedButtons.includes(clickedButton) });
  }

  setupButtons(reset?: boolean) {
    const buttons = this.host.querySelectorAll('modus-button');
    this.renderButtons(buttons, reset);
  }

  renderButtons(buttons: NodeListOf<HTMLModusButtonElement>, reset: boolean) {
    const buttonType = this.determineButtonType();
    buttons.forEach((button: HTMLModusButtonElement) => {
      if (reset) {
        button.ariaDisabled = this.ariaDisabled;
        button.disabled = this.disabled;
      } else {
        button.ariaDisabled = button.ariaDisabled || this.ariaDisabled;
        button.disabled = button.disabled || this.disabled;
      }

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
      <Host
        aria-label={this.ariaLabel}
        aria-disabled={this.ariaDisabled ? this.ariaDisabled : this.disabled ? 'true' : undefined}>
        <slot />
      </Host>
    );
  }
}

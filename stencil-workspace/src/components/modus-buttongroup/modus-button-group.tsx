// eslint-disable-next-line
import { Component, h, Prop, Element, Event, EventEmitter, State } from '@stencil/core';
import {
  ButtonGroupStyle,
  ButtonGroupButtonPosition,
  ButtonGroupSelectionType,
  ButtonGroupVariant,
} from './modus-button-group.models';
import {
  OUTLINE_STYLE,
  FILL_STYLE,
  PRIMARY_VARIANT,
  DEFAULT_SELECT__TYPE,
  LEFT_BUTTON_POSITION,
  RIGHT_BUTTON_POSITION,
  CENTER_BUTTON_POSITION,
} from './modus-button-group.constants';
@Component({
  tag: 'modus-button-group',
  styleUrl: 'modus-button-group.scss',
  shadow: true,
})
export class ModusButtonGroup {
  /** (optional) The style of the button */
  @Prop() groupStyle: ButtonGroupStyle = FILL_STYLE;

  /**(optional) The selection type of button */
  @Prop() selectionType: ButtonGroupSelectionType = DEFAULT_SELECT__TYPE;

  /** (optional) The color of the button */
  @Prop() variant: ButtonGroupVariant = PRIMARY_VARIANT;

  /** (optional) An event that fires on button click. */
  @Event() groupClick: EventEmitter;

  @Element() host: HTMLElement;

  @State() buttonPosition: ButtonGroupButtonPosition = CENTER_BUTTON_POSITION;

  @State() pressedButtons: Set<number> = new Set();

  @State() selectedIndex = -1;

  private handleClick(id: number): void {
    this.selectedIndex = id;
    this.groupClick.emit(id);
  }
  renderButtons() {
    {
      return Array.from(this.host.children).map((child, id, items) => {
        if (items.length > 1) {
          if (id == 0) {
            this.buttonPosition = LEFT_BUTTON_POSITION;
          }
          if (id == items.length - 1) {
            this.buttonPosition = RIGHT_BUTTON_POSITION;
          }
          if (id > 0 && id < items.length - 1) {
            this.buttonPosition = CENTER_BUTTON_POSITION;
          }
        } else {
          this.buttonPosition = null;
        }
        const className = `modus-button ${this.groupStyle == OUTLINE_STYLE ? OUTLINE_STYLE : ''}`;
        return (
          <modus-button
            tabIndex={0}
            class={className}
            color={this.variant}
            button-position={this.buttonPosition}
            button-style={this.groupStyle}
            onClick={() => this.handleClick(id)}
            toggleable={this.selectionType == 'single' ? id == this.selectedIndex : false}>
            {child.textContent}
          </modus-button>
        );
      });
    }
  }
  render() {
    return <div class="modus-buttongroup">{this.renderButtons()}</div>;
  }
}

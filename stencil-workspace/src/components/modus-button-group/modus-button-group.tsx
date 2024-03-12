import { Component, Host, h, Element, Listen } from '@stencil/core';

@Component({
  tag: 'modus-button-group',
  styleUrl: 'modus-button-group.scss',
  shadow: true,
})
export class ModusButtonGroup {
  @Element() host: HTMLElement;

  componentWillLoad() {
    const buttons = this.host.querySelectorAll('modus-button');
    buttons.forEach((button: HTMLModusButtonElement) => {
      button.buttonStyle = 'outline'; // Force buttonStyle to 'outline'
    });
  }

  @Listen('slotchange')
  handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement; // Get the slot from the event target
    const buttons = slot.assignedElements({ flatten: true }).filter((el) => el.tagName === 'modus-button');
    buttons.forEach((button: HTMLModusButtonElement) => {
      button.buttonStyle = 'outline';
    });
  }

  render() {
    return (
      <Host>
        <div class="button-group">
          <slot></slot>
        </div>
      </Host>
    );
  }
}

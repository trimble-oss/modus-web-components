// eslint-disable-next-line
import { Component, h, Prop, Element, Host, Listen } from '@stencil/core';
@Component({
  tag: 'modus-button-group',
  styleUrl: 'modus-button-group.scss',
  shadow: true,
})
export class ModusButtonGroup {
  /** (optional) The button's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Disables the button. */
  @Prop() disabled: boolean;

  @Element() host: HTMLElement;

  componentWillLoad() {
    const buttons = this.host.querySelectorAll('modus-button');
    buttons.forEach((button: HTMLModusButtonElement) => {
      button.disabled = this.disabled;
      button.type = 'toggle';
      button.buttonStyle = 'outline';
    });
  }

  @Listen('slotchange')
  handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const buttons = slot.assignedElements({ flatten: true }).filter((el) => el.tagName === 'modus-button');
    buttons.forEach((button: HTMLModusButtonElement) => {
      button.disabled = this.disabled;
      button.buttonStyle = 'outline';
      button.type = 'toggle';
    });
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

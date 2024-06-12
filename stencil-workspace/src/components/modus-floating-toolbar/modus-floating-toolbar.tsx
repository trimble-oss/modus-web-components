// eslint-disable-next-line
import { Component, h, Element, Prop, Host } from '@stencil/core';

@Component({
  tag: 'modus-floating-toolbar',
  styleUrl: 'modus-floating-toolbar.scss',
  shadow: true,
})
export class ModusFloatingToolbar {
  /** (optional) The button's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Disables the button. */
  @Prop() disabled: boolean;

  @Element() host: HTMLElement;

  renderButtons() {
    const children = Array.from(this.host.children);
    const buttons = children.map((child) => {
      if (child.tagName === 'MODUS-BUTTON') {
        const className = 'modus-button';
        const iconOnly = child.getAttribute('icon-only');
        const label = child.textContent ? child.textContent.trim() : '';

        return (
          <modus-button
            button-style="borderless"
            color="secondary"
            class={className}
            disabled={this.disabled}
            icon-only={iconOnly}>
            {label}
          </modus-button>
        );
      } else {
        return <modus-divider></modus-divider>;
      }
    });

    return buttons;
  }

  render() {
    return (
      <Host aria-label={this.ariaLabel || undefined} role="toolbar">
        {this.renderButtons()}
      </Host>
    );
  }
}

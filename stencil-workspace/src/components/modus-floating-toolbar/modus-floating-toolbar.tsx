import { Component, h, Element, Prop } from '@stencil/core';

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

  /** (optional) Tab Index for the button */
  @Prop({ mutable: true }) tabIndexValue = 0;

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
            aria-disabled={this.disabled ? 'true' : undefined}
            aria-label={this.ariaLabel}
            class={className}
            disabled={this.disabled}
            color="secondary"
            icon-only={iconOnly}
            button-style="borderless">
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
    return <div class="modus-floating-toolbar">{this.renderButtons()}</div>;
  }
}

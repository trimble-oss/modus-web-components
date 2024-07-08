// eslint-disable-next-line
import { Component, h, Element, Prop, Host } from '@stencil/core';
import { ModusToolTipPlacement } from '../modus-tooltip/modus-tooltip.models';

@Component({
  tag: 'modus-toolbar',
  styleUrl: 'modus-toolbar.scss',
  shadow: true,
})
export class ModusToolbar {
  /** (optional) The button's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Disables the button. */
  @Prop() disabled: boolean;

  @Element() host: HTMLElement;

  createButton(child: Element) {
    const className = 'modus-button';
    const iconOnly = child.getAttribute('icon-only');
    const ariaLabel = child.getAttribute('aria-label') || 'button';
    const label = child.textContent ? child.textContent.trim() : '';

    return (
      <modus-button
        ariaLabel={ariaLabel}
        button-style="borderless"
        color="secondary"
        class={className}
        disabled={this.disabled}
        icon-only={iconOnly}>
        {label}
      </modus-button>
    );
  }

  renderButtons() {
    const children = Array.from(this.host.children);
    const buttons = children.map((child) => {
      if (child.tagName === 'MODUS-BUTTON') {
        return this.createButton(child);
      } else if (child.tagName === 'MODUS-TOOLTIP') {
        const tooltipChild = child.children[0];
        const tooltipText = child.getAttribute('text');
        const tooltipPosition = child.getAttribute('position') as ModusToolTipPlacement;

        if (tooltipChild && tooltipChild.tagName === 'MODUS-BUTTON') {
          return (
            <modus-tooltip text={tooltipText} position={tooltipPosition}>
              {this.createButton(tooltipChild)}
            </modus-tooltip>
          );
        }
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

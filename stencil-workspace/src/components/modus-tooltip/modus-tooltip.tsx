// eslint-disable-next-line
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'modus-tooltip',
  styleUrl: 'modus-tooltip.scss',
  shadow: true,
})
export class ModusTooltip {
  /** (optional) The tooltip's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The tooltip's position relative to its content. */
  @Prop() position: 'bottom' | 'left' | 'right' | 'top' = 'top';

  /** The tooltip's text. */
  @Prop() text: string;

  /** Hide the tooltip */
  @Prop() disabled: boolean;

  render(): unknown {
    const className = `modus-tooltip ${this.position}`;
    const showTooltip = !this.disabled && this.text;
    return (
      <div class={className}>
        <slot />
        {showTooltip && (
          <div aria-label={this.ariaLabel} class={'text'} role="tooltip">
            {this.text}
          </div>
        )}
      </div>
    );
  }
}

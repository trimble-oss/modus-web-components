// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-card',
  styleUrl: 'modus-card.scss',
  shadow: true,
})
export class ModusCard {
  /** (optional) The card's aria-label. */
  @Prop() ariaLabel: string;

  /** (optional) The height of the card. */
  @Prop() height = '269px';

  /** (optional) The width of the card. */
  @Prop() width = '240px';
  @Prop() backgroundColor: string;
  @Prop() borderRadius: string;
  @Prop() showCardBorder = true;
  @Prop() showShadowHover = true;

  render(): unknown {
    return (
      <article
        class={`${this.showShadowHover ? 'shadow' : ''} ${this.showCardBorder ? 'card-border' : ''}  `}
        aria-label={this.ariaLabel}
        style={{
          'height': this.height,
          'width': this.width,
          'background-color': this.backgroundColor,
          'border-radius': this.borderRadius,
        }}>
        <slot />
      </article>
    );
  }
}

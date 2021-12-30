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

  render(): unknown {
    return (
      <article aria-label={this.ariaLabel} style={{'height': this.height, 'width': this.width}}>
        <slot />
      </article>
    );
  }
}

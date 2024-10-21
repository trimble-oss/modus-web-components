// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-card',
  styleUrl: 'modus-card.scss',
  shadow: true,
})
export class ModusCard {
  /** (optional) The card's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The height of the card. */
  @Prop() height = '269px';

  /** (optional) The width of the card. */
  @Prop() width = '240px';

  /** (optional) The border radius of the card. */
  @Prop() borderRadius: string;

  /** (optional) A flag that controls the display of border. */
  @Prop() showCardBorder = true;

  /** (optional) A flag that controls the display of shadow box when the element is hovered. */
  @Prop() showShadowOnHover = true;

  render(): unknown {
    return (
      <article
        class={`${this.showShadowOnHover ? 'shadow' : ''} ${this.showCardBorder ? 'card-border' : ''}  `}
        aria-label={this.ariaLabel || undefined}
        style={{
          height: this.height,
          width: this.width,
          'border-radius': this.borderRadius,
        }}>
        <slot />
      </article>
    );
  }
}

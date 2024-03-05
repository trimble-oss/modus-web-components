// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'modus-accordion',
  styleUrl: 'modus-accordion.scss',
  shadow: true,
})
export class ModusAccordion {
  /** (optional) The accordion's aria-label. */
  @Prop() ariaLabel: string | null;

  render(): unknown {
    return (
      <div aria-label={this.ariaLabel} class="accordion">
        <slot />
      </div>
    );
  }
}

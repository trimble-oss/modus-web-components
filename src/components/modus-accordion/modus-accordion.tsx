// eslint-disable-next-line
import { Component, h } from '@stencil/core';

@Component({
  tag: 'modus-accordion',
  styleUrl: 'modus-accordion.scss',
  shadow: true,
})
export class ModusAccordion {
  render(): unknown {
    return (
      <div class="accordion">
        <slot />
      </div>
    );
  }
}

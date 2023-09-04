// eslint-disable-next-line
import { Component, h } from '@stencil/core';

@Component({
  tag: 'modus-list',
  styleUrl: 'modus-list.scss',
  shadow: true,
})
export class ModusList {
  render(): unknown {
    return (
      <ul part="list-items">
        <slot />
      </ul>
    );
  }
}

import { Component, h } from '@stencil/core';

@Component({
  tag: 'modus-divider',
  styleUrl: 'modus-divider.scss',
  shadow: true,
})
export class ModusDivider {
  render() {
    return <div class="modus-divider"></div>;
  }
}

// eslint-disable-next-line
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'modus-list',
  styleUrl: 'modus-list.scss',
  shadow: true,
})
export class ModusList {
  @Prop() fixed : boolean;
  render(): unknown {
    return (
      <ul class={`${this.fixed && 'fixed'}`}>
        <slot />
      </ul>
    );
  }
}

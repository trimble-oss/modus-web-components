// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-navbar-add-menu',
  styleUrl: 'modus-navbar-add-menu.scss',
  shadow: true,
})
export class ModusNavbarAddMenu {
  @Prop() reverse: boolean;

  render(): unknown {
    const direction = this.reverse ? 'reverse' : '';

    return (
      <div class={`add-menu ${direction}`} onClick={(event) => event.preventDefault()}>
        <div class="title">Items</div>
        <slot />
      </div>
    );
  }
}

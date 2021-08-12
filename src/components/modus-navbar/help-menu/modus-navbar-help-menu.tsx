// eslint-disable-next-line
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'modus-navbar-help-menu',
  styleUrl: 'modus-navbar-help-menu.scss',
  shadow: true,
})
export class ModusNavbarHelpMenu {
  @Prop() reverse: boolean;

  render(): unknown {
    const direction = this.reverse ? 'reverse' : '';

    return (
      <div class={`help-menu ${direction}`} onClick={(event) => event.preventDefault()}>
        <div class="title">Help</div>
        <slot />
      </div>
    );
  }
}

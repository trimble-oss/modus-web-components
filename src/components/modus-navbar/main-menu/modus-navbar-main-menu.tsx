// eslint-disable-next-line
import { Component, h } from '@stencil/core';

@Component({
  tag: 'modus-navbar-main-menu',
  styleUrl: 'modus-navbar-main-menu.scss',
  shadow: true,
})
export class ModusNavbarMainMenu {
  render(): unknown {
    return (
      <div class={'main-menu'} onClick={(event) => event.preventDefault()}>
        <slot />
      </div>
    );
  }
}

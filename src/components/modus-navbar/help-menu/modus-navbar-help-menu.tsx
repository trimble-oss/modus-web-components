// eslint-disable-next-line
import { Component, h } from '@stencil/core';

@Component({
  tag: 'modus-navbar-help-menu',
  styleUrl: 'modus-navbar-help-menu.scss',
  shadow: true,
})
export class ModusNavbarHelpMenu {
  render(): unknown {
    return (
      <div class="help-menu" onClick={(event) => event.preventDefault()}>
        <div class="title">Help</div>
        <slot />
      </div>
    );
  }
}

// eslint-disable-next-line
import { Component, h } from '@stencil/core';

@Component({
  tag: 'modus-navbar-notifications-menu',
  styleUrl: 'modus-navbar-notifications-menu.scss',
  shadow: true,
})
export class ModusNavbarNotificationsMenu {
  render(): unknown {
    return (
      <div class="notifications-menu" onClick={(event) => event.preventDefault()}>
        <div class="title">Notifications</div>
        <slot />
      </div>
    );
  }
}

// eslint-disable-next-line
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'modus-floating-navbar-notifications-menu',
  styleUrl: 'modus-floating-navbar-notifications-menu.scss',
  shadow: true,
})
export class ModusFloatingNavbarNotificationsMenu {
  @Prop() reverse: boolean;

  render(): unknown {
    const direction = this.reverse ? 'reverse' : '';

    return (
      <div class={`notifications-menu ${direction}`} onClick={(event) => event.preventDefault()}>
        <div class="title">Notifications</div>
        <slot />
      </div>
    );
  }
}

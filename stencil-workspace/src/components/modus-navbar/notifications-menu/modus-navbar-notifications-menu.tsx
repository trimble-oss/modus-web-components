// eslint-disable-next-line
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'modus-navbar-notifications-menu',
  styleUrl: 'modus-navbar-notifications-menu.scss',
  shadow: true,
})
export class ModusNavbarNotificationsMenu {
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

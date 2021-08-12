// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'modus-navbar-profile-menu',
  styleUrl: 'modus-navbar-profile-menu.scss',
  shadow: true,
})
export class ModusNavbarProfileMenu {
  @Prop() avatarUrl: string;
  @Prop() email: string;
  @Prop() initials: string;
  @Prop() reverse: boolean;
  @Prop() username: string;

  @Event() signOutClick: EventEmitter<MouseEvent>;

  @Listen('buttonClick')
  signOutClickHandler(event: MouseEvent): void {
    this.signOutClick.emit(event);
  }

  render(): unknown {
    const direction = this.reverse ? 'reverse' : '';

    return (
      <div class={`profile-menu ${direction}`} onClick={(event) => event.preventDefault()}>
        {this.avatarUrl ?
          <img class="avatar" height="64" src={this.avatarUrl} alt="Profile avatar" />
        : <span class="initials">{this.initials}</span>}
        <div class="username">{this.username}</div>
        <div class="email">{this.email}</div>
        <modus-button button-style="borderless">Sign out</modus-button>
      </div>
    );
  }
}

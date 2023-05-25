// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

export interface ModusNavbarProfileMenuLink {
  display: string;
  id: string;
}

@Component({
  tag: 'modus-navbar-profile-menu',
  styleUrl: 'modus-navbar-profile-menu.scss',
  shadow: true,
})
export class ModusNavbarProfileMenu {
  @Prop() avatarUrl: string;
  @Prop() email: string;
  @Prop() initials: string;
  @Prop() links: ModusNavbarProfileMenuLink[];
  @Prop() reverse: boolean;
  @Prop() username: string;
  @Prop() variant: 'default' | 'blue' = 'default';

  @Event() linkClick: EventEmitter<string>;
  @Event() signOutClick: EventEmitter<MouseEvent>;

  render(): unknown {
    const direction = this.reverse ? 'reverse' : '';
    const variant = this.variant === 'default' ? '' : `profile-menu-${this.variant}`;

    return (
      <div class={`profile-menu ${direction} ${variant}`} onClick={(event) => event.preventDefault()}>
        <div class="user">
          {this.avatarUrl ? (
            <img class="avatar" src={this.avatarUrl} alt="Avatar" />
          ) : (
            <span class="initials">{this.initials}</span>
          )}
          <div>
            <div class="username">{this.username}</div>
            <div class="email">{this.email}</div>
          </div>
        </div>
        {this.links?.length ? (
          <div class="links">
            {this.links.map((link) => {
              return (
                <div class="link" onClick={() => this.linkClick.emit(link.id)}>
                  {link.display}
                </div>
              );
            })}
          </div>
        ) : null}
        <div class="sign-out" onClick={() => this.signOutClick.emit()}>
          <div>Sign out</div>
        </div>
      </div>
    );
  }
}

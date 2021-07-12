// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, State, Listen } from '@stencil/core';
import { IconMenu } from '../icons/icon-menu';
import { IconNotifications } from '../icons/icon-notifications';
import { IconHelp } from '../icons/icon-help';
import { IconApps } from '../icons/icon-apps';
import { IconSearch } from '../icons/icon-search';

@Component({
  tag: 'modus-navbar',
  styleUrl: 'modus-navbar.scss',
  shadow: true,
})
export class ModusNavbar {
  /** (optional) Whether to show the apps menu. */
  @Prop() showAppsMenu: boolean;

  /** (optional) Whether to show the help menu. */
  @Prop() showHelpMenu: boolean;

  /** (optional) Whether to show the main menu. */
  @Prop() showMainMenu: boolean;

  /** (optional) Whether to show notifications. */
  @Prop() showNotifications: boolean;

  /** (optional) Whether to show search. */
  @Prop() showSearch: boolean;

  /** (required) Product logo options. */
  @Prop() productLogoOptions: { url: string };

  /** (required) Profile menu options. */
  @Prop() profileMenuOptions: { avatarUrl?: string, email?: string, initials?: string, username: string };

  /** An event that fires on product logo click. */
  @Event() productLogoClick: EventEmitter<MouseEvent>;

  /** An event that fires on profile menu sign out click. */
  @Event() profileMenuSignOutClick: EventEmitter<MouseEvent>;

  @State() profileMenuVisible: boolean;

  @Listen('click', { target: 'document' })
  documentClickHandler(event: MouseEvent): void {
    // Individual menus can prevent this listener from closing them.
    if (event.defaultPrevented) { return; }

    this.profileMenuVisible = false;
  }

  @Listen('signOutClick')
  signOutClickHandler(event: MouseEvent): void {
    this.profileMenuSignOutClick.emit(event);
  }

  profileMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();
    this.profileMenuVisible = !this.profileMenuVisible;
  }

  render(): unknown {
    return (
      <nav>
        <div class="left">
          {this.showMainMenu ? <IconMenu size="24" /> : null}
          <img class="product-logo" height="24" src={this.productLogoOptions?.url} alt="Modus navbar product logo" onClick={(event) => this.productLogoClick.emit(event)} />
        </div>
        <div class="right">
          {this.showSearch ?
            <div class="search">
              <IconSearch size="24" />
            </div>
            : null}
          {this.showNotifications ? <IconNotifications size="24" /> : null}
          {this.showHelpMenu ? <IconHelp size="24" /> : null}
          {this.showAppsMenu ? <IconApps size="24" /> : null}
          <div class="profile-menu">
            {this.profileMenuOptions?.avatarUrl ?
              <img class="avatar" height="32" src={this.profileMenuOptions?.avatarUrl} alt="Modus navbar profile menu avatar" onClick={(event) => this.profileMenuClickHandler(event)} />
            : <span class="initials" onClick={(event) => this.profileMenuClickHandler(event)}>{this.profileMenuOptions?.initials}</span>}
            {this.profileMenuVisible ?
              <modus-navbar-profile-menu
                avatar-url={this.profileMenuOptions?.avatarUrl}
                email={this.profileMenuOptions?.email}
                initials={this.profileMenuOptions?.initials}
                username={this.profileMenuOptions?.username} />
            : null}
          </div>
        </div>
      </nav>
    );
  }
}

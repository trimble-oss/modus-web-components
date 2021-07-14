// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, State, Listen } from '@stencil/core';
import { IconMenu } from '../icons/icon-menu';
import { IconNotifications } from '../icons/icon-notifications';
import { IconHelp } from '../icons/icon-help';
import { IconApps } from '../icons/icon-apps';
import { IconSearch } from '../icons/icon-search';
import { App } from './apps-menu/modus-navbar-apps-menu';

@Component({
  tag: 'modus-navbar',
  styleUrl: 'modus-navbar.scss',
  shadow: true,
})
export class ModusNavbar {
  /** (optional) The apps to render in the apps menu. */
  @Prop() apps: App[];

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

  @State() appsMenuVisible: boolean;
  @State() helpMenuVisible: boolean;
  @State() notificationsMenuVisible: boolean;
  @State() profileMenuVisible: boolean;

  @Listen('click', { target: 'document' })
  documentClickHandler(event: MouseEvent): void {
    // Individual menus can prevent this listener from closing them.
    if (event.defaultPrevented) { return; }
    this.hideMenus();
  }

  @Listen('signOutClick')
  signOutClickHandler(event: MouseEvent): void {
    this.profileMenuSignOutClick.emit(event);
  }

  appsMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();

    if (this.appsMenuVisible) {
      this.appsMenuVisible = false;
    } else {
      this.hideMenus();
      this.appsMenuVisible = true;
    }
  }

  helpMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();

    if (this.helpMenuVisible) {
      this.helpMenuVisible = false;
    } else {
      this.hideMenus();
      this.helpMenuVisible = true;
    }
  }

  notificationsMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();

    if (this.notificationsMenuVisible) {
      this.notificationsMenuVisible = false;
    } else {
      this.hideMenus();
      this.notificationsMenuVisible = true;
    }
  }

  profileMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();

    if (this.profileMenuVisible) {
      this.profileMenuVisible = false;
    } else {
      this.hideMenus();
      this.profileMenuVisible = true;
    }
  }

  private hideMenus(): void {
    this.appsMenuVisible = false;
    this.helpMenuVisible = false;
    this.notificationsMenuVisible = false;
    this.profileMenuVisible = false;
  }

  render(): unknown {
    return (
      <nav>
        <div class="left">
          {this.showMainMenu ?
            <div class="navbar-button">
              <IconMenu size="24" />
            </div>
            : null}
          <img class="product-logo" height="24" src={this.productLogoOptions?.url} alt="Modus navbar product logo" onClick={(event) => this.productLogoClick.emit(event)} />
        </div>
        <div class="right">
          {this.showSearch ?
            <div class="navbar-button search">
              <IconSearch size="24" />
            </div>
            : null}
          {this.showNotifications ?
            <div class="navbar-button">
              <IconNotifications size="24" onClick={(event) => this.notificationsMenuClickHandler(event)} />
              {this.notificationsMenuVisible ? <modus-navbar-notifications-menu><slot name="notifications"></slot></modus-navbar-notifications-menu> : null}
            </div>
            : null}
          {this.showHelpMenu ?
            <div class="navbar-button">
              <IconHelp size="24" onClick={(event) => this.helpMenuClickHandler(event)} />
              {this.helpMenuVisible ? <modus-navbar-help-menu><slot name="help"></slot></modus-navbar-help-menu> : null}
            </div>
            : null}
          {this.showAppsMenu ?
            <div class="navbar-button">
              <IconApps size="24" onClick={(event) => this.appsMenuClickHandler(event)} />
              {this.appsMenuVisible ? <modus-navbar-apps-menu apps={this.apps} /> : null}
            </div>
            : null}
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

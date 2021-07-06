// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
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
              <img class="avatar" height="32" src={this.profileMenuOptions?.avatarUrl} alt="Modus navbar profile menu avatar" />
            : <span class="initials">{this.profileMenuOptions?.initials}</span>}
          </div>
        </div>
      </nav>
    );
  }
}

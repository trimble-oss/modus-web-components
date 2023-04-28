import {
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Component,
  Prop,
  Event,
  EventEmitter,
  State,
  Listen,
  Method,
  Element,
} from '@stencil/core';
import { IconMenu } from '../icons/icon-menu';
import { IconNotifications } from '../icons/icon-notifications';
import { IconApps } from '../icons/icon-apps';
import { IconSearch } from '../icons/icon-search';
import { ModusNavbarApp } from './apps-menu/modus-navbar-apps-menu';
import { IconHelp } from '../icons/icon-help';
import { ModusNavbarProfileMenuLink } from './profile-menu/modus-navbar-profile-menu';
import { IconAdd } from '../icons/icon-add';

/**
 * @slot main - Renders custom main menu content
 * @slot notifications - Renders custom notifications content
 */

@Component({
  tag: 'modus-navbar',
  styleUrl: 'modus-navbar.scss',
  shadow: true,
})
export class ModusNavbar {
  @Element() element: HTMLElement;

  /** (optional) The apps to render in the apps menu. */
  @Prop() apps: ModusNavbarApp[];

  /** (required) Product logo options. */
  @Prop() productLogoOptions: { height?: string; url: string };

  /** (required) Profile menu options. */
  @Prop({ mutable: true }) profileMenuOptions: {
    avatarUrl?: string;
    email?: string;
    initials?: string;
    links?: ModusNavbarProfileMenuLink[];
    username: string;
  };

  /** (optional) Whether to display the navbar items in reverse order. */
  @Prop() reverse: boolean;

  /** (optional) Whether to show add. */
  @Prop() showAdd: boolean;

  /** (optional) Whether to show the apps menu. */
  @Prop() showAppsMenu: boolean;

  /** (optional) Whether to show the main menu. */
  @Prop() showMainMenu: boolean;

  /** (optional) Whether to show notifications. */
  @Prop() showNotifications: boolean;

  /** (optional) Whether to show the placeholder for Pendo. */
  @Prop() showPendoPlaceholder: boolean;

  /** (optional) Whether to show search. */
  @Prop() showSearch: boolean;

  /** (optional) Whether to show a shadow under the navbar. */
  @Prop() showShadow: boolean;

  /** (optional) Whether to show help. */
  @Prop() showHelp: boolean;

  /** (optional) Help URL. */
  @Prop() helpUrl: string;

  /** (optional) Color variants for NavBar. */
  @Prop() variant: 'default' | 'blue' = 'default';

  /** An event that fires when the add menu opens. */
  @Event() addMenuOpen: EventEmitter<void>;

  /** An event that fires when the apps menu opens. */
  @Event() appsMenuOpen: EventEmitter<void>;

  /** An event that fires when an apps menu app opens. */
  @Event() appsMenuAppOpen: EventEmitter<ModusNavbarApp>;

  /** An event that fires when the help link opens. */
  @Event() helpOpen: EventEmitter<void>;

  /** An event that fires on main menu click. */
  @Event() mainMenuClick: EventEmitter<KeyboardEvent | MouseEvent>;

  /** An event that fires when the notifications menu opens. */
  @Event() notificationsMenuOpen: EventEmitter<void>;

  /** An event that fires on product logo click. */
  @Event() productLogoClick: EventEmitter<MouseEvent>;

  /** An event that fires on profile menu link click. */
  @Event() profileMenuLinkClick: EventEmitter<string>;

  /** An event that fires when the profile menu opens. */
  @Event() profileMenuOpen: EventEmitter<void>;

  /** An event that fires on profile menu sign out click. */
  @Event() profileMenuSignOutClick: EventEmitter<MouseEvent>;

  @Method()
  async hideMainMenu() {
    this.mainMenuVisible = false;
  }

  @State() addMenuVisible: boolean;
  @State() appsMenuVisible: boolean;
  @State() mainMenuVisible: boolean;
  @State() notificationsMenuVisible: boolean;
  @State() profileMenuVisible: boolean;
  @State() slots: string[] = [];

  readonly SLOT_ADD = 'add';
  readonly SLOT_MAIN = 'main';
  readonly SLOT_NOTIFICATIONS = 'notifications';

  profileAvatarElement: HTMLImageElement;

  @Listen('click', { target: 'document' })
  documentClickHandler(event: MouseEvent): void {
    // Individual menus can prevent this listener from closing them.
    if (event.defaultPrevented) {
      return;
    }
    this.hideMenus();
  }

  @Listen('linkClick')
  linkClickHandler(linkClickEvent: CustomEvent<string>): void {
    linkClickEvent.stopPropagation();
    this.profileMenuLinkClick.emit(linkClickEvent.detail);
  }

  @Listen('signOutClick')
  signOutClickHandler(event: MouseEvent): void {
    this.profileMenuSignOutClick.emit(event);
  }

  componentDidRender(): void {
    // If there is an error loading the avatar image, remove it so that the initials show.
    this.profileAvatarElement?.addEventListener('error', () => {
      this.profileMenuOptions = {
        ...this.profileMenuOptions,
        avatarUrl: null,
      };
    });

    const slotElements = this.element.querySelectorAll(
      '[slot]'
    ) as unknown as HTMLSlotElement[];
    const slotNames = Array.from(slotElements).map((s) => s.slot) || [];

    const isUpdated =
      this.slots?.length !== slotNames.length ||
      this.slots?.filter((s) => !slotNames.includes(s)).length;
    if (isUpdated) this.slots = [...slotNames];
  }

  addMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();
    this.addMenuToggle();
  }

  addMenuKeydownHandler(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }
    this.addMenuToggle();
  }

  addMenuToggle(): void {
    if (this.addMenuVisible) {
      this.addMenuVisible = false;
    } else {
      this.hideMenus();
      this.addMenuVisible = true;
      this.addMenuOpen.emit();
    }
  }

  appsMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();
    this.appsMenuToggle();
  }

  appsMenuKeydownHandler(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }
    this.appsMenuToggle();
  }

  appsMenuToggle(): void {
    if (this.appsMenuVisible) {
      this.appsMenuVisible = false;
    } else {
      this.hideMenus();
      this.appsMenuVisible = true;
      this.appsMenuOpen.emit();
    }
  }

  handleAppsMenuAppOpen(event: CustomEvent<ModusNavbarApp>) {
    event.stopPropagation();
    this.appsMenuAppOpen.emit(event.detail);
  }

  mainMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();
    this.mainMenuToggle(event);
  }

  mainMenuKeydownHandler(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }
    this.mainMenuToggle(event);
  }

  mainMenuToggle(event: KeyboardEvent | MouseEvent): void {
    if (this.slots?.includes(this.SLOT_MAIN)) {
      if (this.mainMenuVisible) {
        this.mainMenuVisible = false;
      } else {
        this.hideMenus();
        this.mainMenuVisible = true;
      }
    }

    this.mainMenuClick.emit(event);
  }

  notificationsMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();
    this.notificationsMenuToggle();
  }

  notificationsMenuKeydownHandler(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }
    this.notificationsMenuToggle();
  }

  notificationsMenuToggle(): void {
    if (this.notificationsMenuVisible) {
      this.notificationsMenuVisible = false;
    } else {
      this.hideMenus();
      this.notificationsMenuVisible = true;
      this.notificationsMenuOpen.emit();
    }
  }

  profileMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();
    this.profileMenuToggle();
  }

  profileMenuKeydownHandler(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }
    this.profileMenuToggle();
  }

  profileMenuToggle(): void {
    if (this.profileMenuVisible) {
      this.profileMenuVisible = false;
    } else {
      this.hideMenus();
      this.profileMenuVisible = true;
      this.profileMenuOpen.emit();
    }
  }

  private hideMenus(): void {
    this.addMenuVisible = false;
    this.appsMenuVisible = false;
    this.mainMenuVisible = false;
    this.notificationsMenuVisible = false;
    this.profileMenuVisible = false;
  }

  helpMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();
    if (this.helpUrl) window.open(this.helpUrl, '_blank');
    this.helpOpen.emit();
  }

  render(): unknown {
    const direction = this.reverse ? 'reverse' : '';
    const shadow = this.showShadow ? 'shadow' : '';
    const variant = `${this.variant === 'default' ? '' : 'nav-' + this.variant
      }`;
    return (
        <nav class={`${direction} ${shadow} ${variant}`}>
          <div class={`left ${direction}`}>
            {this.showMainMenu && (
              <div class="navbar-button main-menu">
                <span
                  class="navbar-button-icon"
                  onKeyDown={(event) => this.mainMenuKeydownHandler(event)}
                  tabIndex={0}>
                  <IconMenu
                    size="24"
                    pressed={this.mainMenuVisible}
                    onClick={(event) => this.mainMenuClickHandler(event)}
                  />
                </span>
                {this.mainMenuVisible && (
                  <modus-navbar-main-menu>
                    <slot name={this.SLOT_MAIN}></slot>
                  </modus-navbar-main-menu>
                )}
              </div>
            )}
            <img
              class="product-logo"
              height={this.productLogoOptions?.height ?? '24'}
              src={this.productLogoOptions?.url}
              alt="Modus navbar product logo"
              onClick={(event) => this.productLogoClick.emit(event)}
            />
          </div>
          <div class={`right ${direction}`}>
            {this.showSearch && (
              <div class="navbar-button search">
                <span class="navbar-button-icon">
                  <IconSearch size="24" />
                </span>
              </div>
            )}
            {this.showNotifications && (
              <div class="navbar-button" data-test-id="notifications-menu">
                <span
                  class="navbar-button-icon"
                  onKeyDown={(event) =>
                    this.notificationsMenuKeydownHandler(event)
                  }
                  tabIndex={0}>
                  <IconNotifications
                    size="24"
                    onClick={(event) => this.notificationsMenuClickHandler(event)}
                    pressed={this.notificationsMenuVisible}
                  />
                </span>
                {this.notificationsMenuVisible && (
                  <modus-navbar-notifications-menu reverse={this.reverse}>
                    <slot name={this.SLOT_NOTIFICATIONS}></slot>
                  </modus-navbar-notifications-menu>
                )}
              </div>
            )}
            {this.showPendoPlaceholder && <div class={'pendo-placeholder'} />}
            {this.showAdd && (
              <div class="navbar-button" data-test-id="add-menu">
                <span class="navbar-button-icon"  
                  onKeyDown={(event) => this.addMenuKeydownHandler(event)}
                  tabIndex={0}>
                  <IconAdd
                    size="24"
                    onClick={(event) => this.addMenuClickHandler(event)}
                    pressed={this.addMenuVisible}
                  />
                </span>
                {this.addMenuVisible && (
                  <modus-navbar-add-menu reverse={this.reverse}>
                    <slot name={this.SLOT_ADD}></slot>
                  </modus-navbar-add-menu>
                )}
              </div>
            )}
            {this.showHelp && (
              <div class="navbar-button" data-test-id="help-menu">
                <span class="navbar-button-icon">
                  <IconHelp
                    size="24"
                    onClick={(event) => this.helpMenuClickHandler(event)}
                  />
                </span>
              </div>
            )}
            {this.showAppsMenu && (
              <div class="navbar-button" data-test-id="apps-menu">
                <span
                  class="navbar-button-icon"
                  onKeyDown={(event) => this.appsMenuKeydownHandler(event)}
                  tabIndex={0}>
                  <IconApps
                    size="24"
                    pressed={this.appsMenuVisible}
                    onClick={(event) => this.appsMenuClickHandler(event)}
                  />
                </span>
                {this.appsMenuVisible && (
                  <modus-navbar-apps-menu
                    apps={this.apps}
                    reverse={this.reverse}
                    onAppOpen={(event) => this.handleAppsMenuAppOpen(event)}
                  />
                )}
              </div>
            )}
            <div class="profile-menu">
              {this.profileMenuOptions?.avatarUrl ? (
                <img
                  class="avatar"
                  height="32"
                  src={this.profileMenuOptions?.avatarUrl}
                  alt="Modus navbar profile menu avatar"
                  onClick={(event) => this.profileMenuClickHandler(event)}
                  onKeyDown={(event) => this.profileMenuKeydownHandler(event)}
                  tabIndex={0}
                  ref={(el) =>
                    (this.profileAvatarElement = el as HTMLImageElement)
                  }
                />
              ) : (
                <span
                  class="initials"
                  onClick={(event) => this.profileMenuClickHandler(event)}
                  onKeyDown={(event) => this.profileMenuKeydownHandler(event)}
                  tabIndex={0}>
                  {this.profileMenuOptions?.initials}
                </span>
              )}
              {this.profileMenuVisible && (
                <modus-navbar-profile-menu
                  avatar-url={this.profileMenuOptions?.avatarUrl}
                  email={this.profileMenuOptions?.email}
                  initials={this.profileMenuOptions?.initials}
                  links={this.profileMenuOptions?.links}
                  reverse={this.reverse}
                  username={this.profileMenuOptions?.username}
                  variant={this.variant}
                />
              )}
            </div>
          </div>
        </nav>
    );
  }
}

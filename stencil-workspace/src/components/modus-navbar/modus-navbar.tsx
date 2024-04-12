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
  Host,
  Fragment,
} from '@stencil/core';
import { IconMenu } from '../../icons/svgs/icon-menu';
import { IconNotifications } from '../../icons/svgs/icon-notifications';
import { IconApps } from '../../icons/svgs/icon-apps';
import { IconSearch } from '../../icons/svgs/icon-search';
import { ModusNavbarApp } from './apps-menu/modus-navbar-apps-menu';
import { IconHelp } from '../../icons/svgs/icon-help';
import {
  ModusNavbarButton,
  ModusNavbarLogoOptions,
  ModusNavbarTooltip,
  ModusProfileMenuOptions,
} from './modus-navbar.models';
import { ModusNavbarProductLogo } from './product-logo/modus-navbar-product-logo';
import { createGuid } from '../../utils/utils';
import { ModusNavbarButtonList } from './button-list/modus-navbar-button-list';

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

  /** (optional) The buttons to render in the Navbar. */
  @Prop({ mutable: true }) buttons: ModusNavbarButton[];

  /** (optional) Whether to show search overlay or not. */
  @Prop() enableSearchOverlay: boolean;

  /** (optional) Set the primary logo to display when the screen size is greater than 576 pixels, and the secondary logo to display when the screen size is less than or equal to 576 pixels. */
  @Prop() logoOptions: ModusNavbarLogoOptions;

  /** (required) Profile menu options. */
  @Prop({ mutable: true }) profileMenuOptions: ModusProfileMenuOptions;

  /** (optional) Whether to display the navbar items in reverse order. */
  @Prop() reverse: boolean;

  /** (optional) Search tooltip. */
  @Prop() searchTooltip: ModusNavbarTooltip;

  /** (optional) Whether to show the apps menu. */
  @Prop() showAppsMenu: boolean;

  /** (optional) Whether to show the main menu. */
  @Prop() showMainMenu: boolean;

  /** (optional) Whether to show notifications. */
  @Prop() showNotifications: boolean;

  /** (optional) Whether to show badge on top of notification */
  @Prop() notificationCount: number;

  /** (optional) Whether to show the placeholder for Pendo. */
  @Prop() showPendoPlaceholder: boolean;

  /** (optional) Whether to show profile.  **/
  @Prop() showProfile = true;

  /** (optional) Whether to show search. */
  @Prop() showSearch: boolean;

  /** (optional) Whether to show a shadow under the navbar. */
  @Prop() showShadow: boolean;

  /** (optional) Whether to show help. */
  @Prop() showHelp: boolean;

  /** (optional) Help tooltip. */
  @Prop() helpTooltip: ModusNavbarTooltip;

  /** (optional) Help URL. */
  @Prop() helpUrl: string;

  /** (optional) Color variants for NavBar. */
  @Prop() variant: 'default' | 'blue' = 'default';

  /** An event that fires when the apps menu opens. */
  @Event() appsMenuOpen: EventEmitter<void>;

  /** An event that fires when an apps menu app opens. */
  @Event() appsMenuAppOpen: EventEmitter<ModusNavbarApp>;

  /** An event that fires when a button in the custom button list is clicked. */
  @Event() buttonClick: EventEmitter<string>;

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
  @Event() profileMenuSignOutClick: EventEmitter<KeyboardEvent | MouseEvent>;

  /** An event that fires on search value change. */
  @Event() searchChange: EventEmitter<string>;

  /** An event that fires on search button click. */
  @Event() searchMenuClick: EventEmitter<void>;

  @Method()
  async hideMainMenu() {
    this.mainMenuVisible = false;
  }

  @State() appsMenuVisible: boolean;
  @State() mainMenuVisible: boolean;
  @State() notificationsMenuVisible: boolean;
  @State() profileMenuVisible: boolean;
  @State() slots: string[] = [];
  @State() componentId = createGuid();
  @State() searchOverlayVisible: boolean;
  @State() openButtonMenuId: string;

  readonly SLOT_MAIN = 'main';
  readonly SLOT_NOTIFICATIONS = 'notifications';
  readonly SLOT_PROFILE_MENU = 'profileMenu';

  profileAvatarElement: HTMLImageElement;
  searchButton: HTMLElement;

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
  signOutClickHandler(event: KeyboardEvent | MouseEvent): void {
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

    const slotElements = this.element.querySelectorAll('[slot]') as unknown as HTMLSlotElement[];
    const slotNames = Array.from(slotElements).map((s) => s.slot) || [];
    const isUpdated = this.slots?.length !== slotNames.length || this.slots?.filter((s) => !slotNames.includes(s)).length;
    if (isUpdated) this.slots = [...slotNames];
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
    this.appsMenuVisible = false;
    this.mainMenuVisible = false;
    this.notificationsMenuVisible = false;
    this.profileMenuVisible = false;
    this.openButtonMenuId = undefined;
  }

  helpMenuClickHandler(event: MouseEvent): void {
    event.preventDefault();
    this.openHelpMenu();
  }

  helpMenuKeyHandler(event: KeyboardEvent): void {
    if (event.code !== 'Enter' && event.code !== 'Space') {
      return;
    }
    this.openHelpMenu();
  }

  openHelpMenu(): void {
    if (this.helpUrl) window.open(this.helpUrl, '_blank');
    this.helpOpen.emit();
  }

  searchMenuClickHandler(event: MouseEvent) {
    event.preventDefault();
    if (this.enableSearchOverlay) {
      this.searchOverlayVisible = true;
    } else {
      this.searchMenuClick.emit();
    }
  }

  searchMenuKeydownHandler(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }

    if (this.enableSearchOverlay) {
      this.searchOverlayVisible = true;
    } else {
      this.searchMenuClick.emit();
    }
  }

  searchOverlayCloseEventHandler(): void {
    this.searchOverlayVisible = false;
    setTimeout(() => {
      this.searchButton?.focus();
    }, 100);
  }

  showButtonMenuById(id: string): void {
    this.buttonClick.emit(id);
    const isDynamicButtonSlotOpen = this.openButtonMenuId === id;
    this.hideMenus();
    if (this.openButtonMenuId !== id && !isDynamicButtonSlotOpen) {
      this.openButtonMenuId = id;
    }
  }

  buttonMenuClickHandler(event: MouseEvent, button: ModusNavbarButton): void {
    event.preventDefault();
    this.showButtonMenuById(button.id);
  }

  buttonMenuKeyDownHandler(event: KeyboardEvent, button: ModusNavbarButton): void {
    if (event.code == 'Enter' || event.code == 'Space') {
      event.preventDefault();
      this.showButtonMenuById(button.id);
    }

    if (event.code == 'Escape') {
      this.hideMenus();
    }
  }

  getNotificationCount(): string {
    if (!this.notificationCount) {
      return;
    }

    const counter = this.notificationCount;

    if (counter < 1) {
      return '1';
    }

    if (counter > 99) {
      return '99+';
    }

    return this.notificationCount.toString();
  }

  render(): unknown {
    const direction = this.reverse ? 'reverse' : '';
    const shadow = this.showShadow ? 'shadow' : '';
    const variant = `${this.variant === 'default' ? '' : 'nav-' + this.variant}`;
    const sortedButtonList = this.buttons?.sort((a, b) => a.orderIndex - b.orderIndex);

    const overlay = this.searchOverlayVisible && (
      <modus-navbar-search-overlay
        class="overlay"
        onClose={() => this.searchOverlayCloseEventHandler()}
        onSearch={(event) => this.searchChange.emit(event.detail)}></modus-navbar-search-overlay>
    );
    const counterValue = this.getNotificationCount();

    return (
      <Host id={this.componentId}>
        <nav class={`${direction} ${shadow} ${variant}`}>
          {!this.searchOverlayVisible && (
            <Fragment>
              <div class={`left ${direction}`}>
                {this.showMainMenu && (
                  <div class="navbar-button main-menu-button">
                    <span
                      class="navbar-button-icon"
                      role="button"
                      aria-label="Toggle navigation"
                      onKeyDown={(event) => this.mainMenuKeydownHandler(event)}
                      tabIndex={0}>
                      <IconMenu
                        size="24"
                        pressed={this.mainMenuVisible}
                        onClick={(event) => this.mainMenuClickHandler(event)}
                      />
                    </span>
                  </div>
                )}
                {this.mainMenuVisible && (
                  <modus-navbar-main-menu navbarId={this.componentId}>
                    <slot name={this.SLOT_MAIN}></slot>
                  </modus-navbar-main-menu>
                )}
                {this.logoOptions && (
                  <ModusNavbarProductLogo logos={this.logoOptions} onClick={(event) => this.productLogoClick.emit(event)} />
                )}
              </div>
              <div class={`right ${direction}`}>
                {this.showSearch && (
                  <div class="navbar-button search" data-test-id="search-menu">
                    <modus-tooltip
                      text={this.searchTooltip?.text}
                      aria-label={this.searchTooltip?.ariaLabel}
                      position="bottom">
                      <span
                        class="navbar-button-icon"
                        aria-label="Search"
                        role="button"
                        onKeyDown={(event) => this.searchMenuKeydownHandler(event)}
                        tabIndex={0}
                        id="search-button"
                        ref={(el) => (this.searchButton = el as HTMLElement)}>
                        <IconSearch
                          size="24"
                          onClick={(event) => this.searchMenuClickHandler(event)}
                          pressed={this.searchOverlayVisible}
                        />
                      </span>
                    </modus-tooltip>
                  </div>
                )}
                <ModusNavbarButtonList
                  buttons={sortedButtonList}
                  reverse={this.reverse}
                  openButtonMenuId={this.openButtonMenuId}
                  onKeyDown={(event, button) => this.buttonMenuKeyDownHandler(event, button)}
                  onClick={(event, button) => this.buttonMenuClickHandler(event, button)}></ModusNavbarButtonList>
                {this.showNotifications && (
                  <div class="navbar-button" data-test-id="notifications-menu">
                    <span
                      class="navbar-button-icon"
                      role="button"
                      aria-label="Notifications"
                      onKeyDown={(event) => this.notificationsMenuKeydownHandler(event)}
                      tabIndex={0}>
                      <IconNotifications
                        size="24"
                        onClick={(event) => this.notificationsMenuClickHandler(event)}
                        pressed={this.notificationsMenuVisible}
                      />
                      {counterValue && (
                        <modus-badge
                          class="badge"
                          color="danger"
                          size="medium"
                          type="counter"
                          aria-label="Notification badge">
                          {counterValue}
                        </modus-badge>
                      )}
                    </span>
                    {this.notificationsMenuVisible && (
                      <modus-navbar-notifications-menu reverse={this.reverse}>
                        <slot name={this.SLOT_NOTIFICATIONS}></slot>
                      </modus-navbar-notifications-menu>
                    )}
                  </div>
                )}
                {this.showPendoPlaceholder && <div class={'pendo-placeholder'} />}
                {this.showHelp && (
                  <div class="navbar-button" data-test-id="help-menu">
                    <modus-tooltip text={this.helpTooltip?.text} aria-label={this.helpTooltip?.ariaLabel} position="bottom">
                      <span
                        class="navbar-button-icon"
                        role="button"
                        onKeyDown={(event) => this.helpMenuKeyHandler(event)}
                        aria-label="Help"
                        onClick={(event) => this.helpMenuClickHandler(event)}
                        tabIndex={0}>
                        <IconHelp size="24" />
                      </span>
                    </modus-tooltip>
                  </div>
                )}
                {this.showAppsMenu && (
                  <div class="navbar-button" data-test-id="apps-menu">
                    <span
                      class="navbar-button-icon"
                      role="button"
                      aria-label="Apps"
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
                {this.showProfile && (
                  <div class="profile-menu">
                    <modus-tooltip
                      text={this.profileMenuOptions?.tooltip?.text}
                      aria-label={this.profileMenuOptions?.tooltip?.ariaLabel}
                      disabled={this.profileMenuVisible}
                      position="bottom">
                      {this.profileMenuOptions?.avatarUrl ? (
                        <img
                          class="avatar"
                          height="32"
                          src={this.profileMenuOptions?.avatarUrl}
                          alt="Modus navbar profile menu avatar"
                          onClick={(event) => this.profileMenuClickHandler(event)}
                          onKeyDown={(event) => this.profileMenuKeydownHandler(event)}
                          tabIndex={0}
                          ref={(el) => (this.profileAvatarElement = el as HTMLImageElement)}
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
                    </modus-tooltip>
                    {this.profileMenuVisible && (
                      <modus-navbar-profile-menu
                        avatar-url={this.profileMenuOptions?.avatarUrl}
                        email={this.profileMenuOptions?.email}
                        initials={this.profileMenuOptions?.initials}
                        links={this.profileMenuOptions?.links}
                        reverse={this.reverse}
                        username={this.profileMenuOptions?.username}
                        variant={this.variant}
                        sign-out-text={this.profileMenuOptions?.signOutText}>
                        <slot name={this.SLOT_PROFILE_MENU}></slot>
                      </modus-navbar-profile-menu>
                    )}
                  </div>
                )}
              </div>
            </Fragment>
          )}
          {overlay}
        </nav>
      </Host>
    );
  }
}

import { h, Component, Prop, Element, Event, Watch, EventEmitter, Method, State, Host } from '@stencil/core';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import { ModusIconMap } from '../../../icons/ModusIconMap';
import { ModusHeaderNavigationItemInfo } from '../modus-side-navigation.models';

@Component({
  tag: 'modus-side-navigation-item',
  styleUrl: 'modus-side-navigation-item.scss',
  shadow: true,
})
export class ModusSideNavigationItem {
  @Element() element: HTMLElement;

  /** (optional) The disabled state of side navigation panel item. */
  @Prop() disabled = false;

  /** (optional) Disables item selection. */
  @Prop({ mutable: true, reflect: true }) disableSelection = false;

  /**
   * @internal
   * Only to be used by modus side navigation components
   */
  @Prop({ mutable: true, reflect: true }) expanded = false;

  /** (optional) Label for the item and the tooltip message. */
  @Prop({ mutable: true, reflect: true }) label: string;

  /** (optional) A built-in menu icon string or a image url. */
  @Prop() menuIcon: string;

  /** (optional) The selected state of side navigation panel item. */
  @Prop({ mutable: true, reflect: true }) selected = false;

  /** (optional) Shows the expand icon. */
  @Prop({ mutable: true, reflect: true }) showExpandIcon = false;

  /** (optional to enable header dropdown feature)*/
  @Prop() isHeader: ModusHeaderNavigationItemInfo = { enabled: false, items: [] };

  @State() dropdownVisible = false;

  /** An event that fires when a mouse click or `Enter` key press on an item. */
  @Event() sideNavItemClicked: EventEmitter<{ id: string; selected: boolean }>;

  @Event() sideNavItemHeaderClicked: EventEmitter<{ id: string; selected: boolean }>;

  /** An event that fires when an item is in focus.  */
  @Event() sideNavItemFocus: EventEmitter<{ id: string }>;

  /**
   * @internal
   * Only to be used by modus side navigation components
   */
  @Event() _sideNavItemAdded: EventEmitter<HTMLElement>;

  /**
   * @internal
   * Only to be used by modus side navigation components
   */
  @Event() _sideNavItemRemoved: EventEmitter<HTMLElement>;

  @Event() sideNavListItemClicked: EventEmitter<{ id: string }>;

  private _itemRef: HTMLLIElement;
  private popperInstance: PopperInstance | null = null;
  private dropdownRef: HTMLElement;
  private referenceRef: HTMLElement;

  @Method()
  async focusItem(): Promise<void> {
    this._itemRef?.focus();
  }

  @Watch('expanded')
  watchExpanded(): void {
    if (this.dropdownVisible) {
      this.dropdownVisible = false;
    }
  }

  connectedCallback() {
    this._sideNavItemAdded.emit(this.element);
    if (this.isHeader?.enabled) {
      this.showExpandIcon = true;
    }
  }

  disconnectedCallback() {
    this._sideNavItemRemoved.emit(this.element);
    this.destroyPopper();
  }

  handleListItemClick(itemId: string): void {
    this.sideNavListItemClicked.emit({ id: itemId });
    this.dropdownVisible = false; // Close the dropdown
    this.label = itemId;

    this.sideNavItemHeaderClicked?.emit({
      id: itemId,
      selected: this?.selected,
    });
    this.destroyPopper(); // Destroy the popper to reset the positioning
  }

  setupPopper(expanded: boolean): void {
    if (!this.referenceRef || !this.dropdownRef) return;
    this.popperInstance = createPopper(this.referenceRef, this.dropdownRef, {
      placement: expanded ? 'bottom-start' : 'right',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 2],
            distance: 10,
          },
        },
        {
          name: 'setWidth',
          enabled: true,
          phase: 'write',
          fn: ({ state }) => {
            if (state.placement.startsWith('bottom')) {
              state.elements.popper.style.width = '300px';
            } else if (state.placement.startsWith('right')) {
              state.elements.popper.style.width = '150px';
            }
          },
        },
      ],
    });
  }

  destroyPopper(): void {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  handleClick(): void {
    if (this.disabled) return;

    if (this.isHeader?.enabled) {
      this.dropdownVisible = !this.dropdownVisible;

      if (this.dropdownVisible) {
        this.setupPopper(this.expanded);
      } else {
        this.destroyPopper();
      }
      return;
    }

    this.selected = this.disableSelection ? this.selected : !this.selected;
    this.sideNavItemClicked?.emit({
      id: this.element.id,
      selected: this?.selected,
    });
  }

  handleKeyDown(e: KeyboardEvent): void {
    if (e.code.toUpperCase() === 'ENTER' || e.code.toUpperCase() === 'SPACE') {
      this.handleClick();
    }
  }

  renderDropdown() {
    return (
      <div
        class={`dropdown-list ${this.dropdownVisible ? 'visible' : 'hidden'} list-border animate-list`}
        ref={(el) => (this.dropdownRef = el)}>
        <modus-list slot="dropdownList">
          {this.isHeader?.items?.map((item) => (
            <modus-list-item size="large" borderless onClick={() => this.handleListItemClick(item)}>
              {item}
            </modus-list-item>
          ))}
        </modus-list>
      </div>
    );
  }

  render() {
    const classes = {
      'side-nav-item': true,
      expanded: this.expanded,
      selected: this.selected,
      disabled: this.disabled,
    };

    return (
      <Host>
        {this.isHeader?.enabled && this.renderDropdown()}
        <modus-tooltip text={this.label} disabled={this.disabled} position="right">
          <li
            role="treeitem"
            ref={(el) => (this.referenceRef = el)}
            tabIndex={this.disabled ? -1 : 0}
            class={classes}
            onClick={() => this.handleClick()}
            onKeyDown={(e) => this.handleKeyDown(e)}
            aria-disabled={this.disabled ? 'true' : null}
            aria-label={this.label}
            aria-current={this.selected ? 'true' : null}
            onFocus={() => this.sideNavItemFocus.emit({ id: this.element.id })}>
            <div class="menu-icon">
              <slot name="menu-icon"></slot>
              {this.menuIcon && <ModusIconMap icon={this.menuIcon} aria-label={this.label} size="24"></ModusIconMap>}
            </div>

            {this.expanded && <div class="menu-text">{this.label}</div>}

            <div
              class={`level-icon ${this.isHeader?.enabled && this.expanded ? (this.dropdownVisible ? 'icon-dropdownvisible' : 'icon-expanded') : 'icon-collapsed'}`}>
              {this.showExpandIcon && <ModusIconMap icon="chevron_right" size="16" />}
            </div>
          </li>
        </modus-tooltip>
      </Host>
    );
  }
}

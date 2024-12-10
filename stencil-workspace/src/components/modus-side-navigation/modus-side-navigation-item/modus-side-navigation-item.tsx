import {
  h,
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  Method,
  State,
  Host,
} from '@stencil/core';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import { ModusIconMap } from '../../../icons/ModusIconMap';

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
  @Prop() label: string;

  /** (optional) A built-in menu icon string or a image url. */
  @Prop() menuIcon: string;

  /** (optional) The selected state of side navigation panel item. */
  @Prop({ mutable: true, reflect: true }) selected = false;

  /** (optional) Shows the expand icon. */
  @Prop({ mutable: true, reflect: true }) showExpandIcon = false;

  @Prop() isHeader = false;

  @State() dropdownVisible = false;

  /** An event that fires when a mouse click or `Enter` key press on an item. */
  @Event() sideNavItemClicked: EventEmitter<{ id: string; selected: boolean }>;

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

  connectedCallback() {
    this._sideNavItemAdded.emit(this.element);
    if (this.isHeader) {
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
    if(this.expanded){
      const levelIcon : HTMLElement = this.element.shadowRoot.querySelector('.level-icon');
      levelIcon.style.transform = 'rotate(90deg)';
    }
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

    if (this.isHeader) {
      this.dropdownVisible = !this.dropdownVisible;

      if (this.dropdownVisible) {
        this.setupPopper(this.expanded);
      } else {
        this.destroyPopper();
      }
      if(this.expanded){
        const levelIcon : HTMLElement = this.element.shadowRoot.querySelector('.level-icon');
        levelIcon.style.transform = this.dropdownVisible ? 'rotate(270deg)' : 'rotate(90deg)';
        }
      return;
    }

    this.selected = this.disableSelection ? this.selected : !this.selected;
    this.sideNavItemClicked?.emit({
      id: this.element.id,
      selected: this.selected,
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
            <modus-list-item size="large" borderless  onClick={() => this.handleListItemClick('Item 1 - Navigation Link for Settings and Preferences')}>
            Item 1 - Navigation Link for Settings and Preferences
            </modus-list-item>
            <modus-list-item size="large" borderless  onClick={() => this.handleListItemClick('Item 2 - Navigation Link for User Profile and Account')}>
            Item 2 - Navigation Link for User Profile and Account
            </modus-list-item>
            <modus-list-item size="large" borderless  onClick={() => this.handleListItemClick('Item 3 - Navigation Link for Notifications and Alerts')}>
            Item 3 - Navigation Link for Notifications and Alerts
            </modus-list-item>
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
      {this.isHeader && this.renderDropdown()}
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

          <div class="level-icon" style={{ transform: this.expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            {this.showExpandIcon && <ModusIconMap icon="chevron_right" size="16" />}
          </div>


        </li>
      </modus-tooltip>
      </Host>
    );
  }
}


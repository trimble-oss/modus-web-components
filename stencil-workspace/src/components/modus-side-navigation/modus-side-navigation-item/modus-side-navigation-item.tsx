// eslint-disable-next-line
import {
  h,
  Component,
  Prop,
  Element,
  State,
  Event,
  EventEmitter,
  Method,
} from '@stencil/core';
import { IconChevronRightThick } from '../../icons/icon-chevron-right-thick';

@Component({
  tag: 'modus-side-navigation-item',
  styleUrl: 'modus-side-navigation-item.scss',
  shadow: true,
})
export class ModusSideNavigationItem {
  @Element() element: HTMLElement;

  /** (optional) The disabled state of side navigation panel item. */
  @Prop() disabled = false;

  /** (optional) The expanded state of side navigation panel item. */
  @Prop() expanded = false;

  /** (optional) Label for the item and the tooltip message. */
  @Prop() label: string;

  /** (optional) Url for menu icon. */
  @Prop() menuIconUrl: string;

  /** (optional) The selected state of side navigation panel item. */
  @Prop() selected = false;

  /** An event that fires on item selection.  */
  @Event() sideNavItemSelected: EventEmitter<{ id: string; selected: boolean }>;

  /** An event that fires when an item is in focus.  */
  @Event() sideNavItemFocus: EventEmitter<{ id: string }>;

  /**
   * @internal
   */
  @Event() itemAdded: EventEmitter<HTMLElement>;

  /**
   * @internal
   */
  @Event() itemRemoved: EventEmitter<HTMLElement>;

  @State() children: HTMLModusSideNavigationItemElement[];

  itemRef: HTMLLIElement;
  @Method()
  async focusItem(): Promise<void> {
    this.itemRef?.focus();
  }

  connectedCallback() {
    this.itemAdded.emit(this.element);
  }

  disconnectedCallback() {
    this.itemRemoved.emit(this.element);
  }

  handleDefaultSlotChange(): void {
    this.children = Array.from(
      this.element.children as unknown as HTMLModusSideNavigationItemElement[]
    ).filter((i) => i && i.nodeName === 'MODUS-SIDE-NAVIGATION-ITEM');
  }

  handleClick(): void {
    if (this.disabled) return;

    this.selected = !this.selected;
    this.sideNavItemSelected?.emit({
      id: this.element.id,
      selected: this.selected,
    });
  }

  handleKeyDown(e: KeyboardEvent): void {
    if (e.code.toUpperCase() === 'ENTER' || e.code.toUpperCase() === 'SPACE') {
      this.handleClick();
    }
  }

  render() {
    const classes = `side-nav-item${this.expanded ? ' expanded' : ''}${
      this.selected ? ' selected' : ''
    }${this.disabled ? ' disabled' : ''}`;
    const menuIconTooltip = this.expanded || this.disabled ? null : this.label;

    return (
      <li
        ref={(el) => (this.itemRef = el)}
        tabIndex={this.disabled ? -1 : 0}
        class={classes}
        onClick={() => this.handleClick()}
        onKeyDown={(e) => this.handleKeyDown(e)}
        aria-disabled={this.disabled ? 'true' : null}
        aria-label={this.label}
        aria-current={this.selected ? 'true' : null}
        onFocus={() => this.sideNavItemFocus.emit({ id: this.element.id })}>
        <div
          class="menu-icon"
          onClick={() => this.sideNavItemFocus.emit({ id: this.element.id })}>
          <modus-tooltip text={menuIconTooltip} position="right">
            <slot name="menu-icon"></slot>
            {this.menuIconUrl && <img src={this.menuIconUrl} />}
          </modus-tooltip>
        </div>

        {this.expanded && <div class="menu-text">{this.label}</div>}

        <div class="level-icon">
          {this.children?.length > 0 && <IconChevronRightThick />}
        </div>

        <div style={{ display: 'none' }}>
          <slot onSlotchange={() => this.handleDefaultSlotChange()}></slot>
        </div>
      </li>
    );
  }
}

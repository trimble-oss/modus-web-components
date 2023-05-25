import {
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  Method,
} from '@stencil/core';
import { IconMap } from '../../icons/IconMap';

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

  /** An event that fires when mouse click or `Enter` key press on an item.  */
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

  private _itemRef: HTMLLIElement;
  @Method()
  async focusItem(): Promise<void> {
    this._itemRef?.focus();
  }

  connectedCallback() {
    this._sideNavItemAdded.emit(this.element);
  }

  disconnectedCallback() {
    this._sideNavItemRemoved.emit(this.element);
  }

  handleClick(): void {
    if (this.disabled) return;

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

  render() {
    const classes = `side-nav-item${this.expanded ? ' expanded' : ''}${this.selected ? ' selected' : ''}${
      this.disabled ? ' disabled' : ''
    }`;
    const menuIconTooltip = this.expanded || this.disabled ? null : this.label;

    return (
      <li
        role="treeitem"
        ref={(el) => (this._itemRef = el)}
        tabIndex={this.disabled ? -1 : 0}
        class={classes}
        onClick={() => this.handleClick()}
        onKeyDown={(e) => this.handleKeyDown(e)}
        aria-disabled={this.disabled ? 'true' : null}
        aria-label={this.label}
        aria-current={this.selected ? 'true' : null}
        onFocus={() => this.sideNavItemFocus.emit({ id: this.element.id })}>
        <div class="menu-icon" onClick={() => this.sideNavItemFocus.emit({ id: this.element.id })}>
          <modus-tooltip text={menuIconTooltip} position="right">
            <slot name="menu-icon"></slot>
            {this.menuIcon && <IconMap icon={this.menuIcon} aria-label={this.label} size="24"></IconMap>}
          </modus-tooltip>
        </div>

        {this.expanded && <div class="menu-text">{this.label}</div>}

        <div class="level-icon">{this.showExpandIcon && <IconMap icon="chevron-right-thick" />}</div>
      </li>
    );
  }
}

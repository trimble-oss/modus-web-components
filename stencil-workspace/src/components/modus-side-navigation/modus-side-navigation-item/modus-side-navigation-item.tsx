// eslint-disable-next-line
import {
  Component,
  h,
  Prop,
  Element,
  State,
  Event,
  EventEmitter,
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

  /** (optional) The selected state of side navigation panel item. */
  @Prop() selected = false;

  /** (optional) Label for the item and the tooltip message. */
  @Prop() label: string;

  /** An event that fires on item selection.  */
  @Event() sideNavItemSelected: EventEmitter<boolean>;

  @State() children: HTMLModusSideNavigationItemElement[];

  handleDefaultSlotChange(): void {
    this.children = Array.from(
      this.element.children as unknown as HTMLModusSideNavigationItemElement[]
    ).filter((i) => i && i.nodeName === 'MODUS-SIDE-NAVIGATION-ITEM');
  }

  handleClick(): void {
    if (this.disabled) return;

    this.selected = !this.selected;
    this.sideNavItemSelected.emit(this.selected);
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
        class={classes}
        onClick={() => this.handleClick()}
        onKeyDown={(e) => this.handleKeyDown(e)}
        aria-disabled={this.disabled ? 'true' : null}
        aria-label={this.label}
        aria-current={this.selected ? 'true' : null}>
        <div class="menu-icon">
          <modus-tooltip text={menuIconTooltip} position="right">
            <slot name="menu-icon"></slot>
          </modus-tooltip>
        </div>

        <div class="menu-text">
          <span>{this.label}</span>
        </div>

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

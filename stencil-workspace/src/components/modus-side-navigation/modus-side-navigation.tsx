// eslint-disable-next-line
import {
  h,
  Component,
  Prop,
  Element,
  Watch,
  EventEmitter,
  Event,
  Listen,
} from '@stencil/core';
import { ModusSideNavigationItemCustomEvent } from '../../components';
import { ModusSideNavigationTree } from './modus-side-navigation-tree';
import { ModusSideNavigationItemInfo } from './modus-side-navigation.types';

@Component({
  tag: 'modus-side-navigation',
  styleUrl: 'modus-side-navigation.scss',
  shadow: true,
})
export class ModusSideNavigation {
  @Element() element: HTMLElement;

  /** (optional) Data property to create the items. */
  @Prop() data: ModusSideNavigationItemInfo[];

  /** (optional) The expanded state of side navigation panel and items. */
  @Prop() expanded = false;

  /** (optional) Maximum width of the side navigation panel in an expanded state. */
  @Prop() maxWidth = '256px';

  /** An event that fires on side navigation panel collapse & expand.  */
  @Event() sideNavExpand: EventEmitter<boolean>;

  private children: { [key: string]: HTMLModusSideNavigationItemElement } = {};
  private firstChild: string;
  private itemInFocus: string;
  private itemSelected: string;

  @Listen('itemAdded')
  handleItemAdded(event: ModusSideNavigationItemCustomEvent<HTMLElement>) {
    if (event.detail?.id) {
      this.children[event.detail.id] =
        event.detail as HTMLModusSideNavigationItemElement;
      this.children[event.detail.id].expanded = this.expanded;
    }
    this.onChildrenUpdate(event);
  }

  @Listen('sideNavItemFocus')
  handleItemFocus(event: ModusSideNavigationItemCustomEvent<{ id: string }>) {
    this.setFocusItem(event.detail.id);
  }

  @Listen('itemRemoved')
  handleItemRemoved(event: ModusSideNavigationItemCustomEvent<HTMLElement>) {
    if (event.detail?.id) {
      delete this.children[event.detail.id];
    }
    this.onChildrenUpdate(event);
  }

  @Listen('sideNavItemSelected')
  handleItemSelected(
    event: ModusSideNavigationItemCustomEvent<{ id: string; selected: boolean }>
  ) {
    if (this.itemSelected) {
      this.children[this.itemSelected].selected = false;
      this.itemSelected = null;
    }
    this.itemSelected = event.detail.selected ? event.detail.id : null;
  }

  @Watch('expanded')
  handleExpandedChange(val) {
    Object.values(this.children).forEach((c) => (c.expanded = val));
    this.sideNavExpand?.emit(this.expanded);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }

    const key = event.code.toUpperCase();
    let flag = false;
    // If the tree is empty there will be no child
    if (event.altKey || !this.firstChild) {
      return;
    }
    switch (key) {
      case 'SPACE':
      case 'ENTER':
        event.stopPropagation();
        break;
      case 'ARROWDOWN':
        // eslint-disable-next-line no-case-declarations
        const nextItem: HTMLModusSideNavigationItemElement = this.children[
          this.itemInFocus
        ]?.nextElementSibling as HTMLModusSideNavigationItemElement;

        nextItem?.focusItem();
        flag = true;
        break;
      case 'ARROWUP':
        // eslint-disable-next-line no-case-declarations
        const prevItem = this.children[this.itemInFocus]
          ?.previousElementSibling as HTMLModusSideNavigationItemElement;

        prevItem?.focusItem();
        flag = true;
        break;
      default:
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onChildrenUpdate(event: ModusSideNavigationItemCustomEvent<HTMLElement>) {
    const keys = Object.keys(this.children);
    this.firstChild = keys[0];

    event.preventDefault();
    event.stopPropagation();
  }

  setFocusItem(itemId: string): void {
    this.itemInFocus = itemId;
  }

  render() {
    return (
      <nav
        class={`side-nav-panel${this.expanded ? ' expanded' : ''}`}
        style={{ width: this.expanded ? this.maxWidth : null }}
        onKeyDown={(e) => this.handleKeyDown(e)}
        aria-label="side navigation">
        <ul class="side-nav-menu">
          <slot></slot>
          <ModusSideNavigationTree data={this.data}></ModusSideNavigationTree>
        </ul>
      </nav>
    );
  }
}

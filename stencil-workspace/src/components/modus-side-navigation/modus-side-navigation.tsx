// eslint-disable-next-line
import { Component, Prop, Element, State, Watch, h, EventEmitter, Event, } from '@stencil/core';

@Component({
  tag: 'modus-side-navigation',
  styleUrl: 'modus-side-navigation.scss',
  shadow: true,
})
export class ModusSideNavigation {
  @Element() element: HTMLElement;

  /** (optional) The expanded state of side navigation panel and items. */
  @Prop() expanded = false;

  @Prop() maxWidth = '256px';

  /** An event that fires on side navigation panel collapse & expand.  */
  @Event() sideNavExpand: EventEmitter<boolean>;

  @State() children: HTMLModusSideNavigationItemElement[];

  handleSlotChange(): void {
    this.children = Array.from(
      this.element.children as unknown as HTMLModusSideNavigationItemElement[]
    ).filter((i) => i && i.nodeName === 'MODUS-SIDE-NAVIGATION-ITEM');
    this.handleExpandedChange(this.expanded);
  }

  @Watch('expanded')
  handleExpandedChange(val) {
    this.children.forEach((c) => (c.expanded = val));
    this.sideNavExpand.emit(this.expanded);
  }

  handleClick(event: KeyboardEvent | MouseEvent): void {
    const selectedItems = this.children.filter((c) => c.selected);
    if (selectedItems?.length > 1) {
      selectedItems.forEach((el) => {
        if (!el.contains(event.target as HTMLModusSideNavigationItemElement))
          el.selected = false;
      });
    }
  }

  render() {
    return (
      <nav
        class={`side-nav-panel${this.expanded ? ' expanded' : ''}`}
        style={{ width: this.expanded ? this.maxWidth : null }}
        onClick={(e) => this.handleClick(e)}
        aria-label="side navigation">
        <ul class="side-nav-menu">
          <slot onSlotchange={() => this.handleSlotChange()}></slot>
        </ul>
      </nav>
    );
  }
}

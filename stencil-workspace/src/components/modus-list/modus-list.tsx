// eslint-disable-next-line
import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'modus-list',
  styleUrl: 'modus-list.scss',
  shadow: true,
})
export class ModusList {
  @Element() element: HTMLElement;

  handleKeyDown(e: KeyboardEvent): void {
    const itemsLength = this.element.children.length;
    if (e.key.toLowerCase() === 'arrowdown') {
      const index = Array.prototype.indexOf.call(this.element.children, e.target);

      let next = this.element.children.item((index + 1) % itemsLength) as HTMLModusListItemElement;
      while (next?.disabled) {
        next = this.element.children.item((index + 2) % itemsLength) as HTMLModusListItemElement;
      }
      next?.focusItem();
    }
    if (e.key.toLowerCase() === 'arrowup') {
      const index = Array.prototype.indexOf.call(this.element.children, e.target);

      let prev = this.element.children.item((index - 1) % itemsLength) as HTMLModusListItemElement;
      while (prev?.disabled) {
        prev = this.element.children.item((index - 2) % itemsLength) as HTMLModusListItemElement;
      }
      prev?.focusItem();
    }
  }

  render(): unknown {
    return (
      <ul part="list-items" onKeyDown={(e) => this.handleKeyDown(e)}>
        <slot />
      </ul>
    );
  }
}

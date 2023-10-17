// eslint-disable-next-line
import { Component, h, Element, Listen } from '@stencil/core';

@Component({
  tag: 'modus-list',
  styleUrl: 'modus-list.scss',
  shadow: true,
})
export class ModusList {
  @Element() element: HTMLElement;

  @Listen('keyDown', { target: 'document' })
  handleKeyDown(e: KeyboardEvent): void {
    const itemsLength = this.element.children.length
    if(e.key.toLowerCase() === 'arrowdown') {
      const index = Array.prototype.indexOf.call(this.element.children, e.target);
      (this.element.children.item((index + 1) % itemsLength) as HTMLElement)?.focus();
    }
    if(e.key.toLowerCase() === 'arrowup') {
      const index = Array.prototype.indexOf.call(this.element.children, e.target);
      (this.element.children.item((index - 1) % itemsLength) as HTMLElement)?.focus();
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

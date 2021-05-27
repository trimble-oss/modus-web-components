// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'modus-list-item',
  styleUrl: 'modus-list-item.scss',
  shadow: true,
})
export class ModusListItem {
  /** (optional) The selected state of the item */
  @Prop() selected: boolean;

  /** (optional) The size of list item */
  @Prop() size: 'condensed' | 'standard' = 'standard';

  /** (optional) The type of list item */
  @Prop() type: 'standard' = 'standard'; // Future support for 'checkbox' | 'icon' | 'menu' | 'standard' | 'switchLeft' | 'switchRight'

  /** (optional) An event that fires on item click */
  @Event() itemClick: EventEmitter;

  classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
  ]);

  render(): unknown {
    const containerClass = `${this.classBySize.get(this.size)} ${this.selected ? 'selected' : ''}`;

    return (
      <li class={containerClass} onClick={() => this.itemClick.emit()}>
        <slot />
        {this.selected ? <i class="modus-icons selected-icon">check</i> : null}
      </li>
    );
  }
}

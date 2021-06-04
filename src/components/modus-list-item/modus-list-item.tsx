// eslint-disable-next-line
import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-list-item',
  styleUrl: 'modus-list-item.scss',
  shadow: true,
})
export class ModusListItem {
  /** (optional) Disables the list item */
  @Prop() disabled: boolean;

  /** (optional) The selected state of the list item */
  @Prop() selected: boolean;

  /** (optional) The size of list item */
  @Prop() size: 'condensed' | 'standard' = 'standard';

  /** (optional) The type of list item */
  @Prop() type: 'standard' = 'standard'; // Future support for 'checkbox' | 'icon' | 'menu' | 'standard' | 'switchLeft' | 'switchRight'

  /** An event that fires on list item click */
  @Event() itemClick: EventEmitter;

  classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
  ]);

  render(): unknown {
    const containerClass = `${this.classBySize.get(this.size)} ${this.disabled ? 'disabled' : ''} ${this.selected ? 'selected' : ''}`;
    const svgHeight = this.size === 'standard' ? 12 : 10;
    const svgWidth = this.size === 'standard' ? 14 : 12;

    return (
      <li class={containerClass} onClick={() => !this.disabled ? this.itemClick.emit() : null}>
        <span class="slot"><slot /></span>
        {this.selected ?
          <svg width={svgWidth} height={svgHeight} viewBox="0 0 12 10" fill="none" class="selected-icon">
            <path d="M3.81353 7.21774L0.968732 4.37294L0 5.33485L3.81353 9.14838L12 0.96191L11.0381 0L3.81353 7.21774Z" fill="#363545"/>
          </svg>
        : null}
      </li>
    );
  }
}

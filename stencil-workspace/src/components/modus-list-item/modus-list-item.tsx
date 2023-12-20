// eslint-disable-next-line
import { Component, Event, EventEmitter, Method, Prop, h } from '@stencil/core';
import { IconCheck } from '../icons/icon-check';

@Component({
  tag: 'modus-list-item',
  styleUrl: 'modus-list-item.scss',
  shadow: true,
})
export class ModusListItem {
  /** (optional) Whether the list item has a border or not */
  @Prop() borderless: boolean;

  /** (optional) Disables the list item */
  @Prop() disabled: boolean;

  /** (optional) The selected state of the list item */
  @Prop() selected: boolean;

  /** (optional) The size of list item */
  @Prop() size: 'condensed' | 'large' | 'standard' = 'standard';

  /** (optional) Whether to show Subtext below the Slot content or not  */
  @Prop() subText: string;

  /** (optional) The type of list item */
  @Prop() type = 'standard'; // Future support for 'checkbox' | 'icon' | 'menu' | 'standard' | 'switchLeft' | 'switchRight'

  /** An event that fires on list item click */
  @Event() itemClick: EventEmitter;

  listItemRef: HTMLLIElement;

  @Method()
  async focusItem(): Promise<void> {
    this.listItemRef?.focus();
  }

  classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
    ['large', 'large'],
  ]);

  handleKeydown(e: KeyboardEvent): void {
    if (e.key.toLowerCase() === 'enter' && !this.disabled) {
      this.itemClick.emit();
    }
  }

  render(): unknown {
    const containerClass = `${this.classBySize.get(this.size)} ${this.disabled ? 'disabled' : ''} ${
      this.selected ? 'selected' : ''
    } ${this.borderless ? 'borderless' : ''}`;
    const iconCheckSize = this.size === 'condensed' ? '16' : '24';

    return (
      <li
        ref={(el) => (this.listItemRef = el)}
        class={containerClass}
        tabIndex={this.disabled ? -1 : 0}
        onClick={() => (!this.disabled ? this.itemClick.emit() : null)}
        onKeyDown={(e) => this.handleKeydown(e)}>
        <span class="slot">
          <slot />
          {this.subText && <span class="sub-text">{this.subText}</span>}
        </span>
        {this.selected && <IconCheck size={iconCheckSize} />}
      </li>
    );
  }
}

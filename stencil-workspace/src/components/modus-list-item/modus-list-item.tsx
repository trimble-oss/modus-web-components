// eslint-disable-next-line
import { Component, Event, EventEmitter, Method, Prop, h } from '@stencil/core';
import { IconCheck } from '../../icons/svgs/icon-check';
import { ModusIconMap as ModusIcon } from '../../icons/ModusIconMap';

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

  /** (optional) Takes the icon name and shows the icon aligned to the left of the button text. */
  @Prop() leftIcon: string;

  /** (optional) The size of list item */
  @Prop() size: 'condensed' | 'large' | 'standard' = 'standard';

  /** (optional) Whether to show Subtext below the Slot content or not  */
  @Prop() subText: string;

  /** (optional) Whether to wrap the sub text. */
  @Prop() wrapSubText: true | false = true;

  /** (optional) The type of list item */
  @Prop() type = 'standard'; // Future support for 'checkbox' | 'icon' | 'menu' | 'standard' | 'switchLeft' | 'switchRight'

  /** An event that fires on list item click */
  @Event() itemClick: EventEmitter;

  /** (optional) Whether the list item has a radius or not */
  @Prop() radiusless: boolean;

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
    } ${this.borderless ? 'borderless' : ''} ${this.radiusless ? 'radiusless' : ''}`;
    const iconCheckSize = this.size === 'condensed' ? '16' : '24';

    return (
      <li
        ref={(el) => (this.listItemRef = el)}
        class={containerClass}
        tabIndex={this.disabled ? -1 : 0}
        onClick={() => (!this.disabled ? this.itemClick.emit() : null)}
        onKeyDown={(e) => this.handleKeydown(e)}>
        {this.leftIcon && (
          <span class="icon left-icon">
            <ModusIcon icon={this.leftIcon} size="24"></ModusIcon>
          </span>
        )}
        <div class="text-container">
          <span class="slot">
            <slot />
          </span>
          {this.subText && <span class={'sub-text ' + (this.wrapSubText ? 'wrap' : 'no-wrap')}>{this.subText}</span>}
        </div>
        {this.selected && <IconCheck size={iconCheckSize} />}
      </li>
    );
  }
}

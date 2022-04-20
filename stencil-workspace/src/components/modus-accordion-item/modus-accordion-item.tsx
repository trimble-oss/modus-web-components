// eslint-disable-next-line
import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { IconChevronUpThick } from '../icons/icon-chevron-up-thick';
import { IconChevronDownThick } from '../icons/icon-chevron-down-thick';

@Component({
  tag: 'modus-accordion-item',
  styleUrl: 'modus-accordion-item.scss',
  shadow: true,
})
export class ModusAccordionItem {
  /** (optional) Disables the accordion item, locks expand/collapse. */
  @Prop() disabled: boolean;

  /** (optional) Whether the accordion item is expanded. */
  @Prop({ mutable: true }) expanded: boolean;

  /** (required) The text to render in the header. */
  @Prop() headerText: string;

  /** (optional) The size of accordion item. */
  @Prop() size: 'condensed' | 'standard' = 'standard';

  /** An event that fires on every accordion close.  */
  @Event() closed: EventEmitter;

  /** An event that fires on every accordion open.  */
  @Event() opened: EventEmitter;

  classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
  ]);

  handleHeaderClick(): void {
    if (this.disabled) { return; }

    this.expanded = !this.expanded;
    if (this.expanded) {
      this.opened.emit();
    } else {
      this.closed.emit();
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.code !== 'Enter') { return; }

    this.handleHeaderClick();
  }

  render(): unknown {
    const sizeClass = `${this.classBySize.get(this.size)}`;
    const disabledClass = `${this.disabled ? 'disabled' : ''}`;
    const iconSize = this.size === 'standard' ? '24' : '20';
    const bodyClass = `body ${sizeClass} ${this.expanded ? 'expanded' : ''}`;

    return (
      <div aria-disabled={this.disabled} aria-expanded={this.expanded} class="accordion-item" role="region">
        <div class={`header ${sizeClass} ${disabledClass}`} onClick={() => this.handleHeaderClick()} onKeyDown={(event) => this.handleKeydown(event)} tabIndex={0}>
          <span class="title">{this.headerText}</span>
          {this.expanded ? <IconChevronUpThick size={iconSize}></IconChevronUpThick> : <IconChevronDownThick size={iconSize}></IconChevronDownThick>}
        </div>
        <div class={bodyClass}>
          <slot />
        </div>
      </div>
    );
  }
}

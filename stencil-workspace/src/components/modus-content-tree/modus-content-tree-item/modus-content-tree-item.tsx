// eslint-disable-next-line
import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { IconDragHandle } from '../../icons/icon-drag-handle';
import { IconChevronRightThick } from '../../icons/icon-chevron-right-thick';
import { IconChevronDownThick } from '../../icons/icon-chevron-down-thick';
import { IconFolder } from '../../icons/icon-folder';

@Component({
  tag: 'modus-content-tree-item',
  styleUrl: 'modus-content-tree-item.scss',
  shadow: true,
})
export class ModusContentTreeItem {
  /** Whether the item can be dragged */
  @Prop() allowDrag: boolean;

  /** Whether the item's checkbox is checked */
  @Prop() checkboxChecked: boolean;

  /** The item's depth */
  @Prop() depth = 0;

  /** (optional) Disables the item */
  @Prop() disabled: boolean;

  /** Whether the item is expandable */
  @Prop() expandable: boolean;

  /** Whether the item is expanded */
  @Prop() expanded: boolean;

  /** Whether to include the item's bottom border */
  @Prop() includeBottomBorder: boolean;

  /** Whether to include the item's checkbox */
  @Prop() includeCheckbox: boolean;

  /** Whether to include the folder icon */
  @Prop() includeFolderIcon: boolean; // TODO: Replace this with a dynamic icon section when Modus Icons package is ready.

  /** (optional) The selected state of the item */
  @Prop() selected: boolean;

  /** (optional) The size of the item */
  @Prop() size: 'condensed' | 'standard' = 'standard';

  /** An event that first on item checkbox click */
  @Event() checkboxClick: EventEmitter<boolean>;

  /** An event that fires on item expand click */
  @Event() expandClick: EventEmitter<boolean>;

  /** An event that fires on item click */
  @Event() itemClick: EventEmitter;

  classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
  ]);

  handleCheckboxClick = (event: CustomEvent<boolean>): void => {
    this.checkboxChecked = event.detail;
    this.checkboxClick.emit(this.checkboxChecked);
  };

  handleExpandClick = (): void => {
    if (this.disabled) { return;}

    this.expanded = !this.expanded;
    this.expandClick.emit(this.expanded);
  };

  render(): unknown {
    const containerClass = `
      ${this.classBySize.get(this.size)}
      ${this.disabled ? 'disabled' : ''}
      ${this.includeBottomBorder ? 'bottom-border' : ''}
      ${this.selected ? 'selected' : ''}
    `;
    const iconSize = this.size === 'condensed' ? '18' : '22';
    const depthPadding = `${this.depth * (this.size === 'condensed' ? 26 : 32)}px`;

    return (
      <li
        class={containerClass}
        draggable={this.allowDrag}
        onClick={() => !this.disabled ? this.itemClick.emit() : null}>
        <div class="drag-handle-container">
          {this.allowDrag && <IconDragHandle />}
        </div>
        <div class="depth-padding" style={{width: depthPadding}} />
        {this.expandable && (
          <div class="icon-container" onClick={this.handleExpandClick}>
            {this.expanded ? <IconChevronDownThick size={iconSize} /> : <IconChevronRightThick size={'18'} />}
          </div>
        )}
        {!this.expandable && <div class="icon-container"></div>}
        {this.includeCheckbox && (
          <div class="icon-container">
            <modus-checkbox
              checked={this.checkboxChecked}
              disabled={this.disabled}
              onCheckboxClick={this.handleCheckboxClick}
              size={this.size === 'condensed' ? 'small' : 'medium'} />
          </div>
        )}
        {this.includeFolderIcon && (
          <div class="icon-container">
            <IconFolder size={iconSize} />
          </div>
        )}
        <span class="slot">
          <slot />
        </span>
      </li>
    );
  }
}

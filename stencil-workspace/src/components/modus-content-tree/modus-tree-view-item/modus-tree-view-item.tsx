// eslint-disable-next-line
import { Component, Prop, State, h, Element, Event, EventEmitter } from '@stencil/core';
import { IconChevronDownThick } from '../../icons/icon-chevron-down-thick';
import { IconChevronRightThick } from '../../icons/icon-chevron-right-thick';
import TreeViewItemOptions from '../TreeViewItemOptions';

@Component({
  tag: 'modus-tree-view-item',
  styleUrl: 'modus-tree-view-item.scss',
  shadow: true,
})
export class ModusTreeViewItem {
  @Element() element: HTMLElement;

  /** (optional) Checked state of the tree item */
  @Prop({ mutable: true }) checked: boolean;

  /** (optional) Disables the tree item */
  @Prop() disabled: boolean;

  /** (optional) Expanded state of the tree item */
  @Prop({ mutable: true }) expanded: boolean;

  /** (optional) Checkbox indeterminate state of the tree item */
  @Prop({ mutable: true }) indeterminate: boolean;

  /** (required) Label for the tree item */
  @Prop() label!: string;

  /**
   * @internal
   */
  @Prop() level = 1;

  /** (required) Unique tree item identifier */
  @Prop() nodeId!: string;

  /**
   * @internal
   */
  @Prop() options: TreeViewItemOptions;

  /** (optional) Selected state of the tree item */
  @Prop({ mutable: true }) selected: boolean;

  /** An event that fires on tree item click */
  @Event() itemClick: EventEmitter<boolean>;

  /** An event that fires on tree item expand/collapse */
  @Event() itemExpandToggle: EventEmitter<boolean>;

  /** An event that fires on tree item checkbox click */
  @Event() checkboxClick: EventEmitter<boolean>;

  /**
   * @internal
   */
  @Event() itemAdded: EventEmitter<HTMLElement>;

  @State() expandable: boolean;

  @State() slots: Map<string, boolean> = new Map();

  componentWillLoad() {
    this.itemAdded.emit(this.element);
  }

  handleSlotChange(): void {
    const children = this.element.querySelectorAll('modus-tree-view-item') as unknown as HTMLModusTreeViewItemElement[];
    if (children.length > 0) {
      this.expandable = true;
      Array.from(children).forEach((c) => {
        c.level = this.level + 1;
        c.disabled = this.options?.disabled || this.disabled;
      });
    } else this.expandable = false;

    const slotElements = this.element.querySelectorAll('[slot]') as unknown as HTMLSlotElement[];
    const newSlots: Map<string, boolean> = new Map();
    slotElements.forEach((e) => {
      newSlots.set(e.slot, true);
    });
    this.slots = new Map(newSlots);
  }

  handleExpandToggle(): void {
    this.expanded = !this.expanded;
    this.itemExpandToggle.emit(this.expanded);
  }

  handleCheckboxClick(handler: (id: string, element: HTMLModusTreeViewItemElement) => void): void {
    if (handler) handler(this.nodeId, this.element as HTMLModusTreeViewItemElement);
    this.checkboxClick.emit(!this.checked);
  }

  handleItemClick(handler: (id: string, element: HTMLModusTreeViewItemElement) => void): void {
    if (handler) handler(this.nodeId, this.element as HTMLModusTreeViewItemElement);
    this.itemClick.emit(!this.selected);
  }

  shouldHandleEvent(e: Event, isDisabled: boolean, stopPropagation = true): boolean {
    if (isDisabled) return false;
    if (stopPropagation) e.stopPropagation();
    return true;
  }

  private classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
    ['large', 'large'],
  ]);

  private collapseIconSlot = 'collapse-icon';
  private dragIconSlot = 'drag-icon';
  private expandIconSlot = 'expand-icon';
  private itemIconSlot = 'item-icon';

  render(): HTMLLIElement {
    const { checkboxSelection, multiCheckboxSelection, disabled: defaultDisabled, size, onCheckboxSelection, onItemSelection } = this.options || {};

    const ariaControls = {
      ...(this.expandable ? { 'aria-expanded': this.expanded ? 'true' : 'false' } : {}),
      'aria-selected': this.selected ? 'true' : 'false',
      'aria-disabled': this.disabled ? 'true' : 'false',
    };

    const finalExpandIcon = this.slots.has(this.expandIconSlot) ? <slot name={this.expandIconSlot}></slot> : <IconChevronRightThick />;
    const finalCollapseIcon = this.slots.has(this.collapseIconSlot) ? <slot name={this.collapseIconSlot}></slot> : <IconChevronDownThick />;
    const isDisabled = defaultDisabled || this.disabled;

    const sizeClass = `${this.classBySize.get(size || 'standard')}`;
    const treeItemClass = `tree-item ${this.selected ? 'selected' : ''} ${sizeClass} ${isDisabled ? 'disabled' : ''} `;
    const treeItemChildrenClass = `tree-item-group ${sizeClass} ${this.expanded ? 'expanded' : ''}`;

    return (
      <li aria-level={this.level} role="treeitem" {...ariaControls} class="tree-item-container">
        <div
          class={treeItemClass}
          onClick={(e) => {
            this.shouldHandleEvent(e, isDisabled, false) && this.handleItemClick(onItemSelection);
          }}>
          <div class="icon-slot drag-icon">
            <slot name={this.dragIconSlot}></slot>
          </div>
          <div onClick={(e) => this.shouldHandleEvent(e, isDisabled) && this.handleExpandToggle()} class="icon-slot" style={{ paddingLeft: `${(this.level - 1) * 0.5}rem` }}>
            {this.expandable && (this.expanded ? finalCollapseIcon : finalExpandIcon)}
          </div>
          {(checkboxSelection || multiCheckboxSelection) && (
            <div class="icon-slot">
              <modus-checkbox
                onClick={(e) => this.shouldHandleEvent(e, isDisabled) && this.handleCheckboxClick(onCheckboxSelection)}
                indeterminate={this.indeterminate}
                checked={this.checked}
                disabled={isDisabled}></modus-checkbox>
            </div>
          )}
          {this.slots.has(this.itemIconSlot) && (
            <div class="icon-slot">
              <slot name={this.itemIconSlot}></slot>
            </div>
          )}

          <div role="heading" aria-level={this.level}>
            <div role="button" class="label-slot">
              {this.label}
            </div>
          </div>
        </div>
        <ul class={treeItemChildrenClass} role="tree">
          <slot onSlotchange={() => !isDisabled && this.handleSlotChange()} />
        </ul>
      </li>
    );
  }
}

// eslint-disable-next-line
import { Component, Prop, State, h, Element, Event, EventEmitter, Method, Watch, FunctionalComponent } from '@stencil/core';
import { IconChevronDownThick } from '../../icons/icon-chevron-down-thick';
import { IconChevronRightThick } from '../../icons/icon-chevron-right-thick';
import { TreeViewItemOptions } from '../types';

/**
 * @slot collapseIcon - Slot for custom collapse icon
 * @slot dragIcon - Slot for custom drag icon
 * @slot expandIcon - Slot for custom expand icon
 * @slot itemIcon - Slot for custom item icon
 */

@Component({
  tag: 'modus-tree-view-item',
  styleUrl: 'modus-tree-view-item.scss',
  shadow: true,
})
export class ModusTreeViewItem {
  @Element() element: HTMLElement;

  /** (optional) Checked state of the tree item */
  @Prop({ mutable: true }) checked: boolean;

  /** An event that fires on tree item checkbox click */
  @Event() checkboxClick: EventEmitter<boolean>;

  /** (optional) Disables the tree item */
  @Prop() disabled: boolean;

  /** (optional) Expanded state of the tree item */
  @Prop({ mutable: true }) expanded: boolean;

  /** An event that fires on tree item click */
  @Event() itemClick: EventEmitter<boolean>;

  /** An event that fires on tree item expand/collapse */
  @Event() itemExpandToggle: EventEmitter<boolean>;

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

  /**
   * @internal
   */
  @Event() itemAdded: EventEmitter<HTMLElement>;

  @State() slots: Map<string, boolean> = new Map();

  private childrenIds: string[] = [];
  private classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
    ['large', 'large'],
  ]);
  private collapseIconSlot = 'collapseIcon';
  private dragIconSlot = 'dragIcon';
  private expandIconSlot = 'expandIcon';
  private itemIconSlot = 'itemIcon';
  private treeItemDiv;

  private IconSlotTemplate: FunctionalComponent<{ name: string }> = ({ name }) => <slot onSlotchange={() => this.handleIconSlotChange()} name={name}></slot>;

  componentWillLoad() {
    this.itemAdded.emit(this.element);
    this.handleIconSlotChange();
  }

  @Method()
  async focusItem(): Promise<void> {
    this.treeItemDiv.focus();
  }

  handleCheckboxClick(e: Event): void {
    const { onCheckboxSelection, hasItemDisabled } = this.options || {};
    e.stopPropagation();

    if (hasItemDisabled(this.nodeId)) return;

    if (onCheckboxSelection) onCheckboxSelection(this.nodeId);
    this.checkboxClick.emit(!this.checked);
  }

  handleDefaultSlotChange(): void {
    const { updateItem } = this.options || {};
    // eslint-disable-next-line prefer-const
    let siblings: string[] = [];

    const children = this.element.children as unknown as HTMLModusTreeViewItemElement[];
    if (children.length > 0) {
      Array.from(children)
        .filter((c) => c.nodeId)
        .forEach((c) => {
          c.level = this.level + 1;
          siblings.push(c.nodeId);
        });
    }

    this.childrenIds = [...siblings];
    updateItem({ nodeId: this.nodeId, children: this.childrenIds });
  }

  @Watch('disabled')
  handleDisabledChanged(newValue: boolean) {
    const { updateItem } = this.options || {};
    if (updateItem) updateItem({ nodeId: this.nodeId, disabled: newValue });
  }

  @Watch('nodeId')
  handleNodeIdChanged(newValue: string, oldValue: string) {
    const { updateItem } = this.options || {};
    if (updateItem) updateItem({ nodeId: newValue }, { nodeId: oldValue });
  }

  handleExpandToggle(e: Event): void {
    const { onItemExpandToggle, hasItemDisabled } = this.options || {};
    e.stopPropagation();

    if (hasItemDisabled(this.nodeId)) return;

    if (onItemExpandToggle) onItemExpandToggle(this.nodeId);
    this.itemExpandToggle.emit(this.expanded);
  }

  handleFocus(): void {
    const { onItemFocus, hasItemFocus } = this.options || {};
    if (!hasItemFocus(this.nodeId)) {
      onItemFocus(this.nodeId);
    }
  }

  handleIconSlotChange(): void {
    const slotElements = this.element.querySelectorAll('[slot]') as unknown as HTMLSlotElement[];
    const newSlots: Map<string, boolean> = new Map();
    let isUpdated = slotElements.length !== this.slots.size;
    slotElements.forEach((e) => {
      newSlots.set(e.slot, true);
      isUpdated = !this.slots.get(e.slot) || isUpdated;
    });

    if (isUpdated) this.slots = new Map(newSlots);
  }

  handleItemClick(e: MouseEvent): void {
    const { onItemSelection, hasItemDisabled } = this.options || {};

    if (hasItemDisabled(this.nodeId)) return;

    if (onItemSelection) onItemSelection(e, this.nodeId);
    this.itemClick.emit(!this.selected);
  }

  handleSpaceEnterKeyPress(e: KeyboardEvent, handler: () => void): void {
    switch (e.code) {
      case 'Space':
      case 'Enter':
        handler();
        e.preventDefault();
        break;
    }
  }

  render(): HTMLLIElement {
    const { checkboxSelection, multiCheckboxSelection, size, hasItemSelected, hasItemDisabled } = this.options || {};

    const expandable = this.element.hasChildNodes();
    const isDisabled = hasItemDisabled && hasItemDisabled(this.nodeId);
    const tabIndex = isDisabled ? -1 : 0;

    const ariaControls = {
      'aria-level': this.level,
      'aria-selected': this.selected ? 'true' : 'false',
      'aria-disabled': isDisabled ? 'true' : 'false',
      ...(expandable ? { 'aria-expanded': this.expanded ? 'true' : 'false' } : {}),
      role: 'treeitem',
    };
    const finalExpandIcon = this.slots.has(this.expandIconSlot) ? <this.IconSlotTemplate name={this.expandIconSlot} /> : <IconChevronRightThick />;
    const finalCollapseIcon = this.slots.has(this.collapseIconSlot) ? <this.IconSlotTemplate name={this.collapseIconSlot} /> : <IconChevronDownThick />;
    const sizeClass = `${this.classBySize.get(size || 'standard')}`;
    const treeItemClass = `tree-item ${this.selected ? 'selected' : ''} ${sizeClass} ${isDisabled ? 'disabled' : ''} `;
    const treeItemChildrenClass = `tree-item-group ${sizeClass} ${this.expanded ? 'expanded' : ''}`;
    const hasSelectionIndicator = this.selected || (!this.expanded && expandable && Boolean(this.childrenIds.find((i) => hasItemSelected(i))));

    return (
      <li {...ariaControls} class={`tree-item-container${hasSelectionIndicator ? ' selected-indicator' : ''}`}>
        <div class={treeItemClass} ref={(el) => (this.treeItemDiv = el)} tabindex={tabIndex} onFocus={() => this.handleFocus()} onClick={(e) => this.handleItemClick(e)}>
          <div class="icon-slot drag-icon">
            <this.IconSlotTemplate name={this.dragIconSlot} />
          </div>
          <div style={{ paddingLeft: `${(this.level - 1) * 0.5}rem` }} aria-disabled="true">
            {/* used for level indentation purpose */}
          </div>
          <div tabIndex={expandable ? tabIndex : -1} class="icon-slot" onClick={(e) => this.handleExpandToggle(e)} onKeyDown={(e) => this.handleSpaceEnterKeyPress(e, () => this.handleExpandToggle(e))}>
            {expandable && (this.expanded ? finalCollapseIcon : finalExpandIcon)}
          </div>
          {(checkboxSelection || multiCheckboxSelection) && (
            <div class="icon-slot">
              <modus-checkbox
                checked={this.checked}
                disabled={isDisabled}
                indeterminate={this.indeterminate}
                onClick={(e) => this.handleCheckboxClick(e)}
                onKeyDown={(e) => this.handleSpaceEnterKeyPress(e, () => this.handleCheckboxClick(e))}></modus-checkbox>
            </div>
          )}
          {this.slots.has(this.itemIconSlot) && (
            <div class="icon-slot">
              <this.IconSlotTemplate name={this.itemIconSlot} />
            </div>
          )}
          <div role="heading" aria-level={this.level}>
            <div role="button" class="label-slot">
              {this.label}
            </div>
          </div>
        </div>
        <ul class={treeItemChildrenClass} role="tree">
          <slot onSlotchange={() => this.handleDefaultSlotChange()} />
        </ul>
      </li>
    );
  }
}

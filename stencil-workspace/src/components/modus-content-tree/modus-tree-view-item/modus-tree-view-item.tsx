import {
  Component,
  Prop,
  State,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Element,
  Event,
  EventEmitter,
  Listen,
  Method,
  Watch,
  FunctionalComponent,
} from '@stencil/core';
import { ModusIconMap } from '../../../icons/ModusIconMap';
import { TreeViewItemOptions } from '../modus-content-tree.types';
import { TREE_ITEM_SIZE_CLASS } from '../modus-content-tree.constants';
import { ModusActionBarOptions } from '../../modus-action-bar/modus-action-bar';

/**
 * @slot collapseIcon - Slot for custom collapse icon
 * @slot dragIcon - Slot for custom drag icon
 * @slot expandIcon - Slot for custom expand icon
 * @slot itemIcon - Slot for custom item icon
 * @slot label - Slot for custom label element
 */

@Component({
  tag: 'modus-tree-view-item',
  styleUrl: 'modus-tree-view-item.scss',
  shadow: true,
})
export class ModusTreeViewItem {
  @Element() element: HTMLElement;

  /** An event that fires on tree item checkbox click */
  @Event() checkboxClick: EventEmitter<boolean>;

  /** (optional) Disables the tree item */
  @Prop() disabled: boolean;

  /** (optional) Allows the item to be dragged across the tree */
  @Prop() draggableItem: boolean;

  /** (optional) Allows the item to be a drop zone so other tree items can be dropped above it */
  @Prop() droppableItem: boolean;

  /** (optional) Changes the label field into a text box */
  @Prop({ mutable: true }) editable: boolean;

  /** An event that fires on tree item click */
  @Event() itemClick: EventEmitter<boolean>;

  /** An event that fires on tree item expand/collapse */
  @Event() itemExpandToggle: EventEmitter<boolean>;

  /** (required) Label for the tree item */
  @Prop({ mutable: true, reflect: true }) label!: string;

  /** (required) Unique tree item identifier */
  @Prop({ reflect: true }) nodeId!: string;

  /** (optional) Tab Index for the tree item */
  @Prop({ mutable: true }) tabIndexValue: string | number = 0;

  /** (optional) Actions that can be performed on each item. A maximum of 3 icons will be shown, including overflow menu and expand icons. */
  @Prop({ mutable: true }) actions: ModusActionBarOptions[];

  /** To be set true when the tree item is an expandable last child */
  @Prop() isLastChild: boolean;

  @State() isExpanded: boolean;
  @State() isChildren: boolean;

  @Listen('actionBarClick')
  handleActionBarClick(event: CustomEvent) {
    const actionId = event.detail.actionId;
    this.actionClick.emit({ actionId });
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * @internal
   */
  @Event() itemAdded: EventEmitter<HTMLElement>;

  /**
   * Fired when an action button within the tree item is clicked. Includes the `actionId`.
   */
  @Event() actionClick: EventEmitter;

  @State() childrenIds: string[];
  @State() forceUpdate = {};
  @State() slots: Map<string, boolean> = new Map();

  private refItemContent: HTMLDivElement;
  private refLabelInput: HTMLModusTextInputElement;
  private refCheckbox: HTMLModusCheckboxElement;
  private options: TreeViewItemOptions;

  readonly SLOT_COLLAPSE_ICON = 'collapseIcon';
  readonly SLOT_DRAG_ICON = 'dragIcon';
  readonly SLOT_EXPAND_ICON = 'expandIcon';
  readonly SLOT_ITEM_ICON = 'itemIcon';
  readonly SLOT_LABEL = 'label';

  CustomSlot: FunctionalComponent<{
    name: string;
    className?: string;
    defaultContent?: string | HTMLElement;
    display?: boolean;
    onClick?: (e: MouseEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    role?: string;
  }> = ({ name, className, defaultContent, display = true, ...props }) => {
    const showDefault = !this.slots.has(name) && defaultContent;
    return (
      <div {...props} class={`${className || ''} ${display ? '' : 'd-none'}`}>
        <slot name={name} onSlotchange={() => this.handleDefaultSlotChange()}></slot>
        {showDefault && defaultContent}
      </div>
    );
  };

  connectedCallback() {
    // the element is moved in the DOM, register it on the root
    // example, drag and drop
    if (this.options) {
      this.options.onItemAdd(this.element);
    }
  }

  componentDidRender() {
    // Needed for retaining focus on the label input while in edit mode
    if (this.refLabelInput && this.editable) {
      this.refLabelInput.focusInput();
    }
    const children = this.element.querySelectorAll('modus-tree-view-item') as unknown as HTMLModusTreeViewItemElement[];
    children.forEach((child) => {
      console.log('child', child);
      child.setChildren();
    });
  }

  @Method()
  async setChildren() {
    this.isChildren = true;
  }

  componentWillLoad() {
    this.itemAdded.emit(this.element);
    this.handleDefaultSlotChange();
  }

  disconnectedCallback() {
    // the element has been moved or deleted in the DOM, deregister it on the root
    this.options?.onItemDelete(this.nodeId);
  }

  /** Focus the tree item */
  @Method()
  async focusItem(): Promise<void> {
    this.refItemContent.focus();
  }

  /** Focus the checkbox inside a tree item */
  @Method()
  async focusCheckbox(): Promise<void> {
    if (this.refCheckbox) this.refCheckbox.focusCheckbox();
  }

  getChildrenIds(): string[] {
    return Array.from(this.element.children as unknown as HTMLModusTreeViewItemElement[])
      .map((i) => i.nodeId)
      .filter((i) => i);
  }

  handleCheckboxClick(e?: Event): void {
    if (this.shouldHandleEvent(e)) {
      const { onCheckboxSelection, hasItemChecked } = this.options;

      onCheckboxSelection(this.nodeId);
      this.checkboxClick.emit(hasItemChecked(this.nodeId));
    }
  }

  handleDefaultKeyDown(e: KeyboardEvent, handler: () => void): void {
    switch (e.code) {
      case 'Space':
      case 'Enter':
        handler();
        e.preventDefault();
        break;
    }
  }

  handleDefaultSlotChange(): void {
    const slotElements = this.element.querySelectorAll('[slot]') as unknown as HTMLSlotElement[];
    const newSlots: Map<string, boolean> = new Map();

    // look for icon/label slot added/removed
    let isUpdated = slotElements.length !== this.slots.size;
    slotElements.forEach((e) => {
      newSlots.set(e.slot, true);
      isUpdated = !this.slots.get(e.slot) || isUpdated;
    });

    if (isUpdated) this.slots = new Map(newSlots);
  }

  handleDrag(e: MouseEvent) {
    if (this.shouldHandleEvent(e)) {
      e.preventDefault();

      const dragContent = this.refItemContent.cloneNode(true) as HTMLElement;
      this.options.onItemDrag(this.nodeId, dragContent, e);
    }
  }

  handleExpandToggle(e?: Event): void {
    if (this.shouldHandleEvent(e)) {
      const { onItemExpandToggle, hasItemExpanded } = this.options;

      onItemExpandToggle(this.nodeId);
      this.isExpanded = hasItemExpanded(this.nodeId);
      this.itemExpandToggle.emit(hasItemExpanded(this.nodeId));
    }
  }

  handleFocus(): void {
    const { onItemFocus, hasItemFocus } = this.options || {};
    if (!hasItemFocus(this.nodeId)) {
      onItemFocus(this.nodeId);
    }
  }

  handleItemClick(e?: KeyboardEvent | MouseEvent): void {
    if (e.defaultPrevented) {
      return;
    }

    if (this.shouldHandleEvent(e)) {
      const { onItemSelection, hasItemSelected } = this.options;

      onItemSelection(this.nodeId, e);
      this.itemClick.emit(hasItemSelected(this.nodeId));
    }
  }

  handleKeyDownTreeItem(e: KeyboardEvent) {
    if (e.defaultPrevented) {
      return; // Do nothing if event already handled
    }
    switch (e.code) {
      case 'Space':
        this.handleExpandToggle(e);
        e.preventDefault();
        e.stopPropagation();
        break;
      case 'Enter':
        this.handleItemClick(e);
        e.stopPropagation();
        break;
    }
  }

  handleLabelInputClick(e: Event) {
    e.stopPropagation();
  }

  handleLabelInputBlur() {
    this.updateLabelInput();
  }

  handleLabelInputKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'Enter':
        e.preventDefault();
        this.updateLabelInput();
        break;
    }
  }

  @Watch('disabled')
  handlePropDisabledChange(newValue: boolean) {
    // sync root
    this.options?.onItemUpdate({ nodeId: this.nodeId, disabled: newValue });
  }

  @Watch('nodeId')
  handlePropNodeIdChange(newValue: string, oldValue: string) {
    // sync root
    this.options?.onItemUpdate({ nodeId: newValue }, { nodeId: oldValue });
  }

  handleRefItemContent(ref) {
    this.refItemContent = ref;
    this.options?.onItemUpdate({ nodeId: this.nodeId, content: ref });
  }

  handleTreeSlotChange(): void {
    const newChildren = this.getChildrenIds();
    const isUpdated =
      this.childrenIds && newChildren
        ? this.childrenIds.length !== newChildren.filter((c) => this.childrenIds.includes(c)).length
        : this.childrenIds?.length !== newChildren?.length;

    if (this.options) {
      const { onItemUpdate, multiCheckboxSelection, onCheckboxSelection } = this.options;

      // sync root
      onItemUpdate({ nodeId: this.nodeId, children: [...newChildren] });

      // sync the checkboxes if there is any child added/removed
      if (this.childrenIds?.length && this.childrenIds.length !== newChildren?.length && multiCheckboxSelection) {
        onCheckboxSelection(this.nodeId, true);
      }
    }
    // avoid re-render if the value is not updated
    this.childrenIds = isUpdated ? [...newChildren] : this.childrenIds;
  }

  /**
   * @internal
   */
  @Method()
  async initTreeViewItem(newValue: TreeViewItemOptions): Promise<void> {
    this.options = { ...newValue };
    this.handleTreeSlotChange();
    this.updateComponent();
    this.tabIndexValue = this.options.disableTabbing ? -1 : this.tabIndexValue;
  }

  rootOptions() {
    if (this.options) {
      const {
        checkboxSelection,
        multiCheckboxSelection,
        showSelectionIndicator,
        size,
        borderless,
        getLevel,
        hasItemSelected,
        hasItemDisabled,
        hasItemIndeterminate,
        hasItemExpanded,
        hasItemChecked,
      } = this.options;
      const selected = hasItemSelected(this.nodeId);
      const checked = hasItemChecked(this.nodeId);
      const indeterminate = hasItemIndeterminate(this.nodeId);
      const expanded = hasItemExpanded(this.nodeId);
      const level = getLevel(this.nodeId);
      const isDisabled = hasItemDisabled(this.nodeId);
      const selectionIndicator = showSelectionIndicator(this.nodeId);

      return {
        selected,
        checked,
        indeterminate,
        expanded,
        expandable: Boolean(this.childrenIds?.length),
        level,
        checkboxSelection,
        multiCheckboxSelection,
        size,
        borderless,
        isDisabled,
        selectionIndicator,
      };
    } else
      return {
        level: 1,
      };
  }

  shouldHandleEvent(e?: Event): boolean {
    if (e) e.stopPropagation();
    // Do not handle the event when the item is disabled
    return this.options && !this.options.hasItemDisabled(this.nodeId);
  }

  /**
   * @internal
   */
  @Method()
  async updateComponent(): Promise<void> {
    this.forceUpdate = { ...this.forceUpdate };
  }

  updateLabelInput() {
    if (this.refLabelInput) {
      this.label = this.refLabelInput.value;
    }
    this.refLabelInput = null;
    this.editable = false;
  }

  render(): HTMLLIElement {
    const {
      selected,
      checked,
      indeterminate,
      expanded,
      expandable,
      level,
      checkboxSelection,
      multiCheckboxSelection,
      size,
      borderless,
      isDisabled,
      selectionIndicator,
    } = this.rootOptions();

    const ariaControls = {
      'aria-level': level,
      'aria-selected': selected ? 'true' : 'false',
      'aria-disabled': isDisabled ? 'true' : 'false',
      ...(expandable ? { 'aria-expanded': expanded ? 'true' : 'false' } : {}),
      role: 'treeitem',
    };
    const sizeClass = `${TREE_ITEM_SIZE_CLASS.get(size || 'standard')}`;
    const tabIndex: string | number = isDisabled ? -1 : this.tabIndexValue;
    const treeItemClass = `tree-item ${this.isExpanded ? 'expanded' : ''} ${this.isChildren ? 'is-children' : ''} ${this.isLastChild && !this.isExpanded ? 'is-last-child' : ''}${selected ? 'selected' : ''} ${sizeClass} ${isDisabled ? 'disabled' : ''} ${borderless ? 'borderless' : ''}`;
    const treeItemChildrenClass = `tree-item-group ${sizeClass} ${expanded ? 'expanded' : ''}`;

    return (
      <li {...ariaControls} class={`tree-item-container${selectionIndicator ? ' selected-indicator' : ''}`}>
        <div
          class={treeItemClass}
          onFocus={() => this.handleFocus()}
          onClick={(e) => this.handleItemClick(e)}
          onKeyDown={(e) => this.handleKeyDownTreeItem(e)}
          ref={(el) => this.handleRefItemContent(el)}
          tabindex={tabIndex}>
          <this.CustomSlot
            className={`icon-slot drag-icon${!this.draggableItem ? ' hidden' : ''}`}
            defaultContent={<ModusIconMap icon="drag_indicator" />}
            name={this.SLOT_DRAG_ICON}
            onMouseDown={(e) => this.handleDrag(e)}
          />
          <div aria-disabled="true" style={{ paddingLeft: `${(level - 1) * 0.5}rem` }}>
            {/* used for level indentation purpose */}
          </div>
          <div
            class={`icon-slot${!expandable ? ' hidden' : ''}`}
            onClick={(e) => this.handleExpandToggle(e)}
            onKeyDown={(e) => this.handleDefaultKeyDown(e, () => this.handleExpandToggle(e))}
            tabindex={expandable ? tabIndex : -1}>
            <this.CustomSlot
              className="inline-flex rotate-right"
              defaultContent={<ModusIconMap icon="expand_more" size="24" />}
              display={!expanded}
              name={this.SLOT_EXPAND_ICON}
            />
            <this.CustomSlot
              className="inline-flex"
              defaultContent={<ModusIconMap icon="expand_more" size="24" />}
              display={expanded}
              name={this.SLOT_COLLAPSE_ICON}
            />
          </div>

          {(checkboxSelection || multiCheckboxSelection) && (
            <div class="icon-slot">
              <modus-checkbox
                checked={checked}
                disabled={isDisabled}
                indeterminate={indeterminate}
                onClick={(e) => this.handleCheckboxClick(e)}
                onKeyDown={(e) => this.handleDefaultKeyDown(e, () => this.handleCheckboxClick(e))}
                ref={(el) => (this.refCheckbox = el)}
                tabIndexValue={tabIndex}></modus-checkbox>
            </div>
          )}

          <this.CustomSlot className="icon-slot" name={this.SLOT_ITEM_ICON} display={this.slots.has(this.SLOT_ITEM_ICON)} />
          <div role="heading" aria-level={level} class="label-slot">
            <this.CustomSlot
              role="button"
              name={this.SLOT_LABEL}
              defaultContent={
                this.editable ? (
                  <modus-text-input
                    size={size == 'large' ? 'large' : 'medium'}
                    autoFocusInput={true}
                    tabindex={0}
                    ref={(el) => (this.refLabelInput = el)}
                    value={this.label}
                    onClick={(e) => this.handleLabelInputClick(e)}
                    onBlur={() => this.handleLabelInputBlur()}
                    onKeyDown={(e) => this.handleLabelInputKeyDown(e)}></modus-text-input>
                ) : (
                  this.label
                )
              }></this.CustomSlot>
          </div>

          {this.actions?.length > 0 && <modus-action-bar visible-item-count={3} actions={this.actions}></modus-action-bar>}
        </div>
        <ul class={treeItemChildrenClass} role="tree">
          <slot onSlotchange={() => this.handleTreeSlotChange()} />
        </ul>
      </li>
    );
  }
}

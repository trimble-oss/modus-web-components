// eslint-disable-next-line
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import {
  TreeViewItemOptions,
  TreeViewItemInfo,
  TreeViewItemDragState,
  Position,
} from '../modus-content-tree.types';
import { ModusContentTreeDragItem } from '../modus-content-tree-drag-item';

@Component({
  tag: 'modus-tree-view',
  styleUrl: 'modus-tree-view.scss',
  shadow: true,
})
export class ModusTreeView {
  @Element() element: HTMLElement;

  /** (optional) Enables checkbox selection on each tree item */
  @Prop() checkboxSelection: boolean;

  /** (optional) Set checked tree items */
  @Prop({ mutable: true }) checkedItems: string[] = [];

  /** (optional) Set expanded tree items */
  @Prop({ mutable: true }) expandedItems: string[] = [];

  /** (optional) Enables multiple checkbox selection */
  @Prop() multiCheckboxSelection: boolean;

  /** (optional) Enables multiple tree items selection */
  @Prop() multiSelection: boolean;

  /** (optional) Set selected tree items */
  @Prop({ mutable: true }) selectedItems: string[] = [];

  /** (optional) The default size of all tree items */
  @Prop() size: 'condensed' | 'large' | 'standard' = 'standard';

  @State() itemDragState: TreeViewItemDragState;

  private focusItem: string;
  private items: { [key: string]: TreeViewItemInfo } = {};
  private syncItems: string[] = [];

  // local variables to avoid anonymous event listeners on document
  private onMouseMove = (e) => this.handleItemDragOver(e);
  private onMouseUp = () => this.handleItemDrop();

  readonly INITIAL_DRAG_POSITION: Position = { x: 0, y: 0 };

  clearItemDropState(): TreeViewItemDragState {
    if (!this.itemDragState) return null;

    const { targetId, ...rest } = this.itemDragState;
    if (targetId) {
      this.items[targetId].content.classList.remove('drop-allow');
      this.items[targetId].content.classList.remove('drop-block');
    }
    return { ...rest, targetId: null, validTarget: null };
  }

  @Watch('itemDragState')
  handleItemDragState(
    newValue: TreeViewItemDragState,
    oldValue: TreeViewItemDragState
  ) {
    if (oldValue && newValue && oldValue.itemId === newValue.itemId) return;
    if (newValue) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  handleItemDragStart(
    itemId: string,
    dragContent: HTMLElement,
    event: MouseEvent
  ) {
    const { clientX, clientY, currentTarget } = event;
    const parent = (currentTarget as HTMLElement)?.parentElement;
    this.clearItemDropState();
    this.itemDragState = {
      dragContent,
      origin: { x: clientX, y: clientY },
      translation: this.INITIAL_DRAG_POSITION,
      itemId,
      width: `${parent?.offsetWidth}px`,
      height: `${parent?.offsetHeight}px`,
    };
  }

  handleItemDragOver(event: MouseEvent) {
    if (!this.itemDragState) return;
    const { clientX, clientY } = event;
    const translation = {
      x: clientX,
      y: clientY,
    };

    const {
      nodeId: dropZoneId,
      element: dropZoneItem,
      content: dropZoneContent,
    } = this.getItemWithinBounds(clientX, clientY) || {};

    let newDragState = { ...this.clearItemDropState(), translation };

    if (dropZoneId && dropZoneId !== newDragState.itemId) {
      const parents = this.getParentIds(dropZoneId);
      newDragState = { ...newDragState, targetId: dropZoneId };

      // avoid parent drag & drop over its children
      if (
        dropZoneItem.droppableItem &&
        !this.isItemDisabled(dropZoneId) &&
        !(parents && parents.includes(newDragState.itemId))
      ) {
        newDragState.validTarget = true;
        dropZoneContent.classList.add('drop-allow');
      } else {
        newDragState.validTarget = false;
        dropZoneContent.classList.add('drop-block');
      }
    }
    this.itemDragState = { ...newDragState };
  }

  handleItemDrop() {
    if (!this.itemDragState) return;

    const { itemId: dropItemId, targetId, validTarget } = this.itemDragState;

    if (dropItemId && validTarget && dropItemId !== targetId) {
      const { parentId, element } = this.items[targetId];
      if (element) {
        const insertAtParent = (this.items[parentId]?.element ||
          this.element) as HTMLElement;
        const insertBefore = element as unknown as HTMLElement;
        const insertElement = this.items[this.itemDragState.itemId]
          .element as unknown as HTMLElement;

        insertAtParent.insertBefore(insertElement, insertBefore);
      }
    }

    this.clearItemDropState();
    this.itemDragState = null;
  }

  @Watch('expandedItems')
  @Watch('selectedItems')
  @Watch('checkedItems')
  handleItemsProps(newValue: string[], oldValue: string[]) {
    this.syncItems.push(...(oldValue || []), ...(newValue || []));
  }

  @Watch('checkboxSelection')
  @Watch('multiCheckboxSelection')
  @Watch('multiSelection')
  @Watch('size')
  handleOptionsProps() {
    const options = this.getTreeViewItemOptions();
    Object.values(this.items).forEach(({ element }) => {
      element.initTreeViewItem(options);
    });
  }

  handleTreeSlotChange() {
    const childrenAtRoot = Array.from(
      this.element.children as unknown as HTMLModusTreeViewItemElement[]
    )
      .map((i) => i.nodeId)
      .filter((i) => i);

    childrenAtRoot.forEach((itemId, index) => {
      this.updateItem({ nodeId: itemId, index, parentId: null });
    });
  }

  getItemWithinBounds(x, y): TreeViewItemInfo {
    const node = Object.values(this.items).find(({ content }) => {
      const rect = content?.getBoundingClientRect();
      if (rect) {
        const inVerticalBounds = y >= rect.top && y <= rect.bottom;
        const inHorizontalBounds = x >= rect.left && x <= rect.right;
        return inVerticalBounds && inHorizontalBounds;
      }
      return false;
    });
    return node;
  }

  getParentIds(itemId: string): string[] {
    if (!itemId) return [];

    const { parentId } = this.items[itemId];
    return parentId ? [parentId, ...this.getParentIds(parentId)] : [];
  }

  addItem(ele: HTMLElement) {
    const treeItem = ele as unknown as HTMLModusTreeViewItemElement;
    const parent = ele.parentNode;
    if (treeItem.nodeId) {
      const { children: siblings, nodeId: parentId } =
        parent as unknown as HTMLModusTreeViewItemElement;
      const index = Array.from(
        siblings as unknown as HTMLModusTreeViewItemElement[]
      )
        .filter((i) => i.nodeId)
        .indexOf(treeItem);
      const level = this.getLevel(parentId) + 1;

      this.items[treeItem.nodeId] = {
        ...this.items[treeItem.nodeId],
        nodeId: treeItem.nodeId,
        index,
        element: treeItem,
        disabled: treeItem.disabled,
        parentId,
        level,
      };

      treeItem.initTreeViewItem(this.getTreeViewItemOptions());
    }
  }

  componentDidUpdate() {
    this.syncItems?.forEach((i) => this.syncTreeViewItem(i));
    this.syncItems = [];
  }

  deleteItem(itemId: string): void {
    const item = this.items[itemId];

    // eslint-disable-next-line prefer-const
    let deletedItems = [];
    if (item) {
      // remove children
      item.children.forEach((c) => {
        delete this.items[c];
        deletedItems.push(c);
      });

      // remove self
      delete this.items[itemId];
      deletedItems.push(itemId);

      // remove from API
      const removeFromAPI = (array) => {
        if (array.find((i) => deletedItems.includes(i)))
          return array.filter((i) => !deletedItems.includes(i));
        return array;
      };
      this.checkedItems = removeFromAPI(this.checkedItems);
      this.selectedItems = removeFromAPI(this.selectedItems);
      this.expandedItems = removeFromAPI(this.expandedItems);

      // remove from locals
      if (deletedItems.includes(this.focusItem)) this.focusItem = null;
    }
  }

  getChildrenIds(itemId: string, recursive = true): string[] {
    const children = this.items[itemId]?.children;
    if (!children) return [];
    return Array.from(children)
      .map((c) => this.items[c])
      .sort((a, b) => a.index - b.index)
      .reduce((r, c) => {
        r.push(
          c.nodeId,
          ...(recursive ? this.getChildrenIds(c.nodeId, recursive) : [])
        );
        return r;
      }, []);
  }

  getLevel(itemId: string): number {
    return this.items[itemId]?.level || 0;
  }

  getNavigableChildrenIds(parentId: string): string[] {
    let siblings = [];
    if (parentId) siblings = this.getChildrenIds(parentId, false);
    else {
      siblings = Object.values(this.items)
        .filter((i) => !i.parentId)
        .sort((a, b) => a.index - b.index)
        .map((c) => c.nodeId);
    }

    return siblings.filter((c) => !this.isItemDisabled(c));
  }

  getNextNavigableItem(itemId: string): string {
    // If expanded get first child
    if (this.isItemExpanded(itemId)) {
      const validItems = this.getNavigableChildrenIds(itemId);
      if (validItems.length) return validItems[0];
    }

    let item = this.items[itemId];
    while (item != null) {
      // Try to get next sibling
      const siblings = this.getNavigableChildrenIds(item.parentId);
      const nextSibling = siblings[siblings.indexOf(item.nodeId) + 1];
      if (nextSibling) {
        return nextSibling;
      }

      // If the sibling does not exist, go up a level to the parent and try again.
      item = this.items[item.parentId];
    }

    return itemId;
  }

  getPrevNavigableItem(itemId: string): string {
    const item = this.items[itemId];
    const siblings = this.getNavigableChildrenIds(item.parentId);
    const index = siblings.indexOf(itemId);

    // focus reached the top item
    if (index === 0) {
      return item.parentId || itemId;
    }

    // get previous item, if expanded get its last child
    let curr = siblings[index - 1];
    while (
      this.isItemExpanded(curr) &&
      this.getNavigableChildrenIds(curr).length > 0
    ) {
      curr = this.getNavigableChildrenIds(curr).pop();
    }

    return curr;
  }

  getTreeViewItemOptions(): TreeViewItemOptions {
    return {
      multiSelection: this.multiSelection,
      checkboxSelection: this.checkboxSelection,
      multiCheckboxSelection: this.multiCheckboxSelection,
      size: this.size,

      getLevel: (id) => this.getLevel(id),
      hasItemFocus: (id) => this.isItemInFocus(id),
      hasItemSelected: (id) => this.isItemSelected(id),
      hasItemDisabled: (id) => this.isItemDisabled(id),
      hasItemExpanded: (id) => this.isItemExpanded(id),
      hasItemChecked: (id) => this.isItemChecked(id),
      hasItemIndeterminate: (id) => this.isItemIndeterminate(id),
      showSelectionIndicator: (id) => this.showSelectionIndicator(id),

      onItemSelection: (id, e) => this.handleItemSelection(id, e),
      onCheckboxSelection: (id, syncOnly) =>
        this.handleCheckboxSelection(id, syncOnly),
      onItemExpandToggle: (id) => this.handleItemExpand(id),
      onItemFocus: (id) => this.handleItemFocus(id),
      onItemAdd: (ele) => this.addItem(ele),
      onItemDelete: (id) => this.deleteItem(id),
      onItemUpdate: (newValue, oldValue) => this.updateItem(newValue, oldValue),
      onItemDrag: (id, content, e) => this.handleItemDragStart(id, content, e),
    };
  }

  handleCheckboxSelection(currentId: string, syncOnly = false): void {
    if (this.items[currentId].disabled) return;

    let currentChecked = !this.isItemChecked(currentId);
    let newCheckedItems = [...this.checkedItems];

    // eslint-disable-next-line prefer-const
    let itemsToSync = [...this.checkedItems, currentId];

    if (this.multiCheckboxSelection) {
      // update descendants
      if (syncOnly) {
        // syncOnly ensures no effect on the children checkboxes
        const descendants = this.getChildrenIds(currentId, false);
        const checked = descendants.filter((i) => newCheckedItems.includes(i));
        currentChecked = checked.length === descendants.length;

        if (currentChecked) newCheckedItems.push(currentId);
        else newCheckedItems = newCheckedItems.filter((i) => i !== currentId);
      } else {
        const descendants = this.getChildrenIds(currentId, true);

        if (currentChecked) {
          newCheckedItems.push(currentId, ...descendants);
        } else
          newCheckedItems = newCheckedItems
            .filter((i) => i !== currentId)
            .filter((i) => !descendants.includes(i));

        itemsToSync.push(...descendants);
      }

      // update ancestors
      const ancestors = this.getParentIds(currentId);
      ancestors.forEach((id: string) => {
        const children = this.getChildrenIds(id, false);
        const checked = children.filter((i) => newCheckedItems.includes(i));
        const isChecked = checked.length === children.length;

        if (isChecked) newCheckedItems.push(id);
        else newCheckedItems = newCheckedItems.filter((i) => i !== id);
      });

      // items to be synced
      itemsToSync.push(...ancestors);
    } else {
      newCheckedItems = currentChecked ? [currentId] : [];
    }

    this.checkedItems = [...newCheckedItems];
    this.syncItems.push(...itemsToSync, ...newCheckedItems);
  }

  @Listen('itemAdded')
  handleItemAdded(event: CustomEvent<HTMLElement>) {
    this.addItem(event.detail);

    event.preventDefault();
    event.stopPropagation();
  }

  handleItemExpand(itemId: string): void {
    const { children } = this.items[itemId];
    if (!(children && children.length)) return;

    const isExpanded = !this.isItemExpanded(itemId);
    let newExpandedItems = [...this.expandedItems];
    if (isExpanded) newExpandedItems.push(itemId);
    else newExpandedItems = newExpandedItems.filter((i) => i !== itemId);

    this.expandedItems = [...newExpandedItems];
    this.syncItems.push(itemId);
  }

  handleItemFocus(itemId: string): void {
    const { element: current } = this.items[itemId];
    this.focusItem = itemId;
    current.focusItem();
  }

  handleItemSelection(
    itemId: string,
    event?: KeyboardEvent | MouseEvent
  ): void {
    if (this.items[itemId].disabled) return;
    const allowMultipleSelection =
      this.multiSelection &&
      event &&
      (event.shiftKey || event.ctrlKey || event.metaKey);
    const isSelected = !this.isItemSelected(itemId);

    const oldItems = [...this.selectedItems];
    let newItems = [...this.selectedItems];

    if (isSelected) {
      if (allowMultipleSelection) {
        newItems.push(itemId);
      } else {
        newItems = [itemId];
      }
    } else {
      newItems = newItems.filter((i) => i !== itemId);
    }
    this.selectedItems = [...newItems];
    this.syncItems.push(...oldItems, ...newItems);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }

    const key = event.code;
    let flag = false;
    // If the tree is empty there will be no focused node
    if (event.altKey || !this.focusItem) {
      return;
    }
    switch (key) {
      case 'Space':
        this.handleItemExpand(this.focusItem);
        flag = true;
        break;
      case 'Enter':
        this.handleItemSelection(this.focusItem, event);
        event.stopPropagation();
        break;
      case 'ArrowDown':
        // eslint-disable-next-line no-case-declarations
        const nextItem = this.getNextNavigableItem(this.focusItem);
        if (
          this.multiSelection &&
          event.shiftKey &&
          this.isItemSelected(this.focusItem)
        ) {
          // deselect if going back to the selected node
          if (this.isItemSelected(nextItem))
            this.handleItemSelection(this.focusItem, event);
          else this.handleItemSelection(nextItem, event);
        }
        this.handleItemFocus(nextItem);
        flag = true;
        break;
      case 'ArrowUp':
        // eslint-disable-next-line no-case-declarations
        const prevItem = this.getPrevNavigableItem(this.focusItem);
        if (
          this.multiSelection &&
          event.shiftKey &&
          this.isItemSelected(this.focusItem)
        ) {
          // deselect if going back to the selected node
          if (this.isItemSelected(prevItem))
            this.handleItemSelection(this.focusItem, event);
          else this.handleItemSelection(prevItem, event);
        }

        this.handleItemFocus(prevItem);
        flag = true;
        break;
      case 'ArrowRight':
        if (!this.isItemExpanded(this.focusItem))
          this.handleItemExpand(this.focusItem);
        break;
      case 'ArrowLeft':
        if (this.isItemExpanded(this.focusItem))
          this.handleItemExpand(this.focusItem);
        break;

      default:
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  isItemChecked(itemId: string): boolean {
    return this.checkedItems.includes(itemId);
  }

  isItemExpanded(itemId: string): boolean {
    return this.expandedItems.includes(itemId);
  }

  isItemInFocus(itemId: string): boolean {
    return this.focusItem === itemId;
  }

  isItemSelected(itemId: string): boolean {
    return this.selectedItems.includes(itemId);
  }

  isItemIndeterminate(itemId: string): boolean {
    const children = this.getChildrenIds(itemId);
    if (children && this.multiCheckboxSelection) {
      const checked = children.filter((c) => this.isItemChecked(c));
      return checked.length > 0 && checked.length < children.length;
    }

    return false;
  }

  isItemDisabled(itemId: string): boolean {
    const { disabled } = this.items[itemId];
    const parents = this.getParentIds(itemId);
    return disabled || Boolean(parents?.find((p) => this.items[p].disabled));
  }

  showSelectionIndicator(itemId: string): boolean {
    return (
      this.isItemSelected(itemId) ||
      (!this.isItemExpanded(itemId) &&
        Boolean(
          this.getChildrenIds(itemId, true).find((i) => this.isItemSelected(i))
        ))
    );
  }

  syncTreeViewItem(itemId: string) {
    this.items[itemId]?.element?.syncWithRoot();
  }

  updateItem(newValue: TreeViewItemInfo, oldValue?: TreeViewItemInfo): void {
    let existing: TreeViewItemInfo;

    if (oldValue && newValue.nodeId !== oldValue.nodeId) {
      existing = { ...this.items[oldValue.nodeId] };
      delete this.items[oldValue.nodeId];
    } else existing = { ...this.items[newValue.nodeId] };

    if (existing) {
      this.items[newValue.nodeId] = { ...existing, ...newValue };
      newValue.children?.forEach((i) => {
        const item = this.items[i];
        this.items[i] = { ...item, parentId: newValue.nodeId };
      });
    } else this.items[newValue.nodeId] = { ...newValue };
  }

  render(): HTMLUListElement {
    return (
      <Host>
        <ul role="tree" onKeyDown={(e) => this.handleKeyDown(e)}>
          <slot onSlotchange={() => this.handleTreeSlotChange()} />
        </ul>
        <ModusContentTreeDragItem
          draggingState={this.itemDragState}></ModusContentTreeDragItem>
      </Host>
    );
  }
}

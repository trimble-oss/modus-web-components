// eslint-disable-next-line
import { Component, Element, h, Listen, Prop } from '@stencil/core';
import { ModusTreeViewItem } from '../modus-tree-view-item/modus-tree-view-item';
import { TreeViewItemOptions, TreeViewItemInfo } from '../types';

@Component({
  tag: 'modus-tree-view',
  styleUrl: 'modus-tree-view.scss',
  shadow: true,
})
export class ModusTreeView {
  @Element() element: HTMLElement;

  /** (optional) Enables checkbox selection on each tree item */
  @Prop() checkboxSelection: boolean;

  /** (optional) Checked tree items by default */
  @Prop({ mutable: true }) checkedItems: string[] = [];

  /** (optional) Expanded tree items by default */
  @Prop({ mutable: true }) expandedItems: string[] = [];

  /** (optional) Enables multiple checkbox selection */
  @Prop() multiCheckboxSelection: boolean;

  /** (optional) Enables multiple tree items selection */
  @Prop() multiSelection: boolean;

  /** (optional) Selected tree items by default */
  @Prop({ mutable: true }) selectedItems: string[] = [];

  /** (optional) The default size of all tree items */
  @Prop() size: 'condensed' | 'large' | 'standard' = 'standard';

  private focusItem: string;
  private items: { [key: string]: TreeViewItemInfo } = {}; //using Map doesn't fit in all the use cases
  private lastSelected: string;
  private lastChecked: string;

  componentWillUpdate() {
    // To check if the `TreeViewItemOptions` passed to all the tree items should be updated
    // For verification taking only the first item's `TreeViewItemOptions`
    if (!this.items) return;
    let isUpdated = false;
    const firstItem = Object.keys(this.items)[0];
    const existingOptions = this.items[firstItem].element?.options;
    if (existingOptions) {
      Object.keys(existingOptions).forEach((key) => {
        if (typeof existingOptions[key] != 'function') {
          isUpdated = existingOptions[key] !== this.element[key] || isUpdated;
        }
      });

      if (isUpdated) {
        this.updateOptions();
      }
    } else this.updateOptions();
  }

  getChildrenIds(itemId: string, recursive = true): string[] {
    const children = this.items[itemId]?.children;
    if (!children) return [];
    return Array.from(children).reduce((r, c) => {
      r.push(c, ...(recursive ? this.getChildrenIds(c, recursive) : []));
      return r;
    }, []);
  }

  getRootChildrenIds(): string[] {
    return Object.keys(this.items).filter((i) => !this.items[i].parentId);
  }

  getNavigableChildrenIds(parentId: string): string[] {
    let siblings = [];
    if (parentId) siblings = this.getChildrenIds(parentId, false);
    else siblings = this.getRootChildrenIds();

    return siblings.filter((c) => !this.isItemDisabled(c));
    // return siblings;
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
    while (this.isItemExpanded(curr) && this.getNavigableChildrenIds(curr).length > 0) {
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
      onItemSelection: (e, id) => this.handleItemSelection(e, id),
      onCheckboxSelection: (id) => this.handleCheckboxSelection(id),
      onItemExpandToggle: (id) => this.handleItemExpand(id),
      onItemFocus: (id) => this.handleItemFocus(id),
      hasItemFocus: (id) => this.isItemInFocus(id),
      hasItemSelected: (id) => this.isItemSelected(id),
      hasItemDisabled: (id) => this.isItemDisabled(id),
      updateItem: (newValue, oldValue) => this.updateItem(newValue, oldValue),
    };
  }

  handleCheckboxSelection(currentId: string): void {
    if (this.items[currentId].disabled) return;
    const { children: currentChildren, parentId: currentParentId } = this.items[currentId];
    const currentChecked = !this.isItemChecked(currentId);

    // Update current item
    this.updateDOMElement(currentId, new Map([['checked', currentChecked]]));

    let checkedCount = 0;
    let indeterminateCount = 0;
    let isChecked = false;
    let isIndeterminate = false;
    let parent: TreeViewItemInfo = null;
    let newCheckedItems = [...this.checkedItems];

    if (this.multiCheckboxSelection) {
      newCheckedItems = currentChecked ? [...newCheckedItems, currentId] : newCheckedItems.filter((i) => i !== currentId);

      // Update parents
      parent = this.items[currentParentId];
      while (parent) {
        // Verify all child nodes before updating the parent
        checkedCount = 0;
        indeterminateCount = 0;

        Array.from(parent.children).forEach((i) => {
          checkedCount += newCheckedItems.includes(i) ? 1 : 0;
          indeterminateCount += this.isItemIndeterminate(i) ? 1 : 0;
        });

        isChecked = checkedCount === parent.children.length;
        isIndeterminate = indeterminateCount > 0 || (checkedCount > 0 && checkedCount < parent.children.length);

        this.updateDOMElement(
          parent.nodeId,
          new Map([
            ['checked', isChecked],
            ['indeterminate', isIndeterminate],
          ])
        );

        // Add parent to checkedItems array
        if (isChecked) newCheckedItems.push(parent.nodeId);
        else newCheckedItems = [...newCheckedItems.filter((i) => i !== parent.nodeId)];

        parent = this.items[parent.parentId];
      }

      // Update children
      if (currentChildren && currentChildren.length > 0) {
        const children = this.getChildrenIds(currentId);
        children.forEach((c) => {
          this.updateDOMElement(
            c,
            new Map([
              ['checked', currentChecked],
              ['indeterminate', false],
            ])
          );
        });

        // Add children to checkedItems array
        newCheckedItems = currentChecked ? [...newCheckedItems, ...children] : newCheckedItems.filter((i) => !children.includes(i));
      }
    } else {
      newCheckedItems = currentChecked ? [currentId] : [];

      // if checkedItems is set from outside the component
      if (this.checkedItems.length && !this.lastChecked) {
        this.lastChecked = this.checkedItems[this.checkedItems.length - 1];
      }

      if (this.lastChecked && this.lastChecked !== currentId) {
        this.updateDOMElement(this.lastChecked, new Map([['checked', false]]));
      }
    }

    this.lastChecked = currentChecked ? currentId : null;
    this.checkedItems = [...newCheckedItems];
  }

  @Listen('itemAdded')
  handleItemAdded(event: CustomEvent<HTMLElement>) {
    const treeItem = event.detail as HTMLModusTreeViewItemElement;
    if (treeItem) {
      // override the item's disable prop if root is disabled
      treeItem.options = this.getTreeViewItemOptions();
      treeItem.selected = this.selectedItems.includes(treeItem.nodeId);
      treeItem.expanded = this.expandedItems.includes(treeItem.nodeId);

      this.items[treeItem.nodeId] = { nodeId: treeItem.nodeId, element: treeItem, disabled: treeItem.disabled };
    }
  }

  handleItemExpand(itemId: string): void {
    const { children } = this.items[itemId];
    if (!(children && children.length)) return;

    const isExpanded = !this.isItemExpanded(itemId);
    let newExpandedItems = [...this.expandedItems];
    if (isExpanded) newExpandedItems.push(itemId);
    else newExpandedItems = newExpandedItems.filter((i) => i !== itemId);

    this.updateDOMElement(itemId, new Map([['expanded', isExpanded]]));
    this.expandedItems = [...newExpandedItems];
  }

  handleItemFocus(itemId: string): void {
    const { element: current } = this.items[itemId];
    this.focusItem = itemId;
    current.focusItem();
  }

  handleItemSelection(event: KeyboardEvent | MouseEvent, itemId: string): void {
    if (this.items[itemId].disabled) return;
    const allowMultipleSelection = this.multiSelection && (event.shiftKey || event.ctrlKey || event.metaKey);
    const isSelected = !this.isItemSelected(itemId);

    let newSelectedItems = [...this.selectedItems];

    // if selectedItems is set from outside the component
    if (this.selectedItems.length && !this.lastSelected) {
      this.lastSelected = this.selectedItems[this.selectedItems.length - 1];
    }

    if (isSelected) {
      if (allowMultipleSelection) {
        newSelectedItems.push(itemId);
      } else {
        newSelectedItems = [itemId];
        if (this.lastSelected && this.lastSelected !== itemId) {
          this.updateDOMElement(this.lastSelected, new Map([['selected', false]]));
        }
      }
      this.lastSelected = itemId;
    } else {
      this.lastSelected = null;
      newSelectedItems = [...newSelectedItems.filter((i) => i !== itemId)];
    }
    this.selectedItems = [...newSelectedItems];
    this.updateDOMElement(itemId, new Map([['selected', isSelected]]));
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
        this.handleItemSelection(event, this.focusItem);
        event.stopPropagation();
        break;
      case 'ArrowDown':
        // eslint-disable-next-line no-case-declarations
        const nextItem = this.getNextNavigableItem(this.focusItem);
        if (this.multiSelection && event.shiftKey && this.isItemSelected(this.focusItem)) {
          // deselect if going back to the selected node
          if (this.isItemSelected(nextItem)) this.handleItemSelection(event, this.focusItem);
          else this.handleItemSelection(event, nextItem);
        }
        this.handleItemFocus(nextItem);
        flag = true;
        break;
      case 'ArrowUp':
        // eslint-disable-next-line no-case-declarations
        const prevItem = this.getPrevNavigableItem(this.focusItem);
        if (this.multiSelection && event.shiftKey && this.isItemSelected(this.focusItem)) {
          // deselect if going back to the selected node
          if (this.isItemSelected(prevItem)) this.handleItemSelection(event, this.focusItem);
          else this.handleItemSelection(event, prevItem);
        }

        this.handleItemFocus(prevItem);
        flag = true;
        break;
      case 'ArrowRight':
        if (!this.isItemExpanded(this.focusItem)) this.handleItemExpand(this.focusItem);
        break;
      case 'ArrowLeft':
        if (this.isItemExpanded(this.focusItem)) this.handleItemExpand(this.focusItem);
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
    return this.items[itemId]?.element?.indeterminate;
  }

  isItemDisabled(itemId: string): boolean {
    const { parentId, disabled } = this.items[itemId];
    return disabled || this.items[parentId]?.disabled;
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

  updateOptions() {
    Object.values(this.items).forEach(({ element }) => {
      element.options = this.getTreeViewItemOptions();
    });
  }

  updateDOMElement(itemId: string, updates: Map<keyof ModusTreeViewItem, unknown>): void {
    const { element } = this.items[itemId];
    if (element && updates) {
      updates.forEach((val, key) => {
        element[key] = val;
      });
    }
  }

  render(): HTMLUListElement {
    return (
      <ul role="tree" onKeyDown={(e) => this.handleKeyDown(e)}>
        <slot />
      </ul>
    );
  }
}

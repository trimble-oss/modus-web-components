// eslint-disable-next-line
import { Component, Element, h, Listen, Prop } from '@stencil/core';
import TreeViewItemOptions from '../TreeViewItemOptions';

@Component({
  tag: 'modus-tree-view',
  styleUrl: 'modus-tree-view.scss',
  shadow: true,
})
export class ModusTreeView {
  @Element() element: HTMLElement;

  /** (optional) Enables checkbox selection on each tree item */
  @Prop() checkboxSelection: boolean;

  /** (optional) Disables each tree item */
  @Prop() disabled: boolean;

  /** (optional) Enables multiple checkbox selection */
  @Prop() multiCheckboxSelection: boolean;

  /** (optional) Enables multiple tree items selection */
  @Prop() multiSelection: boolean;

  /** (optional) The default size of all tree items */
  @Prop() size: 'condensed' | 'large' | 'standard' = 'standard';

  private items: Map<string, { element?: HTMLModusTreeViewItemElement; parentId?: string; children?: string[] }> = new Map();
  private lastSelected: { id: string; element: HTMLModusTreeViewItemElement };
  private lastChecked: { id: string; element: HTMLModusTreeViewItemElement };

  componentWillUpdate(): void {
    this.items.forEach((item) => {
      item.element.options = this.getTreeViewItemOptions();
    });
  }

  @Listen('itemAdded')
  handleItemAdded(event: CustomEvent<HTMLElement>) {
    const treeItem = event.detail as HTMLModusTreeViewItemElement;
    if (treeItem) {
      const existing = this.items.get(treeItem.nodeId);
      treeItem.options = this.getTreeViewItemOptions();
      this.items.set(treeItem.nodeId, { ...existing, element: treeItem });
    }
  }

  handleCheckboxSelection(itemId: string, current: HTMLModusTreeViewItemElement): void {
    const uncheck = current.checked;
    current.checked = !uncheck;

    // If multiple checkbox selection is enabled, update parents and children.
    if (this.multiCheckboxSelection) {
      // Update parents
      let parent = current.parentElement as HTMLModusTreeViewItemElement;
      while (parent) {
        let checked = 0;
        let indeterminate = 0;
        Array.from(parent.children).forEach((i: HTMLModusTreeViewItemElement) => {
          checked += i.checked ? 1 : 0;
          indeterminate += i.indeterminate ? 1 : 0;
        });
        parent.checked = checked === parent.childElementCount;
        parent.indeterminate = indeterminate > 0 || (checked > 0 && checked < parent.childElementCount);
        parent = parent.parentElement as HTMLModusTreeViewItemElement;
      }

      // Update children
      if (current.children) {
        const nodes = this.getChildItems(current.children);
        nodes.forEach((node) => {
          node.checked = current.checked;
        });
      }
    }

    // Update state and if multiple checkbox selection isn't enabled uncheck the previous tree item.
    if (uncheck) this.lastChecked = null;
    else {
      if (!this.multiCheckboxSelection && this.lastChecked && this.lastChecked.id !== itemId) this.lastChecked.element.checked = false;
      this.lastChecked = { id: itemId, element: current };
    }
  }

  handleItemSelection(itemId: string, current: HTMLModusTreeViewItemElement): void {
    // Update state and if multiple selection isn't enabled unselect the previous tree item.
    const unselect = current.selected;
    if (unselect) {
      this.lastSelected = null;
    } else {
      if (!this.multiSelection && this.lastSelected && this.lastSelected.id !== itemId) this.lastSelected.element.selected = false;
      this.lastSelected = { id: itemId, element: current };
    }
    current.selected = !unselect;
  }

  getChildItems(children: HTMLCollection): HTMLModusTreeViewItemElement[] {
    return Array.from(children).reduce((r, item) => {
      r.push(item, ...(item.children ? this.getChildItems(item.children) : []));
      return r;
    }, []);
  }

  getTreeViewItemOptions(): TreeViewItemOptions {
    return {
      multiSelection: this.multiSelection,
      checkboxSelection: this.checkboxSelection,
      multiCheckboxSelection: this.multiCheckboxSelection,
      disabled: this.disabled,
      size: this.size,
      onItemSelection: (id, element) => this.handleItemSelection(id, element),
      onCheckboxSelection: (id, itemElement) => this.handleCheckboxSelection(id, itemElement),
    };
  }

  render(): HTMLUListElement {
    return (
      <ul role="tree">
        <slot />
      </ul>
    );
  }
}

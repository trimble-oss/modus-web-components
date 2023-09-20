import { Table } from '@tanstack/table-core';
import { KEYBOARD_LEFT, KEYBOARD_RIGHT, KEYBOARD_ENTER, KEYBOARD_ESCAPE, KEYBOARD_TAB } from '../modus-table.constants';
import ColumnDragState from '../models/column-drag-state.model';

export class TableHeaderDragDrop {
  columnOrder: string[] = [];
  columnReorder = false;
  columnResizeEnabled = false;
  container: HTMLElement;
  headersList: HTMLElement[];
  table: Table<unknown>;
  itemDragState: ColumnDragState;
  frozenColumns: string[];
  tableHeaderRowEl: HTMLElement;

  setValues(
    columnOrder: string[],
    columnReorder: boolean,
    columnResizeEnabled: boolean,
    container: HTMLElement,
    table: Table<unknown>,
    itemDragState: ColumnDragState,
    frozenColumns: string[]
  ) {
    this.columnOrder = columnOrder;
    this.columnReorder = columnReorder;
    this.columnResizeEnabled = columnResizeEnabled;
    this.tableHeaderRowEl = container.shadowRoot.querySelector('thead tr');
    this.table = table;
    this.itemDragState = itemDragState;
    this.frozenColumns = frozenColumns;
  }

  /**
   * Is invoked on drag start, sets itemDragState item. Calculates the position for drag start.
   * Adds drag item to ModusTableDragItem
   */
  handleDragStart(
    event: MouseEvent | KeyboardEvent,
    draggedColumnId: string,
    elementRef: HTMLTableHeaderCellElement,
    mouseInteracted: boolean
  ): void {
    this.headersList = [].slice.call(this.tableHeaderRowEl.childNodes); // List of table headers.
    this.frozenColumns.forEach((frozenColumn) => {
      const index = this.headersList.findIndex((header) => header.id === frozenColumn);
      if (index > -1) {
        this.headersList.splice(index, 1);
      }
    });
    this.itemDragState = null;

    const dragContent: HTMLElement = elementRef.cloneNode(true) as HTMLElement;
    let clientX: number, clientY: number;
    const currentTarget = event.currentTarget;
    if (mouseInteracted) {
      // For MouseEvent
      clientX = event['clientX'];
      clientY = event['clientY'];
    } else {
      // For KeyboardEvent
      const position = elementRef.getBoundingClientRect();
      clientX = position.x + 60;
      clientY = position.y + 30;
    }

    const self: HTMLElement = currentTarget as HTMLElement;
    this.itemDragState = {
      dragContent,
      translation: { x: clientX, y: clientY },
      draggedColumnId: draggedColumnId,
      width: `${self?.offsetWidth}px`,
      height: `${self?.offsetHeight}px`,
      mouseInteracted,
    };
  }

  /**
   * When being dragged over, the function get the element's id if the element is inside the boundaries.
   * ItemDragState is updated following receipt of the id.
   */
  handleDragOver(event: MouseEvent): void {
    if (!this.itemDragState || !this.itemDragState?.mouseInteracted) return;
    const { clientX, clientY } = event;
    this.updateNodeAndDragState(clientX, clientY);
  }

  /**
   * Enabled use to move drag item left or right and calls handleDrop on drop.
   */
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.itemDragState || this.itemDragState?.mouseInteracted) return;
    let clientX = this.itemDragState.translation.x;
    const clientY = this.itemDragState.translation.y;
    // Move right or left
    if (event.key.toLowerCase() === KEYBOARD_RIGHT || event.key.toLowerCase() === KEYBOARD_LEFT) {
      clientX = event.key.toLowerCase() === KEYBOARD_RIGHT ? clientX + 5 : clientX - 5;
      this.updateNodeAndDragState(clientX, clientY);
      event.preventDefault();
      // Drop Item
    } else if (event.key.toLowerCase() === KEYBOARD_ENTER && this.itemDragState?.dropColumnId) {
      this.handleDrop();
      return;
      // Exit on Escape Or Tab
    } else if (event.key.toLowerCase() === KEYBOARD_ESCAPE || event.key.toLowerCase() === KEYBOARD_TAB) {
      this.itemDragState = null;
      return;
    }
  }

  /**
   * Calls getItemWithinBounds to check the bounds for drop.
   * Updates node class if within bound and updated the itemDragState.
   * @param clientX x-cordinate
   * @param clientY y-cordinate
   */
  updateNodeAndDragState(clientX: number, clientY: number): void {
    const translation = {
      x: clientX,
      y: clientY,
    };
    const node: HTMLElement = this.getItemWithinBounds(clientX, clientY);
    let newDragState: ColumnDragState = {
      ...this.itemDragState,
      translation,
    };

    if (node?.id && node.id !== newDragState.draggedColumnId) {
      newDragState = { ...newDragState, dropColumnId: node.id, dropIndicator: node.getBoundingClientRect() };
    } else {
      newDragState = { ...newDragState, dropIndicator: null };
    }
    this.itemDragState = { ...newDragState };
  }

  /**
   * Reorders columns when dropped in drop zone.
   */
  handleDrop(): void {
    if (!this.itemDragState) return;
    const dropItemId = this.itemDragState.dropColumnId;
    const draggedColumnId = this.itemDragState.draggedColumnId;
    const newColumnOrder = [...this.columnOrder];

    // Logic for column reordering.
    if (dropItemId) {
      newColumnOrder.splice(
        newColumnOrder.indexOf(dropItemId),
        0,
        newColumnOrder.splice(newColumnOrder.indexOf(draggedColumnId), 1)[0] as string
      );
      this.columnOrder = [...newColumnOrder];
      this.table.options.state.columnOrder = newColumnOrder;
    }

    this.itemDragState = null;
  }

  /**
   * This function determines if an object is in a drop zone or not while dragging it.
   * @param x x-cordinate
   * @param y y-cordinate
   * @returns Drop zone element
   */
  getItemWithinBounds(x: number, y: number): HTMLElement {
    const node = Object.values(this.headersList).find((content: HTMLElement) => {
      const rect = content?.getBoundingClientRect();
      if (rect) {
        const inVerticalBounds = y >= rect.top && y <= rect.bottom;
        const inHorizontalBounds = x >= rect.left && x <= rect.right;
        return inVerticalBounds && inHorizontalBounds;
      }
      return false;
    });
    return node as HTMLElement;
  }
}

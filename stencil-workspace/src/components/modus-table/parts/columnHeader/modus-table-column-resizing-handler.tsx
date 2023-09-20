import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column, ColumnSizingInfoState, Header, Table } from '@tanstack/table-core';
import {
  KEYBOARD_LEFT,
  KEYBOARD_RIGHT,
  KEYBOARD_ENTER,
  KEYBOARD_ESCAPE,
  KEYBOARD_SPACE,
  KEYBOARD_TAB,
} from '../../modus-table.constants';

interface ModusTableColumnResizingHandlerProps {
  table: Table<unknown>;
  header: Header<unknown, unknown>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Handling the column resizing keyboard navigation
 * @param event Keyboard event.
 * @param table Table data.
 * @param column Data related to the perticular column.
 */
function columnResizingOnKeyDown(event: KeyboardEvent, table: Table<unknown>, column: Column<unknown, unknown>): void {
  const eventKey = event.key.toLowerCase();
  if (
    eventKey === KEYBOARD_ENTER ||
    eventKey === KEYBOARD_SPACE ||
    eventKey === KEYBOARD_TAB ||
    eventKey === KEYBOARD_ESCAPE
  ) {
    const columnSizingInfo: ColumnSizingInfoState = {
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      deltaPercentage: null,
      isResizingColumn: null,
      columnSizingStart: [],
    };

    if (eventKey !== KEYBOARD_TAB && eventKey !== KEYBOARD_ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      // Enabling or disabling the column resizing
      if (table.options.state.columnSizingInfo.isResizingColumn !== column.id) {
        columnSizingInfo.isResizingColumn = column.id;
      } else {
        columnSizingInfo.isResizingColumn = false;
      }
    }
    table.setColumnSizingInfo(columnSizingInfo);
  } else if (eventKey === KEYBOARD_LEFT || eventKey === KEYBOARD_RIGHT) {
    const columnInfo = { ...table.options.state.columnSizing };
    const columnSize = table.options.state.columnSizing[column.id] || column.columnDef.size || 150; // Having 150 since the default size column is 150 if size is not mentioned.

    // Reducing or increasing the size with the respective ArrowLeft and ArrowRight keys, respectively.
    columnInfo[column.id] = columnSize + (eventKey === KEYBOARD_LEFT ? -5 : 5);

    // Setting column size only when the column is in resizing mode
    if (table.options.state.columnSizingInfo.isResizingColumn) {
      table.setColumnSizing(columnInfo);
      event.preventDefault();
    }
  }
}

/**
 * Throttling the key events
 * @param table Table data.
 * @param column Data related to the perticular column.
 */
function throttle(table: Table<unknown>, column: Column<unknown, unknown>): (event: KeyboardEvent) => void {
  let wait = false;
  return (event: KeyboardEvent) => {
    if (wait) {
      return;
    }

    columnResizingOnKeyDown(event, table, column);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, 100);
  };
}

export const ModusTableColumnResizingHandler: FunctionalComponent<ModusTableColumnResizingHandlerProps> = ({
  table,
  header,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      tabindex={0}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      onKeyDown={throttle(table, header.column)}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      class="resize-handle"></div>
  );
};

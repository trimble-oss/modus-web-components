import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell, Row, Table } from '@tanstack/table-core';
import {
  ArrowDownKey,
  ArrowLeftKey,
  ArrowRightKey,
  ArrowUpKey,
  EnterKey,
  PropertyDataType,
} from '../../constants/constants';
import { ModusTableColumnDataType } from '../../enums/modus-table-column-data-type';
import ModusTableCellLink from '../../models/modus-table-cell-link';
import { ModusTableCellContent } from './modus-table-cell-content';
import { ModusTableCellExpandIcons } from './modus-table-cell-expand-icons';
import { ModusTableCellEditable } from './modus-table-cell-editable';

interface ModusTableCellProps {
  row: Row<unknown>;
  rowIndex: number;
  cell: Cell<unknown, unknown>;
  cellIndex: number;
  rowsExpandable: boolean;
  frozenColumns: string[];
  table: Table<unknown>;
  tableBodyEl: HTMLElement;
  onLinkClick: (link: ModusTableCellLink) => void;
}

/**
 * Updates the cell data/value and sets the focus back to cell.
 */
function updateCellValue(
  row,
  table,
  rowId: string,
  columnId: string,
  newValue: string | number,
  value: string | number,
  cellEl: HTMLElement
) {
  console.log(row);
  if (newValue !== value) {
    table.options.meta?.updateData(rowId, columnId, newValue);
  }
  cellEl?.focus();
}

function handleKeyDown(
  event: KeyboardEvent,
  editMode: boolean,
  isEditable: boolean,
  cellEl: HTMLElement,
  tableBodyEl: HTMLElement,
  rowIndex: number,
  cellIndex: number,
  table,
  columnId: string
) {
  if (!editMode) {
    // Typing any valid input makes the cell editable
    if (isEditable && event.keyCode >= 48 && event.keyCode <= 90) {
      table.options.meta?.updateData(rowIndex, columnId, event.key);
      setTimeout(() => {
        // Updating the data will resest 'editMode' property, so we delay the click after the data has been updated to avoid this issue.
        cellEl?.click();
      }, 1);
    }

    let newSelectCell: HTMLElement;
    switch (event.key.toLowerCase()) {
      case EnterKey: // Pressing Enter key makes cell editable.
        cellEl?.click();
        break;
      case ArrowRightKey: // Moves to right cell
        newSelectCell = tableBodyEl?.children[rowIndex]?.children[++cellIndex] as HTMLElement;
        newSelectCell?.focus();
        break;
      case ArrowLeftKey: // Moves to left cell
        newSelectCell = tableBodyEl?.children[rowIndex]?.children[--cellIndex] as HTMLElement;
        newSelectCell?.focus();
        break;
      case ArrowDownKey: // Moves to down cell
        newSelectCell = tableBodyEl?.children[++rowIndex]?.children[cellIndex] as HTMLElement;
        newSelectCell?.focus();
        break;
      case ArrowUpKey: // Moves to up cell
        newSelectCell = tableBodyEl?.children[--rowIndex]?.children[cellIndex] as HTMLElement;
        newSelectCell?.focus();
        break;
    }
  }
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({
  row,
  rowIndex,
  cell,
  cellIndex,
  rowsExpandable,
  frozenColumns,
  table,
  tableBodyEl,
  onLinkClick,
}) => {
  let cellEl: HTMLElement;
  return (
    <td
      key={cell.id}
      tabindex={0}
      ref={(ref: HTMLElement) => (cellEl = ref)}
      class={`
          ${frozenColumns.includes(cell.column.id) ? 'sticky-left' : ''}
          ${cell.column.getIsResizing() ? 'active-resize' : ''}
          ${cell['editMode'] ? 'edit-mode' : ''}
      `}
      style={{ width: `${cell.column.getSize()}px` }}
      onBlur={() => (cell['editMode'] = false)}
      onClick={() => {
        if (cell.column.columnDef['editable']) {
          cell['editMode'] = true;
        }
      }}
      onKeyDown={(event) => {
        handleKeyDown(
          event,
          cell['editMode'],
          cell.column.columnDef['editable'],
          cellEl,
          tableBodyEl,
          rowIndex,
          cellIndex,
          table,
          cell.column.columnDef['accessorKey']
        );
      }}>
      {cell['editMode'] ? (
        <ModusTableCellEditable
          cell={cell}
          onValueChange={(newValue) => {
            cell['editMode'] = false;
            updateCellValue(
              row,
              table,
              row.id,
              cell.column.columnDef['accessorKey'],
              newValue,
              cell.getValue() as string | number,
              cellEl
            );
          }}
        />
      ) : (
        <div
          class={`
            table-cell
            ${cell.column.columnDef[PropertyDataType] === ModusTableColumnDataType.Integer ? 'text-align-right' : ''}
          `}>
          {
            /** Expand or collaps icon */
            rowsExpandable ? <ModusTableCellExpandIcons cellIndex={cellIndex} row={row} /> : ''
          }
          {
            /** Cell content */
            <ModusTableCellContent
              cell={cell}
              onLinkClick={(link: ModusTableCellLink) => {
                onLinkClick(link);
              }}
            />
          }
        </div>
      )}
    </td>
  );
};

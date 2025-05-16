import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableCellValueChange } from '../models/modus-table.models';
import { ModusTableCell } from './cell/modus-table-cell';
import { ModusTableCellCheckbox } from './row/selection/modus-table-cell-checkbox';
import { COLUMN_DEF_SUB_ROWS_KEY } from '../modus-table.constants';
import { TableContext } from '../models/table-context.models';
import { Row } from '@tanstack/table-core';

interface ModusTableBodyProps {
  context: TableContext;
}

export const ModusTableBody: FunctionalComponent<ModusTableBodyProps> = ({ context }) => {
  const {
    density,
    hover,
    rowSelection,
    rowSelectionOptions,
    rowActions,
    rowsExpandable,
    tableInstance: table,
    updateData,
    updateSelectedRows,
    updateClickedRows,
  } = context;
  const hasRowActions = rowActions?.length > 0;
  const multipleRowSelection = rowSelectionOptions?.multiple;
  let checkboxSize: 'medium' | 'small' = 'medium';
  if (density === 'compact') {
    checkboxSize = 'small';
  }

  // Note: This function supports only 3 levels of nested rows.
  function handleCellValueChange(props: ModusTableCellValueChange) {
    const { row, accessorKey, newValue } = props;
    updateData(
      (old: unknown[]) => {
        const newData = [...old];

        // rowId is a string of IDs for rows with nested information like subrows.
        const idArray: number[] = [];
        let currentRow = row;
        while (currentRow) {
          idArray.push(currentRow['index']);
          currentRow = currentRow['parent'];
        }
        idArray.reverse();

        if (idArray.length === 1) {
          newData[idArray[0]][accessorKey] = newValue;
        } else if (idArray.length === 2) {
          newData[idArray[0]][COLUMN_DEF_SUB_ROWS_KEY][idArray[1]][accessorKey] = newValue;
        } else if (idArray.length === 3) {
          newData[idArray[0]][COLUMN_DEF_SUB_ROWS_KEY][idArray[1]][COLUMN_DEF_SUB_ROWS_KEY][idArray[2]][accessorKey] =
            newValue;
        }

        return newData;
      },
      { ...props, row: row['original'] }
    );
  }

  function handleRowClick(event: MouseEvent, currentRowIndex: number, row: Row<unknown>): void {
    if (
      (!rowSelectionOptions.subRowSelection && rowSelectionOptions.multiple && rowsExpandable) ||
      !rowSelectionOptions.multiple
    ) {
      row.toggleSelected();
      return;
    }
    const isShiftClick = event.shiftKey;

    updateClickedRows(currentRowIndex, isShiftClick);
  }

  function handleKeyDown(event: KeyboardEvent, currentRowIndex: number): void {
    if (event.defaultPrevented || event.altKey || !event.shiftKey) {
      return;
    }

    const rowCount = table.getExpandedRowModel().rows.length;
    const step = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0;

    if (!step) return;

    const nextRowIndex = currentRowIndex + step;

    if (nextRowIndex >= 0 && nextRowIndex < rowCount) {
      event.preventDefault();

      updateSelectedRows(nextRowIndex, currentRowIndex);
    }
  }
  function handleCheckboxKeyDown(row: Row<unknown>): void {
    if (
      (!rowSelectionOptions.subRowSelection && rowSelectionOptions.multiple && rowsExpandable) ||
      !rowSelectionOptions.multiple
    ) {
      row.toggleSelected();
      return;
    }

    updateClickedRows(row.index, false);
  }
  return (
    <tbody>
      {table.getRowModel()?.rows.map((row) => {
        const { getIsSelected, getIsAllSubRowsSelected, getVisibleCells, subRows, id } = row;
        const isChecked = getIsSelected() && (subRows?.length ? getIsAllSubRowsSelected() : true);
        const isDisabled = context.rowSelectionDisabled ? context.rowSelectionDisabled(row) : false;

        return (
          <tr
            key={id}
            class={{ 'enable-hover': hover, 'row-selected': isChecked, 'row-disabled': isDisabled }}
            onClick={isDisabled ? undefined : (event) => handleRowClick(event as MouseEvent, row.index, row)}
            {...(rowSelectionOptions.multiple &&
              !isDisabled && {
                onKeyDown: (event) => handleKeyDown(event as KeyboardEvent, row.index),
              })}>
            {rowSelection && (
              <ModusTableCellCheckbox
                multipleRowSelection={multipleRowSelection}
                row={row}
                isChecked={isChecked}
                checkboxSize={checkboxSize}
                updateRow={isDisabled ? undefined : () => handleCheckboxKeyDown(row)}
                disableRow={isDisabled}></ModusTableCellCheckbox>
            )}
            {getVisibleCells()?.map((cell, cellIndex) => {
              return (
                <ModusTableCell cell={cell} cellIndex={cellIndex} context={context} valueChange={handleCellValueChange} />
              );
            })}
            {hasRowActions && (
              <td class="sticky-right" tabindex="0">
                {/* <modus-table-row-actions row={row} context={context} /> */}
                <modus-table-row-actions-cell row={row} context={context} />
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableCellValueChange } from '../models/modus-table.models';
import { ModusTableCell } from './cell/modus-table-cell';
import { ModusTableCellCheckbox } from './row/selection/modus-table-cell-checkbox';
import { COLUMN_DEF_SUB_ROWS_KEY } from '../modus-table.constants';
import { TableContext } from '../models/table-context.models';

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

  function handleRowClick(event: MouseEvent, currentRowIndex: number): void {
    const isShiftClick = event.shiftKey;
    const isCtrlClick = event.ctrlKey || event.metaKey;

    updateClickedRows(currentRowIndex, isShiftClick, isCtrlClick);
  }

  function handleKeyDown(event: KeyboardEvent, currentRowIndex: number): void {
    if (event.defaultPrevented || event.altKey || !event.shiftKey) {
      return;
    }

    const rowCount = table.getRowModel().rows.length;
    const step = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0;

    if (!step) return;

    const nextRowIndex = currentRowIndex + step;

    if (nextRowIndex >= 0 && nextRowIndex < rowCount) {
      event.preventDefault();

      updateSelectedRows(nextRowIndex, currentRowIndex);
    }
  }

  return (
    <tbody>
      {table.getRowModel()?.rows.map((row, rowIndex) => {
        const { getIsSelected, getIsAllSubRowsSelected, getVisibleCells, subRows, id } = row;
        const isChecked = getIsSelected() && (subRows?.length ? getIsAllSubRowsSelected() : true);

        return (
          <tr
            key={id}
            class={{ 'enable-hover': hover, 'row-selected': isChecked }}
            onClick={(event) => handleRowClick(event as MouseEvent, rowIndex)}
            {...(rowSelectionOptions.multiple && {
              onKeyDown: (event) => handleKeyDown(event as KeyboardEvent, rowIndex),
            })}>
            {rowSelection && (
              <ModusTableCellCheckbox
                multipleRowSelection={multipleRowSelection}
                row={row}
                isChecked={isChecked}
                checkboxSize={checkboxSize}></ModusTableCellCheckbox>
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

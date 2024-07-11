import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableCellValueChange } from '../models/modus-table.models';
import { ModusTableCell } from './cell/modus-table-cell';
import { ModusTableCellCheckbox } from './row/selection/modus-table-cell-checkbox';
import { COLUMN_DEF_SUB_ROWS_KEY } from '../modus-table.constants';
import { TableContext } from '../models/table-context.models';
import { VirtualItem } from '@tanstack/virtual-core';

interface ModusTableBodyProps {
  context: TableContext;
  virtualItems: unknown[];
}

export const ModusTableBody: FunctionalComponent<ModusTableBodyProps> = ({ context, virtualItems }) => {
  const { density, hover, rowSelection, rowSelectionOptions, rowActions, tableInstance: table, updateData } = context;
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
  console.log('virtualItems', virtualItems);
  const rows = table.getRowModel()?.rows;
  return (
    <tbody>
      {virtualItems.map((virtualItem) => {
        const row = rows[(virtualItem as VirtualItem<HTMLElement>).index];
        const { getIsSelected, getIsAllSubRowsSelected, getVisibleCells, subRows, id } = row;
        const isChecked = getIsSelected() && (subRows?.length ? getIsAllSubRowsSelected() : true);
        return (
          <tr key={id} class={{ 'enable-hover': hover, 'row-selected': isChecked }}>
            {rowSelection && (
              <ModusTableCellCheckbox
                multipleRowSelection={multipleRowSelection}
                row={row}
                isChecked={isChecked}
                checkboxSize={checkboxSize}
                virtualItem={virtualItem as VirtualItem<HTMLElement>}></ModusTableCellCheckbox>
            )}
            {getVisibleCells()?.map((cell, cellIndex) => {
              return (
                <ModusTableCell
                  cell={cell}
                  cellIndex={cellIndex}
                  context={context}
                  valueChange={handleCellValueChange}
                  virtualItem={virtualItem as VirtualItem<HTMLElement>}
                />
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

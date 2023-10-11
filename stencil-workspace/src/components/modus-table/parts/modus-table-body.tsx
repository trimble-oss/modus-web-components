import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table, Updater } from '@tanstack/table-core';
import { ModusTableCellLink, ModusTableCellValueChange } from '../models/modus-table.models';
import { ModusTableCell } from './cell/modus-table-cell';
import { ModusTableCellCheckbox } from './row/selection/modus-table-cell-checkbox';
import RowActions from '../models/row-actions.model';
import { COLUMN_DEF_SUB_ROWS_KEY } from '../modus-table.constants';

interface ModusTableBodyProps {
  table: Table<unknown>;
  hover: boolean;
  multipleRowSelection: boolean;
  rowSelection: boolean;
  rowActions: RowActions;
  dataUpdater: (updater: Updater<unknown>, context: ModusTableCellEdited) => void;
  cellLinkClick: (link: ModusTableCellLink) => void;
}

export type ModusTableCellEdited = Omit<ModusTableCellValueChange, 'data'>;

export const ModusTableBody: FunctionalComponent<ModusTableBodyProps> = ({
  table,
  hover,
  rowSelection,
  multipleRowSelection,
  rowActions,
  dataUpdater,
  cellLinkClick,
}) => {
  // Note: This function supports only 3 levels of nested rows.
  function handleCellValueChange(props: ModusTableCellValueChange) {
    const { row, accessorKey, newValue } = props;
    dataUpdater(
      (old: unknown[]) => {
        const newData = [...old];

        // rowId is a string of IDs for rows with nested information like subrows.
        const idArray: number[] = row['id']?.split('.')?.map((id) => parseInt(id));

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

  return (
    <tbody>
      {table.getRowModel()?.rows.map((row) => {
        const { getIsSelected, getIsAllSubRowsSelected, getVisibleCells, subRows, id } = row;
        const isChecked = getIsSelected() && (subRows?.length ? getIsAllSubRowsSelected() : true);

        return (
          <tr key={id} class={{ 'enable-hover': hover, 'row-selected': isChecked }}>
            {rowSelection && (
              <ModusTableCellCheckbox
                multipleRowSelection={multipleRowSelection}
                row={row}
                isChecked={isChecked}></ModusTableCellCheckbox>
            )}
            {getVisibleCells()?.map((cell, cellIndex) => {
              return (
                <ModusTableCell
                  cell={cell}
                  cellIndex={cellIndex}
                  rowActions={cellIndex === 0 && rowActions ? rowActions : null}
                  valueChange={handleCellValueChange}
                  linkClick={cellLinkClick}
                />
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

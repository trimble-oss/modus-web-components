import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';
import { ModusTableDataUpdaterProps, ModusTableCellLink } from '../models/modus-table.models';
import { ModusTableCell } from './cell/modus-table-cell';
import { ModusTableCellCheckbox } from './rowSelection/modus-table-cell-checkbox';
import RowActions from '../models/row-actions.model';

interface ModusTableBodyProps {
  table: Table<unknown>;
  hover: boolean;
  multipleRowSelection: boolean;
  rowSelection: boolean;
  rowActions: RowActions;
  cellValueChange: (props: ModusTableDataUpdaterProps) => void;
  cellLinkClick: (link: ModusTableCellLink) => void;
}

export const ModusTableBody: FunctionalComponent<ModusTableBodyProps> = ({
  table,
  hover,
  rowSelection,
  multipleRowSelection,
  rowActions,
  cellValueChange,
  cellLinkClick,
}) => {
  return (
    <tbody>
      {table.getRowModel()?.rows.map((row) => {
        const { getIsSelected, getIsAllSubRowsSelected, getVisibleCells, subRows, id } = row;
        const isChecked = getIsSelected() && (subRows?.length ? getIsAllSubRowsSelected() : true);

        return (
          <tr key={id} class={{ 'enable-hover': hover, 'row-selected': isChecked }}>
            <ModusTableCellCheckbox
              rowSelection={rowSelection}
              multipleRowSelection={multipleRowSelection}
              row={row}
              isChecked={isChecked}></ModusTableCellCheckbox>
            {getVisibleCells()?.map((cell, cellIndex) => {
              return (
                <ModusTableCell
                  cell={cell}
                  cellIndex={cellIndex}
                  rowActions={cellIndex === 0 && rowActions ? rowActions : null}
                  valueChange={cellValueChange}
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

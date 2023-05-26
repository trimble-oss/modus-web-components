import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell, Row } from '@tanstack/table-core';
import { ExpandColumn, PropertyDataType } from '../constants/constants';
import { ModusColumnDataType } from '../enums/modus-column-data-type';
import { cellFormatter } from './modus-data-table-cell-formatter';
import { ModusDataTableExpandIconCell } from './modus-data-table-expand-icon-cell';

interface ModusDataTableCellProps {
  cell: Cell<unknown, unknown>;
  row: Row<unknown>;
}

export const ModusDataTableCell: FunctionalComponent<
  ModusDataTableCellProps
> = ({ cell, row }) => {
  return cell.column.columnDef.id === ExpandColumn.id ? (
    <ModusDataTableExpandIconCell row={row} />
  ) : (
    <td
      key={cell.id}
      class={`
       ${
         cell.column.columnDef[PropertyDataType] === ModusColumnDataType.Integer
           ? 'text-align-right'
           : ''
       }
          ${cell.column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{ width: `${cell.column.getSize()}px` }}>
      {cellFormatter(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

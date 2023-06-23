import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { ModusColumnDataType } from '../enums/modus-column-data-type';
import { PropertyDataType } from '../constants/constants';
import { cellFormatter } from './modus-table-cell-formatter';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
}

export const ModusTableCell: FunctionalComponent<
  ModusTableCellProps
> = ({ cell }) => {
  return (
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

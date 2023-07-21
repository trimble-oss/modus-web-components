import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell, Row } from '@tanstack/table-core';
import { IconChevronDownThick } from '../../../icons/icon-chevron-down-thick';
import { IconChevronUpThick } from '../../../icons/icon-chevron-up-thick';
import { PropertyDataType } from '../../constants/constants';
import { ModusColumnDataType } from '../../enums/modus-column-data-type';
import { CellFormatter } from './modus-table-cell-formatter';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
  row: Row<unknown>;
  cellIndex: number;
  rowsExpandable: boolean;
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({ cell, row, cellIndex, rowsExpandable }) => {
  return (
    <td
      key={cell.id}
      class={`
          ${cell.column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{ width: `${cell.column.getSize()}px` }}>
      <div
        class={`table-cell ${
          cell.column.columnDef[PropertyDataType] === ModusColumnDataType.Integer ? 'text-align-right' : ''
        }`}>
        {rowsExpandable ? (
          <span
            class="expand"
            style={{ paddingLeft: `${cellIndex === 0 ? row.depth * 2 : 0}rem` }}
            onClick={row.getToggleExpandedHandler()}>
            {cellIndex === 0 && row.getCanExpand() ? (
              row.getIsExpanded() ? (
                <IconChevronUpThick size={'24'} />
              ) : (
                <IconChevronDownThick size={'24'} />
              )
            ) : (
              ''
            )}
          </span>
        ) : (
          ''
        )}
        <span class="cell-content">{CellFormatter(cell.column.columnDef.cell, cell.getContext())}</span>
      </div>
    </td>
  );
};

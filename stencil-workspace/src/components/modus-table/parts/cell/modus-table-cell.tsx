import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell, Row } from '@tanstack/table-core';
import { PropertyDataType } from '../../constants/constants';
import { ModusTableColumnDataType } from '../../enums/modus-table-column-data-type';
import ModusTableCellLink from '../../models/modus-table-cell-link';
import { ModusTableCellContent } from './modus-table-cell-content';
import { ModusTableCellExpandIcons } from './modus-table-cell-expand-icons';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
  row: Row<unknown>;
  cellIndex: number;
  rowsExpandable: boolean;
  frozenColumns: string[];
  onLinkClick: (link: ModusTableCellLink) => void;
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({
  cell,
  row,
  cellIndex,
  rowsExpandable,
  frozenColumns,
  onLinkClick,
}) => {
  return (
    <td
      key={cell.id}
      class={`
          ${frozenColumns.includes(cell.column.id) ? 'sticky-left' : ''}
          ${cell.column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{ width: `${cell.column.getSize()}px` }}>
      <div
        class={`table-cell wrap-text${
          cell.column.columnDef[PropertyDataType] === ModusTableColumnDataType.Integer ? 'text-align-right' : ''
        }`}>
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
    </td>
  );
};

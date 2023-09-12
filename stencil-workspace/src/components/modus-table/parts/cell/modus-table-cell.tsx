import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell, Row } from '@tanstack/table-core';
import { COLUMN_DEF_DATATYPE_INTEGER, COLUMN_DEF_DATATYPE_KEY } from '../../modus-table.constants';
import { ModusTableCellLink } from '../../models/modus-table.models';
import ModusTableCellContent from './modus-table-cell-content';
import ModusTableCellExpandIcons from './modus-table-cell-expand-icons';

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
  const { id, column } = cell;
  return (
    <td
      key={id}
      class={`
          ${frozenColumns.includes(column.id) ? 'sticky-left' : ''}
          ${column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{
        width: `${column.getSize()}px`,
      }}>
      <div
        class={`table-cell wrap-text${
          column.columnDef[COLUMN_DEF_DATATYPE_KEY] === COLUMN_DEF_DATATYPE_INTEGER ? 'text-align-right' : ''
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

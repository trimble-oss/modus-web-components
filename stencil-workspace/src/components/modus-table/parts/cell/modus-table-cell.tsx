import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell, Row } from '@tanstack/table-core';
import { COLUMN_DEF_DATATYPE_KEY } from '../../constants/constants';
import { ModusTableColumnDataType } from '../../enums/modus-table-column-data-type';
import ModusTableCellLink from '../../models/modus-table-cell-link';
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
          column.columnDef[COLUMN_DEF_DATATYPE_KEY] === ModusTableColumnDataType.Integer ? 'text-align-right' : ''
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

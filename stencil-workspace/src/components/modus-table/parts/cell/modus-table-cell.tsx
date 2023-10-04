import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell, Row } from '@tanstack/table-core';
import { COLUMN_DEF_DATATYPE_INTEGER, COLUMN_DEF_DATATYPE_KEY } from '../../modus-table.constants';
import { ModusTableCellLink, ModusTableRowAction } from '../../models/modus-table.models';
import ModusTableCellContent from './modus-table-cell-content';
import ModusTableCellExpandIcons from './modus-table-cell-expand-icons';
import { ModusTableRowActions } from '../modus-table-row-actions';
import { ModusTableOverflowMenu } from '../modus-table-overflow-menu';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
  row: Row<unknown>;
  cellIndex: number;
  isChecked: boolean;
  rowsExpandable: boolean;
  showOverflowMenu: boolean;
  frozenColumns: string[];
  rowActions: ModusTableRowAction[];
  rowActionClick?: (action: string, rowId: string) => void;
  overflowMenuClick?: (rowId: string) => void;
  onLinkClick: (link: ModusTableCellLink) => void;
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({
  cell,
  row,
  cellIndex,
  isChecked,
  rowsExpandable,
  showOverflowMenu,
  frozenColumns,
  rowActions,
  rowActionClick,
  overflowMenuClick,
  onLinkClick,
}) => {
  const { id, column } = cell;
  let iconsWidth = 0;
  if (cellIndex == 0) {
    if (showOverflowMenu) iconsWidth += 24;
    iconsWidth += 24 * rowActions?.length;
  }
  return (
    <td
      key={id}
      class={`
          ${frozenColumns.includes(column.id) ? 'sticky-left' : ''}
          ${column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{
        width: `${column.getSize() + iconsWidth}px`,
      }}>
      <div
        class={`table-cell wrap-text ${
          column.columnDef[COLUMN_DEF_DATATYPE_KEY] === COLUMN_DEF_DATATYPE_INTEGER ? 'text-align-right' : ''
        }`}>
        {
          /** Expand or collaps icon */
          rowsExpandable ? <ModusTableCellExpandIcons cellIndex={cellIndex} row={row} /> : ''
        }
        {
          /** Row menu */
          cellIndex == 0 && (
            <div class="row-menu" style={{ width: `${iconsWidth}px`, paddingRight: '4px' }}>   
              <ModusTableRowActions
                actions={rowActions}
                onRowActionClick={rowActionClick}
                rowId={row.id}
                isChecked={isChecked}
              />
              <ModusTableOverflowMenu
                showOverflowMenu={showOverflowMenu}
                rowId={row.id}
                isChecked={isChecked}
                overflowMenuClick={overflowMenuClick} 
                onActionClick={rowActionClick}
                overflowActions={rowActions}              
              />
            </div>
          )
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

import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { PropertyDataType } from '../../constants/constants';
import { ModusTableColumnDataType } from '../../enums/modus-table-column-data-type';
import { ModusTableBadge, ModusTableLink } from '../../models';
import { ModusTableCellBadge } from './modus-table-cell-badge';
import { cellFormatter } from './modus-table-cell-formatter';
import { ModusTableCellLink } from './modus-table-cell-link';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
  onLinkClick: (link: ModusTableLink) => void;
}

/**
 * If data type for a cell is passed, it is used to override the datatype for column.
 * @param cellType : Datatype of a cell, which can override the column type.
 * @param columnType : Datatype of column.
 * @returns : Datatype for a cell.
 */
function getCellType(cellType: ModusTableColumnDataType, columnType: ModusTableColumnDataType): ModusTableColumnDataType {
  return cellType ?? columnType;
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({ cell, onLinkClick }) => {
  return (
    <td
      key={cell.id}
      class={`
       ${cell.column.columnDef[PropertyDataType] === ModusTableColumnDataType.Integer ? 'text-align-right' : ''}
          ${cell.column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{ width: `${cell.column.getSize()}px` }}>
      {/* When cell type is Link */}
      {getCellType(cell.getValue()['_type'], cell.column.columnDef[PropertyDataType]) === ModusTableColumnDataType.Link && (
        <ModusTableCellLink
          link={cell.getValue() as ModusTableLink}
          onLinkClick={(link: ModusTableLink) => {
            onLinkClick(link);
          }}
        />
      )}

      {/* When cell type is Badge */}
      {getCellType(cell.getValue()['_type'], cell.column.columnDef[PropertyDataType]) === ModusTableColumnDataType.Badge && (
        <ModusTableCellBadge badge={cell.getValue() as ModusTableBadge} />
      )}

      {/* When cell type is not Link or Badge */}
      {getCellType(cell.getValue()['_type'], cell.column.columnDef[PropertyDataType]) !== ModusTableColumnDataType.Link &&
        getCellType(cell.getValue()['_type'], cell.column.columnDef[PropertyDataType]) !== ModusTableColumnDataType.Badge &&
        cellFormatter(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

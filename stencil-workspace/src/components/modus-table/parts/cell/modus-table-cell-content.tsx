import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { PropertyDataType } from '../../constants/constants';
import { ModusTableColumnDataType } from '../../enums';
import ModusTableCellLink from '../../models/modus-table-cell-link';
import { CellFormatter } from './modus-table-cell-formatter';
import { ModusTableCellLinkElement } from './modus-table-cell-link-element';

interface ModusTableCellContentProps {
  cell: Cell<unknown, unknown>;
  onLinkClick: (link: ModusTableCellLink) => void;
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

export const ModusTableCellContent: FunctionalComponent<ModusTableCellContentProps> = ({ cell, onLinkClick }) => {
  return (
    <span class="cell-content">
      {cell.getValue() ? (
        /** Link */
        getCellType(cell.getValue()['_type'], cell.column.columnDef[PropertyDataType]) === ModusTableColumnDataType.Link ? (
          <ModusTableCellLinkElement
            link={cell.getValue() as ModusTableCellLink}
            onLinkClick={(link: ModusTableCellLink) => {
              onLinkClick(link);
            }}
          />
        ) : (
          /** Default*/
          CellFormatter(cell.column.columnDef.cell, cell.getContext())
        )
      ) : (
        ''
      )}
    </span>
  );
};

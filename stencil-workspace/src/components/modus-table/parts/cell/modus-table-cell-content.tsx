import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { COLUMN_DEF_DATATYPE_KEY, COLUMN_DEF_DATATYPE_LINK } from '../../modus-table.constants';
import { ModusTableCellLink, ModusTableColumnDataType } from '../../models/modus-table.models';
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

const ModusTableCellContent: FunctionalComponent<ModusTableCellContentProps> = ({ cell, onLinkClick }) => {
  const cellValue = cell.getValue();
  return (
    <span class="wrap-text">
      {cellValue ? (
        /** Link */
        getCellType(cellValue['_type'], cell.column.columnDef[COLUMN_DEF_DATATYPE_KEY]) === COLUMN_DEF_DATATYPE_LINK ? (
          <ModusTableCellLinkElement
            link={cellValue as ModusTableCellLink}
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

export default ModusTableCellContent;

import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { ModusTableCellLink, ModusTableDataUpdaterProps } from '../../models/modus-table.models';
import RowActions from '../../models/row-actions.model';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
  cellIndex: number;
  rowActions: RowActions;
  linkClick: (link: ModusTableCellLink) => void;
  valueChange: (props: ModusTableDataUpdaterProps) => void;
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({
  cell,
  cellIndex,
  rowActions,
  valueChange,
  linkClick,
}) => {
  const { id } = cell;
  return (
    <td
      key={id}
      tabindex={0}
      class={`
      ${rowActions ? 'sticky-left' : ''}
      ${cell.column.getIsResizing() ? 'active-resize' : ''}
  `}
      style={{ width: `${cell.column.getSize()}px` }}>
      <modus-table-cell-main
        cell={cell}
        cellIndex={cellIndex}
        rowActions={rowActions}
        valueChange={valueChange}
        linkClick={linkClick}></modus-table-cell-main>
    </td>
  );
};

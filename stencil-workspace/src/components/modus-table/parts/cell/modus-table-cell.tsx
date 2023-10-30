import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { ModusTableCellLink, ModusTableRowActions } from '../../models/modus-table.models';
import { ModusTableCellEdited } from '../modus-table-body';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
  rowActions: ModusTableRowActions;
  linkClick: (link: ModusTableCellLink) => void;
  valueChange: (props: ModusTableCellEdited) => void;
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({ cell, rowActions, valueChange, linkClick }) => {
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
        rowActions={rowActions}
        valueChange={valueChange}
        linkClick={linkClick}></modus-table-cell-main>
    </td>
  );
};

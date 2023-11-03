import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import TableContext, { TableCellEdited } from '../../models/table-context.model';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
  cellIndex: number;
  context: TableContext;
  valueChange: (props: TableCellEdited) => void;
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({ cell, cellIndex, context, valueChange }) => {
  const { rowsExpandable, rowActions } = context;
  const hasRowActions = cellIndex === 0 && (rowsExpandable || rowActions?.length > 0);
  const { id } = cell;
  return (
    <td
      key={id}
      tabindex={0}
      class={`
      ${hasRowActions ? 'sticky-left' : ''}
      ${cell.column.getIsResizing() ? 'active-resize' : ''}
  `}
      style={{ width: `${cell.column.getSize()}px` }}>
      <modus-table-cell-main
        cell={cell}
        hasRowActions={hasRowActions}
        context={context}
        valueChange={valueChange}></modus-table-cell-main>
    </td>
  );
};

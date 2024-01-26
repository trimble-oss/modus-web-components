import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { TableContext, TableCellEdited } from '../../models/table-context.models';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
  cellIndex: number;
  context: TableContext;
  valueChange: (props: TableCellEdited) => void;
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({ cell, cellIndex, context, valueChange }) => {
  const { rowsExpandable, frozenColumns, wrapText } = context;
  const hasRowsExpandable = cellIndex === 0 && rowsExpandable;
  const { id } = cell;
  return (
    <td
      key={id}
      tabindex={0}
      class={`
      ${hasRowsExpandable || frozenColumns.includes(cell.column.id) ? 'sticky-left' : ''}
      ${cell.column.getIsResizing() ? 'active-resize' : ''}
      ${wrapText ? 'align-top' : ''}
  `}
      style={{ width: `${cell.column.getSize()}px` }}>
      <modus-table-cell-main
        cell={cell}
        hasRowsExpandable={hasRowsExpandable}
        context={context}
        valueChange={valueChange}></modus-table-cell-main>
    </td>
  );
};

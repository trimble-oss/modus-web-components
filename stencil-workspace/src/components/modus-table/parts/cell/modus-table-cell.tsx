import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { TableContext, TableCellEdited } from '../../models/table-context.models';
import { VirtualItem } from '@tanstack/virtual-core';

interface ModusTableCellProps {
  cell: Cell<unknown, unknown>;
  cellIndex: number;
  context: TableContext;
  valueChange: (props: TableCellEdited) => void;
  virtualItem: VirtualItem<Element>;
}

export const ModusTableCell: FunctionalComponent<ModusTableCellProps> = ({
  cell,
  cellIndex,
  context,
  valueChange,
  virtualItem,
}) => {
  const { rowsExpandable, frozenColumns } = context;
  const hasRowsExpandable = cellIndex === 0 && rowsExpandable;
  const { id } = cell;
  return (
    <td
      key={id}
      tabindex={0}
      style={{
        top: '0',
        left: '0',
        width: `${cell.column.getSize()}px`,
        height: `${virtualItem.size}px`,
        transform: `translateY(${virtualItem.start}px)`,
      }}
      class={`
      ${hasRowsExpandable || frozenColumns.includes(cell.column.id) ? 'sticky-left' : ''}
      ${cell.column.getIsResizing() ? 'active-resize' : ''}
  `}>
      <modus-table-cell-main
        cell={cell}
        hasRowsExpandable={hasRowsExpandable}
        context={context}
        valueChange={valueChange}></modus-table-cell-main>
    </td>
  );
};

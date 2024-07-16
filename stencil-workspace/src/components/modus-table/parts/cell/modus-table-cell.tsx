import { FunctionalComponent, h } from '@stencil/core';
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
        position: 'absolute',
        top: `${virtualItem.start + virtualItem.size}px`,
        left: `${cellIndex * cell.column.getSize()}px`, // Correctly position cell based on index
        width: `${cell.column.getSize()}px`,
        height: `${virtualItem.size}px`,
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

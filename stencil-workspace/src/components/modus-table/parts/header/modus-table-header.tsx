import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header, Table } from '@tanstack/table-core';
import { ModusTableHeaderSort } from './modus-table-header-sort';
import { ModusTableColumnResizingHandler } from './modus-table-column-resizing-handler';
import { IconArrowDown } from '../../../icons/icon-arrow-down';
import { IconArrowUp } from '../../../icons/icon-arrow-up';

interface ModusTableHeaderProps {
  table: Table<unknown>;
  header: Header<unknown, unknown>;
  isNestedParentHeader: boolean;
  showSortIconOnHover: boolean;
  columnReorder: boolean;
  columnResizeEnabled: boolean;
  handleDragStart: (event: MouseEvent, id: string, elementRef: HTMLTableHeaderCellElement) => void;
  onMouseEnterResize: () => void;
  onMouseLeaveResize: () => void;
}

/**
 * Modus Table Header
 */
export const ModusTableHeader: FunctionalComponent<ModusTableHeaderProps> = ({
  table,
  header,
  isNestedParentHeader,
  showSortIconOnHover,
  columnReorder,
  columnResizeEnabled,
  handleDragStart,
  onMouseEnterResize,
  onMouseLeaveResize,
}) => {
  let elementRef: HTMLTableHeaderCellElement;
  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      class={`
        ${isNestedParentHeader ? 'text-align-center' : ''}
        ${!columnResizeEnabled && columnReorder ? 'can-reorder' : ''}
        ${columnResizeEnabled ? 'show-resize-cursor' : ''}
        ${header.column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{ width: `${header.getSize()}px` }}
      aria-label={header.column.columnDef.header}
      role="columnheader"
      scope="col"
      id={header.id}
      ref={(element: HTMLTableHeaderCellElement) => (elementRef = element)}
      onMouseDown={(event: MouseEvent) => handleDragStart(event, header.id, elementRef)}>
      {header.isPlaceholder ? null : ( // header.isPlaceholder is Required for nested column headers to display empty cell
        <div class={header.column.getCanSort() && 'can-sort'}>
          <span>{header.column.columnDef.header}</span>
          {header.column.getCanSort() && (
            <ModusTableHeaderSort
              column={header.column}
              showSortIconOnHover={showSortIconOnHover}
              columnResizeEnabled={columnResizeEnabled}
            />
          )}
        </div>
      )}
      {/** Icons for column reorder  */}
      <IconArrowDown size={'16'} />
      <IconArrowUp size={'16'} />
      {/** Column resizing handler */}
      <ModusTableColumnResizingHandler
        table={table}
        header={header}
        onMouseEnter={() => onMouseEnterResize()}
        onMouseLeave={() => onMouseLeaveResize()}
      />
    </th>
  );
};

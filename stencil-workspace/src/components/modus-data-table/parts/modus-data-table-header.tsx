import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header, Table } from '@tanstack/table-core';
import { ModusDataTableHeaderSort } from './modus-data-table-header-sort';
import { ModusDataTableColumnResizingHandler } from './modus-data-table-column-resizing-handler';

interface ModusDataTableHeaderProps {
  table: Table<unknown>;
  header: Header<unknown, unknown>;
  isNestedParentHeader: boolean;
  showSortIconOnHover: boolean;
}

/**
 * Modus Data Table Header
 */
export const ModusDataTableHeader: FunctionalComponent<
  ModusDataTableHeaderProps
> = ({ table, header, isNestedParentHeader, showSortIconOnHover }) => {
  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      class={`
        ${isNestedParentHeader ? 'text-align-center' : ''}
        ${header.column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{ width: `${header.getSize()}px` }}
      aria-label={header.column.columnDef.header}
      role="columnheader"
      scope="col">
      {header.isPlaceholder ? null : ( // header.isPlaceholder is Required for nested column headers to display empty cell
        <div class={header.column.getCanSort() && 'can-sort'}>
          <span>{header.column.columnDef.header}</span>
          {header.column.getCanSort() && (
            <ModusDataTableHeaderSort
              column={header.column}
              showSortIconOnHover={showSortIconOnHover}
            />
          )}
        </div>
      )}
      <ModusDataTableColumnResizingHandler
        table={table}
        header={header}
      />
    </th>
  );
};

import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header, Table } from '@tanstack/table-core';
import { ModusTableHeaderSort } from './modus-table-header-sort';
import { ModusTableColumnResizingHandler } from './modus-table-column-resizing-handler';

interface ModusTableHeaderProps {
  table: Table<unknown>;
  header: Header<unknown, unknown>;
  isNestedParentHeader: boolean;
  showSortIconOnHover: boolean;
}

/**
 * Modus Table Header
 */
export const ModusTableHeader: FunctionalComponent<ModusTableHeaderProps> = ({
  table,
  header,
  isNestedParentHeader,
  showSortIconOnHover,
}) => {
  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      class={`
        ${isNestedParentHeader ? 'text-align-center' : ''}
        ${header.column.getIsResizing() ? 'active-resize' : ''}
      `}
      // The column sizing indicator (blue border right line) is left with a white shadow after being resized.
      // It appears to have been incorrectly rendered.
      // So deducting a minute amount from the width of the header column in order to render the component
      // and the view is thus unaffected by this fix.
      style={{ width: `${header.column.getIsResizing() ? header.getSize() : header.getSize() - 0.001}px` }}
      aria-label={header.column.columnDef.header}
      role="columnheader"
      scope="col">
      {header.isPlaceholder ? null : ( // header.isPlaceholder is Required for nested column headers to display empty cell
        <div class={header.column.getCanSort() && 'can-sort'}>
          <span>{header.column.columnDef.header}</span>
          {header.column.getCanSort() && (
            <ModusTableHeaderSort column={header.column} showSortIconOnHover={showSortIconOnHover} />
          )}
        </div>
      )}
      <ModusTableColumnResizingHandler table={table} header={header} />
    </th>
  );
};

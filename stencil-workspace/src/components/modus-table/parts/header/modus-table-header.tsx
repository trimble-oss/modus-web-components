import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header, Table } from '@tanstack/table-core';
import { ModusTableHeaderSort } from './modus-table-header-sort';
import { ModusTableColumnResizingHandler } from './modus-table-column-resizing-handler';
import { IconArrowDown } from '../../../icons/icon-arrow-down';
import { IconArrowUp } from '../../../icons/icon-arrow-up';
import { EnterKey } from '../../constants/constants';

interface ModusTableHeaderProps {
  table: Table<unknown>;
  header: Header<unknown, unknown>;
  isNestedParentHeader: boolean;
  showSortIconOnHover: boolean;
  columnReorder: boolean;
  columnResizeEnabled: boolean;
  frozenColumns: string[];
  handleDragStart: (event: MouseEvent, id: string, elementRef: HTMLTableHeaderCellElement) => void;
  handleKeyboardStart: (event: KeyboardEvent, id: string, elementRef: HTMLTableHeaderCellElement) => void;
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
  frozenColumns,
  handleDragStart,
  handleKeyboardStart,
  onMouseEnterResize,
  onMouseLeaveResize,
}) => {
  let elementRef: HTMLTableHeaderCellElement;

  return (
    <th
      tabindex={`${!columnResizeEnabled && columnReorder ? '0' : ''}`}
      key={header.id}
      colSpan={header.colSpan}
      class={`
        ${isNestedParentHeader ? 'text-align-center' : ''}
        ${!columnResizeEnabled && columnReorder ? (frozenColumns.includes(header.id) ? '' : 'can-reorder') : ''}
        ${columnResizeEnabled ? 'show-resize-cursor' : ''}
        ${header.column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{ width: `${header.getSize()}px` }}
      aria-label={header.column.columnDef.header}
      role="columnheader"
      scope="col"
      id={header.id}
      ref={(element: HTMLTableHeaderCellElement) => (elementRef = element)}
      onMouseDown={(event: MouseEvent) => handleDragStart(event, header.id, elementRef)}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.key.toLowerCase() === EnterKey) {
          handleKeyboardStart(event, header.id, elementRef);
        }
      }}>
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
      {/** Column resizing handler */}
      {frozenColumns.includes(header.id) ? (
        ''
      ) : (
        <ModusTableColumnResizingHandler
          table={table}
          header={header}
          onMouseEnter={() => onMouseEnterResize()}
          onMouseLeave={() => onMouseLeaveResize()}
        />
      )}
      {/** Icons for column reorder  */}
      <IconArrowDown size={'16'} />
      <IconArrowUp size={'16'} />
    </th>
  );
};

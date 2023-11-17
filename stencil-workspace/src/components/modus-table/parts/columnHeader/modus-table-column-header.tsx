import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header } from '@tanstack/table-core';
import { KEYBOARD_ENTER } from '../../modus-table.constants';
import { ModusTableColumnResizingHandler } from './modus-table-column-resizing-handler';
import { ModusTableColumnSortIcon } from './modus-table-column-sort-icon';
import TableContext from '../../models/table-context.model';

interface ModusTableColumnHeaderProps {
  context: TableContext;
  header: Header<unknown, unknown>;
  id: string;
  isNestedParentHeader: boolean;
  onDragStart: (
    event: MouseEvent | KeyboardEvent,
    id: string,
    elementRef: HTMLTableCellElement,
    mouseInteracted: boolean
  ) => void;
  onMouseEnterResize: () => void;
  onMouseLeaveResize: () => void;
}

/**
 * Modus Table Header
 */
export const ModusTableColumnHeader: FunctionalComponent<ModusTableColumnHeaderProps> = ({
  id,
  context,
  header,
  isNestedParentHeader,
  onDragStart,
  onMouseEnterResize,
  onMouseLeaveResize,
}) => {
  let elementRef: HTMLTableCellElement;
  const { tableInstance: table, isColumnResizing, columnReorder, frozenColumns, showSortIconOnHover } = context;
  const { column, id: headerId, colSpan, isPlaceholder, getSize } = header;

  return (
    <th
      data-accessor-key={headerId}
      tabindex={`${!isColumnResizing && columnReorder ? '0' : ''}`}
      key={id}
      colSpan={colSpan}
      /**
       * isNestedParentHeader: If parent in nested headers, `text-align: center` will be applied.
       * frozenColumns.includes(header.id): Checks if the header is to be frozen or not.
       * columnReorder && !frozenColumns.includes(header.id) && !isColumnResizing: Allows column reorder when column in not frozen and column resize is not active/underway.
       * isColumnResizing: If column resize is active, resize curser is displayed.
       * header.column.getIsResizing(): When a column resize is active/underway.
       */
      class={`
        ${isNestedParentHeader ? 'text-align-center' : ''}
        ${frozenColumns.includes(headerId) ? 'sticky-left' : ''}
        ${column.getIsResizing() ? 'active-resize' : ''}
      `}
      style={{
        width: `${getSize()}px`,
       ...columnReorder && ({
        'user-select': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none'
       }) 
      }}
      aria-label={column.columnDef.header}
      role="columnheader"
      scope="col"
      id={id}
      ref={(element: HTMLTableCellElement) => (elementRef = element)}
      onMouseDown={(event: MouseEvent) => onDragStart(event, headerId, elementRef, true)}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.key.toLowerCase() === KEYBOARD_ENTER) {
          onDragStart(event, headerId, elementRef, false);
        }
      }}
      >
      {isPlaceholder ? null : ( // header.isPlaceholder is Required for nested column headers to display empty cell
        <div class={column.getCanSort() && 'can-sort'}>
          <span>{column.columnDef.header}</span>
          {column.getCanSort() && (
            <ModusTableColumnSortIcon
              column={column}
              showSortIconOnHover={showSortIconOnHover}
              isColumnResizing={isColumnResizing}
            />
          )}
        </div>
      )}
      {/** Column resizing handler */}
      {column.getCanResize() ? (
        <ModusTableColumnResizingHandler
          table={table}
          header={header}
          onMouseEnter={() => onMouseEnterResize()}
          onMouseLeave={() => onMouseLeaveResize()}
        />
      ) : null}
    </th>
  );
};

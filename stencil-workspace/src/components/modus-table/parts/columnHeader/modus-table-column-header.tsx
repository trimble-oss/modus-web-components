import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header } from '@tanstack/table-core';
import { KEYBOARD_ENTER } from '../../modus-table.constants';
import { ModusTableColumnResizingHandler } from './modus-table-column-resizing-handler';
import { ModusTableColumnHeaderLabel } from './modus-table-column-header-label';
import { TableContext } from '../../models/table-context.models';
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
  disableAllTooltip?: (show: boolean) => void;
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
  disableAllTooltip,
}) => {
  let cellElementRef: HTMLTableCellElement;

  const {
    tableInstance: table,
    isColumnResizing,
    columnReorder,
    frozenColumns,
    showSortIconOnHover,
    sortIconStyle,
  } = context;
  const { column, id: headerId, colSpan, isPlaceholder, getSize } = header;

  return (
    <th
      data-accessor-key={headerId}
      tabindex={`${isColumnResizing ? '' : '0'}`}
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
        ${columnReorder ? 'hide-text-selection' : ''}
      `}
      style={{
        width: `${getSize()}px`,
      }}
      aria-label={column.columnDef.header}
      role="columnheader"
      scope="col"
      id={id}
      ref={(element: HTMLTableCellElement) => (cellElementRef = element)}
      onMouseDown={(event: MouseEvent) => onDragStart(event, headerId, cellElementRef, true)}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.key.toLowerCase() === KEYBOARD_ENTER) {
          onDragStart(event, headerId, cellElementRef, false);
        }
      }}>
      {!isPlaceholder && (
        <ModusTableColumnHeaderLabel
          isColumnResizing={isColumnResizing}
          showSortIconOnHover={showSortIconOnHover}
          sortIconStyle={sortIconStyle}
          column={column}
          disableAllTooltip={disableAllTooltip}
        />
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

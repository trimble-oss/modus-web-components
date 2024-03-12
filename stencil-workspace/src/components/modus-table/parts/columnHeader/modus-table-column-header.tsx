import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column, Header } from '@tanstack/table-core';
import {
  KEYBOARD_ENTER,
  SORT_ASCENDING,
  SORT_DESCENDING,
  SORTED_ASCENDING,
  SORTED_DESCENDING,
} from '../../modus-table.constants';
import { ModusTableColumnResizingHandler } from './modus-table-column-resizing-handler';
import { ModusTableColumnSortIcon } from './modus-table-column-sort-icon';
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
  let cellElementRef: HTMLTableCellElement;
  let headerContentRef: HTMLTableCellElement;

  const {
    tableInstance: table,
    isColumnResizing,
    columnReorder,
    frozenColumns,
    showSortIconOnHover,
    sortIconStyle,
  } = context;
  const { column, id: headerId, colSpan, isPlaceholder, getSize } = header;
  /**
   * To show sorting status.
   * @param column Data related to the perticular column.
   * @returns Active sort or sort that will occur.
   */
  const showSortingStatus = (column: Column<unknown, unknown>, isColumnResizing: boolean): string => {
    return isColumnResizing
      ? '' // When column resize is enabled, we don't show the tooltip.
      : column.getIsSorted() === 'asc'
        ? SORTED_ASCENDING
        : column.getIsSorted() === 'desc'
          ? SORTED_DESCENDING
          : column.getNextSortingOrder() === 'asc'
            ? SORT_ASCENDING
            : SORT_DESCENDING;
  };

  const handleSortIconHover = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() === KEYBOARD_ENTER) {
      column.toggleSorting();
      event.preventDefault();
    }
    event.stopPropagation();
  };

  const sorting_status_text = showSortingStatus(column, isColumnResizing);

  const renderContent = () => (
    <div
      tabindex={`${!isColumnResizing && columnReorder ? '0' : ''}`}
      style={{ outline: 'none', zIndex: '500' }}
      onFocus={() => {
        cellElementRef.classList.add('header-base');
      }}
      onBlur={() => {
        cellElementRef.classList.remove('header-base');
      }}>
      {isPlaceholder ? null : ( // header.isPlaceholder is Required for nested column headers to display empty cell
        <span
          class={column.getCanSort() && 'can-sort'}
          ref={(element: HTMLTableCellElement) => {
            headerContentRef = element;
          }}>
          <modus-tooltip text={sorting_status_text} disabled={!column.getCanSort()}>
            <span
              tabindex={`${column.getCanSort() ? '0' : ''}`}
              onFocus={() => {
                cellElementRef.firstElementChild.parentNode.querySelector('modus-tooltip').setAttribute('disabled', 'true');
              }}
              onMouseOver={() => {
                headerContentRef.children[1].setAttribute('disabled', 'true');
                cellElementRef.firstElementChild.parentNode.querySelector('modus-tooltip').setAttribute('disabled', 'true');
              }}
              onMouseLeave={() => {
                headerContentRef.children[1].setAttribute('disabled', 'false');
                cellElementRef.firstElementChild.parentNode.querySelector('modus-tooltip').setAttribute('disabled', 'false');
              }}
              onBlur={() => {
                cellElementRef.firstElementChild.parentNode.querySelector('modus-tooltip').setAttribute('disabled', 'false');
              }}
              onKeyDown={handleSortIconHover}
              class={`${column.getCanSort() && column.getIsSorted() ? 'sorted' : ''}`}>
              {column.columnDef.header}
            </span>
          </modus-tooltip>
          {column.getCanSort() && (
            <ModusTableColumnSortIcon
              column={column}
              sortIconStyle={sortIconStyle}
              showSortIconOnHover={showSortIconOnHover}
              sortingStatus={sorting_status_text}
              onKeyDown={handleSortIconHover}
              onMouseOver={() => {
                headerContentRef.children[0].setAttribute('disabled', 'true');
                cellElementRef.firstElementChild.parentNode.querySelector('modus-tooltip').setAttribute('disabled', 'true');
              }}
              onMouseLeave={() => {
                headerContentRef.children[1].setAttribute('disabled', 'false');
                headerContentRef.children[0].setAttribute('disabled', 'false');
                cellElementRef.firstElementChild.parentNode.querySelector('modus-tooltip').setAttribute('disabled', 'true');
              }}
              onBlur={() => {
                cellElementRef.firstElementChild.parentNode.querySelector('modus-tooltip').setAttribute('disabled', 'false');
              }}
            />
          )}
        </span>
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
    </div>
  );
  return (
    <th
      data-accessor-key={headerId}
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
      {columnReorder && (
        <modus-tooltip class="table-header-tooltip" text="Reorder column" position="bottom">
          {renderContent()}
        </modus-tooltip>
      )}
      {!columnReorder && renderContent()}
    </th>
  );
};

import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column } from '@tanstack/table-core';
import { IconSortAZ } from '../../../icons/icon-sort-a-z';
import { IconSortZA } from '../../../icons/icon-sort-z-a';
import {
  KEYBOARD_ENTER,
  SORT_ASCENDING,
  SORT_DESCENDING,
  SORTED_ASCENDING,
  SORTED_DESCENDING,
} from '../../modus-table.constants';

interface ModusTableColumnSortIconProps {
  column: Column<unknown, unknown>;
  showSortIconOnHover: boolean;
  isColumnResizing: boolean;
}

/**
 * To show sorting status.
 * @param column Data related to the perticular column.
 * @returns Active sort or sort that will occur.
 */
function showSortingStatus(column: Column<unknown, unknown>, isColumnResizing: boolean): string {
  return isColumnResizing
    ? '' // When column resize is enabled, we don't show the tooltip.
    : column.getIsSorted() === 'asc'
    ? SORTED_ASCENDING
    : column.getIsSorted() === 'desc'
    ? SORTED_DESCENDING
    : column.getNextSortingOrder() === 'asc'
    ? SORT_ASCENDING
    : SORT_DESCENDING;
}

/**
 * Toggles column sort on 'Enter' key press.
 * @param column Data related to the perticular column.
 * @param event Keyboard event.
 */
function sortOnKeyDown(column: Column<unknown, unknown>, event: KeyboardEvent): void {
  if (event.key.toLowerCase() === KEYBOARD_ENTER) {
    column.toggleSorting();
    event.preventDefault();
  }
  event.stopPropagation();
}

export const ModusTableColumnSortIcon: FunctionalComponent<ModusTableColumnSortIconProps> = ({
  column,
  showSortIconOnHover,
  isColumnResizing,
}) => {
  return (
    <modus-tooltip text={showSortingStatus(column, isColumnResizing)} position="bottom">
      {
        <span
          tabindex="0"
          aria-label={showSortingStatus(column, isColumnResizing)}
          role="button"
          onClick={column.getToggleSortingHandler()}
          onKeyDown={(event) => sortOnKeyDown(column, event)}
          onMouseDown={(event: MouseEvent) => event.stopPropagation()}
          class="sort-icon-container">
          <span
            class={`sort-icon
              ${!column.getIsSorted() && 'disabled'}
              ${showSortIconOnHover ? 'hidden' : ''}
            `}>
            {column.getIsSorted() === 'asc' ? <IconSortAZ size={'16'} /> : <IconSortZA size={'16'} />}
          </span>
        </span>
      }
    </modus-tooltip>
  );
};

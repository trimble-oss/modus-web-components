import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column } from '@tanstack/table-core';
import { IconSortAZ } from '../../../icons/icon-sort-a-z';
import { IconSortZA } from '../../../icons/icon-sort-z-a';
import { EnterKey, SortAscending, SortDescending, SortedAscending, SortedDescending } from '../../constants/constants';

interface ModusTableHeaderSortProps {
  column: Column<unknown, unknown>;
  showSortIconOnHover: boolean;
  columnResizeEnabled: boolean;
}

/**
 * To show sorting status.
 * @param column Data related to the perticular column.
 * @returns Active sort or sort that will occur.
 */
function showSortingStatus(column: Column<unknown, unknown>, columnResizeEnabled: boolean): string {
  return columnResizeEnabled
    ? '' // When column resize is enabled, we don't show the tooltip.
    : column.getIsSorted() === 'asc'
    ? SortedAscending
    : column.getIsSorted() === 'desc'
    ? SortedDescending
    : column.getNextSortingOrder() === 'asc'
    ? SortAscending
    : SortDescending;
}

/**
 * Toggles column sort on 'Enter' key press.
 * @param column Data related to the perticular column.
 * @param event Keyboard event.
 */
function sortOnKeyDown(column: Column<unknown, unknown>, event: KeyboardEvent): void {
  if (event.key.toLowerCase() === EnterKey) {
    column.toggleSorting();
    event.preventDefault();
  }
}

export const ModusTableHeaderSort: FunctionalComponent<ModusTableHeaderSortProps> = ({
  column,
  showSortIconOnHover,
  columnResizeEnabled,
}) => {
  return (
    <modus-tooltip text={showSortingStatus(column, columnResizeEnabled)} position="bottom">
      {
        <span
          tabindex="0"
          aria-label={showSortingStatus(column, columnResizeEnabled)}
          role="button"
          onClick={column.getToggleSortingHandler()}
          onKeyDown={(event) => sortOnKeyDown(column, event)}
          onMouseDown={(event: MouseEvent) => event.stopPropagation()}
          class="sort-icon-containor">
          <span class={`sort-icons ${!column.getIsSorted() && 'disabled'} ${showSortIconOnHover && 'hidden'}`}>
            {column.getIsSorted() === 'asc' ? <IconSortAZ size={'16'} /> : <IconSortZA size={'16'} />}
          </span>
        </span>
      }
    </modus-tooltip>
  );
};

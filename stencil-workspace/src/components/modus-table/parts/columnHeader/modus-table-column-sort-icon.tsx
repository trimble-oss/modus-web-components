import {
  FunctionalComponent,
  JSX,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column, SortDirection } from '@tanstack/table-core';
import { IconSortAZ } from '../../../../icons/svgs/icon-sort-a-z';
import { IconSortZA } from '../../../../icons/svgs/icon-sort-z-a';
import { IconSortArrowUp } from '../../../../icons/generated-icons/IconSortArrowUp';
import { IconSortArrowDown } from '../../../../icons/generated-icons/IconSortArrowDown';
import { IconUnsortedArrows } from '../../../../icons/generated-icons/IconUnsortedArrows';
import {
  KEYBOARD_ENTER,
  SORT_ASCENDING,
  SORT_DESCENDING,
  SORTED_ASCENDING,
  SORTED_DESCENDING,
} from '../../modus-table.constants';

interface ModusTableColumnSortIconProps {
  column: Column<unknown, unknown>;
  sortIconStyle: 'alphabetical' | 'directional';
  showSortIconOnHover: boolean;
  isColumnResizing: boolean;
}

/**
 * Render the correct sort icon
 * @param isSorted Is the column currently sorted
 * @param showAlternateIcons Show alternate (arrow up/down) icons
 * @returns Sort icon
 */
function renderSortIcon(isSorted: false | SortDirection, sortIconStyle: 'alphabetical' | 'directional'): JSX.Element {
  if (isSorted === 'asc') {
    return sortIconStyle === 'directional' ? <IconSortArrowUp size={'16'} /> : <IconSortAZ size={'16'} />;
  }

  if (isSorted === 'desc') {
    return sortIconStyle === 'directional' ? <IconSortArrowDown size={'16'} /> : <IconSortZA size={'16'} />;
  }

  return sortIconStyle === 'directional' ? <IconUnsortedArrows size={'16'} /> : <IconSortZA size={'16'} />;
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
  sortIconStyle,
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
            {renderSortIcon(column.getIsSorted(), sortIconStyle)}
          </span>
        </span>
      }
    </modus-tooltip>
  );
};

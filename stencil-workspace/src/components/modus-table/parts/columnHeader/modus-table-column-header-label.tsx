import {
  FunctionalComponent,
  JSX,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column, RowData, SortDirection } from '@tanstack/table-core';
import { ModusIconMap } from '../../../../icons/ModusIconMap';
import {
  KEYBOARD_ENTER,
  SORT_ASCENDING,
  SORT_DESCENDING,
  SORTED_ASCENDING,
  SORTED_DESCENDING,
} from '../../modus-table.constants';

interface ModusTableColumnHeaderLabelProps {
  column: Column<RowData, unknown>;
  isColumnResizing: boolean;
  sortIconStyle: 'alphabetical' | 'directional';
  showSortIconOnHover: boolean;
}

const ICON_SIZE = '16';

/**
 * Render sort icon based on direction and style
 * @param direction Column sort direction
 * @param style Alphabetical or directional (arrow up/down) icons
 * @returns Sort icon
 */
function renderSortIcon(direction: false | SortDirection, style: 'alphabetical' | 'directional'): JSX.Element {
  const icon = style === 'alphabetical' ? getAlphabeticalSortIcon(direction) : getDirectionalSortIcon(direction);
  return <ModusIconMap icon={icon} size={ICON_SIZE}></ModusIconMap>;
}

/**
 * Select directional icon based on direction
 * @param direction Is the column currently sorted
 * @returns string
 */
function getDirectionalSortIcon(direction: false | SortDirection): string {
  if (!direction) {
    return 'unsorted_arrows';
  }

  return direction === 'asc' ? 'sort_arrow_up' : 'sort_arrow_down';
}

/**
 * Select alphabetical icon based on direction
 * @param direction Is the column currently sorted
 * @returns string
 */
function getAlphabeticalSortIcon(direction: false | SortDirection): string {
  if (direction === 'asc') {
    return 'sort_alpha_down';
  }

  return 'sort_alpha_up';
}

/**
 * To show sorting status.
 * @param column Data related to the perticular column.
 * @returns Active sort or sort that will occur.
 */
function getSortingStatus(column: Column<unknown, unknown>, isColumnResizing: boolean): string {
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

export const ModusTableColumnHeaderLabel: FunctionalComponent<ModusTableColumnHeaderLabelProps> = ({
  column,
  isColumnResizing,
  sortIconStyle,
  showSortIconOnHover,
}) => {
  const sortingStatus = getSortingStatus(column, isColumnResizing);
  const canSort = column.getCanSort();
  const isSorted = column.getIsSorted();

  const containerProps = {
    'aria-label': sortingStatus,
    role: 'button',
    onClick: column.getToggleSortingHandler(),
    onKeyDown: (event) => sortOnKeyDown(column, event),
    onMouseDown: (event: MouseEvent) => event.stopPropagation(),
  };

  const HeaderText = () => {
    if (!canSort) {
      return column.columnDef.header;
    }

    return (
      <modus-tooltip class="column-title" text={sortingStatus}>
        <span {...containerProps} class={`header-text ${canSort && isSorted ? 'sorted' : ''}`}>
          {column.columnDef.header}
        </span>
      </modus-tooltip>
    );
  };

  const SortIcon = () => {
    if (!canSort) {
      return null;
    }

    return (
      <modus-tooltip class="modus-tooltip-sort-icon" text={sortingStatus} position="bottom">
        <span {...containerProps} tabindex="0" class="sort-icon-container">
          <span class={`sort-icon ${!isSorted && 'disabled'} ${showSortIconOnHover ? 'hidden' : ''}`}>
            {renderSortIcon(isSorted, sortIconStyle)}
          </span>
        </span>
      </modus-tooltip>
    );
  };

  return (
    <span class={canSort && 'can-sort'}>
      <HeaderText />
      <SortIcon />
    </span>
  );
};

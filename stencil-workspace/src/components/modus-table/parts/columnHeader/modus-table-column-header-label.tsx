import {
  FunctionalComponent,
  JSX,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column, RowData, SortDirection } from '@tanstack/table-core';
import { ModusIconMap } from '../../../../icons/ModusIconMap';
import {
  KEYBOARD_ENTER,
  SORTED_ASCENDING,
  SORTED_DESCENDING,
  SORT_ASCENDING,
  SORT_DESCENDING,
} from '../../modus-table.constants';

type ModusTableColumnHeaderLabelProps = {
  showSortIconOnHover: boolean;
  isColumnResizing: boolean;
  sortIconStyle: 'alphabetical' | 'directional';
  column: Column<RowData, any>;
  disableAllTooltip?: (show: boolean) => void;
};

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

function disableToolTip(element: Element, value: boolean) {
  if (element) {
    element.setAttribute('disabled', `${value}`);
  }
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

export const ModusTableColumnHeaderLabel: FunctionalComponent<ModusTableColumnHeaderLabelProps> = ({
  showSortIconOnHover,
  sortIconStyle,
  isColumnResizing,
  column,
  disableAllTooltip,
}) => {
  let headerContentRef: HTMLTableCellElement;

  const sortingStatus = getSortingStatus(column, isColumnResizing);
  const canSort = column.getCanSort();
  const isSorted = column.getIsSorted();

  const handleDisableElement = (element) => {
    if (canSort) {
      disableToolTip(element, true);
    }
  }

  const containerProps = {
    'aria-label': sortingStatus,
    role: "button",
    onClick: column.getToggleSortingHandler(),
    onMouseLeave: () => disableAllTooltip(false),
    onKeyDown: (event) => sortOnKeyDown(column, event),
    onMouseDown: (event: MouseEvent) => event.stopPropagation(),
    onBlur: () => canSort && disableAllTooltip(false),
  };

  const HeaderText = () => {
    return (
      <modus-tooltip text={sortingStatus} disabled={!canSort}>
        <span
          {...containerProps}
          class={`header-text ${canSort && isSorted ? 'sorted' : ''}`}
          onMouseEnter={() => {
            const sortIconToolTip = headerContentRef.children[1];
            handleDisableElement(sortIconToolTip)
          }}
          >
          {column.columnDef.header}
        </span>
      </modus-tooltip>
    );
  };

  const SortIcon = () => {
    if (!canSort) return null;
    return (
      <modus-tooltip class="modus-tooltip-sort-icon" text={sortingStatus} position="bottom">
        <span
            {...containerProps}
            tabindex="0"
            class="sort-icon-container"
            onMouseEnter={() => {
              const headerTextToolTip = headerContentRef.children[0];
              handleDisableElement(headerTextToolTip)
            }}
          >
          <span class={`sort-icon ${!isSorted && 'disabled'} ${showSortIconOnHover ? 'hidden' : ''}`}>
            {renderSortIcon(isSorted, sortIconStyle)}
          </span>
        </span>
      </modus-tooltip>
    );
  };

  return (
    // header.isPlaceholder is Required for nested column headers to display empty cell
    <span
      onMouseDown={(event: MouseEvent) => event.stopPropagation()}
      class={canSort && 'can-sort'}
      ref={(element: HTMLTableCellElement) => {
        headerContentRef = element;
      }}>
      <HeaderText />
      <SortIcon />
    </span>
  );
};

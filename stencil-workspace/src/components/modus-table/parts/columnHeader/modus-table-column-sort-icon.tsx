import {
  FunctionalComponent,
  JSX,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column, SortDirection } from '@tanstack/table-core';
import { ModusIconMap } from '../../../../icons/ModusIconMap';
import { KEYBOARD_ENTER } from '../../modus-table.constants';

interface ModusTableColumnSortIconProps {
  column: Column<unknown, unknown>;
  sortIconStyle: 'alphabetical' | 'directional';
  showSortIconOnHover: boolean;
  sortingStatus: string;
  onKeyDown: (e) => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  showToolTipText?: boolean;
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
  // showToolTipText,
  sortingStatus,
  onKeyDown,
  onMouseOver,
  onFocus,
  onBlur,
  onMouseLeave,
}) => {
  return (
    <modus-tooltip class="modus-tooltip-sort-icon" text={sortingStatus} position="bottom">
      {
        <span
          style={{ border: '1px solid green', zIndex: '1000' }}
          tabindex="0"
          aria-label={sortingStatus}
          role="button"
          onClick={column.getToggleSortingHandler()}
          onKeyDown={(event) => (onKeyDown ? onKeyDown(event) : sortOnKeyDown(column, event))}
          onMouseDown={(event: MouseEvent) => event.stopPropagation()}
          onMouseEnter={onMouseOver}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
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

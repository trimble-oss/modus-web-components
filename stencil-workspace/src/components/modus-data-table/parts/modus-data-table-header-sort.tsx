import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column } from '@tanstack/table-core';
import { IconSortAZ } from '../../icons/icon-sort-a-z';
import { IconSortZA } from '../../icons/icon-sort-z-a';
import {
  EnterKey,
  SortAscending,
  SortDescending,
  SortedAscending,
  SortedDescending,
} from '../constants/constants';

interface ModusDataTableHeaderSortProps {
  column: Column<unknown, unknown>;
  showSortIconOnHover: boolean;
}

/**
 * To show sorting status.
 * @param column Data related to the perticular column.
 * @returns Active sort or sort that will occur.
 */
function showSortingStatus(column: Column<unknown, unknown>): string {
  return column.getIsSorted() === 'asc'
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
function sortOnKeyDown(
  column: Column<unknown, unknown>,
  event: KeyboardEvent
): void {
  if (event.key === EnterKey) {
    column.toggleSorting();
    event.preventDefault();
  }
}

export const ModusDataTableHeaderSort: FunctionalComponent<
  ModusDataTableHeaderSortProps
> = (props: ModusDataTableHeaderSortProps) => {
  return (
    <modus-tooltip text={showSortingStatus(props.column)} position="bottom">
      {
        <span
          tabindex="0"
          aria-label={showSortingStatus(props.column)}
          onClick={props.column.getToggleSortingHandler()}
          onKeyDown={(event) => sortOnKeyDown(props.column, event)}
          class="sort-icon-containor">
          <span
            class={`sort-icons ${!props.column.getIsSorted() && 'disabled'} ${
              props.showSortIconOnHover && 'hidden'
            }`}>
            {props.column.getIsSorted() === 'asc' ? (
              <IconSortAZ size={'16'} />
            ) : (
              <IconSortZA size={'16'} />
            )}
          </span>
        </span>
      }
    </modus-tooltip>
  );
};

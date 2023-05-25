// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusDataTableSort, ModusTableSortOptions, TColumn } from '../modus-data-table.models';
import { IconSortAZ } from '../../icons/icon-sort-a-z';
import { IconSortZA } from '../../icons/icon-sort-z-a';

interface ModusDataTableHeaderProps {
  column: TColumn;
  onColumnHeaderClick: (columnId: string) => void;
  sortOptions: ModusTableSortOptions;
  sortState: ModusDataTableSort;
}

export function convertToSingleSpaceTitleCase(title: string): string {
  return title
    ?.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    })
    .replace(/\s+/g, ' ');
}

export const ModusDataTableHeader: FunctionalComponent<ModusDataTableHeaderProps> = (props: ModusDataTableHeaderProps) => {
  const sortIcon =
    props.sortState.direction !== 'none' ? (
      <modus-tooltip position="bottom" text={`${props.sortState.direction === 'asc' ? 'Sort descending' : 'Remove sort'}`}>
        <div class="icon-container">
          <div class="sort-icon">
            {props.sortState.direction === 'asc' ? <IconSortAZ size={'16'} /> : <IconSortZA size={'16'} />}
          </div>
        </div>
      </modus-tooltip>
    ) : null;
  const sortIconPlaceholder = <div style={{ width: '16px' }} />;

  return (
    <th class={`${props.sortOptions.canSort ? 'can-sort' : ''}`} onClick={() => props.onColumnHeaderClick(props.column.id)}>
      <div class={`column-header align-${props.column.align}`}>
        {props.column.align === 'right' && props.sortState.columnId !== props.column.id && sortIconPlaceholder}
        {props.column.align === 'right' &&
          props.sortState.columnId === props.column.id &&
          props.sortState.direction === 'none' &&
          sortIconPlaceholder}
        {props.column.align === 'right' && props.sortState.columnId === props.column.id && sortIcon}
        <div>{convertToSingleSpaceTitleCase(props.column.display)}</div>
        {props.column.align === 'left' && props.sortState.columnId === props.column.id && sortIcon}
        {props.column.align === 'center' && props.sortState.columnId === props.column.id && (
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute' }}>{sortIcon}</div>
          </div>
        )}
      </div>
    </th>
  );
};

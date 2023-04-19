import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header } from '@tanstack/table-core';
import { ModusDataTableHeaderSort } from './modus-data-table-header-sort';

interface ModusDataTableHeaderProps {
  header: Header<unknown, unknown>;
  index: number;
  lengthOfHeaderGroups: number;
  showSortIconOnHover: boolean;
}

/**
 * Modus Data Table Header
 */
export const ModusDataTableHeader: FunctionalComponent<
  ModusDataTableHeaderProps
> = (props: ModusDataTableHeaderProps) => {
  return (
    <th
      key={props.header.id}
      colSpan={props.header.colSpan}
      class={
        props.index < props.lengthOfHeaderGroups - 1 && 'text-align-center'
      }>
      {props.header.isPlaceholder ? null : (
        <div class={props.header.column.getCanSort() && 'can-sort'}>
          <span aria-label={props.header.column.columnDef.header}>
            {props.header.column.columnDef.header}
          </span>
          {props.header.column.getCanSort() && (
            <ModusDataTableHeaderSort
              column={props.header.column}
              showSortIconOnHover={props.showSortIconOnHover}
            />
          )}
        </div>
      )}
    </th>
  );
};

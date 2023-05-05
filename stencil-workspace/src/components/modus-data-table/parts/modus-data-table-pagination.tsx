import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';

interface ModusDataTablePaginationProps {
  table: Table<unknown>;
  totalCount: number;
  pageSizeList: number[];
}

export const ModusDataTablePagination: FunctionalComponent<
  ModusDataTablePaginationProps
> = ({ table, totalCount, pageSizeList }) => {
  return (
    <div>
      <span class="page-view-text">
        Page View{' '}
        <select
          class="page-view"
          onChange={(e) => {
            const target = e.target as EventTarget & HTMLInputElement;
            table.setPageSize(Number(target.value));
          }}>
          {pageSizeList?.map((size) => (
            <option key={size} value={size} selected={size === pageSizeList[0]}>
              {size}
            </option>
          ))}
        </select>
      </span>  
      <span class="pager">
        <modus-pagination
          active-page={1}
          max-page={table.getPageCount()}
          min-page={1}
          onPageChange={(event) =>
            table.setPageIndex(event.detail - 1)
          }></modus-pagination>
      </span>
      <span>
        <div class="pager-text">
          Showing result{' '}
          <span>
            {table.getState().pagination.pageIndex +
              1 +
              '-' +
              table.getState().pagination.pageSize}{' '}
            of {totalCount}
          </span>
        </div>
      </span>  
    </div>
  );
};

import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';
import { PageView, ShowResult } from '../constants/constants';

interface ModusDataTablePaginationProps {
  table: Table<unknown>;
  totalCount: number;
  pageSizeList: number[];
}

export const ModusDataTablePagination: FunctionalComponent<
  ModusDataTablePaginationProps
> = ({ table, totalCount, pageSizeList }) => {
  return (
    <div class="pagination-container">
      <span class="items-per-page">
        <span>{PageView}</span>
        <select
          onChange={(event) => {
            const target = event.target as EventTarget & HTMLInputElement;
            table.setPageSize(Number(target.value));
          }}>
          {pageSizeList?.map((size) => (
            <option key={size} value={size} selected={size === pageSizeList[0]}>
              {size}
            </option>
          ))}
        </select>
      </span>
      <span class="pagination-and-count">
        <span class="total-count">
          <span>{ShowResult}</span>
          <span>
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            -
            {table.getState().pagination.pageIndex + 1 === table.getPageCount()
              ? totalCount
              : (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize}{' '}
            of {totalCount}
          </span>
        </span>
        <modus-pagination
          active-page={1}
          max-page={table.getPageCount()}
          min-page={1}
          onPageChange={(event) =>
            table.setPageIndex(event.detail - 1)
          }></modus-pagination>
      </span>
    </div>
  );
};

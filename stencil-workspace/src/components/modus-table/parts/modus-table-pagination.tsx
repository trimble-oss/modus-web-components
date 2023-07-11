import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';
import { PageView, ShowResult } from '../constants/constants';

interface ModusTablePaginationProps {
  table: Table<unknown>;
  totalCount: number;
  pageSizeList: number[];
}

export const ModusTablePagination: FunctionalComponent<ModusTablePaginationProps> = ({
  table,
  totalCount,
  pageSizeList,
}) => {
  const optionsList = pageSizeList.map((option) => ({ display: option }));
  const handleChange = (event) => {
    const selectedValue = event.detail;
    event.target.value = selectedValue;
    table.setPageSize(Number(event.detail));
  };

  return (
    <div class="pagination-container">
      <div class="items-per-page">
        <span>{PageView}</span>
        <modus-select options-display-prop="display" options={optionsList} onValueChange={handleChange}></modus-select>
      </div>
      <div class="pagination-and-count">
        <div class="total-count">
          <span>{ShowResult}</span>
          <span>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
            {table.getState().pagination.pageIndex + 1 === table.getPageCount()
              ? totalCount
              : (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize}{' '}
            of {totalCount}
          </span>
        </div>
        <modus-pagination
          active-page={1}
          max-page={table.getPageCount()}
          min-page={1}
          onPageChange={(event) => table.setPageIndex(event.detail - 1)}></modus-pagination>
      </div>
    </div>
  );
};

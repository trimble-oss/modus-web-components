import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { PAGINATION_PAGEVIEW_TEXT, PAGINATION_SUMMARY_TEXT } from '../modus-table.constants';
import { TableContext } from '../models/table-context.models';

interface ModusTablePaginationProps {
  context: TableContext;
}

export const ModusTablePagination: FunctionalComponent<ModusTablePaginationProps> = ({
  context: { tableInstance: table, pageSizeList, data, manualPaginationOptions },
}) => {
  const { options, getState, getPageCount, getExpandedRowModel, setPageIndex, setPageSize } = table;
  const { pageIndex, pageSize } = getState().pagination;
  const optionsList = pageSizeList.map((option) => ({ display: option }));
  const totalCount = manualPaginationOptions?.totalRecords ?? data?.length;
  const selectedPageSize = optionsList.find((l) => l.display === pageSize);

  const handleChange = (event) => {
    const selectedValue = event.detail;
    setPageSize(Number(selectedValue?.display));
  };

  return (
    <div class="pagination-container">
      <div class="items-per-page">
        <span>{PAGINATION_PAGEVIEW_TEXT}</span>
        <modus-select
          ariaLabel="Select page size"
          options-display-prop="display"
          options={optionsList}
          onValueChange={handleChange}
          value={selectedPageSize}></modus-select>
      </div>
      <div class="pagination-and-count">
        <div class="total-count">
          <span>{PAGINATION_SUMMARY_TEXT}</span>
          <span>{pageIndex * pageSize + 1}</span>
          <span>-</span>
          <span>
            {pageIndex + 1 === getPageCount()
              ? !options.manualPagination && options.paginateExpandedRows
                ? getExpandedRowModel().rows.length
                : totalCount
              : (pageIndex + 1) * pageSize}
          </span>
          <span>of</span>
          <span>
            {!options.manualPagination && options.paginateExpandedRows ? getExpandedRowModel().rows.length : totalCount}
          </span>{' '}
        </div>
        <modus-pagination
          active-page={pageIndex + 1}
          max-page={getPageCount()}
          min-page={1}
          onPageChange={(event) => setPageIndex(event.detail - 1)}></modus-pagination>
      </div>
    </div>
  );
};

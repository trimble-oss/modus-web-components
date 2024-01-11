import {
  h, // eslint-disable-line @typescript-eslint/no-unused-vars,
  Component,
  Prop,
} from '@stencil/core';
import { PAGINATION_PAGEVIEW_TEXT, PAGINATION_SUMMARY_TEXT } from '../modus-table.constants';
import { TableContext } from '../models/table-context.models';

@Component({
  tag: 'modus-table-pagination',
  shadow: false,
})
export class ModusTablePagination {
  @Prop() tableContext: TableContext;

  private pageSize = 0;
  private totalCount = 0;
  private pageIndex = 0;

  setPageIndex(pageIndex: number) {
    // We don't want to update when the page index is unchanged or < 0.
    const currentPageIndex = this.tableContext.tableInstance.getState().pagination.pageIndex;
    if (currentPageIndex === pageIndex || pageIndex < 0) return;
    this.pageIndex = pageIndex;
    this.tableContext.tableInstance.setPageIndex(this.pageIndex);
  }

  componentWillRender() {
    if (this.tableContext.manualPaginationOptions) {
      this.prepareManualPaginationProperties();
      return;
    }

    if (this.tableContext.pagination) {
      const state = this.tableContext.tableInstance.getState();
      const maxPageIndex = this.tableContext.tableInstance.getPageCount() - 1;
      this.setPageIndex(this.pageIndex <= maxPageIndex ? this.pageIndex : maxPageIndex);

      this.pageSize = state.pagination.pageSize;
      this.totalCount = this.tableContext.data.length ?? 0;
    }
  }

  prepareManualPaginationProperties() {
    const { totalRecords, currentPageIndex, currentPageSize } = this.tableContext.manualPaginationOptions;
    this.pageIndex = currentPageIndex - 1;
    this.pageSize = currentPageSize ?? 0;
    this.totalCount = totalRecords ?? this.tableContext.tableInstance.getExpandedRowModel().rows.length;
  }

  render() {
    const { options, getPageCount, getExpandedRowModel, setPageSize } = this.tableContext.tableInstance;
    const pageSizeList = this.tableContext.pageSizeList;
    const manualPaginationOptions = this.tableContext.manualPaginationOptions;

    const optionsList = pageSizeList.map((option) => ({ display: option }));
    const selectedPageSize = optionsList.find((l) => l.display === this.pageSize);
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
            <span>{this.pageIndex * this.pageSize + 1}</span>
            <span>-</span>
            <span>
              {this.pageIndex + 1 === getPageCount()
                ? !manualPaginationOptions && options.paginateExpandedRows
                  ? getExpandedRowModel().rows.length
                  : this.totalCount
                : (this.pageIndex + 1) * this.pageSize}
            </span>
            <span>of</span>
            <span>
              {!manualPaginationOptions && options.paginateExpandedRows
                ? getExpandedRowModel().rows.length
                : this.totalCount}
            </span>{' '}
          </div>
          <modus-pagination
            active-page={this.pageIndex + 1}
            max-page={getPageCount()}
            min-page={1}
            onPageChange={(event) => this.setPageIndex(event.detail - 1)}></modus-pagination>
        </div>
      </div>
    );
  }
}

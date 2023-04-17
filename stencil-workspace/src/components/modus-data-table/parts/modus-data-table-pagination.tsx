import {
    FunctionalComponent,
    h, // eslint-disable-line @typescript-eslint/no-unused-vars
  } from '@stencil/core';
  import { PaginationState, Table } from '@tanstack/table-core';
  
  interface ModusDataTablePaginationProps {
    table: Table<unknown>;
    paginationState: PaginationState;
    dataLength: number;
  }
  
  export const ModusDataTablePagination: FunctionalComponent<
    ModusDataTablePaginationProps
  > = (props: ModusDataTablePaginationProps) => {
    return (
      <div>
        <span class="pager">
          <modus-pagination
            active-page="1"
            max-page={Math.ceil(props.dataLength / props.paginationState.pageSize)}
            min-page="1"
            onPageChange={(event) =>
            props.table.setPageIndex(event.detail - 1)
            }></modus-pagination>
        </span>
        <span>
          <div class="pager-text">
            Showing result{' '}
            <strong>
              {props.paginationState.pageIndex +
                1 +
                '-' +
                props.paginationState.pageSize}{' '}
              of {props.dataLength}
            </strong>
          </div>
        </span>
        <span class="page-view-text">
          Page View{' '}
          <select
            class="page-view"
            onChange={(e) => {
              const target = e.target as EventTarget & HTMLInputElement;
              props.table.setPageSize(Number(target.value));
            }}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize} selected={pageSize === 10}>
                {pageSize}
              </option>
            ))}
          </select>
        </span>
      </div>
    );
  };
  
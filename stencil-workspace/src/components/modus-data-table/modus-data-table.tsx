import {
  Component, Host, Prop, State, Watch,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import {
  ColumnDef,
  PaginationState,
  Table,
  TableState,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/table-core';
<<<<<<< HEAD
import { ModusDataTableColumn, ModusDataTableDisplayOptions } from './models';
import { ModusDataTableCell } from './parts/modus-data-table-cell';
import { ModusDataTableHeader } from './parts/modus-data-table-header';
=======
import { ModusTableDisplayOptions } from '../modus-table/modus-table.models';
import { ColumnDataType } from './enums/column-data-type';
import { ModusDataTableColumn } from './models/modus-data-table-column';
import { useStencilTable } from './stencil-adapter';
>>>>>>> 0d42079 (pagination code added)

@Component({
  tag: 'modus-data-table',
  styleUrl: 'modus-data-table.scss',
  shadow: true,
})
export class ModusDataTable {
  /* (required) To display headers in the table. */
  @Prop({ mutable: true }) columnHeaders!: ModusDataTableColumn[];

  /* (required) To display data in the table. */
  @Prop({ mutable: true }) data!: unknown[];

  @State() table: Table<unknown>;

  @Prop({ mutable: true }) pageCount = 1;

  /* (optional) To enable hover on table rows. */
  @Prop() hover = false;

  @State() tableData: unknown[];

  // eslint-disable-next-line @typescript-eslint/ban-types
  @State() tableState: TableState | {} = {};


  /** Options for data table display. */
  @Prop() displayOptions?: ModusDataTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

<<<<<<< HEAD
  options: TableOptionsResolved<unknown> = {
    data: this.data,
    columns: this.columnHeaders as ColumnDef<unknown>[],
    state: {
      columnPinning: {},
    },
    getCoreRowModel: getCoreRowModel(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onStateChange: () => {},
    renderFallbackValue: null,
  };
  table: Table<unknown> = createTable(this.options);
=======
  @State() paginationState: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
  };
  
  @Watch('tableState')
  watchTableStateHandler() {
    this.createTable();
  }

  async componentWillLoad() {
    const { pageIndex, pageSize } = this.paginationState;
    const rows = this.data.slice((pageIndex * pageSize), ((pageIndex + 1) * pageSize));
    const pageCount = Math.ceil(this.data.length / pageSize);
    this.tableData = rows;
    this.pageCount = pageCount;
    this.refreshTable();
  }

  refreshTable() {
    this.tableState = { ...this.tableState };
  }

  createTable() {
    this.table = useStencilTable({
      state: { ...this.tableState, pagination: this.paginationState },
      data: this.tableData,
      columns: this.columnHeaders as ColumnDef<unknown>[],
      pageCount: this.pageCount,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onStateChange: (updater) => {
        this.tableState = (typeof updater === 'function') ? updater(this.table.getState()) : updater;
      },
      onPaginationChange: (updater) => {
        this.paginationState = (typeof updater === 'function') ? updater(this.paginationState) : updater;
        const { pageIndex, pageSize } = this.paginationState;
        const rows = this.data.slice(((pageIndex) * pageSize), ((pageIndex + 1) * pageSize));
        const pageCount = Math.ceil(this.data.length / pageSize);
        this.tableData = rows;
        this.pageCount = pageCount;
        this.refreshTable();
      },
      manualPagination: true,
    });
  }
>>>>>>> 0d42079 (pagination code added)

  render() {
    const lengthOfHeaderGroups: number = this.table.getHeaderGroups().length;
    const className = `
    ${this.displayOptions.borderless ? 'borderless' : ''}
    ${this.displayOptions.cellBorderless ? 'cell-borderless' : ''}
  `;

    return (
      <Host>
      <table class={className}>
        <thead>
          {this.table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <ModusDataTableHeader
                    header={header}
                    index={index}
                    lengthOfHeaderGroups={lengthOfHeaderGroups}
                  />
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {this.table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} class={this.hover ? 'enable-hover' : ''}>
                {row.getVisibleCells().map((cell) => {
                  return <ModusDataTableCell cell={cell} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br/>
      <div >
          <span class="pager">
            <modus-pagination
              active-page="1"
              max-page={this.table.getPageCount()}
              min-page="1"
              onPageChange={event => this.table.setPageIndex(event.detail-1)}
          ></modus-pagination>
            </span> 
          <span>
            <div class="pager-text">Showing result {' '}
              <strong>
                {this.table.getState().pagination.pageIndex + 1 + '-' + this.table.getState().pagination.pageSize} of {' '}
                {this.data.length}
              </strong>
            </div>
          </span>
          <span class="page-view-text">
            Page View {' '}
            <select class="page-view"
              onChange={e => {
                const target = e.target as EventTarget & HTMLInputElement;
                this.table.setPageSize(Number(target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize} selected={pageSize === this.table.getState().pagination.pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </span>
        </div>
        </Host>
    );
  }
}

import {
  Component, Host, Prop, State,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import {
  ColumnDef,
  Table,
  TableOptionsResolved,
  Updater,
  createTable,
  getCoreRowModel,
  getPaginationRowModel
} from '@tanstack/table-core';
import { ModusDataTableColumn, ModusDataTableDisplayOptions } from './models';
import { ModusDataTableCell } from './parts/modus-data-table-cell';
import { ModusDataTableHeader } from './parts/modus-data-table-header';
import { ModusDataTablePagination } from './parts/modus-data-table-pagination';
import { PaginationState } from './models/modus-data-table-pagination-option';

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

  /* (optional) To enable hover on table rows. */
  @Prop() hover = false;

  /* (optional) To enable hover on table rows. */
  @Prop() isPagination: boolean;

  /** Options for data table display. */
  @Prop() displayOptions?: ModusDataTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

  /** Pagination block start */
  @State() paginationState: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
    pageCount: 1,
  };

  setPagination(updater: Updater<PaginationState>) {
    this.paginationState =
      typeof updater === 'function' ? updater(this.paginationState) : updater;
    const { pageIndex, pageSize } = this.paginationState;
    const rows = this.data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
    const pageCount = Math.ceil(this.data.length / pageSize);
    this.options.data = rows;
    this.paginationState.pageCount = pageCount;
    this.table = createTable(this.options);
  }
  /** Pagination block end */

  options: TableOptionsResolved<unknown> = {
    data: this.data,
    columns: this.columnHeaders as ColumnDef<unknown>[],
    state: {
      columnPinning: {},
      pagination: this.paginationState,
    },
    manualPagination: true,
    onPaginationChange: (updater: Updater<PaginationState>) =>
      this.setPagination(updater),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onStateChange: () => {},
    renderFallbackValue: null,
  };

  componentWillLoad() {
    if (this.isPagination) {
      this.options.data = this.data.slice(0, this.paginationState.pageSize);
      this.table = this.table = createTable(this.options);
      const pageCount = Math.ceil(this.data.length / this.paginationState.pageSize);
      this.paginationState.pageCount = pageCount;
    }
  }

  table: Table<unknown> = createTable(this.options);

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
        <br />
        {this.isPagination && (
          <ModusDataTablePagination
            table={this.table}
            paginationState={this.paginationState}
            dataLength={this.data.length}
          />
        )}
      </Host>
    );
  }
}

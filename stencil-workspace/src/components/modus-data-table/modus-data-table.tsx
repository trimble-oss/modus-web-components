import {
  Component,
  Host,
  Prop,
  State,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import {
  ColumnDef,
  PaginationState,
  Table,
  TableOptionsResolved,
  Updater,
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/table-core';
import { ModusDataTableColumn, ModusDataTableDisplayOptions } from './models';
import { ModusDataTableCell } from './parts/modus-data-table-cell';
import { ModusDataTableHeader } from './parts/modus-data-table-header';
import { ModusDataTablePagination } from './parts/modus-data-table-pagination';

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

  /* (optional) To enable pagination for the table. */
  @Prop() pagination : boolean;

  /* (optional) To set pagesize for the pagination. */
  @Prop() pageSizeList: number[];

  /** Options for data table display. */
  @Prop() displayOptions?: ModusDataTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

  @State() paginationState: PaginationState = {
    pageIndex: 0,
    pageSize: 10
  };

  options: TableOptionsResolved<unknown> = {
    data: this.data,
    columns: this.columnHeaders as ColumnDef<unknown>[],
    state: {
      pagination: this.paginationState
    },
    onPaginationChange: (updater: PaginationState) => this.setPagination(updater),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onStateChange: () => { },
    renderFallbackValue: null,
  };
  table: Table<unknown> = createTable(this.options);

  componentWillLoad() {
    this.table.setOptions((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        ...this.table.initialState,
      },
    }));
  }

  setPagination(updater: Updater<PaginationState>): void {
    this.paginationState = updater instanceof Function ? updater(this.paginationState) : updater;
    this.table.options.state.pagination = this.paginationState;
  }

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
        {(this.pagination && this.data.length !== 0) && (
          <ModusDataTablePagination
            table={this.table}
            totalCount={this.data.length}
            pageSizeList={this.pageSizeList}
          />
        )}
      </Host>
    );
  }
}

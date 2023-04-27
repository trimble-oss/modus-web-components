import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  Watch,
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
  getSortedRowModel,
} from '@tanstack/table-core';
import {
  ModusDataTableColumn,
  ModusDataTableDisplayOptions,
  ModusDataTableSortingState,
} from './models';
import { ModusDataTableCell } from './parts/modus-data-table-cell';
import { ModusDataTableHeader } from './parts/modus-data-table-header';
import { ModusDataTablePagination } from './parts/modus-data-table-pagination';

@Component({
  tag: 'modus-data-table',
  styleUrl: 'modus-data-table.scss',
  shadow: true,
})
export class ModusDataTable {
  /** (Required) To display headers in the table. */
  @Prop({ mutable: true }) columns!: ModusDataTableColumn[];
  @Watch('columns') updateColumsOnChange() {
    this.table.options.columns = this.columns;
  }

  /** (Required) To display data in the table. */
  @Prop({ mutable: true }) data!: unknown[];
  @Watch('data') updateDataOnChange() {
    this.table.options.data = this.data;
  }

  /** (Optional) To enable row hover in table. */
  @Prop() hover = false;

  /** (Optional) To sort data in table. */
  @Prop() sort = false;

  /** (Optional) To display sort icon on hover. */
  @Prop() showSortIconOnHover = false;

  /* (optional) To enable pagination for the table. */
  @Prop() pagination: boolean;

  /* (optional) To set pagesize for the pagination. */
  @Prop() pageSizeList: number[] = [10,20,50];

  /** (Optional) To control display options of table. */
  @Prop() displayOptions?: ModusDataTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

  /** Emits event on sort change */
  @Event() sorting: EventEmitter<ModusDataTableSortingState>;

  @State() sortState: ModusDataTableSortingState = [];
  @State() table: Table<unknown>;
  @State() paginationState: PaginationState = {
    pageIndex: 0,
    pageSize: this.pageSizeList[0],
  };

  componentWillLoad(): void {
    this.initializeTable();
  }

  initializeTable(): void {
    const options: TableOptionsResolved<unknown> = {
      data: this.data ?? [],
      columns: (this.columns as ColumnDef<unknown>[]) ?? [],
      state: {
        columnPinning: {},
        sorting: this.sortState,
      },
      enableSorting: this.sort,
      sortDescFirst: false,      // To-Do, this is work around to sort descending by default.
      onSortingChange: (updater: Updater<ModusDataTableSortingState>) =>
        this.setSorting(updater),
      onPaginationChange: (updater: PaginationState) => this.setPagination(updater),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onStateChange: () => {},
      renderFallbackValue: null,
    };
    this.table = createTable(options);

    this.table.setOptions((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        ...this.table.initialState,
        pagination: { ...this.paginationState, pageSize: this.pageSizeList[0] },
      },      
    }));
  }

  setSorting(updater: Updater<ModusDataTableSortingState>): void {
    this.sortState =
      updater instanceof Function ? updater(this.sortState) : updater;
    this.table.options.state.sorting = this.sortState;
    this.sorting.emit(this.sortState);
  }

  setPagination(updater: Updater<PaginationState>): void {
    this.paginationState = updater instanceof Function ? updater(this.paginationState) : updater;
    this.table.options.state.pagination = this.paginationState;
  }

  render(): void {
    const lengthOfHeaderGroups: number = this.table.getHeaderGroups().length;
    const className = `
      ${this.displayOptions.borderless && 'borderless'}
      ${this.displayOptions.cellBorderless && 'cell-borderless'}
    `;

    return (
      <Host>
        <table class={className}>
          <thead>
            {this.table.getHeaderGroups()?.map((headerGroup, index) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header) => {
                  return (
                    <ModusDataTableHeader
                      header={header}
                      index={index}
                      lengthOfHeaderGroups={lengthOfHeaderGroups}
                      showSortIconOnHover={this.showSortIconOnHover}
                    />
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {this.table.getRowModel()?.rows.map((row) => {
              return (
                <tr key={row.id} class={this.hover && 'enable-hover'}>
                  {row.getVisibleCells()?.map((cell) => {
                    return <ModusDataTableCell cell={cell} />;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        {this.pagination && (
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

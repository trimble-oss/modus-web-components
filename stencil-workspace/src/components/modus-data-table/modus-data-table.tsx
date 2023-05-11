import {
  Component,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import {
  Column,
  ColumnDef,
  ColumnSizingInfoState,
  ColumnSizingState,
  HeaderGroup,
  PaginationState,
  Table,
  TableOptionsResolved,
  Updater,
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/table-core';
import {
  ModusDataTableColumn,
  ModusDataTableDisplayOptions,
  ModusDataTableSortingState,
} from './models';
import { ModusDataTableCell } from './parts/modus-data-table-cell';
import { ModusDataTableHeader } from './parts/modus-data-table-header';
import { ModusDataTablePagination } from './parts/modus-data-table-pagination';
import { ModusDataTableSummaryRow } from './parts/modus-data-table-summary-row';

/**
 * @slot customFooter - Slot for custom footer.
 */
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

  /* (optional) To manage column resizing */
  @Prop() columnResize = false;

  /* (optional) To manage table resizing */
  @Prop() fullWidth = true;

  /** (Optional) To sort data in table. */
  @Prop() sort = false;

  /** (Optional) To display sort icon on hover. */
  @Prop() showSortIconOnHover = false;

  /* (optional) To enable pagination for the table. */
  @Prop() pagination: boolean;

  /* (optional) To set pagesize for the pagination. */
  @Prop() pageSizeList: number[] = [10, 20, 50];

  /** (Optional) To display summary row. */
  @Prop() summaryRow = false;

  /** (Optional) To control display options of table. */
  @Prop() displayOptions?: ModusDataTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

  /** Emits event on sort change */
  @Event() sortChange: EventEmitter<ModusDataTableSortingState>;

  /** Column resizing starts */
  @State() columnSizing: ColumnSizingState = {};
  @State() columnSizingInfo: ColumnSizingInfoState =
    {} as ColumnSizingInfoState;
  /** Column resizing ends */

  @State() sorting: ModusDataTableSortingState = [];
  @State() table: Table<unknown>;
  @State() paginationState: PaginationState = {
    pageIndex: 0,
    pageSize: this.pageSizeList[0],
  };

  componentWillLoad(): void {
    this.initializeTable();
  }

  /**
   * Creates a table with some set of options.
   */
  initializeTable(): void {
    const options: TableOptionsResolved<unknown> = {
      data: this.data ?? [],
      columns: (this.columns as ColumnDef<unknown>[]) ?? [],
      state: {
        columnPinning: {},
        sorting: this.sorting,
        columnSizing: {},
        columnSizingInfo: {} as ColumnSizingInfoState,
      },
      enableSorting: this.sort,
      columnResizeMode: 'onChange',
      enableColumnResizing: this.columnResize,
      sortDescFirst: false, // To-Do, workaround to prevent sort descending on certain columns, e.g. numeric.
      onSortingChange: (updater: Updater<ModusDataTableSortingState>) =>
        this.setSorting(updater),
      onPaginationChange: (updater: PaginationState) =>
        this.setPagination(updater),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnSizingChange: (updater: Updater<ColumnSizingState>) =>
        this.updatingState(updater, 'columnSizing'),
      onColumnSizingInfoChange: (updater: Updater<ColumnSizingInfoState>) =>
        this.updatingState(updater, 'columnSizingInfo'),
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

  private updatingState(updater: Updater<unknown>, key: string) {
    this[key] = updater instanceof Function ? updater(this[key]) : updater;
    this.table.options.state[key] = this[key];
  }

  setSorting(updater: Updater<ModusDataTableSortingState>): void {
    this.updatingState(updater, 'sorting');
    this.sortChange.emit(this.sorting);
  }

  setPagination(updater: Updater<PaginationState>): void {
    this.paginationState =
      updater instanceof Function ? updater(this.paginationState) : updater;
    this.table.options.state.pagination = this.paginationState;
  }

  /**
   * Returns data of a column.
   * @param accessorKey : Column name as key.
   * @returns : Column data as Array or empty array.
   */
  @Method()
  async getColumnData(accessorKey: string): Promise<unknown[]> {
    const columns: Column<unknown, unknown>[] = this.table.getAllLeafColumns();

    let rowData: unknown[] = [];
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].columnDef['accessorKey'] === accessorKey) {
        rowData = this.table.options.data.map((row) => row[accessorKey]);
        break;
      }
    }
    return rowData;
  }

  render(): void {
    const lengthOfHeaderGroups: number = this.table.getHeaderGroups().length;
    const tableStyle = this.fullWidth
      ? { width: '100%' }
      : { width: `${this.table.getTotalSize()}px`, tableLayout: 'fixed' };

    const headerGroups: HeaderGroup<unknown>[] = this.table.getHeaderGroups();
    const footerGroups: HeaderGroup<unknown>[] = this.table.getFooterGroups();
    const className = `
      ${this.displayOptions.borderless && 'borderless'}
      ${this.displayOptions.cellBorderless && 'cell-borderless'}
    `;

    return (
      <Host>
        <table class={className} style={tableStyle}>
          <thead>
            {headerGroups?.map((headerGroup, index) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers?.map((header) => {
                  return (
                    <ModusDataTableHeader
                      header={header}
                      isNestedParentHeader={index < lengthOfHeaderGroups - 1}
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
                  {row.getAllCells()?.map((cell) => {
                    return <ModusDataTableCell cell={cell} />;
                  })}
                </tr>
              );
            })}
          </tbody>
          {this.summaryRow ? (
            <ModusDataTableSummaryRow
              footerGroups={[footerGroups[0]]}
              tableData={this.data}
            />
          ) : (
            ''
          )}
        </table>
        <slot name="customFooter"></slot>
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

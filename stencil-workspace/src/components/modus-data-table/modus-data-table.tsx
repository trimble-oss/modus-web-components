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
  Table,
  TableOptionsResolved,
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  ColumnSizingState,
  Updater,
  ColumnSizingInfoState,
} from '@tanstack/table-core';
import {
  ModusDataTableColumn,
  ModusDataTableDisplayOptions,
  ModusDataTableSortingState,
} from './models';
import { ModusDataTableCell } from './parts/modus-data-table-cell';
import { ModusDataTableHeader } from './parts/modus-data-table-header';

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
  @Prop() enableColumnResizing = false;

  /** (Optional) To sort data in table. */
  @Prop() sort = false;

  /** (Optional) To display sort icon on hover. */
  @Prop() showSortIconOnHover = false;

  /** (Optional) To control display options of table. */
  @Prop() displayOptions?: ModusDataTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

  /** Emits event on sort change */
  @Event() onSort: EventEmitter<ModusDataTableSortingState>;

  /** Column resizing starts */
  @State() columnSizing: ColumnSizingState = {};
  @State() columnSizingInfo: ColumnSizingInfoState =
    {} as ColumnSizingInfoState;
  /** Column resizing ends */  

  @State() sorting: ModusDataTableSortingState = [];
  @State() table: Table<unknown>;


  componentWillLoad(): void {
    this.initializeTable();
  }

  initializeTable(): void {
    const options: TableOptionsResolved<unknown> = {
      data: this.data ?? [],
      columns: (this.columns as ColumnDef<unknown>[]) ?? [],
      columnResizeMode: 'onChange',
      enableColumnResizing: this.enableColumnResizing,
      state: {
        columnPinning: {},
        sorting: this.sorting,
        columnSizing: {},
        columnSizingInfo: {} as ColumnSizingInfoState,
      },
      enableSorting: this.sort,
      onSortingChange: (updater: Updater<ModusDataTableSortingState>) =>
        this.setSorting(updater),
      getCoreRowModel: getCoreRowModel(),
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
  }
  
  private updatingState(updater: Updater<unknown>, key: string) {
    this[key] = updater instanceof Function ? updater(this[key]) : updater;
    this.table.options.state[key] = this[key];
  }

  setSorting(updater: Updater<ModusDataTableSortingState>): void {
    this.updatingState(updater, 'sorting');
    this.onSort.emit(this.sorting);
  }

  render(): void {
    const lengthOfHeaderGroups: number = this.table.getHeaderGroups().length;
    const className = `
      ${this.displayOptions.borderless && 'borderless'}
      ${this.displayOptions.cellBorderless && 'cell-borderless'}
    `;

    return (
      <Host>
        <table class={className}
         style={{ width: `${this.table.getCenterTotalSize()}px` }}>
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
      </Host>
    );
  }
}

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
  Updater,
  createTable,
  getCoreRowModel,
  getSortedRowModel,
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
  @Event() sorting: EventEmitter<ModusDataTableSortingState>;

  @State() sortState: ModusDataTableSortingState = [];
  @State() table: Table<unknown>;

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
      onSortingChange: (updater: Updater<ModusDataTableSortingState>) =>
        this.setSorting(updater),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onStateChange: () => {},
      renderFallbackValue: null,
    };
    this.table = createTable(options);
  }

  setSorting(updater: Updater<ModusDataTableSortingState>): void {
    this.sortState =
      updater instanceof Function ? updater(this.sortState) : updater;
    this.table.options.state.sorting = this.sortState;
    this.sorting.emit(this.sortState);
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
      </Host>
    );
  }
}

import {
  Component,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import {
  ColumnDef,
  Table,
  TableOptionsResolved,
  createTable,
  getCoreRowModel,
} from '@tanstack/table-core';
import { ModusDataTableColumn, ModusDataTableDisplayOptions } from './models';
import { ModusDataTableCell } from './parts/modus-data-table-cell';
import { ModusDataTableHeader } from './parts/modus-data-table-header';

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

  /** Options for data table display. */
  @Prop() displayOptions?: ModusDataTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

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

  render() {
    const lengthOfHeaderGroups: number = this.table.getHeaderGroups().length;
    const className = `
    ${this.displayOptions.borderless ? 'borderless' : ''}
    ${this.displayOptions.cellBorderless ? 'cell-borderless' : ''}
  `;

    return (
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
    );
  }
}

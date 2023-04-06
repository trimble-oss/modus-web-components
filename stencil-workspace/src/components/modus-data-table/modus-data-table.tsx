import { Component, Prop, h } from '@stencil/core';
import {
  ColumnDef,
  Table,
  TableOptionsResolved,
  createTable,
  getCoreRowModel,
} from '@tanstack/table-core';
import { ModusTableDisplayOptions } from '../modus-table/modus-table.models';

@Component({
  tag: 'modus-data-table',
  styleUrl: 'modus-data-table.scss',
  shadow: true,
})
export class ModusDataTable {
  /* (required) To display headers in the table. */
  @Prop({ mutable: true }) columnHeaders!: ColumnDef<any>[];

  /* (required) To display data in the table. */
  @Prop({ mutable: true }) data!: any[];

  /** Options for data table display. */
  @Prop() displayOptions?: ModusTableDisplayOptions = {
    animateRowActionsDropdown: false,
    borderless: true,
    cellBorderless: false,
    rowStripe: false,
    size: 'large',
  };

  classBySize: Map<string, string> = new Map([
    ['small', 'size-small'],
    ['large', 'size-large'],
  ]);

  options: TableOptionsResolved<any> = {
    data: this.data,
    columns: this.columnHeaders,
    state: {
      columnPinning: {},
    },
    getCoreRowModel: getCoreRowModel(),
  } as TableOptionsResolved<any>;

  table: Table<any> = createTable(this.options);

  render() {
    const className = `
    ${this.displayOptions.borderless ? 'borderless' : ''}
    ${this.displayOptions.cellBorderless ? 'cell-borderless' : ''}
    ${this.displayOptions.rowStripe ? 'row-stripe' : ''}
    ${this.classBySize.get(this.displayOptions.size)}
  `;

    return (
      <table class={className}>
        <thead>
          {this.table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {this.table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return <td key={cell.id}>{cell.renderValue()}</td>;
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

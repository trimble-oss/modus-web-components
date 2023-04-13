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
import { ModusTableDisplayOptions } from '../modus-table/modus-table.models';
import { ColumnDataType } from './enums/column-data-type';
import { ModusDataTableColumn } from './models/modus-data-table-column';

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
  @Prop() displayOptions?: ModusTableDisplayOptions = {
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
  } as TableOptionsResolved<unknown>;
  table: Table<unknown> = createTable(this.options);

  columnDataTypeEnum = ColumnDataType;

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
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    class={
                      index < lengthOfHeaderGroups - 1
                        ? 'text-align-center'
                        : ''
                    }>
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
          {this.table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} class={this.hover ? 'enable-hover' : ''}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      class={
                        cell.column.columnDef['dataType'] ===
                          this.columnDataTypeEnum.Integer ||
                        cell.column.columnDef['dataType'] ===
                          this.columnDataTypeEnum.Currency
                          ? 'text-align-right'
                          : ''
                      }>
                      {cell.column.columnDef['dataType'] !==
                      this.columnDataTypeEnum.Date
                        ? cell.renderValue()
                        : new Date(String(cell.renderValue())).toLocaleString()}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

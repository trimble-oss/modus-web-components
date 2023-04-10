import { Component, Prop, h } from '@stencil/core';
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
  @Prop({ mutable: true }) data!: any[];

  /* (optional) To enable hover on table rows. */
  @Prop() hover = false;

  /** Options for data table display. */
  @Prop() displayOptions?: ModusTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

  options: TableOptionsResolved<any> = {
    data: this.data,
    columns: this.columnHeaders as ColumnDef<any>[],
    state: {
      columnPinning: {},
    },
    getCoreRowModel: getCoreRowModel(),
  } as TableOptionsResolved<any>;
  table: Table<any> = createTable(this.options);

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
                    class={`${
                      index < lengthOfHeaderGroups - 1
                        ? 'text-align-center'
                        : ''
                    } ${
                      header.column.columnDef['dataType'] ===
                        this.columnDataTypeEnum.Integer ||
                      header.column.columnDef.id ===
                        header.column.columnDef['dataType']
                        ? 'text-align-right'
                        : ''
                    }`}>
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
                          : new Date(
                              String(cell.renderValue())
                            ).toLocaleString()}
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

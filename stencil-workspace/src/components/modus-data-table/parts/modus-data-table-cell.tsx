import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { ModusColumnDataType } from '../enums/modus-column-data-type';

interface ModusDataTableCellProps {
  cell: Cell<unknown, unknown>;
}

export const ModusDataTableCell: FunctionalComponent<
  ModusDataTableCellProps
> = (props: ModusDataTableCellProps) => {
  return (
    <td
      key={props.cell.id}
      class={
        props.cell.column.columnDef['dataType'] ===
          ModusColumnDataType.Integer ||
        props.cell.column.columnDef['dataType'] === ModusColumnDataType.Currency
          ? 'text-align-right'
          : ''
      }>
      {props.cell.column.columnDef['dataType'] !== ModusColumnDataType.Date
        ? props.cell.renderValue()
        : new Date(String(props.cell.renderValue())).toLocaleString()}
    </td>
  );
};

import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header, HeaderGroup } from '@tanstack/table-core';
import { PropertyDataType, PropertyShowTotal } from '../constants/constants';
import { ModusTableColumnDataType } from '../enums/modus-table-column-data-type';

interface ModusTableSummaryRowProps {
  footerGroups: HeaderGroup<unknown>[];
  tableData: unknown[];
}

function calculateSum(tableData: unknown[], header: Header<unknown, unknown>): number | string {
  let sum = 0;
  tableData.map((rowData) => (sum += Number(rowData[header.column.columnDef['accessorKey']])));
  return !isNaN(sum) ? sum : '';
}

export const ModusTableSummaryRow: FunctionalComponent<ModusTableSummaryRowProps> = ({ footerGroups, tableData }) => {
  return (
    <tfoot>
      {footerGroups.map((group) => (
        <tr class="summary-row">
          {group.headers.map((header) => (
            <td
              key={header.id}
              class={
                header.column.columnDef[PropertyDataType] === ModusTableColumnDataType.Integer ? 'text-align-right' : ''
              }>
              {header.column.columnDef[PropertyShowTotal] ? calculateSum(tableData, header) : header.column.columnDef.footer}
            </td>
          ))}
        </tr>
      ))}
    </tfoot>
  );
};

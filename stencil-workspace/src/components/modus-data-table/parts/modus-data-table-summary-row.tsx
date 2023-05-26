import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header, HeaderGroup } from '@tanstack/table-core';
import { PropertyDataType, PropertyShowTotal } from '../constants/constants';
import { ModusColumnDataType } from '../enums/modus-column-data-type';

interface ModusDataTableSummaryRowProps {
  footerGroups: HeaderGroup<unknown>[];
  tableData: unknown[];
}

function calculateSum(
  tableData: unknown[],
  header: Header<unknown, unknown>
): number | string {
  const sum = tableData.reduce(function recur(sum, child) {
    return (
      sum +
      (child['total'] = (child['subRows'] ?? []).reduce(
        recur,
        child[header.column.columnDef['accessorKey']]
      ))
    );
  }, 0);
  return !isNaN(Number(sum)) ? Number(sum) : '';
}

export const ModusDataTableSummaryRow: FunctionalComponent<
  ModusDataTableSummaryRowProps
> = ({ footerGroups, tableData }) => {
  return (
    <tfoot>
      {footerGroups.map((group) => (
        <tr class="summary-row">
          {group.headers.map((header) => (
            <td
              key={header.id}
              class={
                header.column.columnDef[PropertyDataType] ===
                ModusColumnDataType.Integer
                  ? 'text-align-right'
                  : ''
              }>
              {header.column.columnDef[PropertyShowTotal]
                ? calculateSum(tableData, header)
                : header.column.columnDef.footer}
            </td>
          ))}
        </tr>
      ))}
    </tfoot>
  );
};

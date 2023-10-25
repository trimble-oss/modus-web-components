import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { HeaderGroup } from '@tanstack/table-core';
import {
  COLUMN_DEF_DATATYPE_KEY,
  COLUMN_DEF_SHOWTOTAL,
  COLUMN_DEF_ROW_SELECTION_ID,
  COLUMN_DEF_ROW_SELECTION_CSS,
  COLUMN_DEF_DATATYPE_INTEGER,
} from '../modus-table.constants';

interface ModusTableSummaryRowProps {
  footerGroups: HeaderGroup<unknown>[];
  tableData: unknown[];
  frozenColumns: string[];
  rowSelection: boolean;
}

function calculateTotal(tableData: unknown[], header): number | string {
  let sum = 0;
  tableData.map((rowData) => (sum += Number(rowData[header.column.columnDef['accessorKey']])));
  return !isNaN(sum) ? sum : '';
}

export const ModusTableFooter: FunctionalComponent<ModusTableSummaryRowProps> = ({
  footerGroups,
  tableData,
  frozenColumns,
  rowSelection,
}) => {
  return (
    <tfoot>
      {footerGroups.map((group) => (
        <tr class="summary-row">
          {rowSelection && (
            <td id={COLUMN_DEF_ROW_SELECTION_ID} key={COLUMN_DEF_ROW_SELECTION_ID} class={COLUMN_DEF_ROW_SELECTION_CSS}></td>
          )}
          {group.headers.map((header) => (
            <td
              id={header.id}
              key={header.id}
              class={`
                ${frozenColumns.includes(header.id) ? 'sticky-left' : ''}
                ${header.column.columnDef[COLUMN_DEF_DATATYPE_KEY] === COLUMN_DEF_DATATYPE_INTEGER ? 'text-align-right' : ''}
              `}>
              {header.column.columnDef[COLUMN_DEF_SHOWTOTAL]
                ? calculateTotal(tableData, header)
                : header.column.columnDef.footer}
            </td>
          ))}
        </tr>
      ))}
    </tfoot>
  );
};

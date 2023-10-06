import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';

interface ModusTableHeaderCheckboxProps {
  rowSelection: boolean;
  multipleRowSelection: boolean;
  table: Table<unknown>;
}

export const ModusTableHeaderCheckbox: FunctionalComponent<ModusTableHeaderCheckboxProps> = ({
  rowSelection,
  multipleRowSelection,
  table,
}) => {
  const { getIsAllRowsSelected, getIsSomeRowsSelected, getToggleAllRowsSelectedHandler } = table;
  return (
    rowSelection && (
      <th class="row-checkbox sticky-left">
        {multipleRowSelection && (
          <modus-checkbox
            checked={getIsAllRowsSelected()}
            indeterminate={getIsSomeRowsSelected()}
            onCheckboxClick={getToggleAllRowsSelectedHandler()}></modus-checkbox>
        )}
      </th>
    )
  );
};

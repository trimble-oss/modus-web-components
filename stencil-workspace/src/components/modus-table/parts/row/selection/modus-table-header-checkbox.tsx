import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';

interface ModusTableHeaderCheckboxProps {
  multipleRowSelection: boolean;
  table: Table<unknown>;
}

export const ModusTableHeaderCheckbox: FunctionalComponent<ModusTableHeaderCheckboxProps> = ({
  multipleRowSelection,
  table,
}) => {
  const { getIsAllRowsSelected, getIsSomeRowsSelected, getToggleAllRowsSelectedHandler } = table;
  return (
    <th class="row-checkbox sticky-left">
      {multipleRowSelection && (
        <modus-checkbox
          ariaLabel="Select all rows"
          checked={getIsAllRowsSelected()}
          indeterminate={getIsSomeRowsSelected()}
          onCheckboxClick={getToggleAllRowsSelectedHandler()}></modus-checkbox>
      )}
    </th>
  );
};

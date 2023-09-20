import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Row } from '@tanstack/table-core';
import NavigateCell from '../../utilities/table-cell-navigation.utitlity';

interface ModusTableCellCheckboxProps {
  rowSelection: boolean;
  isChecked: boolean;
  multipleRowSelection: boolean;
  row: Row<unknown>;
}

export const ModusTableCellCheckbox: FunctionalComponent<ModusTableCellCheckboxProps> = ({
  rowSelection,
  multipleRowSelection,
  row,
  isChecked,
}) => {
  let cellEl: HTMLTableCellElement = null;
  let checkboxInput: HTMLModusCheckboxElement = null;
  return (
    rowSelection && (
      <td
        class="row-checkbox sticky-left"
        tabIndex={0}
        ref={(el) => (cellEl = el)}
        onFocus={() => checkboxInput?.focusCheckbox()}
        onKeyDown={(e: KeyboardEvent) => NavigateCell(e, false, cellEl, -1)}>
        <modus-checkbox
          ref={(el) => (checkboxInput = el)}
          checked={isChecked}
          indeterminate={multipleRowSelection && row.getIsSomeSelected()}
          onCheckboxClick={() => row.toggleSelected()}></modus-checkbox>
      </td>
    )
  );
};

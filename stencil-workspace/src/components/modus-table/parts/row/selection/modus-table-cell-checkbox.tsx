import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Row } from '@tanstack/table-core';
import NavigateTableCells from '../../../utilities/table-cell-navigation.utility';
import { KEYBOARD_ENTER, KEYBOARD_SPACE } from '../../../modus-table.constants';

interface ModusTableCellCheckboxProps {
  isChecked: boolean;
  multipleRowSelection: boolean;
  row: Row<unknown>;
  checkboxSize: 'small' | 'medium';
  updateRow: () => void;
}

export const ModusTableCellCheckbox: FunctionalComponent<ModusTableCellCheckboxProps> = ({
  multipleRowSelection,
  row,
  isChecked,
  checkboxSize,
  updateRow,
}) => {
  let cellEl: HTMLTableCellElement = null;
  let checkboxInput: HTMLModusCheckboxElement = null;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key.toLowerCase() === KEYBOARD_ENTER) {
      e.stopPropagation();
      return;
    }

    NavigateTableCells({
      eventKey: e.key,
      cellElement: cellEl,
    });
  }

  function handleCheckboxKeyDown(e: KeyboardEvent): void {
    if (e.key.toLowerCase() === KEYBOARD_ENTER || e.key.toLowerCase() === KEYBOARD_SPACE) {
      e.preventDefault();
      updateRow();
    }
  }

  return (
    <td
      class={'row-checkbox sticky-left ' + (checkboxSize ?? '')}
      tabIndex={0}
      ref={(el) => (cellEl = el)}
      onFocus={() => checkboxInput?.focusCheckbox()}
      onKeyDown={(e: KeyboardEvent) => handleKeyDown(e)}>
      <modus-checkbox
        ariaLabel="Select row"
        ref={(el) => (checkboxInput = el)}
        checked={isChecked}
        indeterminate={multipleRowSelection && row.getIsSomeSelected()}
        size={checkboxSize}
        onKeyDown={(e: KeyboardEvent) => handleCheckboxKeyDown(e)}></modus-checkbox>
    </td>
  );
};

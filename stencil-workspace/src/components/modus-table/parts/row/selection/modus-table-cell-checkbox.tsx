import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Row } from '@tanstack/table-core';
import NavigateTableCells from '../../../utilities/table-cell-navigation.utility';
import { KEYBOARD_ENTER } from '../../../modus-table.constants';

interface ModusTableCellCheckboxProps {
  alignTop?: boolean;
  isChecked: boolean;
  multipleRowSelection: boolean;
  row: Row<unknown>;
  checkboxSize: 'small' | 'medium';
}

export const ModusTableCellCheckbox: FunctionalComponent<ModusTableCellCheckboxProps> = ({
  alignTop = false,
  multipleRowSelection,
  row,
  isChecked,
  checkboxSize,
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
  return (
    <td
      class={`row-checkbox sticky-left ${checkboxSize ?? ''} ${alignTop ? 'align-top' : ''}`}
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
        onCheckboxClick={() => row.toggleSelected()}></modus-checkbox>
    </td>
  );
};

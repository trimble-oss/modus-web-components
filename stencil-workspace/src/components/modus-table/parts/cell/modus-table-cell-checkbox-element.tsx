import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableCellCheckbox } from '../../models/modus-table.models';

interface ModusTableCellCheckboxProps {
  checkbox: ModusTableCellCheckbox;
}

export const ModusTableCellCheckboxElement: FunctionalComponent<ModusTableCellCheckboxProps> = ({ checkbox }) => {
  return (
    <div class="cell-checkbox">
      <modus-checkbox
        ariaLabel={checkbox.ariaLabel}
        checked={checkbox.checked}
        disabled={checkbox.disabled}
        indeterminate={checkbox.indeterminate}
        label={checkbox.label}
        stopPropagation={checkbox.stopPropagation}
        size={checkbox.size}></modus-checkbox>
    </div>
  );
};

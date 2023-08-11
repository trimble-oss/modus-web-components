import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { EnterKey, EscapeKey, PropertyDataType } from '../../constants/constants';
import { ModusTableColumnDataType } from '../../enums';

interface ModusTableCellEditableProps {
  cell: Cell<unknown, unknown>;
  onValueChange: (value: string | number) => void;
}

export const ModusTableCellEditable: FunctionalComponent<ModusTableCellEditableProps> = ({ cell, onValueChange }) => {
  let inputElement: HTMLElement;
  setTimeout(() => {
    inputElement.focus(); // Sets focus to input element after coming on view/dom. Set time delays the assigning of ref element.
  });

  let value: string | number = cell.getValue() as string | number;
  return (
    <input
      class={`${cell.column.columnDef[PropertyDataType] === ModusTableColumnDataType.Integer ? 'text-align-right' : ''}`}
      ref={(ref) => (inputElement = ref)}
      value={cell.getValue() as string | number}
      onChange={(event) => (value = event.target['value'])}
      onBlur={() => onValueChange(value)}
      onKeyDown={(event) => {
        if (event.key.toLowerCase() === EscapeKey || event.key.toLowerCase() === EnterKey) {
          onValueChange(value);
        }
        event.stopPropagation();
      }}
    />
  );
};

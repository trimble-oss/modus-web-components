import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { DateFormat, EditType, EnterKey, EscapeKey, PropertyDataType } from '../../constants/constants';
import { ModusTableColumnDataType } from '../../enums';
import { ModusTableCellEditType } from '../../enums/modus-table-cell-edit-type';

interface ModusTableCellEditableProps {
  cell: Cell<unknown, unknown>;
  onValueChange: (value: string | number) => void;
}

export const ModusTableCellEditable: FunctionalComponent<ModusTableCellEditableProps> = ({ cell, onValueChange }) => {
  let inputElement: HTMLElement;
  if (
    cell.column.columnDef[EditType] !== ModusTableCellEditType.Dropdown &&
    cell.column.columnDef[EditType] !== ModusTableCellEditType.Autocomplete &&
    cell.column.columnDef[EditType] !== ModusTableCellEditType.Date &&
    cell.column.columnDef[PropertyDataType] !== ModusTableColumnDataType.Date
  ) {
    setTimeout(() => {
      inputElement.focus(); // Sets focus to input element after coming on view/dom. Set time delays the assigning of ref element.
    });
  }

  const value: string | number = cell.getValue() as string | number;
  let newValue: string | number;
  return (
    <div>
      {cell.column.columnDef[EditType] !== ModusTableCellEditType.Dropdown &&
      cell.column.columnDef[EditType] !== ModusTableCellEditType.Autocomplete &&
      cell.column.columnDef[EditType] !== ModusTableCellEditType.Date &&
      cell.column.columnDef[PropertyDataType] !== ModusTableColumnDataType.Date ? (
        <input
          class={`${cell.column.columnDef[PropertyDataType] === ModusTableColumnDataType.Integer ? 'text-align-right' : ''}`}
          ref={(ref) => (inputElement = ref)}
          value={value}
          onChange={(event) => (newValue = event.target['value'])}
          onBlur={() => onValueChange(newValue)}
          onKeyDown={(event) => {
            if (event.key.toLowerCase() === EscapeKey || event.key.toLowerCase() === EnterKey) {
              onValueChange(newValue);
            }
            event.stopPropagation();
          }}
        />
      ) : (
        ''
      )}

      {cell.column.columnDef[EditType] === ModusTableCellEditType.Dropdown ? (
        <modus-select
          aria-label="dropdown-edit"
          value={value}
          options-display-prop="display"
          size="large"
          options={cell.column.columnDef['dropdownValues']}
          onBlur={() => onValueChange(newValue)}
          onValueChange={(event) => (newValue = event.detail as string | number)}></modus-select>
      ) : (
        ''
      )}

      {cell.column.columnDef[EditType] === ModusTableCellEditType.Autocomplete ? (
        <modus-autocomplete
          id="autocomplete-input"
          aria-label="autocomplete-input"
          include-search-icon="false"
          size="large"
          value={value as string}
          options={cell.column.columnDef['autocompleteValues']}
          onBlur={() => onValueChange(newValue)}
          onValueChange={(event) => (newValue = event.detail as string | number)}></modus-autocomplete>
      ) : (
        ''
      )}

      {cell.column.columnDef[EditType] === ModusTableCellEditType.Date ||
      cell.column.columnDef[PropertyDataType] === ModusTableColumnDataType.Date ? (
        <modus-date-picker>
          <modus-date-input
            aria-label="date-input"
            format={cell.column.columnDef[DateFormat]}
            size="large"
            show-calendar-icon="true"
            value="2022-12-22"></modus-date-input>
        </modus-date-picker>
      ) : (
        ''
      )}
    </div>
  );
};

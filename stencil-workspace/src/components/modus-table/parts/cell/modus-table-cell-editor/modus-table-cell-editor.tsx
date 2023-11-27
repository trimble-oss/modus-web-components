// eslint-disable-next-line
import { Host, JSX, Component, Prop, h } from '@stencil/core';
import {
  KEYBOARD_ENTER,
  CELL_EDIT_TYPE_AUTOCOMPLETE,
  CELL_EDIT_TYPE_DATE,
  CELL_EDIT_TYPE_DROPDOWN,
  CELL_EDIT_TYPE_TEXT,
  CELL_EDIT_TYPE_INT,
  KEYBOARD_UP,
  KEYBOARD_DOWN,
} from '../../../modus-table.constants';

import {
  ModusTableCellDateEditorArgs,
  ModusTableCellDropdownEditorArgs,
  ModusTableCellEditorArgs,
} from '../../../models/modus-table.models';
import { ModusDateInputEventDetails } from '../../../../modus-date-input/utils/modus-date-input.models';
import { ModusAutocompleteOption } from '../../../../modus-autocomplete/modus-autocomplete';

@Component({
  tag: 'modus-table-cell-editor',
  styleUrl: './modus-table-cell-editor.scss',
})
export class ModusTableCellEditor {
  @Prop() args: ModusTableCellEditorArgs;
  @Prop() value: string;
  @Prop() type: string;
  @Prop() valueChange: (newValue: string) => void;
  @Prop() keyDown: (e: KeyboardEvent, newValue: string) => void;

  private editedValue: string;
  private inputElement: HTMLElement;

  connectedCallback(): void {
    this.editedValue = this.value;
  }

  componentDidLoad(): void {
    if (this.inputElement['focusInput']) this.inputElement['focusInput']();
  }

  handleBlur: () => void = () => {
    this.valueChange(this.editedValue);
  };

  handleKeyDown: (e: KeyboardEvent) => void = (e) => {
    this.keyDown(e, this.editedValue);
  };

  getDefaultProps = (ariaLabel) => ({
    'aria-label': ariaLabel,
    class: 'editor',
    ref: (ref) => (this.inputElement = ref),
  });

  renderNumberInput(): JSX.Element[] {
    function handleArrowKeys(e: KeyboardEvent, callback: (e: KeyboardEvent) => void) {
      const code = e.key.toLowerCase();
      if (code === KEYBOARD_UP || code === KEYBOARD_DOWN) {
        e.stopPropagation();
      } else callback(e);
    }

    return (
      <modus-number-input
        {...this.getDefaultProps('Number input')}
        value={this.value}
        textAlign="right"
        size="large"
        onBlur={this.handleBlur}
        onValueChange={(e: CustomEvent<string>) => (this.editedValue = e.detail)}
        onKeyDown={(e) => handleArrowKeys(e, this.handleKeyDown)}></modus-number-input>
    );
  }

  renderTextInput(): JSX.Element[] {
    return (
      <modus-text-input
        {...this.getDefaultProps('Text input')}
        value={this.value}
        onValueChange={(e: CustomEvent<string>) => (this.editedValue = e.detail)}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        autoFocusInput
        size="large"></modus-text-input>
    );
  }

  renderDropdownInput(): JSX.Element[] {
    const valueKey = 'display';
    const options = (this.args as ModusTableCellDropdownEditorArgs)?.options || [];
    const selectedOption = options.find((option) => option[valueKey] === this.value);

    function handleEnter(e: KeyboardEvent, callback: (e: KeyboardEvent) => void) {
      const code = e.key.toLowerCase();
      if (code === KEYBOARD_ENTER) {
        e.stopPropagation();
      } else callback(e);
    }

    return (
      <div>
        <modus-select
          {...this.getDefaultProps('Select input')}
          value={selectedOption}
          options-display-prop="display"
          size="large"
          options={options}
          onInputBlur={this.handleBlur}
          onKeyDown={(e) => handleEnter(e, this.handleKeyDown)}
          onValueChange={(e: CustomEvent<unknown>) => {
            this.editedValue = e.detail[valueKey];
          }}></modus-select>
      </div>
    );
  }

  renderDateInput(): JSX.Element[] {
    const valueKey = 'value';
    const format = (this.args as ModusTableCellDateEditorArgs)?.format;
    return (
      <modus-date-picker>
        <modus-date-input
          {...this.getDefaultProps('Date input')}
          format={format}
          size="large"
          show-calendar-icon="true"
          value={this.value}
          onClick={(e: MouseEvent) => e.stopPropagation()}
          onValueChange={(e: CustomEvent<ModusDateInputEventDetails>) =>
            (this.editedValue = e.detail[valueKey])
          }></modus-date-input>
      </modus-date-picker>
    );
  }

  renderAutocompleteInput(): JSX.Element[] {
    const options = ((this.args as ModusTableCellDropdownEditorArgs)?.options || []) as ModusAutocompleteOption[] | string[];
    return (
      <modus-autocomplete
        {...this.getDefaultProps('Autocomplete input')}
        include-search-icon="false"
        size="large"
        // onClick={(e: MouseEvent) => e.stopPropagation()}
        options={options}
        // onInputBlur={this.handleBlur}
        onOptionSelected={(e: CustomEvent<string>) => {
          this.editedValue = e.detail;
          this.valueChange(this.editedValue);
        }}
        // value={selectedOption}
        // onKeyDown={(e) => e.stopPropagation()}
      ></modus-autocomplete>
    );
  }

  renderEditor(): JSX.Element[] {
    switch (this.type) {
      case CELL_EDIT_TYPE_DROPDOWN:
        return this.renderDropdownInput();
      case CELL_EDIT_TYPE_AUTOCOMPLETE:
        return this.renderAutocompleteInput();
      case CELL_EDIT_TYPE_DATE:
        return this.renderDateInput();
      case CELL_EDIT_TYPE_INT:
        return this.renderNumberInput();
      case CELL_EDIT_TYPE_TEXT:
      default:
        return this.renderTextInput();
    }
  }

  render(): void {
    return <Host>{this.renderEditor()}</Host>;
  }
}

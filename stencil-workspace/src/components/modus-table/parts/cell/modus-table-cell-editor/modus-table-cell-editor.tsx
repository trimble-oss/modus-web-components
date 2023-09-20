import { Host, JSX, Component, Prop, h } from '@stencil/core';
import {
  KEYBOARD_ENTER,
  CELL_EDIT_TYPE_AUTOCOMPLETE,
  CELL_EDIT_TYPE_DATE,
  CELL_EDIT_TYPE_DROPDOWN,
  KEYBOARD_ESCAPE,
  CELL_EDIT_TYPE_TEXT,
  CELL_EDIT_TYPE_INT,
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
  @Prop() valueEntered: (newValue: string, oldValue: string) => void;

  private editedValue: string;
  private inputElement: HTMLElement;

  connectedCallback(): void {
    this.editedValue = this.value;
  }

  componentDidLoad(): void {
    if (this.inputElement['focusInput']) this.inputElement['focusInput']();
  }

  handleBlur: () => void = () => {
    this.valueEntered(this.editedValue, this.value);
  };

  handleEnterOrEscape: (e: KeyboardEvent) => void = (event) => {
    if (event.key.toLowerCase() === KEYBOARD_ESCAPE || event.key.toLowerCase() === KEYBOARD_ENTER) {
      this.valueEntered(this.editedValue, this.value);
    }
    event.stopPropagation();
  };

  handleEscape: (e: KeyboardEvent) => void = (event) => {
    if (event.key.toLowerCase() === KEYBOARD_ESCAPE) {
      this.valueEntered(this.editedValue, this.value);
    }
    event.stopPropagation();
  };

  getDefaultProps = (ariaLabel) => ({
    'aria-label': ariaLabel,
    class: 'editor',
    ref: (ref) => (this.inputElement = ref),
  });

  renderNumberInput(): JSX.Element[] {
    return (
      <modus-number-input
        {...this.getDefaultProps('Number input')}
        value={this.value}
        textAlign="right"
        size="large"
        onBlur={this.handleBlur}
        onValueChange={(e: CustomEvent<string>) => (this.editedValue = e.detail)}
        onKeyDown={this.handleEnterOrEscape}></modus-number-input>
    );
  }

  renderTextInput(): JSX.Element[] {
    return (
      <modus-text-input
        {...this.getDefaultProps('Text input')}
        value={this.value}
        onValueChange={(e: CustomEvent<string>) => (this.editedValue = e.detail)}
        onBlur={this.handleBlur}
        onKeyDown={this.handleEnterOrEscape}
        autoFocusInput
        size="large"></modus-text-input>
    );
  }

  renderDropdownInput(): JSX.Element[] {
    const valueKey = 'display';
    const options = (this.args as ModusTableCellDropdownEditorArgs)?.options || [];
    const selectedOption = options.find((option) => option[valueKey] === this.value);
    return (
      <div>
        <modus-select
          {...this.getDefaultProps('Select input')}
          value={selectedOption}
          options-display-prop="display"
          size="large"
          options={options}
          onInputBlur={this.handleBlur}
          onKeyDown={this.handleEscape}
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
          this.valueEntered(this.editedValue, this.value);
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

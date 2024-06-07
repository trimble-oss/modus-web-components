// eslint-disable-next-line
import { Host, JSX, Component, Prop, h, Listen } from '@stencil/core';
import {
  KEYBOARD_ENTER,
  CELL_EDIT_TYPE_AUTOCOMPLETE,
  CELL_EDIT_TYPE_DATE,
  CELL_EDIT_TYPE_SELECT,
  CELL_EDIT_TYPE_TEXT,
  CELL_EDIT_TYPE_INT,
  KEYBOARD_UP,
  KEYBOARD_DOWN,
} from '../../../modus-table.constants';

import {
  ModusTableCellAutocompleteEditorArgs,
  ModusTableCellDateEditorArgs,
  ModusTableCellSelectEditorArgs,
  ModusTableCellEditorArgs,
} from '../../../models/modus-table.models';
import { ModusDateInputEventDetails } from '../../../../modus-date-input/utils/modus-date-input.models';

@Component({
  tag: 'modus-table-cell-editor',
  styleUrl: './modus-table-cell-editor.scss',
})
export class ModusTableCellEditor {
  @Prop() args: ModusTableCellEditorArgs;
  @Prop() dataType: string;
  @Prop() value: unknown;
  @Prop() type: string;
  @Prop() valueChange: (newValue: string) => void;
  @Prop() keyDown: (e: KeyboardEvent, newValue: string) => void;

  private editedValue: unknown;
  private inputElement: HTMLElement;

  connectedCallback(): void {
    this.editedValue = this.value;
  }

  componentDidLoad(): void {
    if (this.inputElement['focusInput']) {
      this.inputElement['focusInput']();
    }
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.type != 'date') {
      return;
    }

    const target = event.target as HTMLElement;
    if (!this.inputElement.contains(target)) {
      this.handleBlur();
    }
  }

  handleBlur: () => void = () => {
    this.valueChange(this.editedValue as string);
  };

  handleKeyDown: (e: KeyboardEvent) => void = (e) => {
    this.keyDown(e, this.editedValue as string);
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
        value={this.value as string}
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
        value={this.value as string}
        onValueChange={(e: CustomEvent<string>) => (this.editedValue = e.detail)}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        autoFocusInput
        size="large"></modus-text-input>
    );
  }

  renderSelectInput(): JSX.Element[] {
    const valueKey = 'display';
    const args = this.args as ModusTableCellSelectEditorArgs;
    const options = args?.options || [];
    const optionsDisplayProp = args?.optionsDisplayProp || valueKey;
    const selectedOption = options.find((option) => option[optionsDisplayProp] === this.value) as unknown;

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
          options-display-prop={optionsDisplayProp}
          size="large"
          options={options}
          onInputBlur={this.handleBlur}
          onKeyDown={(e) => handleEnter(e, this.handleKeyDown)}
          onValueChange={(e: CustomEvent<unknown>) => {
            const detail = e.detail as { display: string; [key: string]: unknown };
            if (this.dataType === 'badge') {
              const { display, ...restProps } = detail;
              this.editedValue = { ...restProps, text: display };
            } else if (this.dataType === 'link') {
              this.editedValue = detail;
            } else {
              this.editedValue = detail[valueKey];
            }
          }}></modus-select>
      </div>
    );
  }

  renderDateInput(): JSX.Element[] {
    const valueKey = 'value';
    const format = (this.args as ModusTableCellDateEditorArgs)?.format;
    return (
      <modus-date-picker onBlur={this.handleBlur} onClick={(e: MouseEvent) => e.stopPropagation()}>
        <modus-date-input
          {...this.getDefaultProps('Date input')}
          format={format}
          size="large"
          show-calendar-icon="true"
          value={this.value as string}
          onValueChange={(e: CustomEvent<ModusDateInputEventDetails>) => {
            this.editedValue = e.detail[valueKey];
          }}></modus-date-input>
      </modus-date-picker>
    );
  }

  renderAutocompleteInput(): JSX.Element[] {
    const args = this.args as ModusTableCellAutocompleteEditorArgs;
    let options: string[] = [];
    let selectedOption = '';

    if (this.dataType === 'badge') {
      options = args?.options.map((option) => (option as unknown as { text: string }).text);
      selectedOption = (this.value as { text: string })?.text || '';
    } else if (this.dataType === 'link') {
      options = args?.options.map((option) => (option as unknown as { display: string }).display);
      selectedOption = (this.value as { display: string })?.display || '';
    } else {
      options = (args?.options || []) as unknown as string[];
      selectedOption = this.editedValue as string;
    }

    return (
      <div class="autocomplete-container">
        <modus-autocomplete
          {...this.getDefaultProps('Autocomplete input')}
          include-search-icon="false"
          size="medium"
          options={options}
          onBlur={this.handleBlur}
          onKeyDown={(e) => e.stopPropagation()}
          onOptionSelected={(e: CustomEvent<string>) => {
            const selectedDetail = e.detail;

            if (this.dataType === 'badge') {
              const selectedOption = args?.options.find(
                (option) => (option as unknown as { text: string }).text === selectedDetail
              );
              this.editedValue = selectedOption;
            } else if (this.dataType === 'link') {
              const selectedOption = args?.options.find(
                (option) => (option as unknown as { display: string }).display === selectedDetail
              );
              this.editedValue = selectedOption;
            } else {
              this.editedValue = selectedDetail;
            }
          }}
          value={selectedOption}></modus-autocomplete>
      </div>
    );
  }

  renderEditor(): JSX.Element[] {
    switch (this.type) {
      case CELL_EDIT_TYPE_SELECT:
        return this.renderSelectInput();
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

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line
import {
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Component,
  EventEmitter,
  Event,
  Prop,
  State,
  Listen,
  Element,
  Watch,
} from '@stencil/core';

import { IconSearch } from '../../icons/svgs/icon-search';
import { generateElementId } from '../../utils/utils';
import { IconCheck } from '../../icons/generated-icons/IconCheck';

export interface ModusAutocompleteOption {
  id: string;
  value: string;
}

const DATA_ID = 'data-id';
const DATA_SEARCH_VALUE = 'data-search-value';

@Component({
  tag: 'modus-autocomplete',
  styleUrl: 'modus-autocomplete.scss',
  shadow: true,
})
export class ModusAutocomplete {
  /** When enabled, multiple options can be selected in the component. And selected options are shown as chips in the input. */
  @Prop() multiple: boolean;

  /** The autocomplete's aria label. */
  @Prop() ariaLabel: string | null;

  /** Whether the input has a clear button. */
  @Prop() clearable = false;

  /** Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** Whether the autocomplete's options always display on select. */
  @Prop() disableCloseOnSelect: boolean;

  /** The autocomplete's dropdown's max height. */
  @Prop() dropdownMaxHeight = '300px';

  /** The autocomplete's dropdown z-index. */
  @Prop() dropdownZIndex = '1';

  /** The autocomplete's error text. */
  @Prop() errorText: string;

  @Element() el: HTMLElement;

  /** Whether the search icon is included. */
  @Prop() includeSearchIcon = true;

  /** The autocomplete's label. */
  @Prop() label: string;

  /** The autocomplete's no results text. */
  @Prop() noResultsFoundText = 'No results found';

  /** The autocomplete's no results sub-text. */
  @Prop() noResultsFoundSubtext = 'Check spelling or try a different keyword';

  /** The autocomplete's options. */
  @Prop({ mutable: true }) options: ModusAutocompleteOption[] | string[];

  /** An array to hold the selected chips. */
  @State() selectedChips: ModusAutocompleteOption[] = [];

  /** The autocomplete's selected option. */
  @State() selectedOption: string;

  @State() isLoading = false;

  /** Whether to show autocomplete's options when focus. */
  @Prop() showOptionsOnFocus: boolean;

  @Watch('options')
  watchOptions() {
    this.convertOptions();
    this.updateVisibleOptions(this.getValueAsString());
  }

  /** The autocomplete's input placeholder. */
  @Prop() placeholder: string;

  /** Whether the autocomplete is read-only. */
  @Prop() readOnly: boolean;

  /** Whether the autocomplete is required. */
  @Prop() required: boolean;

  /** Whether to show the no results found message. */
  @Prop({ mutable: true }) showNoResultsFoundMessage = true;

  /** The autocomplete's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** The autocomplete's search value. */
  @Prop({ mutable: true }) value: string | string[];

  @Watch('value')
  onValueChange() {
    if (this.hasFocus && !this.disableCloseOnSelect) {
      this.disableFiltering = false;
      this.updateVisibleOptions(this.getValueAsString());
      this.updateVisibleCustomOptions(this.getValueAsString());
    }
  }

  /** An event that fires when a dropdown option is selected. Emits the option id. */
  @Event() optionSelected: EventEmitter<string>;

  /** An event that fires when the input value changes. Emits the value string. */
  @Event() valueChange: EventEmitter<string | string[]>;

  /** An event that fires when an option is selected/removed. Emits the option ids. */
  @Event() selectionsChanged: EventEmitter<string[]>;

  @State() containsSlottedElements = false;
  @State() hasFocus = false;
  @State() visibleOptions: ModusAutocompleteOption[] = [];
  @State() customOptions: Array<any> = [];
  @State() visibleCustomOptions: Array<any> = [];
  @State() disableFiltering = false;
  @State() focusItemIndex = 0;
  @State() ShowItemsOnKeyDown = false;
  private listId = generateElementId() + '_list';

  componentWillLoad(): void {
    this.convertOptions();
    if (this.multiple) {
      this.initializeSelectedChips();
    }
  }

  componentDidRender(): void {
    if (this.displayOptions()) {
      this.scrollToOptionSelected();
    }
  }

  @Listen('mousedown', { target: 'document' })
  onMouseDown(event: MouseEvent): void {
    if (!this.hasFocus) {
      return;
    }

    if (this.el !== event.target || !this.el.contains(event.target as Node)) {
      this.hasFocus = false;
      this.ShowItemsOnKeyDown = false;
    }
  }

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  convertOptions(): void {
    if (this.options && this.options.length > 0) {
      if (typeof this.options[0] === 'string') {
        this.options = this.options?.map((option) => ({
          id: option,
          value: option,
        }));
      }
    }
  }

  displayNoResults = () =>
    this.showNoResultsFoundMessage &&
    this.hasFocus &&
    !this.visibleOptions?.length &&
    !this.visibleCustomOptions?.length &&
    this.value?.length > 0;

  displayOptions = () => {
    const showOptions =
      this.showOptionsOnFocus || this.value?.length > 0 || this.disableCloseOnSelect || this.ShowItemsOnKeyDown;
    return this.hasFocus && showOptions && !this.disabled;
  };

  addChipValue(value: ModusAutocompleteOption) {
    if (this.selectedChips.includes(value)) {
      return;
    }
    this.selectedChips = [...this.selectedChips, value];
    this.valueChange.emit(this.selectedChips.map((opt) => opt.value));
    this.selectionsChanged.emit(this.selectedChips.map((opt) => opt.id));
    this.value = '';
  }
  handleCustomOptionClick = (option: any) => {
    const optionValue = option.getAttribute(DATA_SEARCH_VALUE);
    const optionId = option.getAttribute(DATA_ID);

    if (this.multiple) {
      this.addChipValue({ id: optionId, value: optionValue });
    } else {
      this.selectedOption = optionValue;
      this.disableFiltering = this.disableCloseOnSelect;
      this.handleSearchChange(optionValue);
      this.focusItemIndex = this.visibleCustomOptions.findIndex((el) => el.getAttribute(DATA_ID) === optionId);
    }

    this.hasFocus = this.disableCloseOnSelect;
    this.optionSelected.emit(optionId);
  };

  handleInputBlur = () => {
    this.hasFocus = !this.disableCloseOnSelect;
  };

  handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
    if (event.code.toUpperCase() === 'ARROWDOWN') {
      this.ShowItemsOnKeyDown = true;
      if (this.displayOptions() && !this.displayNoResults()) {
        this.focusItemIndex = 0;
        this.focusOptionItem();
      }
    } else if (event.code.toUpperCase() === 'ESCAPE') {
      this.ShowItemsOnKeyDown = false;
    }
  };

  handleOptionKeyDown = (event: any, option: any, isCustomOption = false) => {
    this.disableFiltering = !this.disableCloseOnSelect;

    switch (event.key.toUpperCase()) {
      case 'ENTER':
      case ' ':
        if (isCustomOption) {
          this.handleCustomOptionClick(option);
        } else {
          this.handleOptionClick(option);
        }
        break;
      case 'ARROWDOWN':
        if (isCustomOption) {
          this.handleArrowDown(this.visibleCustomOptions);
        } else {
          this.handleArrowDown(this.visibleOptions);
        }
        event.preventDefault();
        break;
      case 'ARROWUP':
        this.handleArrowUp();
        break;
      default:
        return;
    }
  };

  handleClear(): void {
    this.selectedChips = [];
    this.selectedOption = '';
  }

  handleOptionClick = (option: ModusAutocompleteOption) => {
    if (this.multiple) {
      this.addChipValue(option);
    } else {
      this.selectedOption = option.value;
      this.disableFiltering = this.disableCloseOnSelect;
      this.focusItemIndex = this.visibleOptions.findIndex((el) => el.id === option.id);
      this.handleSearchChange(option.value);
    }

    this.hasFocus = this.disableCloseOnSelect;
    this.optionSelected.emit(option.id);
  };

  getValueAsString(): string {
    if (this.value && Array.isArray(this.value)) {
      return '';
    }
    if (this.value && typeof this.value === 'string') {
      return this.value;
    }
    return '';
  }

  handleArrowDown = (options: any) => {
    this.focusItemIndex = Math.min(options.length - 1, this.focusItemIndex + 1);
    this.focusOptionItem();
  };

  handleArrowUp = () => {
    this.focusItemIndex = Math.max(0, this.focusItemIndex - 1);
    this.focusOptionItem();
  };

  focusOptionItem = () => {
    (this.el.shadowRoot.querySelectorAll('[role="option"]')[this.focusItemIndex] as HTMLUListElement).focus();
  };

  initializeSelectedChips(): void {
    if (Array.isArray(this.value)) {
      const val = this.value.map((v) => v.trim());
      const filteredOptions = (this.options as ModusAutocompleteOption[]).filter((option) => val.includes(option.value));
      this.selectedChips = filteredOptions;
      this.valueChange.emit(this.selectedChips.map((opt) => opt.value));
      this.selectionsChanged.emit(this.selectedChips.map((opt) => opt.id));
    }
  }

  handleSearchChange = (search: string) => {
    this.updateVisibleOptions(search);
    this.updateVisibleCustomOptions(search);
    this.value = search;
    this.valueChange.emit(search);
  };

  handleCloseClick(chipValue: ModusAutocompleteOption) {
    if (this.selectedChips.length != 0) {
      this.selectedChips = this.selectedChips.filter((chip) => chip.id !== chipValue.id);
      this.valueChange.emit(this.selectedChips.map((v) => v.value));
      this.selectionsChanged.emit(this.selectedChips.map((opt) => opt.id));
    }
  }

  handleTextInputFocus = () => {
    const hasDefaultTextInput = this.value?.length > 0 && !this.disableCloseOnSelect;
    if (hasDefaultTextInput) {
      this.disableFiltering = true;
    }
  };

  handleTextInputValueChange = (event: CustomEvent<string>) => {
    // Cancel the modus-text-input's value change event or else it will bubble to consumer.
    event.stopPropagation();
    this.disableFiltering = !this.disableCloseOnSelect;
    this.handleSearchChange(event.detail);
    this.isLoading = true; // Start loading when the value changes
  };

  updateVisibleCustomOptions = (search = '') => {
    if (!this.hasFocus) {
      return;
    }
    const slotted = this.el.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    if (!slotted || typeof slotted.assignedNodes !== 'function') {
      return;
    }

    this.customOptions = slotted.assignedNodes().filter((node) => node.nodeName !== '#text');

    search = search || '';
    const isSearchEmpty = search.length === 0;

    if (isSearchEmpty) {
      this.selectedOption = '';
    }

    if (!this.disableFiltering) {
      this.visibleCustomOptions = this.customOptions?.filter((o: any) => {
        return o.getAttribute(DATA_SEARCH_VALUE).toLowerCase().includes(search.toLowerCase());
      });
    } else {
      this.visibleCustomOptions = this.customOptions;
    }

    if (this.visibleCustomOptions?.length === 0) {
      this.showNoResultsFoundMessage = true;
    }

    this.containsSlottedElements = this.customOptions.length > 0;
  };

  updateVisibleOptions = (search = '') => {
    if (!this.hasFocus) {
      return;
    }
    search = search || '';
    const isSearchEmpty = search.length === 0;

    if (isSearchEmpty) {
      this.selectedOption = '';
    }

    if (!this.disableFiltering) {
      this.visibleOptions = (this.options as ModusAutocompleteOption[])?.filter((o: ModusAutocompleteOption) => {
        return o.value.toLowerCase().includes(search.toLowerCase());
      });
    } else {
      this.visibleOptions = this.options as ModusAutocompleteOption[];
    }

    if (this.visibleOptions?.length === 0) {
      this.showNoResultsFoundMessage = true;
    }
  };

  // Do not display the slot for the custom options. We use this hidden slot to reference the slot's children.
  CustomOptionsSlot = () => (
    <div style={{ display: 'none' }}>
      <slot onSlotchange={() => this.updateVisibleCustomOptions(this.getValueAsString())} />
    </div>
  );

  TextInput = () => (
    <modus-text-input
      class="input"
      autocomplete="off"
      clearable={this.clearable && !this.readOnly && !!this.value}
      errorText={this.hasFocus ? '' : this.errorText}
      includeSearchIcon={false}
      onFocus={this.handleTextInputFocus}
      onValueChange={(searchEvent: CustomEvent<string>) => this.handleTextInputValueChange(searchEvent)}
      placeholder={this.placeholder}
      size={this.size}
      type="search"
      value={this.getValueAsString()}
      onBlur={this.handleInputBlur}
      role="combobox"
      onKeyUp={(e) => {
        console.log('keyup', e);
        this.processChange();
      }}
      aria-autocomplete="list"
      aria-controls={this.listId}
      aria-expanded={this.displayOptions()}
    />
  );

  @Listen('valueChange')
  valueChangedHandler(event: CustomEvent<string>) {
    if (event.detail == null) {
      this.handleClear();
    }
  }

  scrollToOptionSelected = () => {
    if (this.multiple || this.focusItemIndex === 0) {
      return;
    }
    const optionList = this.el.shadowRoot.querySelector(`.options-container`) as HTMLUListElement;
    const selectedOption = optionList.querySelector('li.selected') as HTMLElement;

    if (selectedOption) {
      selectedOption.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
  };
  debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  //new options shoudl be a promise
  /** A promise that resolves to an array of autocomplete options. */
  @Prop() optionsPromise: Promise<ModusAutocompleteOption[]>;
  async saveInput() {
    console.log('Saving data', this.value);
    try {
      // Fetch and convert the new options
      const resolvedOptions = await this.optionsPromise;
      console.log('Resolved options:', resolvedOptions);

      // Convert new options separately
      const convertedNewOptions = this.convertNewOptions(resolvedOptions);
      console.log('Converted new options:', convertedNewOptions);

      // Filter out duplicate options based on their IDs
      const uniqueNewOptions = this.filterOutDuplicateOptions(convertedNewOptions);
      console.log('Unique new options:', uniqueNewOptions);

      // Update the existing options with unique new options
      this.options = [...this.options, ...uniqueNewOptions] as ModusAutocompleteOption[];

      // Update visible options
      this.updateVisibleOptions(this.getValueAsString());
    } catch (error) {
      console.error('Failed to resolve optionsPromise:', error);
    } finally {
      this.isLoading = false;
    }
  }

  convertNewOptions(newOptions: ModusAutocompleteOption[] | string[]): ModusAutocompleteOption[] {
    if (newOptions && newOptions.length > 0) {
      if (typeof newOptions[0] === 'string') {
        return newOptions.map((option) => ({
          id: option,
          value: option,
        }));
      } else {
        return newOptions as ModusAutocompleteOption[];
      }
    }
    return [];
  }

  filterOutDuplicateOptions(newOptions: ModusAutocompleteOption[]): ModusAutocompleteOption[] {
    const existingIds = new Set(this.options.map((option) => option.id));
    return newOptions.filter((option) => !existingIds.has(option.id));
  }

  processChange = this.debounce(() => this.saveInput());

  render(): unknown {
    const classes = `autocomplete ${this.classBySize.get(this.size)}`;
    return (
      <div
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-invalid={!!this.errorText}
        aria-label={this.ariaLabel || undefined}
        aria-readonly={this.readOnly}
        aria-required={this.required}
        class={classes}
        onFocusin={() => {
          if (this.hasFocus) {
            return;
          }

          this.hasFocus = true;
          this.updateVisibleOptions(this.getValueAsString());
          this.updateVisibleCustomOptions(this.getValueAsString());
        }}
        onFocusout={() => {
          if (this.hasFocus) {
            this.hasFocus = this.disableCloseOnSelect;
          }
        }}
        onKeyDown={(e) => this.handleInputKeyDown(e)}>
        {this.label || this.required ? (
          <div class={'label-container'}>
            {this.label ? <label>{this.label}</label> : null}
            {this.required ? <span class="required">*</span> : null}
          </div>
        ) : null}
        <div class="chips-container">
          {this.includeSearchIcon ? <IconSearch size="16" /> : null}
          {this.selectedChips.map((chip) => (
            <modus-chip
              value={chip.value}
              chipId={chip.id}
              size={this.size === 'large' ? 'medium' : 'small'}
              show-close
              onCloseClick={() => this.handleCloseClick(chip)}></modus-chip>
          ))}
          {this.TextInput()}
        </div>
        <div class={'error'}>{this.errorText ? <label class="sub-text error">{this.errorText}</label> : null}</div>
        <div
          class="options-container"
          style={{ maxHeight: this.dropdownMaxHeight, zIndex: this.dropdownZIndex, overflowY: 'auto' }}>
          <ul id={this.listId} aria-label="options" role="listbox">
            {this.displayOptions() &&
              this.visibleOptions?.map((option) => {
                let className;
                let isSelected;
                if (this.multiple) {
                  isSelected = this.selectedChips.includes(option);
                  className = 'text-option' + (isSelected ? ' selected' : '');
                } else {
                  isSelected = this.selectedOption === option.value;
                  className = 'text-option' + (isSelected ? ' selected' : '');
                }
                return (
                  <li
                    class={className}
                    tabindex="-1"
                    role="option"
                    onClick={() => this.handleOptionClick(option)}
                    onKeyDown={(e) => this.handleOptionKeyDown(e, option)}>
                    {option.value}
                    {isSelected && <IconCheck size="16" />}
                  </li>
                );
              })}
            {this.displayOptions() &&
              this.visibleCustomOptions?.map((option) => {
                const optionValue = option.getAttribute(DATA_SEARCH_VALUE);
                let className;
                if (this.multiple) {
                  className = 'custom-option' + (this.selectedChips.includes(optionValue) ? ' selected' : '');
                } else {
                  className = 'custom-option' + (this.selectedOption === optionValue ? ' selected' : '');
                }
                return (
                  <li
                    class={className}
                    tabindex="-1"
                    role="option"
                    onClick={() => this.handleCustomOptionClick(option)}
                    onKeyDown={(e) => this.handleOptionKeyDown(e, option, true)}
                    innerHTML={option.outerHTML}
                  />
                );
              })}
          </ul>

          {this.isLoading ? (
            <LoadingSpinner />
          ) : (
            this.displayNoResults() && <NoResultsFound text={this.noResultsFoundText} subtext={this.noResultsFoundSubtext} />
          )}
        </div>
        {this.CustomOptionsSlot()}
      </div>
    );
  }
}

const NoResultsFound = (props: { text: string; subtext: string }) => (
  <div class="no-results">
    <div style={{ display: 'flex' }}>
      <IconSearch size="28px" />
      <div class="message">{props.text}</div>
    </div>
    <div class="subtext">{props.subtext}</div>
  </div>
);
const LoadingSpinner = () => (
  <div class="is-loading">
    <modus-spinner size="1.5rem"></modus-spinner>
  </div>
);

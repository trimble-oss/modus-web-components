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
  @State() selectedChips: string[] = [];

  /** The autocomplete's selected option. */
  @State() selectedOption: string;

  /** Whether to show autocomplete's options when focus. */
  @Prop() showOptionsOnFocus: boolean;

  @Watch('options')
  watchOptions() {
    this.convertOptions();
    this.updateVisibleOptions(this.value);
  }

  /** The autocomplete's input placeholder. */
  @Prop() placeholder: string;

  /** Whether the autocomplete is read-only. */
  @Prop() readOnly: boolean;

  /** Whether the autocomplete is required. */
  @Prop() required: boolean;

  /** Whether to show the no results found message. */
  @Prop() showNoResultsFoundMessage = true;

  /** The autocomplete's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** The autocomplete's search value. */
  @Prop({ mutable: true }) value: string;
  @Watch('value')
  onValueChange() {
    if (this.hasFocus && !this.hasEnableControl()) {
      this.updateVisibleOptions(this.value);
      this.updateVisibleCustomOptions(this.value);
    }
  }

  /** An event that fires when a dropdown option is selected. Emits the option id. */
  @Event() optionSelected: EventEmitter<string>;

  /** An event that fires when the input value changes. Emits the value string. */
  @Event() valueChange: EventEmitter<string>;

  @State() hasFocus = false;
  @State() visibleOptions: ModusAutocompleteOption[] = [];
  @State() customOptions: Array<any> = [];
  @State() visibleCustomOptions: Array<any> = [];
  @State() disableFiltering = false;
  @State() focusItemIndex = 0;
  private listId = generateElementId() + '_list';

  componentWillLoad(): void {
    this.convertOptions();
  }

  componentDidRender(): void {
    if (this.hasFocus && this.displayOptions()) {
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

  hasEnableControl = (): boolean => !!this.showOptionsOnFocus || !!this.disableCloseOnSelect;

  displayOptions = () => {
    const showByDefault = this.hasFocus && !this.disabled;
    return showByDefault || (showByDefault && this.hasEnableControl());
  };

  addChipValue(value: string) {
    if (this.selectedChips.includes(value)) {
      return;
    }
    this.selectedOption = value;

    this.disableFiltering = !this.showOptionsOnFocus;

    this.selectedChips = [...this.selectedChips, value];
    this.valueChange.emit(this.selectedChips.join(','));
    this.value = '';
  }
  handleCustomOptionClick = (option: any) => {
    const optionValue = option.getAttribute(DATA_SEARCH_VALUE);
    const optionId = option.getAttribute(DATA_ID);

    if (this.multiple) {
      this.addChipValue(optionValue);
    } else {
      this.selectedOption = optionValue;
      this.disableFiltering = this.disableCloseOnSelect;
      this.handleSearchChange(optionValue);
    }

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
      if (this.displayOptions() && !this.displayNoResults()) {
        this.focusItemIndex = 0;
        this.focusOptionItem();
      }
    }
  };

  handleOptionKeyDown = (event: any, option: any, isCustomOption = false) => {
    this.disableFiltering = !this.hasEnableControl();

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
      this.addChipValue(option.value);
    } else {
      this.selectedOption = option.value;
      this.disableFiltering = this.disableCloseOnSelect;
      this.handleSearchChange(option.value);
      this.focusItemIndex = this.visibleOptions.findIndex((el) => el.id === option.id);
    }

    this.optionSelected.emit(option.id);
  };

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

  handleSearchChange = (search: string) => {
    this.updateVisibleOptions(search);
    this.updateVisibleCustomOptions(search);
    this.value = search;
    this.valueChange.emit(search);
  };

  handleCloseClick(chipValue: string) {
    if (this.selectedChips.length != 0) {
      this.selectedChips = this.selectedChips.filter((chip) => chip !== chipValue);
      this.valueChange.emit(this.selectedChips.join(','));
    }
  }

  handleTextInputValueChange = (event: CustomEvent<string>) => {
    // Cancel the modus-text-input's value change event or else it will bubble to consumer.
    event.stopPropagation();
    this.disableFiltering = false;
    this.handleSearchChange(event.detail);
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

    if (isSearchEmpty || this.disableFiltering) {
      this.visibleCustomOptions = this.customOptions;
      return;
    }

    this.visibleCustomOptions = this.customOptions?.filter((o: any) => {
      return o.getAttribute(DATA_SEARCH_VALUE).toLowerCase().includes(search.toLowerCase());
    });
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

    if (isSearchEmpty || this.disableFiltering) {
      this.visibleOptions = this.options as ModusAutocompleteOption[];

      return;
    }

    this.visibleOptions = (this.options as ModusAutocompleteOption[])?.filter((o: ModusAutocompleteOption) => {
      return o.value.toLowerCase().includes(search.toLowerCase());
    });
  };

  // Do not display the slot for the custom options. We use this hidden slot to reference the slot's children.
  CustomOptionsSlot = () => (
    <div style={{ display: 'none' }}>
      <slot onSlotchange={() => this.updateVisibleCustomOptions(this.value)} />
    </div>
  );

  TextInput = () => (
    <modus-text-input
      class="input"
      autocomplete="off"
      clearable={this.clearable && !this.readOnly && !!this.value}
      errorText={this.hasFocus ? '' : this.errorText}
      includeSearchIcon={false}
      onValueChange={(searchEvent: CustomEvent<string>) => this.handleTextInputValueChange(searchEvent)}
      placeholder={this.placeholder}
      size={this.size}
      type="search"
      value={this.value}
      onBlur={this.handleInputBlur}
      role="combobox"
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
      const containerHeight = optionList.offsetHeight;
      const optionHeight = selectedOption.offsetHeight;
      const optionTop = selectedOption.offsetTop;
      const scrollPosition = optionTop - containerHeight + 2 * optionHeight;

      selectedOption.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
      optionList.scrollTop = Math.max(scrollPosition, 0);
    }
  };

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
          this.disableFiltering = this.showOptionsOnFocus || this.disableCloseOnSelect;
          this.updateVisibleOptions(this.value);
          this.updateVisibleCustomOptions(this.value);
        }}
        onFocusout={() => {
          if (this.hasFocus) {
            this.hasFocus = this.hasEnableControl();
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
            <modus-chip value={chip} size="medium" show-close onCloseClick={() => this.handleCloseClick(chip)}></modus-chip>
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
                  isSelected = this.selectedChips.includes(option.value);
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
          {this.displayNoResults() && <NoResultsFound text={this.noResultsFoundText} subtext={this.noResultsFoundSubtext} />}
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

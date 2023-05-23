import {
  Component,
  Element,
  Event,
  EventEmitter,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { IconTriangleDown } from '../icons/icon-triangle-down';
import { createGuid } from '../../utils/utils';

@Component({
  tag: 'modus-select',
  styleUrl: 'modus-select.scss',
  shadow: true,
})
export class ModusSelect {
  /** (optional) Whether the input gets focus automatically on page load. */
  // @Prop() autofocus: boolean;

  /** (optional) The select's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** The select's dropdown menu size. */
  @Prop() menuSize: 'small' | 'medium' | 'large' = 'medium';

  /** (optional) The input's error text. */
  @Prop() errorText: string;

  /** (optional) The input's helper text. */
  @Prop() helperText: string;

  /** (optional) The input label. */
  @Prop() label: string;

  /** (optional) The number of visible options in a drop-down list. */
  // @Prop() numberOfOptions = 5;

  /** The options for the dropdown list. */
  @Prop() options: unknown[] = [];

  /** The options property to render in the dropdown list. */
  @Prop() optionsDisplayProp: string;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The input's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) The input's valid text. */
  @Prop() validText: string;

  /** (optional) The input value. */
  @Prop() value: unknown;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<unknown>;

  @Element() el: HTMLElement;

  @State() activeItemIndex = 0;

  @State() visible: boolean;

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  @Listen('click', { target: 'document' })
  documentClickHandler(event: MouseEvent): void {
    // Close the select when click is outside the current element.
    if (event.defaultPrevented || (event.target as HTMLElement).closest('modus-select')) {
      return;
    }

    this.hideDropdown();
  }

  @Listen('keydown')
  elementKeydownHandler(event: KeyboardEvent): void {
    if (!this.visible || this.el.shadowRoot.activeElement.tagName !== 'BUTTON') {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        this.activeItemIndex =
          this.activeItemIndex + 1 < this.options.length ? this.activeItemIndex + 1 : this.activeItemIndex;
        break;
      case 'ArrowUp':
        this.activeItemIndex = this.activeItemIndex - 1 > 0 ? this.activeItemIndex - 1 : 0;
        break;
      case 'Enter':
        this.handleItemSelect(this.options[this.activeItemIndex]);
        break;
      case 'Tab':
        this.hideDropdown();
        break;
    }
  }

  handleButtonClick(): void {
    if (this.visible) {
      this.hideDropdown();
    } else {
      this.showDropdown();
    }
  }

  handleItemSelect(option: unknown): void {
    this.value = option;
    this.valueChange.emit(option);
    this.hideDropdown();
    (this.el.shadowRoot.querySelector('button') as HTMLElement).focus();
  }

  hideDropdown(): void {
    this.visible = false;
    this.activeItemIndex = 0;
  }

  showDropdown(): void {
    this.visible = true;

    const activeOptionIndex = this.options?.findIndex((option) => option === this.value);
    if (activeOptionIndex > -1) {
      this.activeItemIndex = activeOptionIndex;
    }
  }

  render(): unknown {
    const buttonClass = `${this.classBySize.get(this.size)} ${
      this.errorText ? 'error' : this.validText ? 'valid' : ''
    }`;
    const dropdownListClass = `dropdown-list ${this.visible ? 'visible' : 'hidden'} menu-${this.menuSize}`;
    const inputContainerClass = `input-container ${this.visible ? 'dropdown-visible' : ''}`;

    return (
      <div
        role="listbox"
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-label={this.ariaLabel}
        aria-required={this.required}
        class={this.disabled ? 'disabled' : undefined}>
        {this.label || this.required ? (
          <div class={'label-container'}>
            {this.label ? <label>{this.label}</label> : null}
            {this.required ? <span class="required">*</span> : null}
          </div>
        ) : null}
        <div class={inputContainerClass}>
          <button
            class={buttonClass}
            disabled={this.disabled}
            onClick={() => this.handleButtonClick()}
            type="button"
            aria-invalid={!!this.errorText}>
            <div class="dropdown-text">{this.value ? this.value[this.optionsDisplayProp] : null}</div>
            <IconTriangleDown size={'12'} />
          </button>
          <div class={dropdownListClass}>
            {this.options.map((option, index) => (
              <div
                role="option"
                aria-selected={index === this.activeItemIndex}
                aria-label={option[this.optionsDisplayProp]}
                class={`dropdown-list-item ${index === this.activeItemIndex ? 'active' : ''}`}
                key={createGuid()}
                onClick={() => this.handleItemSelect(option)}
                onMouseEnter={() => (this.activeItemIndex = index)}>
                {option[this.optionsDisplayProp]}
              </div>
            ))}
          </div>
        </div>
        {this.errorText ? (
          <label class="sub-text error">{this.errorText}</label>
        ) : this.validText ? (
          <label class="sub-text valid">{this.validText}</label>
        ) : this.helperText ? (
          <label class="sub-text helper">{this.helperText}</label>
        ) : null}
      </div>
    );
  }
}

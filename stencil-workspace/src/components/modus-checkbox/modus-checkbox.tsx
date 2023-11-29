import {
  Component,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Event,
  EventEmitter,
  Listen,
  Method,
} from '@stencil/core';
import { IconCheck } from '../icons/icon-check';
import { IconIndeterminate } from '../icons/icon-indeterminate';

@Component({
  tag: 'modus-checkbox',
  styleUrl: 'modus-checkbox.scss',
  shadow: true,
})
export class ModusCheckbox {
  /** (optional) The checkbox's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Whether the checkbox is checked. */
  @Prop({ mutable: true }) checked: boolean;

  /** (optional) Whether the checkbox is disabled. */
  @Prop() disabled: boolean;

  /** (optional) Whether the checkbox is indeterminate. */
  @Prop({ mutable: true }) indeterminate: boolean;

  /** (optional) The checkbox label. */
  @Prop() label: string;

  /** (optional) Tab Index for the checkbox */
  @Prop({ mutable: true }) tabIndexValue: string | number = 0;

  /** An event that fires on checkbox click. */
  @Event() checkboxClick: EventEmitter<boolean>;

  /** (optional) If you wish to prevent the propagation of your event, you may opt for this. */
  @Prop() stopPropagation: boolean;

  /** (optional) The size of the checkbox. */
  @Prop() size: 'small' | 'default' = 'default';

  checkboxInput: HTMLInputElement;
  checkboxContainer: HTMLDivElement;

  @Listen('keydown')
  elementKeydownHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Enter':
        this.handleCheckboxClick(event);
        break;
      case 'Space':
        this.handleCheckboxClick(event);
        break;
    }
  }

  /** Focus the checkbox input */
  @Method()
  async focusCheckbox(): Promise<void> {
    this.checkboxContainer.focus();
  }

  componentDidRender(): void {
    this.checkboxInput.indeterminate = this.indeterminate;
  }

  handleCheckboxClick(event: MouseEvent | KeyboardEvent): void {
    if (this.disabled) {
      return;
    }

    this.updateChecked();
    this.checkboxClick.emit(this.checked);

    if (this.stopPropagation) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  updateChecked(): void {
    this.checked = !this.checked;
    this.checkboxInput.checked = this.checked;
    this.indeterminate = false;
  }

  render(): unknown {
    const className = `modus-checkbox ${this.size === 'small' ? 'small' : ''}`;
    const tabIndexValue = this.disabled ? -1 : this.tabIndexValue;

    return (
      <div
        class={className}
        onClick={(event: MouseEvent) => {
          this.handleCheckboxClick(event);
        }}>
        <div
          tabindex={tabIndexValue}
          class={`${this.checked || this.indeterminate ? 'checkbox blue-background checked' : 'checkbox'} ${
            this.disabled ? 'disabled' : ''
          } ${this.size === 'small' ? 'small' : ''} `}
          ref={(el) => (this.checkboxContainer = el)}>
          {this.indeterminate ? (
            <div class={'checkmark checked'}>
              {' '}
              <IconIndeterminate color="#FFFFFF" size={this.size === 'small' ? '14' : '24'} />
            </div>
          ) : (
            <div class={this.checked ? 'checkmark checked' : 'checkmark'}>
              <IconCheck color="#FFFFFF" size={this.size === 'small' ? '14' : '24'} />
            </div>
          )}
        </div>
        <input
          aria-checked={this.checked}
          aria-disabled={this.disabled ? 'true' : undefined}
          aria-label={this.ariaLabel}
          checked={this.checked}
          disabled={this.disabled}
          ref={(el) => (this.checkboxInput = el as HTMLInputElement)}
          type="checkbox"></input>
        {this.label ? (
          <label class={` ${this.disabled ? 'disabled' : ''} ${this.size === 'small' ? 'small' : ''}`}>{this.label}</label>
        ) : null}
      </div>
    );
  }
}

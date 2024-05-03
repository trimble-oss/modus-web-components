import {
  Component,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Event,
  EventEmitter,
  Listen,
  Method,
} from '@stencil/core';
import { generateElementId } from '../../utils/utils';

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
  @Prop() size: 'small' | 'medium' = 'medium';

  private checkBoxId = generateElementId() + '_checkbox';

  checkboxInput: HTMLInputElement;

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
    this.checkboxInput.focus();
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
      <div class={className} tabindex={tabIndexValue}>
        <input
          class={`checkbox ${this.size === 'small' ? 'small' : ''} ${this.disabled ? 'disabled' : ''}`}
          aria-checked={this.checked ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : undefined}
          aria-label={this.ariaLabel || undefined}
          checked={this.checked}
          disabled={this.disabled}
          id={this.checkBoxId}
          ref={(el) => (this.checkboxInput = el as HTMLInputElement)}
          onChange={(event: MouseEvent) => {
            this.handleCheckboxClick(event);
          }}
          type="checkbox"></input>
        {this.label ? (
          <label
            htmlFor={this.checkBoxId}
            class={` ${this.disabled ? 'disabled' : ''} ${this.size === 'small' ? 'small' : ''}`}>
            {this.label}
          </label>
        ) : null}
      </div>
    );
  }
}

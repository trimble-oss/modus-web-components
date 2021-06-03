// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'modus-checkbox',
  styleUrl: 'modus-checkbox.scss',
  shadow: true,
})
export class ModusCheckbox {
  /** (optional) Whether the checkbox is checked. */
  @Prop({ mutable: true }) checked: boolean;

  /** (optional) Whether the checkbox is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The checkbox label. */
  @Prop() label: string;

  /** (optional) The size of the button */
  @Prop() size: 'small' | 'medium' = 'medium'

  /** An event that fires on checkbox click. */
  @Event() checkboxClick: EventEmitter<boolean>;

  checkboxInput: HTMLInputElement;

  classBySize: Map<string, string> = new Map([
    ['small', 'small'],
    ['medium', 'medium']
  ]);

  handleCheckboxClick(): void {
    if (!this.disabled) {
      this.updateChecked();
      this.checkboxClick.emit(this.checked);
    }
  }

  updateChecked(): void {
    this.checked = !this.checked;
    this.checkboxInput.checked = this.checked;
  }

  render(): unknown {
    const className = `modus-checkbox ${this.classBySize?.get(this.size)}`;

    return (
      <div class={className} onClick={() => this.handleCheckboxClick()}>
        <div class={`${this.checked ? 'checkbox checked' : 'checkbox'} ${this.disabled ? 'disabled' : ''}`}>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" class={this.checked ? 'checked' : ''}>
            <path d="M3.81353 7.21774L0.968732 4.37294L0 5.33485L3.81353 9.14838L12 0.96191L11.0381 0L3.81353 7.21774Z" fill="white"/>
          </svg>
        </div>
        <input
          checked={this.checked}
          disabled={this.disabled}
          ref={(el) => this.checkboxInput = el as HTMLInputElement}
          type="checkbox">
        </input>
        {this.label ? <label class={this.disabled ? 'disabled' : null}>{this.label}</label> : null}
      </div>
    );
  }
}

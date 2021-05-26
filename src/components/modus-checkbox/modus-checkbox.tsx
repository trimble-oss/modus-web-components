import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'modus-checkbox',
  styleUrl: 'modus-checkbox.scss',
  shadow: true
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
  @Event() checkboxClick: EventEmitter;

  checkboxInput: HTMLInputElement;

  handleCheckboxClick(): void {
    this.updateChecked();
    this.checkboxClick.emit();
  }

  updateChecked(): void {
    this.checked = this.checkboxInput.checked;
  }

  classBySize: Map<string, string> = new Map([
    ['small', 'small'],
    ['medium', 'medium']
  ]);

  render() {
    const className = `container ${this.classBySize.get(this.size)}`;

    return (
      <div class={className}>
        <input
          type="checkbox"
          checked={this.checked}
          disabled={this.disabled}
          onClick={() => this.handleCheckboxClick()}
          ref={(el) => this.checkboxInput = el as HTMLInputElement}>
        </input>
        {this.label ? <div class={this.disabled ? 'disabled' : null}>{this.label}</div> : null}
      </div>
    );
  }
}

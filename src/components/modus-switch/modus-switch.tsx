// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'modus-switch',
  styleUrl: 'modus-switch.scss',
  shadow: true,
})
export class ModusSwitch {
  /** (optional) Whether the switch is checked. */
  @Prop({ mutable: true }) checked: boolean;

  /** (optional) Whether the switch is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The switch label. */
  @Prop() label: string;

  /** An event that fires on switch click. */
  @Event() switchClick: EventEmitter<boolean>;

  checkboxInput: HTMLInputElement;

  handleSwitchClick(): void {
    if (this.disabled) { return; }

    this.updateChecked();
    this.switchClick.emit(this.checked);
  }

  updateChecked(): void {
    this.checked = !this.checked;
    this.checkboxInput.checked = this.checked;
  }

  render(): unknown {
    const containerClassName = `modus-switch ${this.disabled ? 'disabled' : ''}`;
    const switchClassName = `switch ${this.checked ? 'checked' : ''}`;

    return (
      <div class={containerClassName} onClick={() => this.handleSwitchClick()}>
        <div class={switchClassName}>
            <span class="slider"></span>
        </div>
        <input
          checked={this.checked}
          disabled={this.disabled}
          ref={(el) => this.checkboxInput = el as HTMLInputElement}
          type="checkbox">
        </input>
        {this.label ? <label>{this.label}</label> : null}
      </div>
    );
  }
}

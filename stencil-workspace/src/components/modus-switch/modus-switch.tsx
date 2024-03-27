// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'modus-switch',
  styleUrl: 'modus-switch.scss',
  shadow: true,
})
export class ModusSwitch {
  /** (optional) The switch's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Whether the switch is checked. */
  @Prop({ mutable: true }) checked: boolean;

  /** (optional) Whether the switch is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The switch label. */
  @Prop() label: string;

  /** (optional) The size of the radiobutton. */
  @Prop() size?: 'small' | 'medium' = 'medium';

  /** An event that fires on switch click. */
  @Event() switchClick: EventEmitter<boolean>;

  checkboxInput: HTMLInputElement;

  @Listen('keydown')
  elementKeydownHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Enter':
        this.handleSwitchClick();
        break;
    }
  }

  @Listen('keyup')
  elementKeyupHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
        this.handleSwitchClick();
        break;
    }
  }

  handleSwitchClick(): void {
    if (this.disabled) {
      return;
    }

    this.updateChecked();
    this.switchClick.emit(this.checked);
  }

  updateChecked(): void {
    this.checked = !this.checked;
    this.checkboxInput.checked = this.checked;
  }

  render(): unknown {
    const containerClassName = `modus-switch ${this.disabled ? 'disabled' : ''} ${this.size}`;
    const switchClassName = `switch ${this.checked ? 'checked' : ''}`;

    return (
      <div class={containerClassName} onClick={() => this.handleSwitchClick()} tabIndex={this.disabled ? -1 : 0}>
        <div class={switchClassName}>
          <span class={`slider`}></span>
        </div>
        <input
          aria-checked={this.checked}
          aria-disabled={this.disabled ? 'true' : undefined}
          aria-label={this.ariaLabel}
          checked={this.checked}
          disabled={this.disabled}
          ref={(el) => (this.checkboxInput = el as HTMLInputElement)}
          role="switch"
          type="checkbox"></input>
        {this.label ? <label>{this.label}</label> : null}
      </div>
    );
  }
}

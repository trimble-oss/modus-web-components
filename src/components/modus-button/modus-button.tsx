// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'modus-button',
  styleUrl: 'modus-button.scss',
  shadow: true,
})
export class ModusButton {
  /** (optional) The color of the button */
  @Prop() color: 'danger' | 'default' | 'primary' | 'secondary' | 'warning' = 'default';

  /** (optional) Disables the button */
  @Prop() disabled: boolean;

  /** (optional) The size of the button */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** (optional) An event that fires on button click */
  @Event() buttonClick: EventEmitter;

  classByType: Map<string, string> = new Map([
    ['danger', 'color-danger'],
    ['default', 'color-tertiary'],
    ['primary', 'color-primary'],
    ['secondary', 'color-secondary'],
    ['warning', 'color-warning'],
  ]);

  classBySize: Map<string, string> = new Map([
    ['small', 'size-small'],
    ['medium', 'size-medium'],
    ['large', 'size-large'],
  ]);

  render(): unknown {
    const className = `${this.classBySize.get(this.size)} ${this.classByType.get(this.color)}`;

    return (
      <button class={className} disabled={this.disabled} onClick={() => !this.disabled ? this.buttonClick.emit() : null}>
        <slot />
      </button>
    );
  }
}

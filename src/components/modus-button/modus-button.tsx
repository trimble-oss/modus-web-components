import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'modus-button',
  styleUrl: 'modus-button.scss',
  shadow: true,
})
export class ModusButton {
  /** (optional) Disables the button */
  @Prop() disabled: boolean;

  /** (optional) The size of the button */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** (optional) The type of button */
  @Prop() type: 'cta' | 'default' | 'primary' | 'secondary' | 'warning' = 'default';

  /** (optional) An event that fires on button click */
  @Event() buttonClick: EventEmitter;

  classByType: Map<string, string> = new Map([
    ['cta', 'cta'],
    ['default', 'tertiary'],
    ['primary', 'primary'],
    ['secondary', 'secondary'],
    ['warning', 'warning'],
  ]);

  classBySize: Map<string, string> = new Map([
    ['small', 'small'],
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  render() {
    const className = `${this.classBySize.get(this.size)} ${this.classByType.get(this.type)}`;

    return (
      <button class={className} disabled={this.disabled} onClick={() => this.buttonClick.emit()}>
        <slot />
      </button>
    );
  }
}

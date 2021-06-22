// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'modus-button',
  styleUrl: 'modus-button.scss',
  shadow: true,
})
export class ModusButton {
  /** (optional) The style of the button */
  @Prop() buttonStyle: 'borderless' | 'fill' | 'outline' = 'fill';

  /** (optional) The color of the button. */
  @Prop() color: 'danger' | 'default' | 'primary' | 'secondary' | 'warning' = 'default';

  /** (optional) Disables the button. */
  @Prop() disabled: boolean;

  /** (optional) The size of the button. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** (optional) An event that fires on button click. */
  @Event() buttonClick: EventEmitter;

  @Element() el: HTMLElement;

  classByButtonStyle: Map<string, string> = new Map([
    ['borderless', 'style-borderless'],
    ['fill', 'style-fill'],
    ['outline', 'style-outline'],
  ]);

  classByColor: Map<string, string> = new Map([
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
    const className = `${this.classBySize.get(this.size)} ${this.classByColor.get(this.color)} ${this.classByButtonStyle.get(this.buttonStyle)}`;

    return (
      <button
        aria-disabled={this.disabled}
        aria-label={this.el.innerText}
        class={className}
        disabled={this.disabled}
        onClick={() => !this.disabled ? this.buttonClick.emit() : null}
        role="button">
        <slot />
      </button>
    );
  }
}

// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, Element, State, Listen } from '@stencil/core';

@Component({
  tag: 'modus-button',
  styleUrl: 'modus-button.scss',
  shadow: true,
})
export class ModusButton {
  /** (optional) The button's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The style of the button */
  @Prop() buttonStyle: 'borderless' | 'fill' | 'outline' = 'fill';

  /** (optional) The color of the button. */
  @Prop() color: 'danger' | 'primary' | 'secondary' | 'tertiary' = 'primary';

  /** (optional) Disables the button. */
  @Prop() disabled: boolean;

  /** (optional) The size of the button. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** (optional) An event that fires on button click. */
  @Event() buttonClick: EventEmitter;

  @Element() el: HTMLElement;

  @State() pressed: boolean;

  classByButtonStyle: Map<string, string> = new Map([
    ['borderless', 'style-borderless'],
    ['fill', 'style-fill'],
    ['outline', 'style-outline'],
  ]);

  classByColor: Map<string, string> = new Map([
    ['danger', 'color-danger'],
    ['primary', 'color-primary'],
    ['secondary', 'color-secondary'],
    ['tertiary', 'color-tertiary'],
  ]);

  classBySize: Map<string, string> = new Map([
    ['small', 'size-small'],
    ['medium', 'size-medium'],
    ['large', 'size-large'],
  ]);

  @Listen('keyup')
  elementKeyupHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
        this.buttonClick.emit();
        break;
    }
  }

  render(): unknown {
    const className = `${this.classBySize.get(this.size)} ${this.classByColor.get(this.color)} ${this.classByButtonStyle.get(
      this.buttonStyle
    )}`;

    return (
      <button
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-label={this.ariaLabel}
        aria-pressed={this.pressed ? 'true' : undefined}
        class={className}
        disabled={this.disabled}
        onClick={() => (!this.disabled ? this.buttonClick.emit() : null)}
        onKeyDown={() => (this.pressed = true)}
        onKeyUp={() => (this.pressed = false)}
        onMouseDown={() => (this.pressed = true)}
        onMouseUp={() => (this.pressed = false)}
        role="button">
        <slot />
      </button>
    );
  }
}

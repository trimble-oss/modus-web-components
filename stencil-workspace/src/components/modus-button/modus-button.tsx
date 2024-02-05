// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, Element, State, Listen, Method, Fragment } from '@stencil/core';
import { ModusIconMap } from '../../icons/ModusIconMap';
import { JSX } from '@stencil/core/internal';

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

  /** (optional) The color of the button */
  @Prop() color: 'danger' | 'primary' | 'secondary' | 'tertiary' = 'primary';

  /** (optional) Disables the button. */
  @Prop() disabled: boolean;

  /** (optional) Takes the icon name and renders an icon-only button. */
  @Prop() iconOnly: string;

  /** (optional) Takes the icon name and shows the icon aligned to the left of the button text. */
  @Prop() leftIcon: string;

  /** (optional) Takes the icon name and shows the icon aligned to the right of the button text. */
  @Prop() rightIcon: string;

  /** (optional) The size of the button. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** (optional) Shows a caret icon right side of the button. */
  @Prop() showCaret: boolean;

  /** (optional) Makes the button toggleable. */
  @Prop() toggleable: boolean;

  @Prop() buttonPosition: 'left' | 'right' | 'center';

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
    ['dark', 'color-dark'],
  ]);

  classBySize: Map<string, string> = new Map([
    ['small', 'size-small'],
    ['medium', 'size-medium'],
    ['large', 'size-large'],
  ]);

  buttonRef: HTMLButtonElement;

  /** Focus the Button */
  @Method()
  async focusButton(): Promise<void> {
    this.buttonRef?.focus();
    return Promise.resolve();
  }

  @Listen('keyup')
  elementKeyupHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Space':
        this.buttonClick.emit();
        break;
    }
  }

  renderIconWithText(): JSX.Element {
    return (
      <Fragment>
        {this.leftIcon && (
          <span class="icon left-icon">
            <ModusIconMap icon={this.leftIcon}></ModusIconMap>
          </span>
        )}
        <span class="label">
          <slot />
        </span>

        {this.rightIcon && !this.showCaret && (
          <span class="icon right-icon">
            <ModusIconMap icon={this.rightIcon}></ModusIconMap>
          </span>
        )}
      </Fragment>
    );
  }

  renderIconOnly(): JSX.Element {
    return (
      <span class="icon">
        <ModusIconMap icon={this.iconOnly}></ModusIconMap>
      </span>
    );
  }

  render(): unknown {
    const className = `${this.buttonPosition ? this.buttonPosition : ''} ${this.classBySize.get(
      this.size
    )} ${this.classByColor.get(this.color)} ${this.classByButtonStyle.get(this.buttonStyle)} ${
      this.iconOnly ? 'icon-only' : ''
    } ${this.showCaret ? 'has-caret' : ''} ${this.toggleable ? ' active' : ''}`;

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
        role="button"
        ref={(el) => (this.buttonRef = el)}>
        {this.iconOnly ? this.renderIconOnly() : this.renderIconWithText()}
        {this.showCaret && <ModusIconMap size="24" icon="caret_down"></ModusIconMap>}
      </button>
    );
  }
}

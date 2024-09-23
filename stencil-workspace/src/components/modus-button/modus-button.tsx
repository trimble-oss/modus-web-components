// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Prop, h, Event, EventEmitter, Element, State, Listen, Method, Fragment } from '@stencil/core';
import { ModusIconMap } from '../../icons/ModusIconMap';
import { JSX } from '@stencil/core/internal';
import { ButtonColor, ButtonSize, ButtonStyle, ButtonType } from './modus-button.models';

@Component({
  tag: 'modus-button',
  styleUrl: 'modus-button.scss',
  shadow: true,
})
export class ModusButton {
  /** (optional) The button's aria-disabled state. */
  @Prop() ariaDisabled: string | null;

  /** (optional) The button's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The style of the button */
  @Prop({ reflect: true }) buttonStyle: ButtonStyle = 'fill';

  /** (optional) The color of the button */
  @Prop({ reflect: true }) color: ButtonColor = 'primary';

  /** (optional) Disables the button. */
  @Prop({ reflect: true }) disabled: boolean;

  /** (optional) Takes the icon name and renders an icon-only button. */
  @Prop() iconOnly: string;

  /** (optional) Takes the icon name and shows the icon aligned to the left of the button text. */
  @Prop() leftIcon: string;

  /** (optional) Takes the icon name and shows the icon aligned to the right of the button text. */
  @Prop() rightIcon: string;

  /** (optional) The size of the button. */
  @Prop() size: ButtonSize = 'medium';

  /** (optional) Shows a caret icon right side of the button. */
  @Prop() showCaret: boolean;

  /** (Optional) Button types */
  @Prop() type: ButtonType = 'button';

  /**(Optional) enable the progress animation for danger button*/
  @Prop() criticalAction: boolean;

  /** (optional) An event that fires on button click. */
  @Event() buttonClick: EventEmitter;

  @Element() el: HTMLElement;

  @State() isActive: boolean;

  @State() pressed: boolean;

  @State() progressState = {
    progressClass: '',
    progressWidth: 0,
    startTime: 0,
    animationDuration: 3000,
    resetTimeout: null as NodeJS.Timeout | null,
  };

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
    ['special', 'color-special'],
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
  /** Set the button to active or inactive */
  @Method()
  async setActive(isActive: boolean): Promise<void> {
    this.isActive = isActive;
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

  isCriticalAction() {
    return this.criticalAction && this.color === 'danger' && !this.disabled && this.buttonStyle === 'fill';
  }

  handleMouseUp() {
    this.pressed = false;
    if (this.isCriticalAction()) {
      const elapsedTime = Date.now() - this.progressState.startTime;
      this.progressState = {
        ...this.progressState,
        progressWidth: Math.min((elapsedTime / this.progressState.animationDuration) * 100, 100),
        progressClass: 'reverse',
      };

      if (this.progressState.progressWidth >= 100) {
        this.buttonClick.emit();
        this.buttonRef.classList.remove('progress');
        this.buttonRef.classList.remove('reverse');
      } else {
        this.buttonRef.classList.remove('progress');
        this.buttonRef.classList.add('reverse');
      }

      if (this.progressState.resetTimeout) {
        clearTimeout(this.progressState.resetTimeout);
      }

      this.progressState.resetTimeout = setTimeout(() => {
        this.progressState = {
          ...this.progressState,
          progressWidth: 0,
          progressClass: '',
        };
        this.buttonRef.classList.remove('reverse');
      }, this.progressState.animationDuration);
    }
  }

  handleMouseDown() {
    this.pressed = true;
    if (this.isCriticalAction()) {
      this.progressState = {
        ...this.progressState,
        progressClass: 'progress',
        startTime: Date.now(),
      };
      this.buttonRef.classList.remove('reverse');
      this.buttonRef.classList.add('progress');
    }
  }

  render(): unknown {
    const className = `${this.classBySize.get(
      this.size
    )} ${this.classByColor.get(this.color)} ${this.classByButtonStyle.get(this.buttonStyle)} ${
      this.iconOnly ? 'icon-only' : ''
    } ${this.showCaret ? 'has-caret' : ''} ${this.isActive ? ' active' : ''}`;

    return (
      <button
        aria-disabled={this.ariaDisabled ? this.ariaDisabled : this.disabled ? 'true' : undefined}
        aria-label={this.ariaLabel || undefined}
        aria-pressed={this.pressed ? 'true' : undefined}
        class={className}
        disabled={this.disabled}
        onClick={() => {
          if (!this.disabled && !this.criticalAction) {
            this.buttonClick.emit();
            if (this.type === 'toggle') {
              this.isActive = !this.isActive;
            }
          }
        }}
        style={{ '--progress-width': `${this.progressState.progressWidth}%` }}
        onKeyDown={() => (this.pressed = true)}
        onKeyUp={() => (this.pressed = false)}
        onMouseDown={() => this.handleMouseDown()}
        onMouseUp={() => this.handleMouseUp()}
        ref={(el) => (this.buttonRef = el)}
        type={this.type}>
        {this.iconOnly ? this.renderIconOnly() : this.renderIconWithText()}
        {this.showCaret && <ModusIconMap size="24" icon="caret_down"></ModusIconMap>}
      </button>
    );
  }
}

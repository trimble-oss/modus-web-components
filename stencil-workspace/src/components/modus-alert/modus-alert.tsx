// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, Listen } from '@stencil/core';
import { IconCheckCircle } from '../../icons/svgs/icon-check-circle';
import { IconError } from '../../icons/svgs/icon-error';
import { IconInfo } from '../../icons/svgs/icon-info';
import { IconWarning } from '../../icons/svgs/icon-warning';
import { IconClose } from '../../icons/svgs/icon-close';

@Component({
  tag: 'modus-alert',
  styleUrl: 'modus-alert.scss',
  shadow: true,
})
export class ModusAlert {
  /** (optional) The alert's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The button's aria-label. */
  @Prop() buttonAriaLabel: string | null;

  /**(optional) The button's text */
  @Prop() buttonText: string | null;

  /** (optional) Whether the alert has a dismiss button */
  @Prop() dismissible: boolean;

  /** (optional) The alert message */
  @Prop() message: string;

  /** (optional) The type of alert, sets the color and icon to render */
  @Prop() type: 'error' | 'info' | 'info-gray' | 'info-gray-dark' | 'success' | 'warning' = 'info';

  /** An event that fires when the alert is dismissed */
  @Event() dismissClick: EventEmitter;

  /**An event that firest when the action button is clicked */
  @Event() actionClick: EventEmitter;

  classByType: Map<string, string> = new Map([
    ['error', 'type-error'],
    ['info', 'type-info'],
    ['info-gray', 'type-info-gray'],
    ['info-gray-dark', 'type-info-gray-dark'],
    ['success', 'type-success'],
    ['warning', 'type-warning'],
  ]);

  infoTypes = ['info', 'info-gray', 'info-gray-dark'];

  @Listen('keyup')
  elementKeyupHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Escape':
        if (!this.dismissible) {
          return;
        }

        this.dismissClick.emit();
        break;
    }
  }

  render(): unknown {
    const className = `alert ${this.classByType.get(this.type)} ${(this.dismissible && this.buttonText?.length > 0) || this.buttonText?.length > 0 ? 'with-action-button' : ''}`;
    const iconSize = '24';
    const MAX_LENGTH = 300;

    return (
      <div aria-label={this.ariaLabel} class={className} role="alert">
        <div class="icon">
          {this.type === 'error' ? <IconError size={iconSize} /> : null}
          {this.infoTypes.includes(this.type) ? <IconInfo size={iconSize} /> : null}
          {this.type === 'success' ? <IconCheckCircle size={iconSize} /> : null}
          {this.type === 'warning' ? <IconWarning size={iconSize} /> : null}
        </div>
        <div class="message">
          {this.message && this.message.length > MAX_LENGTH ? `${this.message.substring(0, MAX_LENGTH)}...` : this.message}
          <slot></slot>
        </div>
        <div class="alert-buttons-container">
          {this.buttonText?.length > 0 && (
            <modus-button
              class="action-button"
              buttonStyle="outline"
              color="secondary"
              size="medium"
              ariaLabel={this.buttonAriaLabel}
              onButtonClick={() => this.actionClick.emit()}
              onKeyDown={(e) => this.handleKeyDown(e, 'action')}>
              {this.buttonText}
            </modus-button>
          )}
          {this.dismissible && (
            <div
              class="icon-close-container"
              aria-label="Dismiss alert"
              role="button"
              tabIndex={0}
              onClick={() => this.dismissClick.emit()}
              onKeyDown={(e) => this.handleKeyDown(e, 'dismiss')}>
              <IconClose size="18" />
            </div>
          )}
        </div>
      </div>
    );
  }
  handleKeyDown(e: KeyboardEvent, buttonType: string) {
    if (e.key.toUpperCase() === 'ENTER') {
      if (buttonType === 'dismiss') {
        this.dismissClick.emit();
        return;
      }
      this.actionClick.emit();
    }
  }
}

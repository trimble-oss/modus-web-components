// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, Listen } from '@stencil/core';
import { IconClose } from '../icons/icon-close';
import { IconError } from '../icons/icon-error';
import { IconWarning } from '../icons/icon-warning';
import { IconCheckCircle } from '../icons/icon-check-circle';
import { IconInfo } from '../icons/icon-info';

@Component({
  tag: 'modus-alert',
  styleUrl: 'modus-alert.scss',
  shadow: true,
})
export class ModusAlert {
  /** (optional) The alert's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Whether the alert has a dismiss button */
  @Prop() dismissible: boolean;

  /** (optional) The alert message */
  @Prop() message: string;

  /** (optional) The type of alert, sets the color and icon to render */
  @Prop() type: 'error' | 'info' | 'info-gray' | 'info-gray-dark' | 'success' | 'warning' = 'info';

  /** An event that fires when the alert is dismissed */
  @Event() dismissClick: EventEmitter;

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
    const className = `alert ${this.classByType.get(this.type)}`;
    const iconSize = '24';

    return (
      <div aria-label={this.ariaLabel} class={className} role="alert" tabIndex={0}>
        {this.type === 'error' ? <IconError size={iconSize} /> : null}
        {this.infoTypes.includes(this.type) ? <IconInfo size={iconSize} /> : null}
        {this.type === 'success' ? <IconCheckCircle size={iconSize} /> : null}
        {this.type === 'warning' ? <IconWarning size={iconSize} /> : null}
        <div class="message">{this.message}</div>
        {this.dismissible ? <IconClose size="18" onClick={() => this.dismissClick.emit()} /> : null}
      </div>
    );
  }
}

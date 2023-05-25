// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { IconInfo } from '../icons/icon-info';
import { IconWarning } from '../icons/icon-warning';
import { IconCheckCircle } from '../icons/icon-check-circle';
import { IconError } from '../icons/icon-error';
import { IconHelp } from '../icons/icon-help';
import { IconClose } from '../icons/icon-close';

@Component({
  tag: 'modus-toast',
  styleUrl: 'modus-toast.scss',
  shadow: true,
})
export class ModusToast {
  /** (optional) The toast's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Whether the toast has a dismiss button. */
  @Prop() dismissible: boolean;

  /** (optional) Whether to show the toasts' icon. */
  @Prop() showIcon = true;

  /** (optional) The toasts' type. */
  @Prop() type: 'danger' | 'dark' | 'default' | 'primary' | 'secondary' | 'success' | 'warning' = 'default';

  /** An event that fires when the toast is dismissed */
  @Event() dismissClick: EventEmitter;

  iconByType: Map<string, HTMLElement> = new Map([
    ['danger', <IconWarning color={'#C81922'} size={'18'} />],
    ['dark', <IconInfo color={'white'} size={'18'} />],
    ['default', <IconInfo size={'18'} />],
    ['primary', <IconInfo color={'#0D6AA8'} size={'18'} />],
    ['secondary', <IconHelp size={'18'} />],
    ['success', <IconCheckCircle color={'#5E9331'} size={'18'} />],
    ['tertiary', <IconInfo size={'18'} />],
    ['warning', <IconError color={'#FFBE00'} size={'18'} />],
  ]);

  classByType: Map<string, string> = new Map([
    ['danger', 'danger'],
    ['dark', 'dark'],
    ['default', 'default'],
    ['primary', 'primary'],
    ['secondary', 'secondary'],
    ['success', 'success'],
    ['tertiary', 'tertiary'],
    ['warning', 'warning'],
  ]);

  render(): unknown {
    const icon = this.iconByType.get(this.type);
    const className = `modus-toast ${this.classByType.get(this.type)}`;

    return (
      <div aria-label={this.ariaLabel} class={className} role="status">
        {this.showIcon && <div class="icon">{icon}</div>}
        <span class={'text'}>
          <slot />
        </span>
        <span class={'close'}>{this.dismissible && <IconClose size={'18'} onClick={() => this.dismissClick.emit()} />}</span>
      </div>
    );
  }
}

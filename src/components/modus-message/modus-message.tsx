// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';
import { IconInfo } from '../icons/icon-info';
import { IconHelp } from '../icons/icon-help';

@Component({
  tag: 'modus-message',
  styleUrl: 'modus-message.scss',
  shadow: true,
})
export class ModusMessage {
  /** (optional) The message's type. */
  @Prop() type: 'info' | 'question' = 'info';

  classByType: Map<string, string> = new Map([
    ['info', 'info'],
    ['question', 'question'],
  ]);

  render(): unknown {
    const className = `modus-message ${this.classByType.get(this.type)}`;

    return (
      <div class={className}>
        <span class="icon">
          {this.type === 'info' ? <IconInfo color="#005F9E" size="18"></IconInfo> : <IconHelp color="#6A6976" size="18"></IconHelp>}
        </span>
        <span class="message">
          <slot />
        </span>
      </div>
    );
  }
}

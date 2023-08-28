// eslint-disable-next-line
import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { IconMap } from '../icons/IconMap';

@Component({
  tag: 'modus-icon',
  shadow: true,
})
export class ModusIcon {
  @Prop() icon: string | null;

  @Event() iconClick?: EventEmitter;

  @Prop() size?: string;

  @Prop() color?: string;

  onClick(event: MouseEvent): void {
    if (event.defaultPrevented) {
      return;
    }
    this.iconClick.emit(event);
  }
  render(): unknown {
    return <IconMap icon={this.icon} onClick={this.onClick} size={this.size} color={this.color} />;
  }
}

// eslint-disable-next-line
import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ModusIconMap } from '../../icons/ModusIconMap';
import { ModusIconName } from '../../icons/ModusIconUtilities';

@Component({
  tag: 'modus-icon',
  shadow: true,
})
export class ModusIcon {
  /** The name of the icon */
  @Prop() name: ModusIconName | null;

  /** (optional) The click handler function */
  @Event() iconClick?: EventEmitter;

  /** (optional) The size of the Icon */
  @Prop() size?: string = '16';

  /** (optional) The color of the Icon */
  @Prop() color?: string;

  onClick(event: MouseEvent): void {
    if (event.defaultPrevented) {
      return;
    }
    this.iconClick.emit(event);
  }
  render(): unknown {
    return <ModusIconMap icon={this.name} onClick={(event) => this.onClick(event)} size={this.size} color={this.color} />;
  }
}

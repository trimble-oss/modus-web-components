// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'modus-dropdown',
  styleUrl: 'modus-dropdown.scss',
  shadow: true,
})
export class ModusDropdown {
  /** (optional) Disables the button */
  @Prop() disabled: boolean;

  /** (optional) An event that fires on item select */
  @Event() itemSelect: EventEmitter;

  render(): unknown {
    return (
      <div></div>
    );
  }
}

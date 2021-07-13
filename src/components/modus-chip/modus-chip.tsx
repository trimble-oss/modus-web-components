// eslint-disable-next-line
import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';
import { IconRemove } from '../icons/icon-remove';
import { IconCheck } from '../icons/icon-check';

@Component({
  tag: 'modus-chip',
  styleUrl: 'modus-chip.scss',
  shadow: true,
})

export class ModusChip {
  /** (optional) The chip's style. */
  @Prop() chipStyle: 'outline' | 'solid'  = 'solid';

  /** (optional) Whether the chip is disabled. */
  @Prop() disabled = false;

  /** (optional) Whether the chip has an error. */
  @Prop() hasError = false;

  /** (optional) The image's url. */
  @Prop() imageUrl: string;

  /** (optional) Whether to show the checkmark. */
  @Prop() showCheckmark = false;

  /** (optional) Whether to show the close icon. */
  @Prop() showClose = false;

  /** (optional) The chip's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) The chip's value. */
  @Prop() value: string;

  /** An event that fires on chip click. */
  @Event() chipClick: EventEmitter<MouseEvent>;

  /** An event that fires on close icon click. */
  @Event() closeClick: EventEmitter<MouseEvent>;

  classByChipStyle: Map<string, string> = new Map([
    ['outline', 'style-outline'],
    ['solid', 'style-solid'],
  ]);
  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large'],
  ]);

  onChipClick(event: MouseEvent): void {
    if (event.defaultPrevented) { return; } // Don't emit chipClick if closeClick has emitted.

    this.chipClick.emit(event);
  }

  onCloseClick(event: MouseEvent): void {
    this.closeClick.emit(event);
    event.preventDefault();
  }

  render(): unknown {
    const chipClass = `
      modus-chip ${this.disabled ? 'disabled' : ''}
      ${this.hasError ? 'has-error' : ''}
      ${this.classByChipStyle.get(this.chipStyle)}
      ${this.classBySize.get(this.size)}
      ${!this.showCheckmark && !this.imageUrl ? 'no-left-icon' : null}
      ${!this.showClose ? 'no-right-icon' : null}
    `;

    return (
      <div class={chipClass} onClick={this.disabled ? null : (event) => this.onChipClick(event)}>
        {
          this.imageUrl ? <img src={this.imageUrl}/> :
          this.showCheckmark ? <IconCheck size={'24'}></IconCheck> :
          null
        }
        <span>{this.value}</span>
        {
          this.showClose ? <IconRemove onClick={this.disabled ? null : (event) => this.onCloseClick(event)} size={'24'}></IconRemove> :
          null
        }
      </div>
    );
  }
}

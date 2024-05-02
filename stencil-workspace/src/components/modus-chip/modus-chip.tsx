// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Prop, h, EventEmitter, Event, Listen } from '@stencil/core';
import { IconRemove } from '../../icons/svgs/icon-remove';
import { IconCheck } from '../../icons/svgs/icon-check';

@Component({
  tag: 'modus-chip',
  styleUrl: 'modus-chip.scss',
  shadow: true,
})
export class ModusChip {
  /** (optional) The chip's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The chip's style. */
  @Prop() chipStyle: 'outline' | 'solid' = 'solid';

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
  @Prop() size: 'medium' | 'small' = 'medium';

  /** (optional) The chip's value. */
  @Prop() value: string;

  /** (optional) Maximum width for the Chip's text and shows ellipsis when truncated */
  @Prop() maxWidth: string;

  /** (optional) Whether the chip is active. */
  @Prop() active = false;

  /** An event that fires on chip click. */
  @Event() chipClick: EventEmitter;

  /** An event that fires on close icon click. */
  @Event() closeClick: EventEmitter;

  classByChipStyle: Map<string, string> = new Map([
    ['outline', 'style-outline'],
    ['solid', 'style-solid'],
  ]);
  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['small', 'small'],
  ]);

  @Listen('keyup')
  elementKeyupHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Escape':
        if (!this.showClose) {
          return;
        }

        this.closeClick.emit(event);
        break;
    }
  }

  @Listen('keydown')
  elementKeydownHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Enter':
        this.chipClick.emit(event);
        break;
    }
  }

  onChipClick(event: MouseEvent): void {
    if (event.defaultPrevented) {
      return;
    } // Don't emit chipClick if closeClick has emitted.

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
      ${this.active ? 'active' : ''}
    `;
    const style = {
      style: {
        'max-width': this.maxWidth ?? undefined,
      },
    };
    return (
      <button
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-label={this.ariaLabel || undefined}
        class={chipClass}
        onClick={this.disabled ? null : (event) => this.onChipClick(event)}
        tabIndex={0}
        type="button">
        {this.imageUrl ? (
          <img src={this.imageUrl} alt="" />
        ) : this.showCheckmark ? (
          <IconCheck size={'16'}></IconCheck>
        ) : null}
        <span {...style}>{this.value}</span>
        {this.showClose ? (
          <IconRemove onClick={this.disabled ? null : (event) => this.onCloseClick(event)} size={'16'}></IconRemove>
        ) : null}
      </button>
    );
  }
}

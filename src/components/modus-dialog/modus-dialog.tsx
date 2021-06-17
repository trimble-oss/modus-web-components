// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';
import { IconClose } from '../icons/icon-close';
import { generateRandomNumber } from '../../utils/utils';

@Component({
  tag: 'modus-dialog',
  styleUrl: 'modus-dialog.scss',
  shadow: true,
})
export class ModusDialog {
  /** (optional) The text to display in the header. */
  @Prop() headerText: string;

  /** (optional) The text to display in the primary button. */
  @Prop() primaryButtonText = 'Save Changes';

  /** (optional) The text to display in the secondary button. */
  @Prop() secondaryButtonText = 'Close';

  /** (optional) Whether to show the secondary button. */
  @Prop() showSecondaryButton = true;

  /** (optional) Whether to show the dialog. */
  @Prop({ mutable: true }) visible = false;

  /** (optional) An event that fires on close. */
  @Event() dialogClose: EventEmitter;

  /** (optional) An event that fires on primary button click. */
  @Event() primaryButtonClick: EventEmitter;

  /** (optional) An event that fires on secondary button click. */
  @Event() secondaryButtonClick: EventEmitter;

  accessibilityId: number;

  close(): void {
    this.visible = false;
    this.dialogClose.emit();
  }

  componentWillLoad(): void {
    this.accessibilityId = generateRandomNumber();
  }

  handleOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }

  render(): unknown {
    const overlayClass = `overlay ${this.visible ? 'visible' : ''}`;

    const dialogContent = `dialogContent${this.accessibilityId}`;
    const dialogTitle = `dialogTitle${this.accessibilityId}`;

    return (
      <div class={overlayClass} onClick={(event) => this.handleOverlayClick(event)}>
        <div class="dialog" role="dialog" aria-modal="true" aria-labelledby={dialogTitle} aria-describedby={dialogContent}>
          <div class="header">
            <span class="header-text" id={dialogTitle}>{this.headerText}</span>
            <IconClose size={'20'} onClick={() => this.close()} />
          </div>
          <div class="content" id={dialogContent}>
            <slot />
          </div>
          <div class="controls">
            {this.showSecondaryButton ? <modus-button onClick={() => this.secondaryButtonClick.emit()}>{this.secondaryButtonText}</modus-button> : null}
            <modus-button color="primary" onClick={() => this.primaryButtonClick.emit()}>{this.primaryButtonText}</modus-button>
          </div>
        </div>
      </div>
    );
  }
}

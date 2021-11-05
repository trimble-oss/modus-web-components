// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Method, Prop, State } from '@stencil/core';
import { IconClose } from '../icons/icon-close';

@Component({
  tag: 'modus-modal',
  styleUrl: 'modus-modal.scss',
  shadow: true,
})
export class ModusModal {
  /** (optional) The modal's primary button text. */
  @Prop() headerText: string;

  /** (optional) The modal's primary button text. */
  @Prop() primaryButtonText: string;

  /** (optional) The modal's secondary button text. */
  @Prop() secondaryButtonText: string;

  /** An event that fires on modal close.  */
  @Event() closed: EventEmitter;

  /** An event that fires on modal open.  */
  @Event() opened: EventEmitter;

  /** An event that fires on primary button click.  */
  @Event() primaryButtonClick: EventEmitter;

  /** An event that fires on secondary button click.  */
  @Event() secondaryButtonClick: EventEmitter;

  @Method()
  async close(): Promise<void> {
    this.visible = false;
    this.closed.emit();

    return Promise.resolve();
  }

  @Method()
  async open(): Promise<void> {
    this.visible = true;
    this.opened.emit();

    return Promise.resolve();
  }

  @State()
  visible: boolean;

  handleOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.close();
    }
  }

  render(): unknown {
    return (
      <div class={`modus-modal overlay ${this.visible ? 'visible' : 'hidden'}`} onClick={(event) => this.handleOverlayClick(event)}>
        <div class="content">
          <div class="header">
            {this.headerText}
            <div class="icon-close" onClick={() => this.close()} >
              <IconClose size="20"/>
            </div>
          </div>
          <div class="body">
            <slot />
          </div>
          <div class="footer">
            {this.secondaryButtonText &&
              <modus-button button-style="outline" color="secondary" onClick={() => this.secondaryButtonClick.emit()}>
                {this.secondaryButtonText}
              </modus-button>}
            {this.primaryButtonText &&
              <modus-button color="primary" onClick={() => this.primaryButtonClick.emit()}>
                {this.primaryButtonText}
              </modus-button>}
          </div>
        </div>
      </div>
    );
  }
}

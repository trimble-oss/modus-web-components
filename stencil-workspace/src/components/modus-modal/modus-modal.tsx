// eslint-disable-next-line
import { Component, Element, Event, EventEmitter, h, JSX, Listen, Method, Prop, State } from '@stencil/core';
import { IconClose } from '../icons/icon-close';
import { FocusTrap, FocusTrapping } from './modus-focus-trapping.util';

@Component({
  tag: 'modus-modal',
  styleUrl: 'modus-modal.scss',
  shadow: true,
})
export class ModusModal {
  /** Reference to host HTML element. */
  @Element() el: HTMLElement;

  /** (optional) The modal's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The modal's primary button text. */
  @Prop() headerText: string;

  /** (optional) The modal's primary button aria-label. */
  @Prop() primaryButtonAriaLabel: string | null;

  /** (optional) Disable primary button. */
  @Prop() primaryButtonDisabled: boolean;

  /** (optional) The modal's primary button text. */
  @Prop() primaryButtonText: string;

  /** (optional) The modal's secondary button aria-label. */
  @Prop() secondaryButtonAriaLabel: string | null;

  /** (optional) Disable secondary button. */
  @Prop() secondaryButtonDisabled: boolean;

  /** (optional) The modal's secondary button text. */
  @Prop() secondaryButtonText: string;

  /** (optional) The modal's z-index. */
  @Prop() zIndex = '1';

  /** An event that fires on modal close.  */
  @Event() closed: EventEmitter;

  /** An event that fires on modal open.  */
  @Event() opened: EventEmitter;

  /** An event that fires on primary button click.  */
  @Event() primaryButtonClick: EventEmitter;

  /** An event that fires on secondary button click.  */
  @Event() secondaryButtonClick: EventEmitter;

  ignoreOverlayClick = false;

  // A hidden element used to find the end of the Modal to prevent tabbing in the background
  startTrapRef: HTMLElement;
  focusTrapping: FocusTrapping;
  modalContentRef: HTMLDivElement;
  tabbableNodes: HTMLElement[];

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

  handleModalContentMouseDown(): void {
    // If Mouse was dragged off from the Modal content, ignore mouse up on overlay preventing Modal to close
    this.ignoreOverlayClick = true;
  }

  @Listen('keydown', { target: 'document' })
  documentKeyHandler(event: KeyboardEvent): void {
    if (event.code.toUpperCase() === 'ESCAPE') this.close();
  }

  handleOverlayClick(event: MouseEvent): void {
    if (this.ignoreOverlayClick || !(event.target as HTMLElement).classList.contains('overlay')) {
      this.ignoreOverlayClick = false;
      return;
    }

    this.close();
  }

  handlePrimaryKeydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Enter':
        this.primaryButtonClick.emit();
        break;
    }
  }

  handleSecondaryKeydown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Enter':
        this.secondaryButtonClick.emit();
        break;
    }
  }

  componentDidRender() {
    if (this.modalContentRef && this.startTrapRef)
      this.focusTrapping = new FocusTrapping(this.modalContentRef, this.startTrapRef);
  }

  renderModal(): JSX.Element[] {
    return (
      <div class="content" ref={(el) => (this.modalContentRef = el)} onMouseDown={() => this.handleModalContentMouseDown()}>
        <FocusTrap
          id="startTrap"
          ref={(el) => (this.startTrapRef = el)}
          onFocus={() => this.focusTrapping?.onStartTrapFocus()}></FocusTrap>
        {this.renderModalHeader()}
        <div class="body">
          <slot />
        </div>
        {this.renderModalFooter()}
        <FocusTrap id="endTrap" onFocus={() => this.focusTrapping?.onEndTrapFocus()}></FocusTrap>
      </div>
    );
  }

  renderModalHeader(): JSX.Element[] {
    return (
      <div class="header">
        {this.headerText}
        <div role="button" tabindex={0} aria-label="Close" onClick={() => this.close()}>
          <IconClose size="20" />
        </div>
      </div>
    );
  }

  renderModalFooter(): JSX.Element[] {
    return (
      <div class="footer">
        {this.secondaryButtonText && (
          <modus-button
            disabled={this.secondaryButtonDisabled}
            button-style="outline"
            color="secondary"
            ariaLabel={this.secondaryButtonAriaLabel}
            onClick={() => this.secondaryButtonClick.emit()}
            onKeyDown={(event) => this.handlePrimaryKeydown(event)}>
            {this.secondaryButtonText}
          </modus-button>
        )}
        {this.primaryButtonText && (
          <modus-button
            disabled={this.primaryButtonDisabled}
            color="primary"
            ariaLabel={this.primaryButtonAriaLabel}
            onClick={() => this.primaryButtonClick.emit()}
            onKeyDown={(event) => this.handleSecondaryKeydown(event)}>
            {this.primaryButtonText}
          </modus-button>
        )}
      </div>
    );
  }

  render(): unknown {
    return (
      <div
        aria-hidden={this.closed}
        aria-label={this.ariaLabel}
        class={`modus-modal overlay ${this.visible ? 'visible' : 'hidden'}`}
        onClick={(event) => this.handleOverlayClick(event)}
        role="dialog"
        style={{ zIndex: this.zIndex }}>
        {this.renderModal()}
      </div>
    );
  }
}

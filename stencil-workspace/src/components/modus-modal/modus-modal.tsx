// eslint-disable-next-line
import { Component, Element, Event, EventEmitter, h, JSX, Listen, Method, Prop, State } from '@stencil/core';
import { IconClose } from '../icons/icon-close';
import { FocusWrap, ModalFocusWrapping } from './modal-focus-wrapping';
import {ModusModalButtons} from "./modus-modal-button";

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

  /** The modal's footer buttons. */
  @Prop({ mutable: true }) buttons: ModusModalButtons;

  /** (optional) The modal's primary button text. */
  @Prop() headerText: string;

  /** (optional) The modal's z-index. */
  @Prop() zIndex = '1';

  /** (optional) The modal's backdrop. Specify 'static' for a backdrop that doesn't close the modal when clicked outside the modal content */
  @Prop() backdrop: 'default' | 'static' = 'default';

  /** An event that fires on modal close.  */
  @Event() closed: EventEmitter;

  /** An event that fires on modal open.  */
  @Event() opened: EventEmitter;

  /** An event that fires on primary button click.  */
  @Event() primaryButtonClick: EventEmitter;

  /** An event that fires on secondary button click.  */
  @Event() secondaryButtonClick: EventEmitter;

  /** An event that fires on outline button click.  */
  @Event() outlineButtonClick: EventEmitter;

  ignoreOverlayClick = false;

  // A hidden element used to find the end of the Modal to prevent tabbing in the background
  startTrapRef: HTMLElement;
  focusWrapping: ModalFocusWrapping;
  modalContentRef: HTMLDivElement;
  tabbableNodes: HTMLElement[];

  /** Closes the Modal */
  @Method()
  async close(): Promise<void> {
    this.visible = false;
    this.closed.emit();

    return Promise.resolve();
  }

  /** Opens the Modal */
  @Method()
  async open(): Promise<void> {
    this.visible = true;
    this.opened.emit();

    return Promise.resolve();
  }

  @State() visible: boolean;

  handleModalContentMouseDown(): void {
    // If Mouse was dragged off from the Modal content, ignore mouse up on overlay preventing Modal to close
    this.ignoreOverlayClick = true;
  }

  @Listen('keydown', { target: 'document' })
  documentKeyHandler(event: KeyboardEvent): void {
    if (event.code.toUpperCase() === 'ESCAPE') this.close();
  }

  handleOverlayClick(event: MouseEvent): void {
    switch (this.backdrop) {
      case 'static':
        return;
      case 'default':
        if (this.ignoreOverlayClick || !(event.target as HTMLElement).classList.contains('overlay')) {
          this.ignoreOverlayClick = false;
          return;
        }
        this.close();
    }
  }

  handleEnterKeydown(event: KeyboardEvent, callback: () => void): void {
    switch (event.code) {
      case 'Enter':
        callback();
        break;
    }
  }

  handleCloseKeydown(event: KeyboardEvent): void {
    this.handleEnterKeydown(event, () => this.close());
  }

  handleButtonKeyDown(event: KeyboardEvent, callback: () => void): void {
    this.handleEnterKeydown(event, callback);
  }

  componentDidRender() {
    if (this.modalContentRef && this.startTrapRef)
      this.focusWrapping = new ModalFocusWrapping(this.modalContentRef, this.startTrapRef);
  }

  renderModal(): JSX.Element[] {
    return (
      <div class="content" ref={(el) => (this.modalContentRef = el)} onMouseDown={() => this.handleModalContentMouseDown()}>
        <FocusWrap
          id="startTrap"
          ref={(el) => (this.startTrapRef = el)}
          onFocus={() => this.focusWrapping?.onStartWrapFocus()}></FocusWrap>
        {this.renderModalHeader()}
        <div class="body">
          <slot />
        </div>
        {this.renderModalFooter()}
        <FocusWrap id="endTrap" onFocus={() => this.focusWrapping?.onEndWrapFocus()}></FocusWrap>
      </div>
    );
  }

  renderModalHeader(): JSX.Element[] {
    return (
      <div class="header">
        {this.headerText}
        <div
          role="button"
          tabindex={0}
          aria-label="Close"
          onClick={() => this.close()}
          onKeyDown={(event) => this.handleCloseKeydown(event)}>
          <IconClose size="20" />
        </div>
      </div>
    );
  }

  renderModalFooter(): JSX.Element[] {
    const buttonEvents: Record<keyof ModusModalButtons, EventEmitter> = {
      outline: this.outlineButtonClick,
      secondary: this.secondaryButtonClick,
      primary: this.primaryButtonClick,
    };

    return (
      <div class="footer">
        {Object.keys(buttonEvents).map((key: keyof ModusModalButtons) => {
          const button = this.buttons[key];
          if (button?.text) {
            const eventEmitter = () => buttonEvents[key].emit();
            return (
              <modus-button
                disabled={button.disabled}
                color={key === 'outline' ? 'secondary' : key}
                button-style={key === 'outline' ? 'outline' : 'fill'}
                ariaLabel={button.ariaLabel}
                onButtonClick={eventEmitter}
                onKeyDown={(event) => this.handleButtonKeyDown(event, eventEmitter)}>
                {button.text}
              </modus-button>
            );
          }
        })}
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

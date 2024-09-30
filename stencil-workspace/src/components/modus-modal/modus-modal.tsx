// eslint-disable-next-line
import { Component, Element, Event, EventEmitter, h, JSX, Listen, Method, Prop, State } from '@stencil/core';
import { IconClose } from '../../icons/svgs/icon-close';
import { FocusWrap, ModalFocusWrapping } from './modal-focus-wrapping';
import { Fragment } from '@stencil/core/internal';
import { IconCollapse } from '../../icons/generated-icons/IconCollapse';
import { IconExpand } from '../../icons/generated-icons/IconExpand';

/**
 * @slot footerContent - Slot for a custom footer content
 */
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

  /** (optional) The modal's backdrop. Specify 'static' for a backdrop that doesn't close the modal when clicked outside the modal content */
  @Prop() backdrop: 'default' | 'static' = 'default';

  /** (optional) Show full screen toggle. */
  @Prop() showFullscreenToggle = false;

  /** (optional) The modal's full screen view. */
  @Prop({ mutable: true }) fullscreen = false;

  /** An event that fires on modal close.  */
  @Event() closed: EventEmitter;

  /** An event that fires on modal open.  */
  @Event() opened: EventEmitter;

  /** An event that fires on primary button click.  */
  @Event() primaryButtonClick: EventEmitter;

  /** An event that fires on secondary button click.  */
  @Event() secondaryButtonClick: EventEmitter;

  /** A state that checks if content is scrollable.  */
  @State() isContentScrollable = false;

  ignoreOverlayClick = false;

  // A hidden element used to find the end of the Modal to prevent tabbing in the background
  startTrapRef: HTMLElement;
  focusWrapping: ModalFocusWrapping;
  modalContentRef: HTMLDivElement;
  tabbableNodes: HTMLElement[];
  modalBodyRef: HTMLDivElement;
  resizeObserver: ResizeObserver;

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

  toggleFullscreen(): void {
    this.fullscreen = !this.fullscreen;
  }

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
    if (event.code === 'Enter') {
      callback();
    }
  }

  handlePrimaryClick(): void {
    if (!this.primaryButtonDisabled) {
      this.primaryButtonClick.emit();
    }
  }

  handleSecondaryClick(): void {
    if (!this.secondaryButtonDisabled) {
      this.secondaryButtonClick.emit();
    }
  }

  componentDidRender() {
    if (this.modalContentRef && this.startTrapRef) {
      this.focusWrapping = new ModalFocusWrapping(this.modalContentRef, this.startTrapRef);
    }
    if (this.modalBodyRef) {
      this.resizeObserver = new ResizeObserver(() => {
        this.checkContentScrollable();
      });
      this.resizeObserver.observe(this.modalBodyRef);
    }
    this.checkContentScrollable();
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  checkContentScrollable() {
    if (this.modalContentRef) {
      this.isContentScrollable = this.modalBodyRef.scrollHeight > this.modalBodyRef.clientHeight;
    }
  }

  renderModal(): JSX.Element[] {
    return (
      <div class="content" ref={(el) => (this.modalContentRef = el)} onMouseDown={() => this.handleModalContentMouseDown()}>
        <FocusWrap
          id="startTrap"
          ref={(el) => (this.startTrapRef = el)}
          onFocus={() => this.focusWrapping?.onStartWrapFocus()}></FocusWrap>
        {this.renderModalHeader()}
        <div class="body" ref={(el) => (this.modalBodyRef = el)}>
          <slot />
        </div>
        {this.renderModalFooter()}
        <FocusWrap id="endTrap" onFocus={() => this.focusWrapping?.onEndWrapFocus()}></FocusWrap>
      </div>
    );
  }

  renderModalHeader(): JSX.Element[] {
    return (
      <header class={{ scrollable: this.isContentScrollable }}>
        {this.headerText}
        <div class="header-buttons">
          {this.showFullscreenToggle && (
            <div
              role="button"
              tabindex={0}
              aria-label={this.fullscreen ? 'Collapse' : 'Expand'}
              onClick={() => this.toggleFullscreen()}
              onKeyDown={(event) => this.handleEnterKeydown(event, () => this.toggleFullscreen())}>
              {this.fullscreen ? <IconCollapse size="24" /> : <IconExpand size="24" />}
            </div>
          )}
          <div
            role="button"
            tabindex={0}
            aria-label="Close"
            onClick={() => this.close()}
            onKeyDown={(event) => this.handleEnterKeydown(event, () => this.close())}>
            <IconClose size="24" />
          </div>
        </div>
      </header>
    );
  }

  renderModalFooter(): JSX.Element[] {
    return (
      <Fragment>
        <footer
          class={{
            'has-buttons': Boolean(this.primaryButtonText || this.secondaryButtonText),
            scrollable: this.isContentScrollable,
          }}>
          {this.secondaryButtonText && (
            <modus-button
              disabled={this.secondaryButtonDisabled}
              button-style="outline"
              color="secondary"
              ariaLabel={this.secondaryButtonAriaLabel}
              onButtonClick={() => this.handleSecondaryClick()}>
              {this.secondaryButtonText}
            </modus-button>
          )}
          {this.primaryButtonText && (
            <modus-button
              disabled={this.primaryButtonDisabled}
              color="primary"
              ariaLabel={this.primaryButtonAriaLabel}
              onButtonClick={() => this.handlePrimaryClick()}>
              {this.primaryButtonText}
            </modus-button>
          )}
          <slot name="footerContent"></slot>
        </footer>
      </Fragment>
    );
  }

  render(): unknown {
    return (
      <div
        aria-hidden={this.visible ? undefined : 'true'}
        aria-label={this.visible ? this.ariaLabel || undefined : undefined}
        aria-modal={this.visible ? 'true' : undefined}
        class={`modus-modal ${this.fullscreen ? 'fullscreen' : ''} overlay ${this.visible ? 'visible' : 'hidden'}`}
        onClick={(event) => this.handleOverlayClick(event)}
        role={this.visible ? 'dialog' : undefined}
        style={{ zIndex: this.zIndex }}>
        {this.renderModal()}
      </div>
    );
  }
}

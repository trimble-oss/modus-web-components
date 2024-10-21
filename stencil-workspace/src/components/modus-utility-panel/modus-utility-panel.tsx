// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Prop, Element, Event, EventEmitter, Watch, h, Fragment } from '@stencil/core';

@Component({
  tag: 'modus-utility-panel',
  styleUrl: 'modus-utility-panel.scss',
  shadow: true,
})
export class ModusUtilityPanel {
  /** The panel is expanded or closed */
  @Prop() expanded = false;

  /** Determines if the panel pushes content or displays an overlay. */
  @Prop() pushContent = false;

  @Prop() targetContent: string;

  /** An event that fires when the panel is opened. */
  @Event() panelOpened: EventEmitter<void>;

  /** An event that fires when the panel is closed. */
  @Event() panelClosed: EventEmitter<void>;

  @Element() el: HTMLElement;

  @Watch('expanded')
  handleExpandedChange(newValue: boolean) {
    if (newValue) {
      this.openPanel();
    } else {
      this.closePanel();
    }
  }

  async openPanel(): Promise<void> {
    this.panelOpened.emit();
    if (this.pushContent) {
      this.adjustContent();
    }
  }

  async closePanel(): Promise<void> {
    this.panelClosed.emit();
    if (this.pushContent) {
      this.adjustContent();
    }
  }

  adjustContent() {
    const content = document.querySelector(this.targetContent) as HTMLElement;

    if (content) {
      content.style.transition = 'margin-right 0.2s ease-out';
      if (this.expanded) {
        content.style.marginRight = '312px';
      } else {
        content.style.marginRight = '0';
      }
    }
  }

  handlePanelClose = () => {
    this.closePanel();
  };
  hasSlotContent(slotName: string): boolean {
    const slot = this.el.querySelector(`[slot="${slotName}"]`);
    return !!slot;
  }
  render() {
    const hasHeader = this.hasSlotContent('header');
    const hasFooter = this.hasSlotContent('footer');
    return (
      <div class={{ 'utility-panel': true, open: this.expanded, overlay: !this.pushContent }}>
        <div class="panel-content">
          {hasHeader && (
            <Fragment>
              <div class="panel-header" aria-labelledby="header">
                <slot name="header"></slot>
              </div>
              <hr />
            </Fragment>
          )}

          <div class="panel-body" aria-labelledby="body">
            <slot name="body"></slot>
          </div>

          {hasFooter && (
            <Fragment>
              <hr />
              <div class="panel-footer" aria-labelledby="footer">
                <slot name="footer"></slot>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

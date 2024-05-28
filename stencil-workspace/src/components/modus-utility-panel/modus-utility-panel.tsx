import { Component, Prop, Event, EventEmitter, h, Watch } from '@stencil/core';

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

  render() {
    return (
      <div class={{ 'utility-panel': true, open: this.expanded, overlay: !this.pushContent }}>
        <div class="panel-content">
          <div class="panel-header">
            <slot name="header"></slot>
          </div>
          <hr />
          <div class="panel-body">
            <slot name="body"></slot>
          </div>
          <hr />
          <div class="panel-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    );
  }
}

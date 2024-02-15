import {
  Component,
  Prop,
  State,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Element,
  Listen,
  Event,
  EventEmitter,
} from '@stencil/core';
import { createPopper, Instance } from '@popperjs/core';

export interface ModusActionBarOptions {
  id: string;
  icon: string;
  label: string;
}

@Component({
  tag: 'modus-action-bar',
  styleUrl: 'modus-action-bar.scss',
  shadow: true,
})
export class ModusActionBar {
  overflowButtonElement: HTMLElement;
  overflowMenuElement: HTMLElement;
  popperInstance: Instance;

  @Element() el: HTMLElement;

  @State() showOverflowMenu = false;

  /** (optional) List of actions */
  @Prop({ mutable: true }) actions: ModusActionBarOptions[];

  /** (optional) The size of the action items. */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** (optional) Total number of icons to show */
  @Prop() visibleItemCount = 3;

  /** (optional) An event that fires on action item click. */
  @Event() actionBarClick: EventEmitter;

  componentWillLoad() {
    this.processChildren();
  }

  componentDidRender() {
    this.initializePopper();
  }

  @Listen('focusin', { target: 'document' })
  @Listen('mouseup', { target: 'document' })
  handleGlobalFocus(event: any) {
    const isMoreVerticalBtnTarget = event.target.localName === 'modus-tree-view-item';

    // Check if the focus is moving outside the component and if not clicked on the ellipsis button.
    if (!this.el.contains(event.target as Node) && !isMoreVerticalBtnTarget  && this.showOverflowMenu) {
      this.closeOverflowMenu();
    }
  }

  processChildren() {
    const actionItemsChildren = this.el.querySelectorAll('modus-action-item');

    if (actionItemsChildren.length > 0) {
      const actionItems = Array.from(actionItemsChildren);

      this.actions = actionItems.map((item) => ({
        id: item.getAttribute('id'),
        icon: item.getAttribute('icon'),
        label: item.textContent.trim(),
      }));
    }
  }

  initializePopper() {
    this.popperInstance = createPopper(this.overflowButtonElement, this.overflowMenuElement, {
      placement: 'bottom-end',
    });
  }

  handleKeyDown(event, action) {
    if (event && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.handleButtonClick(action);
  }

  handleButtonClick(action) {
    this.actionBarClick.emit({ actionId: action.id });
    if (this.showOverflowMenu) {
      this.closeOverflowMenu();
    }
  }

  toggleOverflowMenu() {
    this.showOverflowMenu = !this.showOverflowMenu;

    if (this.showOverflowMenu) {
      this.popperInstance.update();
    }
  }

  closeOverflowMenu() {
    this.showOverflowMenu = false;
  }

  render() {
    const visibleActions =
      this.actions.length > this.visibleItemCount ? this.actions.slice(0, this.visibleItemCount - 1) : this.actions;
    const overflowActions =
      this.actions.length > this.visibleItemCount ? this.actions.slice(this.visibleItemCount - 1) : null;

    return (
      <div class="modus-action-bar">
        {visibleActions.map((action) => (
          <modus-tooltip text={action.label}>
            <modus-button
              icon-only={action.icon}
              buttonStyle="borderless"
              color="secondary"
              size={this.size}
              onClick={() => this.handleButtonClick(action)}
              onKeyDown={(event) => this.handleKeyDown(event, action)}>
              {action.label}
            </modus-button>
          </modus-tooltip>
        ))}

        {this.actions.length > this.visibleItemCount && (
          <modus-button
            ref={(el) => (this.overflowButtonElement = el)}
            icon-only="more_vertical"
            buttonStyle="borderless"
            color="secondary"
            size={this.size}
            onClick={() => this.toggleOverflowMenu()}></modus-button>
        )}

        {this.showOverflowMenu && (
          <div
            style={{ width: '200px', display: this.showOverflowMenu ? 'block' : 'none' }}
            class="overflow-menu"
            ref={(el) => (this.overflowMenuElement = el)}>
            <modus-list>
              {overflowActions.map((action) => (
                <modus-list-item
                  size={this.size === 'small' ? 'condensed' : 'standard'}
                  onClick={() => this.handleButtonClick(action)}
                  onKeyDown={(event) => this.handleKeyDown(event, action)}
                  leftIcon={action.icon}>
                  {action.label}
                </modus-list-item>
              ))}
            </modus-list>
          </div>
        )}
      </div>
    );
  }
}

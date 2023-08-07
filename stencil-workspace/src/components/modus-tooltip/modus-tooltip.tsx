// eslint-disable-next-line
import { Component, Element, Fragment, h, Prop, Watch } from '@stencil/core';
import { createPopper, Instance } from '@popperjs/core';

type ToolTipPlacement = 'bottom' | 'left' | 'right' | 'top' | 'auto';

@Component({
  tag: 'modus-tooltip',
  styleUrl: 'modus-tooltip.scss',
  shadow: true,
})
export class ModusTooltip {
  @Element() element: HTMLElement;
  /** (optional) The tooltip's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The tooltip's position relative to its content. */
  @Prop() position: ToolTipPlacement = 'top';
  @Watch('position')
  handlePositionChange(newValue: ToolTipPlacement) {
    const target = this.element.firstElementChild;
    if (target && this.tooltipRef) {
      if (this.popperInstance) {
        this.popperInstance.setOptions((options) => ({
          ...options,
          placement: newValue,
          modifiers: [...options.modifiers],
        }));
      } else this.initializePopper(target, this.tooltipRef, newValue);
    }
  }

  /** The tooltip's text. */
  @Prop() text: string;

  /** Hide the tooltip */
  @Prop() disabled: boolean;

  private popperInstance: Instance;
  private tooltipRef: HTMLDivElement;
  private readonly showEvents = ['mouseenter', 'focus'];
  private readonly hideEvents = ['mouseleave', 'blur', 'click'];
  private showEventsListener = () => this.show();
  private hideEventsListener = () => this.hide();

  componentDidLoad(): void {
    const target = this.element.firstElementChild;
    if (target && this.tooltipRef) {
      this.initializePopper(target, this.tooltipRef, this.position);

      this.showEvents.forEach((event) => {
        target.addEventListener(event, this.showEventsListener);
      });

      this.hideEvents.forEach((event) => {
        target.addEventListener(event, this.hideEventsListener);
      });
    }
  }

  disconnectedCallback(): void {
    const target = this.element.firstElementChild;
    if (target) {
      this.showEvents.forEach((event) => {
        target.removeEventListener(event, this.showEventsListener);
      });

      this.hideEvents.forEach((event) => {
        target.removeEventListener(event, this.hideEventsListener);
      });
    }
  }

  initializePopper(target: Element, toolTip: HTMLDivElement, position: ToolTipPlacement): void {
    this.popperInstance = createPopper(target, toolTip, {
      placement: position,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  }

  show(): void {
    if (this.popperInstance) {
      // Make the tooltip visible
      this.tooltipRef.setAttribute('data-show', '');

      // Enable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }],
      }));

      // Update its position
      this.popperInstance.update();
    }
  }

  hide(): void {
    if (this.popperInstance) {
      // Hide the tooltip
      this.tooltipRef.removeAttribute('data-show');

      // Disable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
      }));
    }
  }

  render(): unknown {
    const showTooltip = !this.disabled && this.text;
    return (
      <Fragment>
        <slot />
        {showTooltip && (
          <div tabIndex={-1} class="tooltip" ref={(el) => (this.tooltipRef = el)} aria-label={this.ariaLabel} role="tooltip">
            {this.text}
            <div id="arrow" data-popper-arrow></div>
          </div>
        )}
      </Fragment>
    );
  }
}

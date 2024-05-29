// eslint-disable-next-line
import { Component, Element, Fragment, h, Prop, Watch } from '@stencil/core';
import { createPopper, Instance } from '@popperjs/core';
import { ModusToolTipPlacement } from './modus-tooltip.models';

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
  @Prop() position: ModusToolTipPlacement = 'top';
  @Watch('position')
  handlePositionChange(newValue: ModusToolTipPlacement) {
    if (this.popperInstance) {
      this.popperInstance.setOptions((options) => ({
        ...options,
        placement: newValue,
        modifiers: [...options.modifiers],
      }));
    } else this.initializePopper(newValue);
  }

  /** The tooltip's text. */
  @Prop() text: string;
  @Watch('text') onTextChange(newValue: string) {
    if (newValue?.length > 1) {
      this.initializePopper(this.position);
    } else {
      this.cleanupPopper();
    }
  }

  /** Hide the tooltip */
  @Prop() disabled: boolean;
  @Watch('disabled') onDisabledChange(newValue: boolean) {
    if (!newValue) {
      this.initializePopper(this.position);
    } else {
      this.cleanupPopper();
    }
  }

  private popperInstance: Instance;
  private tooltipElement: HTMLDivElement;
  private readonly showEvents = ['mouseenter', 'mouseover', 'focus'];
  private readonly hideEvents = ['mouseleave', 'blur', 'click'];
  private hoverTimer: number | undefined;

  private showEventsListener = () => {
    window.clearTimeout(this.hoverTimer);
    this.hoverTimer = window.setTimeout(() => {
      this.show();
    }, 500);
  };

  private hideEventsListener = () => {
    this.hide();
    window.clearTimeout(this.hoverTimer);
    this.hoverTimer = undefined;
  };

  componentDidLoad(): void {
    this.tooltipElement = this.element.shadowRoot.querySelector('.tooltip') as HTMLDivElement;
    if (!this.disabled && this.text?.length > 1) {
      this.initializePopper(this.position);
    }
  }

  disconnectedCallback(): void {
    this.cleanupPopper();
    window.clearTimeout(this.hoverTimer);
  }

  initializePopper(position: ModusToolTipPlacement): void {
    if (this.popperInstance) {
      this.cleanupPopper();
    }

    const target = this.element.firstElementChild;
    if (!target || !this.tooltipElement) return;

    this.popperInstance = createPopper(target, this.tooltipElement, {
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

    this.showEvents.forEach((event) => {
      target.addEventListener(event, this.showEventsListener);
    });

    this.hideEvents.forEach((event) => {
      target.addEventListener(event, this.hideEventsListener);
    });
  }

  cleanupPopper(): void {
    const target = this.element.firstElementChild;
    if (target) {
      this.showEvents.forEach((event) => {
        target.removeEventListener(event, this.showEventsListener);
      });

      this.hideEvents.forEach((event) => {
        target.removeEventListener(event, this.hideEventsListener);
      });
    }

    this.popperInstance?.destroy();
    this.popperInstance = null;
  }

  show(): void {
    if (this.popperInstance) {
      // Make the tooltip visible
      this.tooltipElement.setAttribute('data-show', '');

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
      this.tooltipElement.removeAttribute('data-show');

      // Disable the event listeners
      this.popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }],
      }));
    }
  }

  render(): unknown {
    const hidden = this.disabled || !(this.text?.length > 1);
    return (
      <Fragment>
        <slot />
        <div tabIndex={-1} class={{ tooltip: true, hide: hidden }} aria-label={this.ariaLabel || undefined} role="tooltip">
          {this.text}
          <div id="arrow" data-popper-arrow></div>
        </div>
      </Fragment>
    );
  }
}

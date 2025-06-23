// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { generateElementId } from '../../utils/utils';
import { IconExpandMoreCircle } from '../../icons/generated-icons/IconExpandMoreCircle';
import { IconExpandMore } from '../../icons/generated-icons/IconExpandMore';
import { ModusIconMap } from '../../icons/ModusIconMap';
import { JSX } from '@stencil/core/internal';

@Component({
  tag: 'modus-accordion-item',
  styleUrl: 'modus-accordion-item.scss',
  shadow: true,
})
export class ModusAccordionItem {
  /** (optional) Disables the accordion item, locks expand/collapse. */
  @Prop() disabled: boolean;

  /** (optional) The type of expand button */
  @Prop() expandButtonType: 'standardArrow' | 'circleArrow' = 'standardArrow';

  /** (optional) Whether the accordion item is expanded. */
  @Prop({ mutable: true }) expanded: boolean;

  /** (required) The text to render in the header. */
  @Prop() headerText: string;

  /** (optional) The icon to display before the header text. */
  @Prop() icon: string;

  /** (optional) The supportingLabel of the accordion. */
  @Prop() supportingLabel: string;

  /** (optional) The size of accordion item. */
  @Prop() size: 'condensed' | 'standard' = 'standard';

  /** An event that fires on every accordion close.  */
  @Event() closed: EventEmitter;

  /** An event that fires on every accordion open.  */
  @Event() opened: EventEmitter;

  private expandedContentId = generateElementId() + '_accordion-item';

  classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
  ]);

  accordionBodyRef: HTMLDivElement;
  accordionOpenTimeout;
  accordionCloseTimeout;
  chevronContainerRef: HTMLDivElement;
  contentObserver: MutationObserver;
  resizeObserver: ResizeObserver;

  componentDidLoad() {
    // Initialize MutationObserver to detect DOM change
    this.contentObserver = new MutationObserver(() => this.onContentChange());
    this.contentObserver.observe(this.accordionBodyRef, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });

    // Initialize ResizeObserver for more reliable size change detection
    this.resizeObserver = new ResizeObserver(() => this.onContentChange());
    this.resizeObserver.observe(this.accordionBodyRef.querySelector('.body-content'));

    // Set initial height if expanded
    if (this.expanded) {
      this.adjustHeight();
    }
  }

  disconnectedCallback() {
    if (this.contentObserver) {
      this.contentObserver.disconnect();
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.accordionOpenTimeout) {
      clearTimeout(this.accordionOpenTimeout);
    }

    if (this.accordionCloseTimeout) {
      clearTimeout(this.accordionCloseTimeout);
    }
  }

  onContentChange(): void {
    if (this.expanded && this.accordionBodyRef) {
      this.adjustHeight();
    }
  }

  adjustHeight(): void {
    requestAnimationFrame(() => {
      if (this.accordionBodyRef && this.expanded && !this.accordionBodyRef.classList.contains('collapsing')) {
        const currentHeight = this.accordionBodyRef.scrollHeight;
        this.accordionBodyRef.style.height = `${currentHeight}px`;
      }
    });
  }

  handleHeaderClick(): void {
    if (this.disabled) {
      return;
    }

    this.chevronContainerRef.classList.toggle('reverse');

    if (!this.expanded) {
      this.accordionBodyRef.classList.remove('collapse');
      this.accordionBodyRef.classList.add('collapsing');
      this.accordionBodyRef.style.height = '0';

      this.reflow(this.accordionBodyRef);

      requestAnimationFrame(() => {
        const scrollHeight = this.accordionBodyRef.scrollHeight;
        this.accordionBodyRef.style.height = `${scrollHeight}px`;

        this.accordionOpenTimeout = setTimeout(() => {
          if (this.accordionBodyRef) {
            this.accordionBodyRef.classList.remove('collapsing');
            this.accordionBodyRef.classList.add('show');
            this.accordionBodyRef.classList.add('collapse');
            this.accordionBodyRef.style.height = '';

            this.expanded = true;
            this.opened.emit();
          }
        }, 350);
      });
    } else {
      const currentHeight = this.accordionBodyRef.getBoundingClientRect().height;
      this.accordionBodyRef.style.height = `${currentHeight}px`;
      this.reflow(this.accordionBodyRef);

      this.accordionBodyRef.classList.add('collapsing');
      this.accordionBodyRef.classList.remove('collapse', 'show');

      requestAnimationFrame(() => {
        this.accordionBodyRef.style.height = '0';

        this.accordionCloseTimeout = setTimeout(() => {
          if (this.accordionBodyRef) {
            this.accordionBodyRef.classList.remove('collapsing');
            this.accordionBodyRef.classList.add('collapse');
            this.accordionBodyRef.style.height = '';

            this.expanded = false;
            this.closed.emit();
          }
        }, 350);
      });
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }

    this.handleHeaderClick();
  }

  // Trick to restart an element's animation
  // see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
  // taken from: https://getbootstrap.com/docs/5.3/dist/js/bootstrap.js
  reflow = (element) => {
    element.offsetHeight; // eslint-disable-line no-unused-expressions
  };

  renderIcon(): JSX.Element {
    const iconSize = this.size === 'condensed' ? '20' : '24';
    return (
      <span class="icon">
        <ModusIconMap icon={this.icon} size={iconSize}></ModusIconMap>
      </span>
    );
  }

  render(): unknown {
    const sizeClass = `${this.classBySize.get(this.size)}`;
    const disabledClass = `${this.disabled ? 'disabled' : ''}`;
    const expandedClass = `${this.expanded ? 'expanded' : ''}`;
    const bodyClass = `body ${sizeClass} collapse${this.expanded ? ' show' : ''}`;
    const headerClass = `header ${sizeClass} ${disabledClass} ${expandedClass}`;
    const expandIconSize = this.size === 'condensed' ? '20' : '24';

    return (
      <div
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-expanded={this.expanded ? 'true' : undefined}
        class="accordion-item">
        <div
          class={headerClass}
          role="button"
          aria-expanded={this.expanded ? 'true' : 'false'}
          aria-controls={this.expandedContentId}
          onClick={() => this.handleHeaderClick()}
          onKeyDown={(event) => this.handleKeydown(event)}
          tabIndex={this.disabled ? -1 : 0}>
          {this.icon ? this.renderIcon() : null}
          <div class="label-container">
            <span class="title">{this.headerText}</span>
            {this.supportingLabel && <span class="supporting-label">{this.supportingLabel}</span>}
          </div>
          {
            <div
              class={`chevron-container ${this.expanded ? 'reverse' : ''} `}
              ref={(el) => (this.chevronContainerRef = el)}>
              {this.expandButtonType == 'circleArrow' ? (
                <IconExpandMoreCircle size={expandIconSize}></IconExpandMoreCircle>
              ) : (
                <IconExpandMore size={expandIconSize}></IconExpandMore>
              )}
            </div>
          }
        </div>
        <div id={this.expandedContentId} class={bodyClass} ref={(el) => (this.accordionBodyRef = el)}>
          <div class="body-content">
            <slot />
          </div>
        </div>
      </div>
    );
  }
}

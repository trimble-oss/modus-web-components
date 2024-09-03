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

  handleHeaderClick(): void {
    if (this.disabled) {
      return;
    }
    this.chevronContainerRef.classList.toggle('reverse');

    // Logic to trigger a transition animation and handle it
    // Because transition won't have any effect when using 'display:' on an element
    if (!this.expanded) {
      this.accordionBodyRef.classList.remove('collapse');
      this.accordionBodyRef.classList.add('collapsing');

      // Required to calculate scrollHeight and set the value on 'height' for transition to start
      this.accordionBodyRef.style.height = '0';

      // Timeout to reset collapsing class
      this.accordionOpenTimeout = setTimeout(() => {
        this.accordionBodyRef.classList.remove('collapsing');
        this.accordionBodyRef.classList.add('show');
        this.accordionBodyRef.classList.add('collapse');

        // reset height to original state
        // this.accordionBodyRef.style.height = '';

        clearTimeout(this.accordionOpenTimeout);
        this.expanded = true;
        this.opened.emit();
      }, 350);

      // Triggers transition
      this.accordionBodyRef.style.height = `${this.accordionBodyRef.scrollHeight}px`;
    } else {
      this.accordionBodyRef.style.height = `${this.accordionBodyRef.getBoundingClientRect().height}px`;
      this.reflow(this.accordionBodyRef);

      this.accordionBodyRef.classList.add('collapsing');
      this.accordionBodyRef.classList.remove('collapse');
      this.accordionBodyRef.classList.remove('show');

      // Timeout to reset collapsing class
      this.accordionCloseTimeout = setTimeout(() => {
        this.accordionBodyRef.classList.remove('collapsing');
        this.accordionBodyRef.classList.add('collapse');

        clearTimeout(this.accordionCloseTimeout);
        this.expanded = false;
        this.closed.emit();
      }, 350);

      this.accordionBodyRef.style.height = '';
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
    return (
      <span class="icon">
        <ModusIconMap icon={this.icon}></ModusIconMap>
      </span>
    );
  }

  render(): unknown {
    const sizeClass = `${this.classBySize.get(this.size)}`;
    const disabledClass = `${this.disabled ? 'disabled' : ''}`;
    const expandedClass = `${this.expanded ? 'expanded' : ''}`;
    const bodyClass = `body ${sizeClass} collapse${this.expanded ? ' show' : ''}`;
    const headerClass = `header ${sizeClass} ${disabledClass} ${expandedClass}`;

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
          <span class="title">{this.headerText}</span>
          {
            <div
              class={`chevron-container ${this.expanded ? 'reverse' : ''} `}
              ref={(el) => (this.chevronContainerRef = el)}>
              {this.expandButtonType == 'circleArrow' ? (
                <IconExpandMoreCircle size="24"></IconExpandMoreCircle>
              ) : (
                <IconExpandMore size="24"></IconExpandMore>
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

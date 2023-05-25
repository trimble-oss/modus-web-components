// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter, State, Element, Listen } from '@stencil/core';

@Component({
  tag: 'modus-dropdown',
  styleUrl: 'modus-dropdown.scss',
  shadow: true,
})
export class ModusDropdown {
  /** Reference to host HTML element. */
  @Element() el: HTMLElement;

  /** Whether to apply list opening animation. */
  @Prop() animateList = false;

  /** (optional) The dropdown's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) Determines custom dropdown placement offset. */
  @Prop() customPlacement: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };

  /** (optional) Disables the dropdown. */
  @Prop() disabled: boolean; // TODO

  /** (optional) The placement of the dropdown in related to the toggleElement. */
  @Prop() placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

  /** (required) The element id that the list renders near and that triggers the toggling of the list. */
  @Prop() toggleElementId: string;

  /** An event that fires on dropdown close. */
  @Event() dropdownClose: EventEmitter;

  @State() visible: boolean;

  classByPlacement: Map<string, string> = new Map([
    ['top', 'top'],
    ['right', 'right'],
    ['bottom', 'bottom'],
    ['left', 'left'],
  ]);
  toggleElement: HTMLElement;

  componentDidRender(): void {
    this.toggleElement = this.el.querySelector(`#${this.toggleElementId}`);
    if (!this.toggleElement) {
      throw Error('matching element not found for toggle-element-id');
    }
  }

  @Listen('click', { target: 'document' })
  documentClickHandler(event: MouseEvent): void {
    // Close the dropdown when click is outside the current element.
    if (event.defaultPrevented || (event.target as HTMLElement).closest(`#${this.toggleElementId}`)) {
      return;
    }

    this.visible = false;
    this.dropdownClose.emit();
  }

  handleDropdownClick(event: MouseEvent): void {
    if (!event.defaultPrevented) {
      document.body.click(); // Simulate document click to handle closing other dropdowns.
      if ((event.target as HTMLElement).closest(`#${this.toggleElementId}`)) {
        this.visible = !this.visible;
      } else {
        this.visible = false;
      }

      if (!this.visible) {
        this.dropdownClose.emit();
      }

      event.preventDefault();
    }
  }

  render(): unknown {
    const listContainerClass = `dropdown-list ${this.visible ? 'visible' : 'hidden'} ${
      this.animateList ? 'animate-list' : ''
    } ${this.classByPlacement.get(this.placement)}`;
    const left = this.placement === 'right' ? `${this.toggleElement?.offsetWidth}px` : 'unset';
    const width = `${this.toggleElement?.offsetWidth ? this.toggleElement?.offsetWidth : 0}px`;

    return (
      <div aria-label={this.ariaLabel} class="dropdown" role="listbox" onClick={(event) => this.handleDropdownClick(event)}>
        <slot name="dropdownToggle" />
        <div
          class={listContainerClass}
          style={{
            top: this.customPlacement?.top ? `${this.customPlacement?.top}px` : '',
            right: this.customPlacement?.right ? `${this.customPlacement?.right}px` : '',
            left: this.customPlacement?.left ? `${this.customPlacement?.left}px` : left,
            bottom: this.customPlacement?.bottom ? `${this.customPlacement?.bottom}px` : '',
            'min-width': width,
          }}>
          <slot name="dropdownList" />
        </div>
      </div>
    );
  }
}

import {
  Component,
  Prop,
  Listen,
  State,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Element,
} from '@stencil/core';
import { IconHorizontalEllipsis } from '../../../../icons/icon-horizontal-ellipsis';
import { EnterKey, EscapeKey, SpaceKey } from '../../../constants/constants';
import { Table } from '@tanstack/table-core';
import ModusTablePanelOptions from '../../../models/modus-table-panel-options';

@Component({
  tag: 'modus-table-dropdown-menu',
  styleUrl: './modus-table-dropdown-menu.scss',
  shadow: true,
})
export class ModusTableDropdownMenu {
  @Element() element: HTMLElement; // Remove if not utilized

  /** Table data. */
  @Prop() table: Table<unknown>;

  /** dropdown menu options. */
  @Prop() options: ModusTablePanelOptions;

  /** Dropdown visibility state */
  @State() show = false;

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent): void {
    // Closing the dropdown when click outside
    const withinBoundaries: EventTarget[] = event.composedPath();
    if (!withinBoundaries.find((item) => item['className'] === 'dropdown-menu-container')) {
      this.show = false;
    }

    // Another logic to handle click outside
    // TODO: decide it to keep it if works
    // if (
    //     this.element.contains(event.target as HTMLElement) ||
    //     event.defaultPrevented
    //   ) {
    //     return;
    //   }
    //   // Collapse when clicked outside
    //    this.show = false;
  }

  menuIconContainerRef: HTMLDivElement;

  handleIconKeyDown(event: KeyboardEvent) {
    const eventKey = event.key.toLowerCase();
    if (eventKey === EnterKey || eventKey === SpaceKey) {
      this.show = true;
      event.preventDefault();
    } else if (eventKey === EscapeKey) {
      this.show = false;
      event.preventDefault();
    }
  }

  handleDropdownKeyDown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === EscapeKey) {
      this.show = false;
      this.menuIconContainerRef.focus();
      event.preventDefault();
    }
  }

  render(): void {
    return (
      <div class="dropdown-menu-container">
        <div
          tabIndex={0}
          class="dropdown-menu-icon"
          onClick={() => (this.show = !this.show)}
          onKeyDown={(event) => this.handleIconKeyDown(event)}
          ref={(el) => (this.menuIconContainerRef = el as HTMLDivElement)}>
          <IconHorizontalEllipsis size="20" />
        </div>
        <div onKeyDown={(event) => this.handleDropdownKeyDown(event)} class={`dropdown-menu ${this.show ? 'visible' : ''}`}>
          <modus-table-columns-visibility
            table={this.table}
            columnsVisibility={this.options?.columnsVisibility}
            showDropdown={this.show}
            menuIconContainerRef={this.menuIconContainerRef}
            toggleDropdown={(show: boolean) => (this.show = show)}
          />
        </div>
      </div>
    );
  }
}

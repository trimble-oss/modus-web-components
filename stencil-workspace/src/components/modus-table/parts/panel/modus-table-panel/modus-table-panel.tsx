import {
  Component,
  Host,
  Prop,
  Listen,
  State,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableDropdownMenu } from '../modus-table-dropdown-menu';
import { Table } from '@tanstack/table-core';
import { ModusTablePanelOptions } from '../../../models';
@Component({
  tag: 'modus-table-panel',
  styleUrl: './modus-table-panel.scss',
  shadow: true,
})
export class ModusTablePanel {
  /** Table data. */
  @Prop() table: Table<unknown>;

  /** (Optional) To display a panel options, which allows access to table operations like hiding columns. */
  @Prop() panelOptions: ModusTablePanelOptions;

  /** Dropdown visibility state */
  @State() showDropdownMenu = false;

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent): void {
    // Closing the dropdown when click outside
    const withinBoundaries: EventTarget[] = event.composedPath();
    if (!withinBoundaries.find((item) => item['className'] === 'dropdown-menu-container')) {
      this.showDropdownMenu = false;
    }
    event.preventDefault();
  }

  render(): void {
    // Dropdown enableMenu will be shown only if any of its features are active.
    // ex: const enableMenu = this.columnVisibility || feature;
    const enableMenu = this.panelOptions.columnVisibility;
    const menuOptions = {
      columnVisibility: this.panelOptions.columnVisibility || null,
    };
    return (
      <Host>
        <div class="table-panel">
          <div class="panel-section">
            <slot name="left-section" />
          </div>
          <div class="panel-section">
            <slot name="right-section" />
            {enableMenu && (
              <ModusTableDropdownMenu
                table={this.table}
                options={menuOptions}
                show={this.showDropdownMenu}
                onClick={(show: boolean) => (this.showDropdownMenu = show)}
              />
            )}
          </div>
        </div>
      </Host>
    );
  }
}

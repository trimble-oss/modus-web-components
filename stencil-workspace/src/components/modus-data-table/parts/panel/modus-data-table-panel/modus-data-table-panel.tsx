import {
  Component,
  Host,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';
import { ModusDataTablePanelOptions } from '../../../models';
@Component({
  tag: 'modus-data-table-panel',
  styleUrl: './modus-data-table-panel.scss',
  shadow: true,
})
export class ModusDataTablePanel {
  /** Table data. */
  @Prop() table: Table<unknown>;
  
  /** (Optional) Table Panel options. */
  @Prop() options: ModusDataTablePanelOptions;

  render(): void {
    return (
      <Host>
        <div class="data-table-panel">
          <div class="panel-section">
            <slot name="left-section" />
          </div>
          <div class="panel-section">
            <slot name="right-section" />
            {
              <modus-data-table-dropdown-menu
                table={this.table}
                options={this.options}
              />
            }
          </div>
        </div>
      </Host>
    );
  }
}

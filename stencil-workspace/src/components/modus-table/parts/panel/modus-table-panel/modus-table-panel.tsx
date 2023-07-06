import {
  Component,
  Host,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
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

  /** (Optional) Table Panel options. */
  @Prop() options: ModusTablePanelOptions;

  render(): void {
    return (
      <Host>
        <div class="table-panel">
          <div class="panel-section">
            <slot name="left-section" />
          </div>
          <div class="panel-section">
            <slot name="right-section" />
            {<modus-table-dropdown-menu table={this.table} options={this.options} />}
          </div>
        </div>
      </Host>
    );
  }
}

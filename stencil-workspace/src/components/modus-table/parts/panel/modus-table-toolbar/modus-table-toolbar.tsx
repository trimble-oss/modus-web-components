import {
  Component,
  Host,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';
import { ModusTableToolbarOptions } from '../../../models/modus-table.models';
@Component({
  tag: 'modus-table-toolbar',
  styleUrl: './modus-table-toolbar.scss',
  shadow: true,
})
export class ModusTablePanel {
  /** Table data. */
  @Prop() table: Table<unknown>;

  /** (Optional) Table Panel options. */
  @Prop() options: ModusTableToolbarOptions;

  render(): void {
    return (
      <Host>
        <div class="table-toolbar">
          <div class="section">
            <slot name="group-left" />
          </div>
          <div class="section">
            <slot name="group-right" />
            {<modus-table-dropdown-menu table={this.table} options={this.options} />}
          </div>
        </div>
      </Host>
    );
  }
}

import {
  Component,
  Host,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { TableContext } from '../../../models/table-context.models';
@Component({
  tag: 'modus-table-toolbar',
  styleUrl: './modus-table-toolbar.scss',
  shadow: true,
})
export class ModusTablePanel {
  /** Table data. */
  @Prop() context: TableContext;

  render(): void {
    // const { tableInstance: table, toolbarOptions: options } = this.context;
    return (
      <Host>
        <div class="table-toolbar">
          <div class="section">
            <slot name="group-left" />
          </div>
          <div class="section">
            <slot name="group-right" />
            {<modus-table-dropdown-menu context={this.context} />}
          </div>
        </div>
      </Host>
    );
  }
}

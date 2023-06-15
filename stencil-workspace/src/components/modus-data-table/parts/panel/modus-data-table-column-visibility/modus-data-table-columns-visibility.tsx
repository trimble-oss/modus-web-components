import {
  Component,
  Prop,
  State,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';
import { TabKey } from '../../../constants/constants';
import { ModusDataTableColumnsVisibilityOptions } from '../../../models';
import { JSX } from '@stencil/core/internal';

@Component({
  tag: 'modus-data-table-columns-visibility',
  styleUrl: './modus-data-table-columns-visibility.scss',
  shadow: true,
})
export class ModusDataTableColumnsVisibility {
  /** Table data. */
  @Prop() table: Table<unknown>;

  /** Column visibility options */
  @Prop() columnsVisibility: ModusDataTableColumnsVisibilityOptions;

  @Prop() showDropdown: boolean;

  @Prop() menuIconContainerRef: HTMLDivElement;

  @Prop() toggleDropdown: (show: boolean) => void;

  @State() columnsVisibilityState: Map<string, boolean> = new Map();

  applyColumnsVisibility() {
    this.table.getAllLeafColumns().forEach((column) => {
      if (this.columnsVisibilityState.has(column.id)) {
        column.toggleVisibility(this.columnsVisibilityState.get(column.id));
      }
    });
    this.toggleDropdown(!this.showDropdown);
    this.menuIconContainerRef.focus();
  }

  closeDropdown() {
    this.columnsVisibilityState = new Map();
    this.toggleDropdown(!this.showDropdown);

    this.menuIconContainerRef.focus();
  }

  handleApplyKeyDown(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === TabKey && !event.shiftKey) {
      this.toggleDropdown(false);
    }
  }

  renderColumnsChecklist(): JSX.Element | null {
    return (
      this.showDropdown &&
      this.table.getAllLeafColumns().map((column) => {
        return (
          <div key={column.id} class="column-visibility-item">
            <modus-checkbox
              ariaLabel={column.columnDef.header as string}
              label={column.columnDef.header as string}
              checked={column.getIsVisible()}
              onCheckboxClick={(e) =>
                this.columnsVisibilityState.set(column.id, e.detail)
              }
              disabled={this.columnsVisibility?.requiredColumns?.includes(
                column.id
              )}></modus-checkbox>
          </div>
        );
      })
    );
  }

  renderCancelApplyButtons(): JSX.Element | null {
    return (
      <div>
        <modus-button
          size="small"
          buttonStyle="outline"
          onClick={() => this.closeDropdown()}>
          Cancel
        </modus-button>
        <modus-button
          size="small"
          onClick={() => this.applyColumnsVisibility()}
          onKeyDown={(event) => this.handleApplyKeyDown(event)}>
          Apply
        </modus-button>
      </div>
    );
  }

  render(): void {
    return (
      <div class="columns-visibility-menu">
        <div class="column-visibility-header">
          {this.columnsVisibility.title || 'Columns'}
        </div>
        <div>{this.renderColumnsChecklist()}</div>
        {this.renderCancelApplyButtons()}
      </div>
    );
  }
}

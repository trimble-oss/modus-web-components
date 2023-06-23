import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Table } from '@tanstack/table-core';
import { IconHorizontalEllipsis } from '../../../icons/icon-horizontal-ellipsis';
import { ModusTableColumnVisibility } from '../../models';

interface ModusTableMenuOptions {
  columnVisibility: ModusTableColumnVisibility;
}

interface ModusTableMenuProps {
  table: Table<unknown>;
  options: ModusTableMenuOptions;
  show?: boolean;
  onClick: (show: boolean) => void;
}

export const ModusTableDropdownMenu: FunctionalComponent<
  ModusTableMenuProps
> = ({ table, options, show, onClick }) => {
  const { columnVisibility: columns } = options;

  return (
    <div class="dropdown-menu-container">
      <div class="dropdown-menu-icon" onClick={() => onClick(!show)}>
        <IconHorizontalEllipsis size="20" />
      </div>
      <div class={`dropdown-menu ${show ? 'visible' : ''}`}>
        {columns && (
          <div class="columns-visibility-menu">
            <div class="column-visibility-header">
              {columns.title || 'Columns'}
            </div>
            <div>
              {table.getAllLeafColumns().map((column) => {
                return (
                  <div key={column.id} class="column-visibility-item">
                    <modus-checkbox
                      ariaLabel={column.columnDef.header as string}
                      label={column.columnDef.header as string}
                      checked={column.getIsVisible()}
                      disabled={columns?.disabledColumns?.includes(
                        column.id
                      )}></modus-checkbox>
                  </div>
                );
              })}
            </div>
            <modus-button size="small" buttonStyle="outline">
              Cancel
            </modus-button>
            {/* Disabled the Apply button for now,
         but will make it dynamic once functionality is implemented.*/}
            <modus-button size="small" disabled>
              Apply
            </modus-button>
          </div>
        )}
      </div>
    </div>
  );
};

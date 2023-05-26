// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { ModusDataTableUtilities } from './modus-data-table.utilities';
import {
  ModusDataTableCellLink,
  ModusDataTableDisplayOptions,
  ModusDataTableRowAction,
  ModusDataTableRowActionClickEvent,
  ModusDataTableSort,
  ModusDataTableSortEvent,
  ModusTableSelectionOptions,
  ModusTableSortOptions,
  TCell,
  TColumn,
  TRow,
} from './modus-data-table.models';
import { ModusDataTableHeader } from './parts/modus-data-table-header';
import { ModusDataTableCellLinkPart } from './parts/modus-data-table-cell-link-part';
import { ModusDataTableCellBadgePart } from './parts/modus-data-table-cell-badge-part';
import { ModusDataTableRowActionDropdown } from './parts/modus-data-table-row-action-dropdown';

@Component({
  tag: 'modus-data-table',
  styleUrl: 'modus-data-table.scss',
  shadow: true,
})
export class ModusDataTable {
  /* (required) The columns to display in the table. */
  @Prop({ mutable: true }) columns!: string[] | TColumn[];

  /* (required) The data (rows) to display in the table. */
  @Prop({ mutable: true }) data!: TCell[][] | TRow[];
  @Watch('data') dataChanged(_, oldValue: TCell[][] | TRow[]): void {
    this.originalData = this.originalData ?? ModusDataTableUtilities.convertToTRows(oldValue, this.columns);
  }

  /** Options for data table display. */
  @Prop() displayOptions?: ModusDataTableDisplayOptions = {
    animateRowActionsDropdown: false,
    borderless: true,
    cellBorderless: true,
    rowStripe: false,
    size: 'large',
  };

  /** Actions that can be performed on each row. */
  @Prop() rowActions?: ModusDataTableRowAction[] = [];

  /** Options for data table item selection. */
  @Prop() selectionOptions?: ModusTableSelectionOptions = {
    canSelect: false,
    checkboxSelection: false,
  };

  /** Options for data table column sort. */
  @Prop() sortOptions?: ModusTableSortOptions = {
    canSort: false,
    serverSide: false,
  };

  /** An event that fires on cell link click. */
  @Event() cellLinkClick: EventEmitter<ModusDataTableCellLink>;

  /** An event that fires on row double click. */
  @Event() rowDoubleClick: EventEmitter<string>;

  /** An event that fires on selection change. */
  @Event() selection: EventEmitter<string[]>;

  /** An event that fires on column sort. */
  @Event() sort: EventEmitter<ModusDataTableSortEvent>;

  /** An event that fires when a row action is clicked. */
  @Event() rowActionClick: EventEmitter<ModusDataTableRowActionClickEvent>;

  @State() allSelected = false;
  @State() sortState: ModusDataTableSort = {
    columnId: '',
    direction: 'none',
  };

  classBySize: Map<string, string> = new Map([
    ['small', 'size-small'],
    ['large', 'size-large'],
  ]);
  originalData: TRow[];

  componentWillLoad() {
    this.convertColumnsAndRows();
    this.updateAllSelected();
  }

  componentDidLoad() {
    this.originalData = ModusDataTableUtilities.convertToTRows(this.data, this.columns);
  }

  componentWillUpdate() {
    this.convertColumnsAndRows();
  }

  convertColumnsAndRows() {
    this.columns = ModusDataTableUtilities.convertToTColumns(this.columns);
    this.data = ModusDataTableUtilities.convertToTRows(this.data, this.columns);
  }

  emitSelection(): void {
    this.selection.emit((this.data as TRow[]).filter((row) => row._selected).map((row) => row._id));
  }

  handleCheckboxClick(rowId: string): void {
    this.data = this.data.map((row) => {
      return {
        ...row,
        _selected: row._id === rowId ? !row._selected : row._selected,
      };
    });
    this.updateAllSelected();
    this.emitSelection();
  }

  handleColumnHeaderClick(columnId: string): void {
    if (!this.sortOptions.canSort) {
      return;
    }

    if (columnId === this.sortState.columnId) {
      this.sortState = {
        ...this.sortState,
        direction: this.sortState.direction === 'asc' ? 'desc' : this.sortState.direction === 'desc' ? 'none' : 'asc',
      };
    } else {
      this.sortState = {
        ...this.sortState,
        direction: 'asc',
        columnId: columnId,
      };
    }

    this.sort.emit({
      columnId: this.sortState.columnId,
      direction: this.sortState.direction,
    });

    if (!this.sortOptions.serverSide) {
      this.data =
        this.sortState.direction === 'none'
          ? this.originalData.map((originalRow: TRow) => {
              return {
                ...originalRow,
                _selected: (this.data as TRow[]).find((dataRow: TRow) => dataRow._id === originalRow._id)._selected,
              };
            })
          : ModusDataTableUtilities.sortData(this.data as TRow[], this.sortState.columnId, this.sortState.direction);

      this.updateAllSelected();
    }
  }

  handleHeaderCheckboxClick(selectAll: boolean): void {
    this.data = this.data.map((row) => {
      return {
        ...row,
        _selected: selectAll,
      };
    });

    this.emitSelection();
  }

  handleRowClick(rowId: string): void {
    if (!this.selectionOptions.canSelect || this.selectionOptions.checkboxSelection) {
      return;
    }

    this.data = this.data.map((row) => {
      return {
        ...row,
        _selected: row._id === rowId ? !row._selected : row._selected,
      };
    });

    this.emitSelection();
  }

  handleRowDoubleClick(rowId: string): void {
    this.rowDoubleClick.emit(rowId);
  }

  updateAllSelected() {
    this.allSelected = (this.data as TRow[])?.every((row) => row._selected);
  }

  render(): unknown {
    const className = `
      ${this.displayOptions.borderless ? 'borderless' : ''}
      ${this.displayOptions.cellBorderless ? 'cell-borderless' : ''}
      ${this.displayOptions.rowStripe ? 'row-stripe' : ''}
      ${this.classBySize.get(this.displayOptions.size)}
    `;

    return (
      <table class={className}>
        <colgroup>
          {this.selectionOptions.canSelect && this.selectionOptions.checkboxSelection && <col style={{ width: '34px' }} />}
          {(this.columns as TColumn[])?.map((column: TColumn) => (
            <col style={{ width: column.width }} />
          ))}
          {!!this.rowActions.length && <col style={{ width: '34px' }} />}
        </colgroup>
        <thead>
          <tr>
            {this.selectionOptions.canSelect && this.selectionOptions.checkboxSelection && (
              <th>
                <div class="column-header align-center">
                  <modus-checkbox
                    checked={this.allSelected}
                    onCheckboxClick={(e) => this.handleHeaderCheckboxClick(e.detail)}
                  />
                </div>
              </th>
            )}
            {(this.columns as TColumn[])?.map((column: TColumn) => (
              <ModusDataTableHeader
                column={column}
                onColumnHeaderClick={(id: string) => this.handleColumnHeaderClick(id)}
                sortOptions={this.sortOptions}
                sortState={this.sortState}
              />
            ))}
            {!!this.rowActions.length && <th />}
          </tr>
        </thead>
        <tbody>
          {this.data?.map((row) => (
            <tr onClick={() => this.handleRowClick(row._id)} onDblClick={() => this.handleRowDoubleClick(row._id)}>
              {this.selectionOptions.canSelect && this.selectionOptions.checkboxSelection && (
                <td
                  class={`align-center ${row._selected ? 'selected' : ''}`}
                  onClick={(e) => e.stopPropagation()}
                  onDblClick={(e) => e.stopPropagation()}>
                  <div>
                    <modus-checkbox checked={row._selected} onCheckboxClick={() => this.handleCheckboxClick(row._id)} />
                  </div>
                </td>
              )}
              {(this.columns as TColumn[])?.map((column: TColumn) => (
                <td class={`align-${column.align} ${column.readonly ? 'readonly' : ''} ${row._selected ? 'selected' : ''}`}>
                  {row[column.id]?._type === 'link' && (
                    <ModusDataTableCellLinkPart
                      link={row[column.id]}
                      onLinkClick={() => this.cellLinkClick.emit(row[column.id])}
                    />
                  )}
                  {row[column.id]?._type === 'badge' && <ModusDataTableCellBadgePart badge={row[column.id]} />}
                  {!row[column.id]?._type && row[column.id]?.toString()}
                </td>
              ))}
              {!!this.rowActions.length && (
                <td
                  class={`align-center ${row._selected ? 'selected' : ''}`}
                  onClick={(e) => e.stopPropagation()}
                  onDblClick={(e) => e.stopPropagation()}>
                  <ModusDataTableRowActionDropdown
                    actions={this.rowActions}
                    animateDropdown={this.displayOptions.animateRowActionsDropdown}
                    onRowActionClick={(actionId, rowId) => this.rowActionClick.emit({ actionId, rowId })}
                    rowId={row._id}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

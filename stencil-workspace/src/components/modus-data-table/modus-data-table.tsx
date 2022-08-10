// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { ModusDataTableUtilities } from './modus-data-table.utilities';
import { TCell, TColumn, TRow, ModusTableSortOptions, ModusDataTableSort, ModusDataTableSortEvent } from './modus-data-table.models';

@Component({
  tag: 'modus-data-table',
  styleUrl: 'modus-data-table.scss',
  shadow: true,
})
export class ModusDataTable {
  /* (required) The columns to display in the table. */
  @Prop({ mutable: true }) columns: string[] | TColumn[];

  /* (required) The data (rows) to display in the table. */
  @Prop({ mutable: true }) data: TCell[][] | TRow[];
  @Watch('data') dataChanged(_, oldValue: TCell[][] | TRow[]): void {
    this.originalData = this.originalData ?? ModusDataTableUtilities.convertToTRows(oldValue, this.columns)?.slice();
  }

  /** The size of the table. */
  @Prop() size?: 'condensed' | 'standard' = 'standard';

  /** Options for data table column sort. */
  @Prop() sortOptions?: ModusTableSortOptions = {
    canSort: false,
    serverSide: false,
  };

  @Event() sort: EventEmitter<ModusDataTableSortEvent>;

  @State() sortState: ModusDataTableSort = {
    columnId: '',
    direction: 'none'
  };

  classBySize: Map<string, string> = new Map([
    ['condensed', 'size-condensed'],
    ['standard', 'size-standard'],
  ]);
  originalData: TRow[];

  componentWillLoad() {
    this.convertColumnsAndRows();
  }

  componentDidLoad() {
    this.originalData = (this.data as TRow[])?.slice();
  }

  componentWillUpdate() {
    this.convertColumnsAndRows();
  }

  convertColumnsAndRows() {
    this.columns = ModusDataTableUtilities.convertToTColumns(this.columns);
    this.data = ModusDataTableUtilities.convertToTRows(this.data, this.columns);
  }

  convertToSingleSpaceTitleCase(title: string): string {
    return title?.replace(/\w\S*/g, (word) => {
      return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    }).replace(/\s+/g, ' ');
  }

  handleColumnHeaderClick(columnId: string): void {
    if (!this.sortOptions.canSort) { return; }

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
      this.data = this.sortState.direction === 'none'
        ? this.originalData?.slice()
        : ModusDataTableUtilities.sortData(this.data as TRow[], this.sortState.columnId, this.sortState.direction);
    }
  }

  render(): unknown {
    const className = `${this.classBySize.get(this.size)}`;

    return (
      <table class={className}>
        <colgroup>
          {(this.columns as TColumn[])?.map((column: TColumn) => <col style={{width: column.width }} />)}
        </colgroup>
        <thead>
          <tr>
            {(this.columns as TColumn[])?.map((column: TColumn) => {
              return (
                <th onClick={() => this.handleColumnHeaderClick(column.id)}>
                  <div class={`align-${column.align}`}>
                    {this.convertToSingleSpaceTitleCase(column.display)}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {this.data?.map((row) => (
            <tr>
              {(this.columns as TColumn[])?.map((column: TColumn) => (
                <td class={`align-${column.align} ${column.readonly ? 'readonly' : ''}`}>
                  {row[column.id].toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

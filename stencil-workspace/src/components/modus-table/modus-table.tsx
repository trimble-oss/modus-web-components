import {
  Component,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import {
  Column,
  ColumnDef,
  ColumnOrderState,
  ColumnSizingInfoState,
  ColumnSizingState,
  ExpandedState,
  HeaderGroup,
  PaginationState,
  Row,
  Table,
  TableOptionsResolved,
  Updater,
  VisibilityState,
  createTable,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/table-core';
import { DefaultPageSizes } from './constants/constants';
import { ModusTableSortingState } from './models';
import ColumnDragState from './models/column-drag-state.model';
import ModusTableCellLink from './models/modus-table-cell-link';
import ModusTableColumn from './models/modus-table-column';
import ModusTableDisplayOptions from './models/modus-table-display-options';
import ModusTablePanelOptions from './models/modus-table-panel-options';
import { ModusTableCell } from './parts/cell/modus-table-cell';
import { ModusTableHeader } from './parts/header/modus-table-header';
import { ModusTableDragArrows, ModusTableDragItem } from './parts/modus-table-drag-item';
import { ModusTablePagination } from './parts/modus-table-pagination';
import { ModusTableSummaryRow } from './parts/modus-table-summary-row';
import { TableHeaderDragDrop } from './utilities/table-header-drag-drop.utility';

/**
 * @slot customFooter - Slot for custom footer.
 * @slot panelGroupLeft - Slot for modus data table panel left section.
 * @slot panelGroupRight - Slot for modus data table panel right section.
 */
@Component({
  tag: 'modus-table',
  styleUrl: 'modus-table.scss',
  shadow: true,
})
export class ModusTable {
  /** (Required) To display headers in the table. */
  @Prop({ mutable: true }) columns!: ModusTableColumn<unknown>[];
  @Watch('columns') onChangeOfColumns() {
    if (this.table) {
      this.table.options.columns = this.columns;
    }
  }

  /** (Required) To display data in the table. */
  @Prop({ mutable: true }) data!: unknown[];
  @Watch('data') onChangeOfData() {
    if (this.table) {
      this.table.options.data = this.data;
    }
  }

  /** (Optional) To enable row hover in table. */
  @Prop() hover = false;

  /* (optional) To manage column resizing */
  @Prop() columnResize = false;
  @Watch('columnResize') updateColumnResize() {
    this.table.options.enableColumnResizing = this.columnResize;
  }

  /* (optional) To manage table resizing */
  @Prop() fullWidth = false;

  /** (Optional) To sort data in table. */
  @Prop() sort = false;
  @Watch('sort') updateSort() {
    this.table.options.enableSorting = this.sort;
  }

  /** (Optional) To display sort icon on hover. */
  @Prop() showSortIconOnHover = false;

  /* (optional) To enable pagination for the table. */
  @Prop() pagination: boolean;

  /* (optional) To set pagesize for the pagination. */
  @Prop() pageSizeList: number[] = DefaultPageSizes;

  /** (Optional) To display summary row. */
  @Prop() summaryRow = false;

  /** (Optional) To display a panel options, which allows access to table operations like hiding columns. */
  @Prop() panelOptions: ModusTablePanelOptions | null = null;
  @Watch('panelOptions') onChangePanelOptions() {
    if (this.table) {
      this.table.options.enableHiding = !!this.panelOptions?.columnsVisibility;
    }
    this.onChangeOfRowsExpandable();
  }

  /** (Optional) To display table panel. */
  @Prop() showTablePanel = false;

  /** (Optional) To control display options of table. */
  @Prop() displayOptions?: ModusTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

  /** (Optional) To allow column reordering. */
  @Prop() columnReorder = false;
  @Watch('columnReorder') updateColumnReorder() {
    this.table.options.state.columnOrder = this.columnOrder;
  }

  /** (Optional) To display expanded rows. */
  @Prop() rowsExpandable = false;
  @Watch('rowsExpandable') onChangeOfRowsExpandable() {
    if (this.rowsExpandable) {
      this.frozenColumns.push(this.columnOrder[0]);
    }
    if (this.panelOptions?.columnsVisibility) {
      this.panelOptions.columnsVisibility.requiredColumns = [
        ...this.panelOptions.columnsVisibility.requiredColumns,
        ...this.frozenColumns,
      ];
    }
  }
  /** (Optional) To display a vertical scrollbar when the height is exceeded. */
  @Prop() maxHeight: string;

  /** (Optional) To display a horizontal scrollbar when the width is exceeded. */
  @Prop() maxWidth: string;

  /** (Optional) To sort decending or ascending. */
  @Prop() sortDescFirst = false;

  /** (Optional) Date format, by default is set to mm/dd/yyyy. */
  @Prop() dateFormat = 'mm/dd/yyyy';

  /** Emits event on sort change */
  @Event() sortChange: EventEmitter<ModusTableSortingState>;

  /** Emits the link that was clicked */
  @Event() cellLinkClick: EventEmitter<ModusTableCellLink>;

  /** Emits updated row data */
  @Event() rowUpdated: EventEmitter<unknown>;

  /**
   * ColumnSizing has info about width of the column
   * whereas ColumnSizingInfo has the detailed info about resizing of the column
   */
  @State() columnSizing: ColumnSizingState = {};
  @State() columnSizingInfo: ColumnSizingInfoState = {} as ColumnSizingInfoState;
  @State() expanded: ExpandedState;
  @State() sorting: ModusTableSortingState = [];
  @State() table: Table<unknown>;
  @State() paginationState: PaginationState = {
    pageIndex: 0,
    pageSize: this.pageSizeList[0],
  };
  @State() columnVisibility: VisibilityState = {};
  @State() columnOrder: string[] = [];
  @State() itemDragState: ColumnDragState;
  @State() dragAndDropObj: TableHeaderDragDrop = new TableHeaderDragDrop();
  @State() tableBodyEl: HTMLElement;

  private frozenColumns: string[] = []; // Columns will remain on the left and be unable to resize, reorganize, or modify their visibility.
  /** Column reorder variables start */
  private tableHeaderRowRef: HTMLTableRowElement;
  private columnResizeEnabled = false;
  private onMouseMove = (event: MouseEvent) => this.handleDragOver(event);
  private onKeyDown = (event: KeyboardEvent) => this.handleKeyDown(event);
  private onMouseUp = () => this.handleDrop();
  /** Column reorder variables end */

  @Listen('click', { target: 'document' })
  documentClickHandler(event: MouseEvent): void {
    if (event.defaultPrevented) {
      return;
    }
    // Deactivating the column resizing mode if other click events happened
    this.table.setColumnSizingInfo({
      startOffset: null,
      startSize: null,
      deltaOffset: null,
      deltaPercentage: null,
      isResizingColumn: null,
      columnSizingStart: [],
    });
  }

  @Watch('itemDragState')
  handleItemDragState(newValue: string, oldValue: string) {
    if (oldValue && newValue && oldValue === newValue && this.columnReorder) return;
    if (newValue) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('keydown', this.onKeyDown);
    } else {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }

  handleDragStart(
    event: MouseEvent | KeyboardEvent,
    draggedColumnId: string,
    elementRef: HTMLTableHeaderCellElement,
    throughMouse: boolean
  ) {
    if (
      this.columnReorder &&
      !this.columnResizeEnabled &&
      !this.itemDragState?.targetId && // On Enter click two functions are called handleDragStart and handleKeyDown, if targetId is present we ignore handleDragStart.
      this.itemDragState?.draggedColumnId !== draggedColumnId // If same item is selected we don't update itemDragState.
    ) {
      if (this.frozenColumns.includes(draggedColumnId)) {
        return;
      }
      this.itemDragState = null;
      this.dragAndDropObj.setValues(
        this.columnOrder,
        this.columnReorder,
        this.columnResizeEnabled,
        this.tableHeaderRowRef,
        this.table,
        this.itemDragState,
        this.frozenColumns
      );
      this.dragAndDropObj.handleDragStart(event, draggedColumnId, elementRef, throughMouse);
      /**
       * SetTimeout
       * If we select another header, after selecting a header for reorder creates an issue(Both selection using keyboard). When tab key is used this issue will not occur.
       * Which displays both the headers in the ModusTableDragItem component, as we are using appendChild.
       * To resolved this issue we have used setTimeout to delay the updating of dragContent is itemDragState.
       * The same issue can be reproduced when a header is selected using keyboard and then one clicks on another header using mouse.
       */
      setTimeout(() => {
        this.itemDragState = { ...this.dragAndDropObj.itemDragState };
      }, 10);
    }
  }

  handleDragOver(event: MouseEvent): void {
    this.dragAndDropObj.handleDragOver(event);
    this.itemDragState = this.dragAndDropObj.itemDragState;
  }

  handleKeyDown(event: KeyboardEvent): void {
    this.itemDragState = null;
    this.dragAndDropObj.handleKeyDown(event);
    this.columnOrder = this.dragAndDropObj.columnOrder;
    this.itemDragState = this.dragAndDropObj.itemDragState;
  }

  handleDrop(): void {
    this.dragAndDropObj.handleDrop();
    this.columnOrder = this.dragAndDropObj.columnOrder;
    this.itemDragState = null;
  }

  componentWillLoad(): void {
    this.columnOrder = this.columns?.map((column) => column.id as string); // Sets column order
    this.onChangeOfRowsExpandable();
    this.initializeTable();
  }

  /**
   * Creates a table with some set of options.
   */
  initializeTable(): void {
    const options: TableOptionsResolved<unknown> = {
      data: this.data ?? [],
      columns: (this.columns as ColumnDef<unknown>[]) ?? [],
      state: {
        columnPinning: {},
        columnSizing: {},
        columnSizingInfo: {} as ColumnSizingInfoState,
        columnVisibility: this.columnVisibility,
        columnOrder: this.columnReorder ? this.columnOrder : [],
        expanded: this.expanded,
        sorting: this.sorting,
      },
      enableSorting: this.sort,
      sortingFns: {
        sortForHyperlink: (rowA: Row<unknown>, rowB: Row<unknown>, columnId: string): number => {
          const valA = rowA.getValue(columnId)?.['display'] ?? rowA.getValue(columnId);
          const valB = rowB.getValue(columnId)?.['display'] ?? rowB.getValue(columnId);

          // If valA is null, undefined or empty
          if (!valA) {
            return 1;
          }

          // If valB is null, undefined or empty
          if (!valB) {
            return -1;
          }

          // if descending
          if (this.sortDescFirst) {
            return valA < valB ? 1 : -1;
          }

          // if ascending
          return valA < valB ? -1 : 1;
        },
      },
      columnResizeMode: 'onChange',
      enableColumnResizing: this.columnResize,
      enableHiding: !!this.panelOptions?.columnsVisibility,
      sortDescFirst: this.sortDescFirst, // To-Do, workaround to prevent sort descending on certain columns, e.g. numeric.
      onExpandedChange: (updater: Updater<ExpandedState>) => this.updatingState(updater, 'expanded'),
      onSortingChange: (updater: Updater<ModusTableSortingState>) => this.setSorting(updater),
      onPaginationChange: (updater: PaginationState) => this.setPagination(updater),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: this.pagination && getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnSizingChange: (updater: Updater<ColumnSizingState>) => this.updatingState(updater, 'columnSizing'),
      onColumnSizingInfoChange: (updater: Updater<ColumnSizingInfoState>) => {
        this.updatingState(updater, 'columnSizingInfo');
        this.columnResizeEnabled = !this.columnSizingInfo.isResizingColumn ? false : true;
      },
      onColumnVisibilityChange: (updater: Updater<VisibilityState>) => this.updatingState(updater, 'columnVisibility'),
      onColumnOrderChange: (updater: Updater<ColumnOrderState>) => this.updatingState(updater, 'columnOrder'),
      getExpandedRowModel: getExpandedRowModel(),
      getSubRows: (row) => row['subRows'],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onStateChange: () => {},
      renderFallbackValue: null,
      meta: {
        updateData: (rowId: string, columnId: string, value: string) => {
          this.setData((old) => {
            const newData = [...old];
            // rowId is a string of IDs for row with nested information.
            const idArray: number[] = rowId.split('.')?.map((id) => parseInt(id));
            const rowIndex = idArray[0];

            // If data is edited in parent row.
            if (idArray.length === 1) {
              newData[rowIndex][columnId] = value;
            }
            // If data is edited in nth child row
            else {
              let nthChildRowData = newData[rowIndex];
              let i = 1;
              while (i < idArray.length) {
                nthChildRowData = nthChildRowData.subRows[idArray[i]];
                i++;
              }
              nthChildRowData[columnId] = value;
            }
            this.rowUpdated.emit(newData[rowIndex]);
            return newData;
          });
        },
      },
    };
    this.table = createTable(options);
    if (this.pagination) {
      this.table.setOptions((prev) => ({
        ...prev,
        state: {
          ...prev.state,
          ...this.table.initialState,
          pagination: {
            ...this.paginationState,
            pageSize: this.pageSizeList[0],
          },
        },
      }));
    }
  }

  private setData(updater: Updater<unknown>) {
    this.data = updater instanceof Function ? updater(this.data) : updater;
    this.table.options.data = this.data;
  }

  private updatingState(updater: Updater<unknown>, key: string) {
    this[key] = updater instanceof Function ? updater(this[key]) : updater;
    this.table.options.state[key] = this[key];
  }

  setSorting(updater: Updater<ModusTableSortingState>): void {
    this.updatingState(updater, 'sorting');
    this.sortChange.emit(this.sorting);
  }

  setPagination(updater: Updater<PaginationState>): void {
    this.paginationState = updater instanceof Function ? updater(this.paginationState) : updater;
    this.table.options.state.pagination = this.paginationState;
  }

  /**
   * Returns data of a column.
   * @param accessorKey : Column name as key.
   * @returns : Column data as Array or empty array.
   */
  @Method()
  async getColumnData(accessorKey: string): Promise<unknown[]> {
    const columns: Column<unknown, unknown>[] = this.table.getAllLeafColumns();

    let rowData: unknown[] = [];
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].columnDef['accessorKey'] === accessorKey) {
        rowData = this.table.options.data.map((row) => row[accessorKey]);
        break;
      }
    }
    return rowData;
  }

  /**
   * Toggle the table column visibility
   * @param columnId Column id
   * @param show Boolean value decides to visibility of column
   */
  @Method()
  async toggleColumnVisibility(columnId: string, show: boolean): Promise<void> {
    this.table.getAllLeafColumns().forEach((column) => {
      if (column.id === columnId) {
        column.toggleVisibility(show);
      }
    });
  }

  render(): void {
    const lengthOfHeaderGroups: number = this.table.getHeaderGroups().length;
    const totalSize = this.table.getTotalSize();
    const tableStyle = this.fullWidth
      ? { width: '100%' }
      : totalSize > 0
      ? { width: `${totalSize}px`, tableLayout: 'fixed' }
      : { tableLayout: 'fixed' };
    const borderlessTableStyle = this.displayOptions && this.displayOptions.borderless && { border: 'none' };
    const headerGroups: HeaderGroup<unknown>[] = this.table.getHeaderGroups();
    const footerGroups: HeaderGroup<unknown>[] = this.table.getFooterGroups();
    const className = `
  ${this.displayOptions && this.displayOptions.borderless ? 'borderless' : ''}
  ${this.displayOptions && this.displayOptions.cellBorderless ? 'cell-borderless' : ''}
`;

    return (
      <Host>
        <div style={{ maxWidth: this.maxWidth }}>
          {this.showTablePanel && this.panelOptions && (
            <modus-table-panel table={this.table} options={this.panelOptions}>
              <div slot="left-section">
                <slot name="panelGroupLeft"></slot>
              </div>
              <div slot="right-section">
                <slot name="panelGroupRight"></slot>
              </div>
            </modus-table-panel>
          )}

          <div class="table-container" style={{ maxHeight: this.maxHeight, ...borderlessTableStyle }}>
            <table class={className} style={tableStyle}>
              <thead>
                {headerGroups?.map((headerGroup, index) => (
                  <tr key={headerGroup.id} ref={(element: HTMLTableRowElement) => (this.tableHeaderRowRef = element)}>
                    {headerGroup.headers?.map((header) => {
                      return (
                        <ModusTableHeader
                          table={this.table}
                          header={header}
                          isNestedParentHeader={index < lengthOfHeaderGroups - 1}
                          showSortIconOnHover={this.showSortIconOnHover}
                          columnReorder={this.columnReorder}
                          columnResizeEnabled={this.columnResizeEnabled}
                          frozenColumns={this.frozenColumns}
                          handleDragStart={(event: MouseEvent, id: string, elementRef: HTMLTableHeaderCellElement) =>
                            this.handleDragStart(event, id, elementRef, true)
                          }
                          handleKeyboardStart={(event: KeyboardEvent, id: string, elementRef: HTMLTableHeaderCellElement) =>
                            this.handleDragStart(event, id, elementRef, false)
                          }
                          onMouseEnterResize={() => (this.columnResizeEnabled = true)}
                          onMouseLeaveResize={() => (this.columnResizeEnabled = false)}
                        />
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody ref={(ref: HTMLElement) => (this.tableBodyEl = ref)}>
                {this.table.getRowModel()?.rows.map((row, rowIndex) => {
                  return (
                    <tr key={row.id} class={this.hover && 'enable-hover'}>
                      {row.getVisibleCells()?.map((cell, cellIndex) => {
                        return (
                          <ModusTableCell
                            row={row}
                            rowIndex={rowIndex}
                            cell={cell}
                            cellIndex={cellIndex}
                            rowsExpandable={this.rowsExpandable}
                            frozenColumns={this.frozenColumns}
                            table={this.table}
                            tableBodyEl={this.tableBodyEl}
                            onLinkClick={(link: ModusTableCellLink) => this.cellLinkClick.emit(link)}
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              {this.summaryRow ? (
                <ModusTableSummaryRow
                  footerGroups={[footerGroups[0]]}
                  tableData={this.data}
                  borderlessOptions={this.displayOptions}
                  frozenColumns={this.frozenColumns}
                />
              ) : (
                ''
              )}
            </table>
          </div>
          <slot name="customFooter"></slot>
          {this.pagination && (
            <ModusTablePagination table={this.table} totalCount={this.data.length} pageSizeList={this.pageSizeList} />
          )}

          <ModusTableDragItem draggingState={this.itemDragState}></ModusTableDragItem>
          <ModusTableDragArrows arrowsPosition={this.itemDragState?.arrowsPosition}></ModusTableDragArrows>
        </div>
      </Host>
    );
  }
}

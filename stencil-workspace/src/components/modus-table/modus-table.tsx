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
  RowSelectionState,
  TableOptionsResolved,
  Updater,
  VisibilityState,
  createTable,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/table-core';
import { PAGINATION_DEFAULT_SIZES } from './modus-table.constants';
import { ModusTableSortingState } from './models/modus-table.models';
import ColumnDragState from './models/column-drag-state.model';
import {
  ModusTableColumn,
  ModusTableCellLink,
  ModusTableDisplayOptions,
  ModusTableToolbarOptions,
  ModusTableRowSelectionOptions as RowSelectionOptions,
} from './models/modus-table.models';
import { ModusTableCell } from './parts/cell/modus-table-cell';
import { ModusTableHeader } from './parts/header/modus-table-header';
import { ModusTableColumnDropIndicator, ModusTableColumnDragItem } from './parts/modus-table-drag-item';
import { ModusTablePagination } from './parts/modus-table-pagination';
import { ModusTableSummaryRow } from './parts/modus-table-summary-row';
import { TableHeaderDragDrop } from './utilities/table-header-drag-drop.utility';
import { JSX } from '@stencil/core/internal';

/**
 * @slot customFooter - Slot for custom footer.
 * @slot groupLeft - Slot for custom toolbar options added to the left.
 * @slot groupRight - Slot for custom toolbar options added to the right.
 */
@Component({
  tag: 'modus-table',
  styleUrl: 'modus-table.scss',
  shadow: true,
})
export class ModusTable {
  /** (Required) To display headers in the table. */
  @Prop({ mutable: true }) columns!: ModusTableColumn<unknown>[];
  @Watch('columns') onChangeOfColumns(newVal: ModusTableColumn<unknown>[]) {
    if (this.table) {
      this.table.options.columns = (newVal as ColumnDef<unknown>[]) ?? [];
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
  @Prop() pageSizeList: number[] = PAGINATION_DEFAULT_SIZES;

  /** (Optional) To display summary row. */
  @Prop() summaryRow = false;

  /** (Optional) To display a toolbar, which allows access to table operations like hiding columns. */
  @Prop() toolbarOptions: ModusTableToolbarOptions | null = null;
  @Watch('toolbarOptions') onChangePanelOptions() {
    if (this.table) {
      this.table.options.enableHiding = !!this.toolbarOptions?.columnsVisibility;
    }
    this.onChangeOfRowsExpandable();
  }

  /** (Optional) To display a toolbar for the table. */
  @Prop() toolbar = false;

  /** (Optional) To control display options of table. */
  @Prop() displayOptions?: ModusTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

  /** (Optional) To display checkbox. */
  @Prop() rowSelection = false;

  /** (Optional) To control multiple row selection. */
  @Prop() rowSelectionOptions: RowSelectionOptions = {
    multiple: false,
    subRowSelection: false,
  };
  @Watch('rowSelectionOptions') onRowSelectionOptionsChange(newVal: RowSelectionOptions, oldVal: RowSelectionOptions) {
    if (newVal.multiple !== oldVal.multiple || newVal.subRowSelection !== oldVal.subRowSelection) {
      this.rowSelectionOptions.multiple = newVal.multiple;
      this.rowSelectionOptions.subRowSelection = newVal.subRowSelection;
    }
  }

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
    if (this.toolbarOptions?.columnsVisibility) {
      this.toolbarOptions.columnsVisibility.requiredColumns = [
        ...this.toolbarOptions.columnsVisibility.requiredColumns,
        ...this.frozenColumns,
      ];
    }
  }
  /** (Optional) To display a vertical scrollbar when the height is exceeded. */
  @Prop() maxHeight: string;

  /** (Optional) To display a horizontal scrollbar when the width is exceeded. */
  @Prop() maxWidth: string;

  /** Emits event on sort change */
  @Event() sortChange: EventEmitter<ModusTableSortingState>;

  /** Event details contains the row(s) selected */
  @Event() rowSelectionChange: EventEmitter<unknown>;

  /** Emits the link that was clicked */
  @Event() cellLinkClick: EventEmitter<ModusTableCellLink>;

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
  @State() rowSelectionState: RowSelectionState = {};

  private frozenColumns: string[] = []; // Columns will remain on the left and be unable to resize, reorganize, or modify their visibility.
  /** Column reorder variables start */
  private tableHeaderRowRef: HTMLTableRowElement;
  private isColumnResizing = false;
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
    elementRef: HTMLTableCellElement,
    mouseInteracted: boolean
  ) {
    if (
      this.columnReorder &&
      !this.isColumnResizing &&
      !this.itemDragState?.dropColumnId && // On Enter key press, two functions are called handleDragStart and handleKeyDown, if dropColumnId is present we ignore handleDragStart.
      this.itemDragState?.draggedColumnId !== draggedColumnId // If same item is selected we don't update itemDragState.
    ) {
      if (this.frozenColumns.includes(draggedColumnId)) {
        return;
      }
      this.itemDragState = null;
      this.dragAndDropObj.setValues(
        this.columnOrder,
        this.columnReorder,
        this.isColumnResizing,
        this.tableHeaderRowRef,
        this.table,
        this.itemDragState,
        this.frozenColumns
      );
      this.dragAndDropObj.handleDragStart(event, draggedColumnId, elementRef, mouseInteracted);
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
    const { multiple, subRowSelection } = this.rowSelectionOptions;
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
        rowSelection: this.rowSelectionState,
      },
      enableRowSelection: this.rowSelection,
      enableMultiRowSelection: multiple,
      enableSubRowSelection: multiple && subRowSelection,
      enableSorting: this.sort,
      sortingFns: {
        sortForHyperlink: (rowA: Row<unknown>, rowB: Row<unknown>, columnId: string): number => {
          const valA = rowA.getValue(columnId)['display'] ?? rowA.getValue(columnId);
          const valB = rowB.getValue(columnId)['display'] ?? rowB.getValue(columnId);
          return valA > valB ? 1 : -1;
        },
      },
      columnResizeMode: 'onChange',
      enableColumnResizing: this.columnResize,
      enableHiding: !!this.toolbarOptions?.columnsVisibility,
      sortDescFirst: false, // To-Do, workaround to prevent sort descending on certain columns, e.g. numeric.
      onExpandedChange: (updater: Updater<ExpandedState>) => this.updatingState(updater, 'expanded'),
      onSortingChange: (updater: Updater<ModusTableSortingState>) => this.setSorting(updater),
      onRowSelectionChange: (updater: Updater<RowSelectionState>) => this.setRowSelection(updater),
      onPaginationChange: (updater: PaginationState) => this.setPagination(updater),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: this.pagination && getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnSizingChange: (updater: Updater<ColumnSizingState>) => this.updatingState(updater, 'columnSizing'),
      onColumnSizingInfoChange: (updater: Updater<ColumnSizingInfoState>) => {
        this.updatingState(updater, 'columnSizingInfo');
        this.isColumnResizing = !this.columnSizingInfo.isResizingColumn ? false : true;
      },
      onColumnVisibilityChange: (updater: Updater<VisibilityState>) => this.updatingState(updater, 'columnVisibility'),
      onColumnOrderChange: (updater: Updater<ColumnOrderState>) => this.updatingState(updater, 'columnOrder'),
      getExpandedRowModel: getExpandedRowModel(),
      getSubRows: (row) => row['subRows'],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onStateChange: () => {},
      renderFallbackValue: null,
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

  setRowSelection(updater: Updater<unknown>): void {
    this.rowSelectionState = typeof updater === 'function' ? updater(this.rowSelectionState) : updater;
    this.table.options.state.rowSelection = this.rowSelectionState;
    this.rowSelectionChange.emit(this.table.getSelectedRowModel().flatRows.map((row) => row.original));
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

  renderTableBody(multipleRowSelection: boolean): JSX.Element | null {
    return (
      <tbody>
        {this.table.getRowModel()?.rows.map((row) => {
          const isChecked = row.getIsSelected() && (row.subRows?.length ? row.getIsAllSubRowsSelected() : true);
          return (
            <tr key={row.id} class={{ 'enable-hover': this.hover, 'row-selected': isChecked }}>
              {this.rowSelection && (
                <td class="row-checkbox sticky-left">
                  <modus-checkbox
                    checked={isChecked}
                    indeterminate={multipleRowSelection && row.getIsSomeSelected()}
                    onCheckboxClick={() => row.toggleSelected()}></modus-checkbox>
                </td>
              )}
              {row.getVisibleCells()?.map((cell, cellIndex) => {
                return (
                  <ModusTableCell
                    cell={cell}
                    row={row}
                    cellIndex={cellIndex}
                    rowsExpandable={this.rowsExpandable}
                    frozenColumns={this.frozenColumns}
                    onLinkClick={(link: ModusTableCellLink) => this.cellLinkClick.emit(link)}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  renderTableHeader(multipleRowSelection: boolean): JSX.Element | null {
    const tableHeadClass = { 'show-resize-cursor': this.isColumnResizing, 'show-column-reorder-cursor': this.columnReorder };
    const headerGroups: HeaderGroup<unknown>[] = this.table.getHeaderGroups();

    return (
      <thead class={tableHeadClass}>
        {headerGroups?.map((headerGroup, index) => (
          <tr key={headerGroup.id} ref={(element: HTMLTableRowElement) => (this.tableHeaderRowRef = element)}>
            {this.rowSelection && (
              <th class="row-checkbox sticky-left">
                {multipleRowSelection && (
                  <modus-checkbox
                    checked={this.table.getIsAllRowsSelected()}
                    indeterminate={this.table.getIsSomeRowsSelected()}
                    onCheckboxClick={this.table.getToggleAllRowsSelectedHandler()}></modus-checkbox>
                )}
              </th>
            )}
            {headerGroup.headers?.map((header) => {
              return (
                <ModusTableHeader
                  table={this.table}
                  header={header}
                  isNestedParentHeader={index < headerGroups.length - 1}
                  showSortIconOnHover={this.showSortIconOnHover}
                  columnReorder={this.columnReorder}
                  isColumnResizing={this.isColumnResizing}
                  frozenColumns={this.frozenColumns}
                  onDragStart={(
                    event: MouseEvent | KeyboardEvent,
                    id: string,
                    elementRef: HTMLTableCellElement,
                    mouseInteracted: boolean
                  ) => this.handleDragStart(event, id, elementRef, mouseInteracted)}
                  onMouseEnterResize={() => (this.isColumnResizing = true)}
                  onMouseLeaveResize={() => (this.isColumnResizing = false)}
                />
              );
            })}
          </tr>
        ))}
      </thead>
    );
  }

  renderTableFooter(): JSX.Element | null {
    const footerGroups: HeaderGroup<unknown>[] = this.table.getFooterGroups();
    return this.summaryRow ? (
      <ModusTableSummaryRow
        footerGroups={[footerGroups[0]]}
        tableData={this.data}
        borderlessOptions={this.displayOptions}
        frozenColumns={this.frozenColumns}
        rowSelection={this.rowSelection}
      />
    ) : null;
  }

  render(): void {
    const { multiple } = this.rowSelectionOptions;
    const totalSize = this.table.getTotalSize();

    const tableContainerClass = {
      'table-container': true,
      borderless: this.displayOptions?.borderless,
    };

    const tableMainClass = {
      borderless: this.displayOptions?.borderless,
      'cell-borderless': this.displayOptions?.cellBorderless,
    };

    const tableStyle = this.fullWidth
      ? { width: '100%' }
      : totalSize > 0
      ? { width: `${totalSize}px`, tableLayout: 'fixed' }
      : { tableLayout: 'fixed' };

    return (
      <Host>
        <div style={{ maxWidth: this.maxWidth }}>
          {this.toolbar && this.toolbarOptions && (
            <modus-table-toolbar table={this.table} options={this.toolbarOptions}>
              <div slot="group-left">
                <slot name="groupLeft"></slot>
              </div>
              <div slot="group-right">
                <slot name="groupRight"></slot>
              </div>
            </modus-table-toolbar>
          )}

          <div class={tableContainerClass} style={{ maxHeight: this.maxHeight }}>
            <table class={tableMainClass} style={tableStyle}>
              {this.renderTableHeader(multiple)}
              {this.renderTableBody(multiple)}
              {this.renderTableFooter()}
            </table>
          </div>
          <slot name="customFooter" />
          {this.pagination && (
            <ModusTablePagination table={this.table} totalCount={this.data.length} pageSizeList={this.pageSizeList} />
          )}
          <ModusTableColumnDragItem draggingState={this.itemDragState} />
          <ModusTableColumnDropIndicator position={this.itemDragState?.dropIndicator} />
        </div>
      </Host>
    );
  }
}

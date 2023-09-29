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
  Element,
  Fragment,
  JSX,
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
  Table,
  RowSelectionState,
  Updater,
  VisibilityState,
  SortingState,
} from '@tanstack/table-core';
import {
  COLUMN_ORDER_STATE_KEY,
  COLUMN_SIZING_INFO_STATE_KEY,
  COLUMN_SIZING_STATE_KEY,
  COLUMN_VISIBILITY_STATE_KEY,
  EXPANDED_STATE_KEY,
  PAGINATION_DEFAULT_SIZES,
  PAGINATION_STATE_KEY,
  ROW_SELECTION_STATE_KEY,
  SORTING_STATE_KEY,
} from './modus-table.constants';
import {
  ModusTableColumnOrderState,
  ModusTableColumnSizingState,
  ModusTableColumnVisibilityState,
  ModusTableDataUpdaterProps,
  ModusTableExpandedState,
  ModusTablePaginationState,
  ModusTableSortingState,
} from './models/modus-table.models';
import ColumnDragState from './models/column-drag-state.model';
import {
  ModusTableColumn,
  ModusTableCellLink,
  ModusTableDisplayOptions,
  ModusTableToolbarOptions,
  ModusTableRowSelectionOptions,
} from './models/modus-table.models';
import { ModusTableColumnDropIndicator, ModusTableColumnDragItem } from './parts/modus-table-drag-item';
import { ModusTablePagination } from './parts/modus-table-pagination';
import { ModusTableFooter } from './parts/modus-table-footer';
import { TableHeaderDragDrop } from './utilities/table-header-drag-drop.utility';
import ModusTableCore from './modus-table.core';
import ModusTableState from './models/modus-table-state.model';
import { ModusTableHeader } from './parts/modus-table-header';
import { ModusTableBody } from './parts/modus-table-body';

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
  @Element() element: HTMLElement;

  /** (Required) To display headers in the table. */
  @Prop({ mutable: true }) columns!: ModusTableColumn<unknown>[];
  @Watch('columns') onColumnsChange(newVal: ModusTableColumn<unknown>[]) {
    this.tableCore?.setOptions('columns', (newVal as ColumnDef<unknown>[]) ?? []);
  }

  /* (optional) To manage column resizing */
  @Prop() columnResize = false;
  @Watch('columnResize') onColumnResizeChange(newVal: boolean) {
    this.tableCore?.setOptions('enableColumnResizing', newVal);
  }

  /** (Optional) To allow column reordering. */
  @Prop() columnReorder = false;
  @Watch('columnReorder') onColumnReorderChange() {
    this.tableCore.setState('columnOrder', this.tableState.columnOrder);
  }

  /** (Required) To display data in the table. */
  @Prop({ mutable: true }) data!: unknown[];
  @Watch('data') onDataChange(newVal: unknown[]) {
    this.tableCore?.setOptions('data', newVal);
  }

  /** (Optional) To control display options of table. */
  @Prop() displayOptions?: ModusTableDisplayOptions = {
    borderless: false,
    cellBorderless: false,
  };

  /** (Optional) To enable row hover in table. */
  @Prop() hover = false;

  /* (optional) To manage table resizing */
  @Prop() fullWidth = false;

  /** (Optional) To display a vertical scrollbar when the height is exceeded. */
  @Prop() maxHeight: string;

  /** (Optional) To display a horizontal scrollbar when the width is exceeded. */
  @Prop() maxWidth: string;

  /* (optional) To set pagesize for the pagination. */
  @Prop() pageSizeList: number[] = PAGINATION_DEFAULT_SIZES;

  /* (optional) To enable pagination for the table. */
  @Prop() pagination: boolean;

  /** (Optional) To display expanded rows. */
  @Prop() rowsExpandable = false;
  @Watch('rowsExpandable') onRowsExpandableChange() {
    if (this.rowsExpandable) {
      this.frozenColumns.push(this.tableState.columnOrder[0]);
    }
    if (this.toolbarOptions?.columnsVisibility) {
      this.toolbarOptions.columnsVisibility.requiredColumns = [
        ...this.toolbarOptions.columnsVisibility.requiredColumns,
        ...this.frozenColumns,
      ];
    }
  }

  /** (Optional) To display checkbox. */
  @Prop() rowSelection = false;

  /** (Optional) To control multiple row selection. */
  @Prop() rowSelectionOptions: ModusTableRowSelectionOptions = {
    multiple: false,
    subRowSelection: false,
  };
  @Watch('rowSelectionOptions') onRowSelectionOptionsChange(
    newVal: ModusTableRowSelectionOptions,
    oldVal: ModusTableRowSelectionOptions
  ) {
    if (newVal.multiple !== oldVal.multiple || newVal.subRowSelection !== oldVal.subRowSelection) {
      this.rowSelectionOptions.multiple = newVal.multiple;
      this.rowSelectionOptions.subRowSelection = newVal.subRowSelection;
    }
  }

  /** (Optional) To display sort icon on hover. */
  @Prop() showSortIconOnHover = false;

  /** (Optional) To sort data in table. */
  @Prop() sort = false;
  @Watch('sort') onSortChange(newVal) {
    this.tableCore?.setOptions('enableSorting', newVal);
  }

  /** (Optional) To display summary row. */
  @Prop() summaryRow = false;

  /** (Optional) To display a toolbar for the table. */
  @Prop() toolbar = false;

  /** (Optional) To display a toolbar, which allows access to table operations like hiding columns. */
  @Prop() toolbarOptions: ModusTableToolbarOptions | null = null;
  @Watch('toolbarOptions') onToolbarOptionsChange(newVal: ModusTableToolbarOptions | null) {
    this.tableCore?.setOptions('enableHiding', !!newVal?.columnsVisibility);
    this.onRowsExpandableChange();
  }

  /** Emits the link that was clicked */
  @Event() cellLinkClick: EventEmitter<ModusTableCellLink>;

  /** Emits columns in the updated order */
  @Event() columnOrderChange: EventEmitter<ModusTableColumnOrderState>;

  /** Emits latest column size */
  @Event() columnSizingChange: EventEmitter<ModusTableColumnSizingState>;

  /** Emits visibility state of each column */
  @Event() columnVisibilityChange: EventEmitter<ModusTableColumnVisibilityState>;

  /** Emits expanded state of the columns */
  @Event() rowExpanded: EventEmitter<ModusTableExpandedState>;

  /** Emits rows selected */
  @Event() rowSelectionChange: EventEmitter<unknown>;

  /** Emits edited row data */
  @Event() rowUpdated: EventEmitter<unknown>;

  /** Emits column sort order */
  @Event() sortChange: EventEmitter<ModusTableSortingState>;

  /** Emits selected page index and size */
  @Event() paginationChange: EventEmitter<ModusTablePaginationState>;

  @State() tableState: ModusTableState = {
    columnSizing: {},
    columnSizingInfo: {} as ColumnSizingInfoState,
    expanded: null,
    sorting: [],
    pagination: {
      pageIndex: 0,
      pageSize: this.pageSizeList[0],
    },
    columnVisibility: {},
    columnOrder: [],
    rowSelection: {},
  };

  @State() tableCore: ModusTableCore;
  @State() itemDragState: ColumnDragState;
  @State() dragAndDropObj: TableHeaderDragDrop = new TableHeaderDragDrop();

  private frozenColumns: string[] = []; // Columns will remain on the left and be unable to reorder, or modify their visibility.
  private isColumnResizing = false;

  private onMouseMove = (event: MouseEvent) => this.handleDragOver(event);
  private onKeyDown = (event: KeyboardEvent) => this.handleKeyDown(event);
  private onMouseUp = () => this.handleDrop();

  componentWillLoad(): void {
    this.setTableState({ columnOrder: this.columns?.map((column) => column.id as string) });
    this.onRowsExpandableChange();
    this.initializeTable();
  }

  /**
   * Returns data of a column.
   * @param accessorKey : Column name as key.
   * @returns : Column data as Array or empty array.
   */
  @Method()
  async getColumnData(accessorKey: string): Promise<unknown[]> {
    const columns: Column<unknown, unknown>[] = this.tableCore.getTableInstance().getAllLeafColumns();

    let rowData: unknown[] = [];
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].columnDef['accessorKey'] === accessorKey) {
        rowData = this.tableCore.getTableInstance().options.data.map((row) => row[accessorKey]);
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
    this.tableCore
      .getTableInstance()
      .getAllLeafColumns()
      .forEach((column) => {
        if (column.id === columnId) {
          column.toggleVisibility(show);
        }
      });
  }

  @Listen('click', { target: 'document' })
  documentClickHandler(event: MouseEvent): void {
    if (event.defaultPrevented) {
      return;
    }
    // Deactivating the column resizing mode if other click events happened
    this.tableCore.getTableInstance().setColumnSizingInfo({
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
        this.tableState.columnOrder,
        this.columnReorder,
        this.isColumnResizing,
        this.element,
        this.tableCore.getTableInstance(),
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
    this.setTableState({ columnOrder: this.dragAndDropObj.columnOrder });
    this.itemDragState = this.dragAndDropObj.itemDragState;
  }

  handleDrop(): void {
    this.dragAndDropObj.handleDrop();
    this.setTableState({ columnOrder: this.dragAndDropObj.columnOrder });
    this.columnOrderChange.emit(this.dragAndDropObj.columnOrder);
    this.itemDragState = null;
  }

  handleCellValueChange(props: ModusTableDataUpdaterProps) {
    const { rowId, accessorKey, newValue } = props;
    this.updateData((old: unknown[]) => {
      const newData = [...old];
      // rowId is a string of IDs for row with nested information.
      const idArray: number[] = rowId.split('.')?.map((id) => parseInt(id));

      if (idArray.length === 1) {
        newData[idArray[0]][accessorKey] = newValue;
      } else if (idArray.length === 2) {
        newData[idArray[0]]['subRows'][idArray[1]][accessorKey] = newValue;
      } else if (idArray.length === 3) {
        newData[idArray[0]]['subRows'][idArray[1]]['subRows'][idArray[2]][accessorKey] = newValue;
      }

      return newData;
    });
  }

  initializeTable(): void {
    this.tableCore = new ModusTableCore({
      data: this.data ?? [],
      columns: this.columns,
      columnResize: this.columnResize,
      sort: this.sort,
      pagination: this.pagination,
      pageSizeList: this.pageSizeList,
      rowSelection: this.rowSelection,
      rowSelectionOptions: this.rowSelectionOptions,
      columnOrder: this.columnReorder ? this.tableState.columnOrder : [],
      toolbarOptions: this.toolbarOptions,

      // setData: (updater: Updater<unknown[]>) => this.updateData(updater),
      setExpanded: (updater: Updater<ExpandedState>) => this.updateTableCore(updater, EXPANDED_STATE_KEY, this.rowExpanded),
      setSorting: (updater: Updater<SortingState>) => this.updateTableCore(updater, SORTING_STATE_KEY, this.sortChange),
      setRowSelection: (updater: Updater<RowSelectionState>) => this.updateRowSelection(updater),
      setPagination: (updater: Updater<PaginationState>) =>
        this.updateTableCore(updater, PAGINATION_STATE_KEY, this.paginationChange),
      setColumnSizing: (updater: Updater<ColumnSizingState>) =>
        this.updateTableCore(updater, COLUMN_SIZING_STATE_KEY, this.columnSizingChange),
      setColumnSizingInfo: (updater: Updater<ColumnSizingInfoState>) => this.updateColumnSizingInfo(updater),
      setColumnVisibility: (updater: Updater<VisibilityState>) =>
        this.updateTableCore(updater, COLUMN_VISIBILITY_STATE_KEY, this.columnVisibilityChange),
      setColumnOrder: (updater: Updater<ColumnOrderState>) => {
        this.updateTableCore(updater, COLUMN_ORDER_STATE_KEY);
      },
    });
  }

  setTableState(state: ModusTableState): void {
    this.tableState = { ...this.tableState, ...state };
  }

  updateTableCore(updater: Updater<unknown>, key: string, event: EventEmitter<unknown> = null) {
    //
    const newState = { ...this.tableState };
    newState[key] = this.tableCore.getState(updater, this.tableState[key]);

    /**
     * maintaining the state of the table in the component is necessary to re-render the table and be in consistent with the internal state of Tanstack table instance(this.tableCore).
     */
    this.setTableState(newState);
    this.tableCore.setState(key, this.tableState[key]);
    if (event) event.emit(this.tableState[key]);
  }

  updateData(updater: Updater<unknown>): void {
    this.data = this.tableCore.getState(updater, this.data) as unknown[];
    this.tableCore.setState('data', this.data);
  }

  updateRowSelection(updater: Updater<unknown>): void {
    this.updateTableCore(updater, ROW_SELECTION_STATE_KEY);
    this.rowSelectionChange.emit(
      this.tableCore
        .getTableInstance()
        .getSelectedRowModel()
        .flatRows.map((row) => row.original)
    );
  }

  updateColumnSizingInfo(updater: Updater<ColumnSizingInfoState>): void {
    this.updateTableCore(updater, COLUMN_SIZING_INFO_STATE_KEY);
    this.isColumnResizing = !this.tableState.columnSizingInfo.isResizingColumn ? false : true;
  }

  renderToolBar(table: Table<unknown>): JSX.Element | null {
    return (
      this.toolbar &&
      this.toolbarOptions && (
        <modus-table-toolbar table={table} options={this.toolbarOptions}>
          <div slot="group-left">
            <slot name="groupLeft"></slot>
          </div>
          <div slot="group-right">
            <slot name="groupRight"></slot>
          </div>
        </modus-table-toolbar>
      )
    );
  }

  renderMain(table: Table<unknown>): JSX.Element | null {
    const { borderless, cellBorderless } = this.displayOptions || {};
    const tableContainerClass = {
      'table-container': true,
      borderless: borderless,
    };

    return (
      <Fragment>
        <div class={tableContainerClass} style={{ maxHeight: this.maxHeight }}>
          {this.renderTable(table)}

          <modus-table-filler-column
            container={this.element}
            summary-row={this.summaryRow}
            cell-borderless={cellBorderless}></modus-table-filler-column>
        </div>
        <slot name="customFooter" />
      </Fragment>
    );
  }

  renderTable(table: Table<unknown>): JSX.Element | null {
    const { multiple } = this.rowSelectionOptions;
    const totalSize = table.getTotalSize();

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
      <table data-test-id="main-table" class={tableMainClass} style={tableStyle}>
        {this.renderTableHeader(table, multiple)}
        {this.renderTableBody(table, multiple)}
        {this.renderTableFooter(table)}
      </table>
    );
  }

  renderTableHeader(table: Table<unknown>, multipleRowSelection: boolean): JSX.Element | null {
    const setColumnResizing = (val: boolean) => (this.isColumnResizing = val);

    const getColumnResizing = () => this.isColumnResizing;

    const onDragStart = (
      event: MouseEvent | KeyboardEvent,
      id: string,
      elementRef: HTMLTableCellElement,
      mouseInteracted: boolean
    ) => this.handleDragStart(event, id, elementRef, mouseInteracted);

    return (
      <ModusTableHeader
        columnReorder={this.columnReorder}
        frozenColumns={this.frozenColumns}
        rowSelection={this.rowSelection}
        showSortIconOnHover={this.showSortIconOnHover}
        table={table}
        multipleRowSelection={multipleRowSelection}
        setColumnResizing={setColumnResizing}
        getColumnResizing={getColumnResizing}
        onDragStart={onDragStart}></ModusTableHeader>
    );
  }

  renderTableBody(table: Table<unknown>, multipleRowSelection: boolean): JSX.Element | null {
    // Needed in the future to include overflow menu action
    const rowActions = this.rowsExpandable && { expandable: this.rowsExpandable };
    return (
      <ModusTableBody
        table={table}
        hover={this.hover}
        rowSelection={this.rowSelection}
        multipleRowSelection={multipleRowSelection}
        rowActions={rowActions}
        cellValueChange={(props: ModusTableDataUpdaterProps) => this.handleCellValueChange(props)}
        cellLinkClick={(link: ModusTableCellLink) => this.cellLinkClick.emit(link)}></ModusTableBody>
    );
  }

  renderTableFooter(table: Table<unknown>): JSX.Element | null {
    const footerGroups: HeaderGroup<unknown>[] = table.getFooterGroups();
    return this.summaryRow ? (
      <ModusTableFooter
        footerGroups={[footerGroups[0]]}
        tableData={this.data}
        frozenColumns={this.frozenColumns}
        rowSelection={this.rowSelection}
      />
    ) : null;
  }

  renderPagination(table: Table<unknown>): JSX.Element | null {
    return (
      this.pagination && (
        <ModusTablePagination table={table} totalCount={this.data.length} pageSizeList={this.pageSizeList} />
      )
    );
  }

  render(): void {
    const table = this.tableCore.getTableInstance();
    return (
      <Host>
        <div style={{ maxWidth: this.maxWidth }}>
          {this.renderToolBar(table)}
          {this.renderMain(table)}
          {this.renderPagination(table)}
          <ModusTableColumnDragItem draggingState={this.itemDragState} />
          <ModusTableColumnDropIndicator position={this.itemDragState?.dropIndicator} />
        </div>
      </Host>
    );
  }
}

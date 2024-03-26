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
  PaginationState,
  RowSelectionState,
  Updater,
  VisibilityState,
  SortingState,
  Row,
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
  ModusTableManualSortingOptions,
  ModusTableCellValueChange,
  ModusTableColumnOrderState,
  ModusTableColumnSizingState,
  ModusTableColumnVisibilityState,
  ModusTableExpandedState,
  ModusTableManualPaginationOptions,
  ModusTablePaginationState,
  ModusTableRowAction,
  ModusTableRowActionClick,
  ModusTableSortingState,
  ModusTableRowWithId,
  ModusTableColumnSort,
} from './models/modus-table.models';
import ColumnDragState from './models/column-drag-state.model';
import {
  ModusTableColumn,
  ModusTableCellLink,
  ModusTableDisplayOptions,
  ModusTableToolbarOptions,
  ModusTableRowSelectionOptions,
} from './models/modus-table.models';
import { ModusTableColumnDropIndicator, ModusTableColumnDragItem } from './parts/columnHeader/modus-table-column-drag-item';
import { ModusTablePagination } from './parts/modus-table-pagination';
import { ModusTableFooter } from './parts/modus-table-footer';
import { TableHeaderDragDrop } from './utilities/table-header-drag-drop.utility';
import ModusTableCore from './modus-table.core';
import TableState from './models/table-state.model';
import { ModusTableHeader } from './parts/modus-table-header';
import { ModusTableBody } from './parts/modus-table-body';
import { TableContext, TableCellEdited } from './models/table-context.models';
import { TableRowActionWithOverflow } from './models/table-row-actions.models';
import { createGuid } from '../../utils/utils';

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
    if (this.pagination && !this.manualPaginationOptions) {
      const maxPageIndex = Math.ceil(this.data.length / this.tableState.pagination.pageSize) - 1;

      if (this.tableState.pagination.pageIndex > maxPageIndex) {
        this.tableState.pagination.pageIndex = maxPageIndex >= 0 ? maxPageIndex : 0;
      }
    }
    this.tableCore.setState('pagination', {
      ...this.tableState.pagination,
      pageIndex: this.tableState.pagination.pageIndex,
      pageSize: this.pagination ? this.tableState.pagination.pageSize : this.data.length,
    });
    this.tableCore?.setOptions('data', newVal);
  }

  /** (optional) The density of the table. */
  @Prop() density: 'relaxed' | 'comfortable' | 'compact' = 'relaxed';

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
  @Watch('pagination')
  onPaginationChange(newVal: boolean) {
    if (newVal) {
      this.tableState.pagination.pageIndex = 0;
      this.tableState.pagination.pageSize = this.pageSizeList[0];
    }
    this.tableCore?.setState('pagination', {
      pageIndex: 0,
      pageSize: newVal === true ? this.pageSizeList[0] : this.data.length,
    });
  }

  /** (Optional) Actions that can be performed on each row. A maximum of 4 icons will be shown, including overflow menu and expand icons. */
  @Prop() rowActions: ModusTableRowAction[] = [];

  /** (Optional) To display expanded rows. */
  @Prop() rowsExpandable = false;
  @Watch('rowsExpandable') onRowsExpandableChange(newVal: boolean) {
    if (newVal) {
      this.freezeColumn(this.tableState.columnOrder[0]);
    }
  }

  /** (Optional) To display checkbox. */
  @Prop() rowSelection = false;
  @Watch('rowSelection') onRowSlectionChange(newVal: boolean) {
    this.tableCore.setOptions('enableRowSelection', newVal);
  }

  /** (Optional) To enable manual pagination mode. When enabled, the table will not automatically paginate rows, instead will expect the current page index and other details to be passed. */
  @Prop() manualPaginationOptions: ModusTableManualPaginationOptions;
  @Watch('manualPaginationOptions') onManualPaginationOptionsChange(newVal: ModusTableManualPaginationOptions) {
    if (Object.keys(newVal).length === 0) {
      this.tableCore?.setOptions('manualPagination', false);
      this.tableCore?.setState('pagination', {
        pageIndex: 0,
        pageSize: this.pageSizeList[0],
      });
    } else {
      this.tableCore?.setOptions('pageCount', newVal.pageCount);
      this.tableCore?.setOptions('manualPagination', true);
      this.tableCore?.setState('pagination', {
        pageIndex: newVal.currentPageIndex - 1,
        pageSize: newVal.currentPageSize,
      });
    }
  }

  /** (Optional) To set modus-table in manual sorting mode. */
  @Prop() manualSortingOptions: ModusTableManualSortingOptions;
  @Watch('manualSortingOptions') onManualSortOptionsChange(
    newVal: ModusTableManualSortingOptions,
    oldVal: ModusTableManualSortingOptions
  ) {
    if (newVal?.currentSortingState.length === 0) {
      if (oldVal && oldVal.currentSortingState.length > 0) {
        this.tableCore?.setOptions('manualSorting', true);
        this.tableCore?.setState('sorting', newVal.currentSortingState);
        this.manualSortingOptions = { ...newVal };
      }
    } else if (
      newVal?.currentSortingState[0]?.id !== oldVal?.currentSortingState[0]?.id ||
      newVal?.currentSortingState[0]?.desc !== oldVal?.currentSortingState[0]?.desc
    ) {
      this.tableCore?.setOptions('manualSorting', true);
      this.tableCore?.setState('sorting', newVal.currentSortingState);
      this.manualSortingOptions = { ...newVal };
    }
  }

  /** (Optional) To control multiple row selection. */
  @Prop() rowSelectionOptions: ModusTableRowSelectionOptions = {
    multiple: false,
    subRowSelection: false,
  };
  @Watch('rowSelectionOptions') onRowSelectionOptionsChange(
    newVal: ModusTableRowSelectionOptions,
    oldVal: ModusTableRowSelectionOptions
  ) {
    if (
      newVal.multiple !== oldVal.multiple ||
      newVal.subRowSelection !== oldVal.subRowSelection ||
      newVal.preSelectedRows !== oldVal.preSelectedRows
    ) {
      this.tableCore?.setOptions('enableMultiRowSelection', newVal.multiple);
      this.tableCore?.setState('rowSelection', newVal.preSelectedRows);
      this.tableCore?.setState('subRowSelection', newVal.subRowSelection);
    }
  }

  /** (Optional) To display sort icon on hover. */
  @Prop() showSortIconOnHover = false;

  /** (Optional) To sort data in table. */
  @Prop() sort = false;
  @Watch('sort') onSortChange(newVal) {
    this.tableCore?.setOptions('enableSorting', newVal);
  }

  /** (Optional) To display a-z or arrow sort icons. */
  @Prop() sortIconStyle: 'alphabetical' | 'directional' = 'alphabetical';

  /** (Optional) To display summary row. */
  @Prop() summaryRow = false;

  /** (Optional) To display a toolbar for the table. */
  @Prop() toolbar = false;

  /** (Optional) To display a toolbar, which allows access to table operations like hiding columns. */
  @Prop() toolbarOptions: ModusTableToolbarOptions | null = null;
  @Watch('toolbarOptions') onToolbarOptionsChange(newVal: ModusTableToolbarOptions | null) {
    this.tableCore?.setOptions('enableHiding', !!newVal?.columnsVisibility);
    this.onRowsExpandableChange(this.rowsExpandable);
  }

  /** (Optional) To set the default sorting for the table. */
  @Prop() defaultSort: ModusTableColumnSort;
  @Watch('defaultSort') onDefaultSortChange(newVal: ModusTableColumnSort | null) {
    if (!(this.manualSortingOptions?.currentSortingState?.length > 0)) {
      this.tableCore?.setState('sorting', [newVal]);
    }
  }

  /** (Optional) To wrap text that overflows the cell. */
  @Prop() wrapText = false;

  /** Emits the cell value that was edited */
  @Event() cellValueChange: EventEmitter<ModusTableCellValueChange>;

  /** Emits the link that was clicked */
  @Event() cellLinkClick: EventEmitter<ModusTableCellLink>;

  /** Emits columns in the updated order */
  @Event() columnOrderChange: EventEmitter<ModusTableColumnOrderState>;

  /** Emits latest column size */
  @Event() columnSizingChange: EventEmitter<ModusTableColumnSizingState>;

  /** Emits visibility state of each column */
  @Event() columnVisibilityChange: EventEmitter<ModusTableColumnVisibilityState>;

  /** An event that fires when a row action is clicked. */
  @Event() rowActionClick: EventEmitter<ModusTableRowActionClick>;

  /** Emits expanded state of the columns */
  @Event() rowExpanded: EventEmitter<ModusTableExpandedState>;

  /** Emits rows selected */
  @Event() rowSelectionChange: EventEmitter<unknown>;

  /** Emits column sort order */
  @Event() sortChange: EventEmitter<ModusTableSortingState>;

  /** Emits selected page index and size */
  @Event() paginationChange: EventEmitter<ModusTablePaginationState>;

  @State() itemDragState: ColumnDragState;
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

  @State() dragAndDropObj: TableHeaderDragDrop = new TableHeaderDragDrop();
  @State() tableState: TableState = {
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

  classByDensity: Map<string, string> = new Map([
    ['relaxed', 'density-relaxed'],
    ['comfortable', 'density-comfortable'],
    ['compact', 'density-compact'],
  ]);

  private frozenColumns: string[] = [];
  private isColumnResizing = false;
  private _id: string;
  private _context: TableContext;

  private onMouseMove = (event: MouseEvent) => this.handleDragOver(event);
  private onKeyDown = (event: KeyboardEvent) => this.handleKeyDown(event);
  private onMouseUp = () => this.handleDrop();

  componentWillLoad(): void {
    this._id = this.element.id || `modus-table-${createGuid()}`;
    this.columns = this.columns?.map((column) => ({
      ...column,
      sortingFn: column.sortingFn ?? 'alphanumeric',
    }));

    const initialTableState: TableState = {
      columnOrder: this.columns?.map((column) => column.id as string),
      rowSelection: this.getPreselectedRowState(),
    };

    if (this.manualPaginationOptions?.currentPageSize) {
      initialTableState.pagination = {
        ...this.tableState.pagination,
        pageSize: this.manualPaginationOptions.currentPageSize,
      };
    }

    this.setTableState(initialTableState);
    this.onRowsExpandableChange(this.rowsExpandable);
    this.initializeTable();
  }

  componentWillRender(): void {
    this._context = this.getTableContext();
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

  freezeColumn(columnId: string): void {
    this.frozenColumns.push(columnId);
    if (this.toolbarOptions?.columnsVisibility) {
      this.toolbarOptions.columnsVisibility.requiredColumns = [
        ...this.toolbarOptions.columnsVisibility.requiredColumns,
        ...this.frozenColumns,
      ];
    }
  }

  getRowId(originalRow: unknown, index: number, parent?: Row<unknown>): string {
    if (Object.prototype.hasOwnProperty.call(originalRow, 'id')) return (originalRow as ModusTableRowWithId).id;
    if (parent) return `${parent.id}.${index}`;
    return `${index}`;
  }

  getRowActionsWithOverflow(): TableRowActionWithOverflow[] {
    if (this.rowActions) {
      const sortedActions = this.rowActions.sort((a, b) => a.index - b.index);
      const visibleLimit = sortedActions.length < 5 ? 4 : 3;
      const actionButtons = sortedActions.slice(0, visibleLimit);
      const overflowMenu = sortedActions.slice(visibleLimit).map((action) => ({ ...action, isOverflow: true }));

      return [...actionButtons, ...overflowMenu];
    }

    return null;
  }

  getTableContext(): TableContext {
    return {
      element: this.element,
      data: this.data,
      density: this.density,
      sort: this.sort,
      sortIconStyle: this.sortIconStyle,
      componentId: this._id,
      hover: this.hover,
      pagination: this.pagination,
      pageSizeList: this.pageSizeList,
      manualPaginationOptions: this.manualPaginationOptions,
      rowActions: this.getRowActionsWithOverflow(),
      rowSelection: this.rowSelection,
      rowSelectionOptions: this.rowSelectionOptions,
      rowsExpandable: this.rowsExpandable,
      columns: this.columns,
      columnReorder: this.columnReorder,
      columnResize: this.columnResize,
      rowSelectionChange: this.rowSelectionChange,
      rowExpanded: this.rowExpanded,
      rowActionClick: this.rowActionClick,
      sortChange: this.sortChange,
      paginationChange: this.paginationChange,
      columnSizingChange: this.columnSizingChange,
      columnVisibilityChange: this.columnVisibilityChange,
      columnOrderChange: this.columnOrderChange,
      cellValueChange: this.cellValueChange,
      cellLinkClick: this.cellLinkClick,
      showSortIconOnHover: this.showSortIconOnHover,
      displayOptions: this.displayOptions,
      toolbarOptions: this.toolbarOptions,
      toolbar: this.toolbar,
      summaryRow: this.summaryRow,
      fullWidth: this.fullWidth,
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      frozenColumns: this.frozenColumns,
      isColumnResizing: this.isColumnResizing,
      tableCore: this.tableCore,
      tableInstance: this.tableCore.getTableInstance(),
      wrapText: this.wrapText,
      onColumnsChange: this.onColumnsChange,
      onColumnResizeChange: this.onColumnResizeChange,
      onColumnReorderChange: this.onColumnReorderChange,
      onDataChange: this.onDataChange,
      onRowsExpandableChange: this.onRowsExpandableChange,
      onRowSelectionOptionsChange: this.onRowSelectionOptionsChange,
      onSortChange: this.onSortChange,
      onToolbarOptionsChange: this.onToolbarOptionsChange,
      getRowId: this.getRowId,
      updateData: this.updateData.bind(this),
    };
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

  getPreselectedRowState(): RowSelectionState {
    const selection = {};
    this.rowSelectionOptions.preSelectedRows?.forEach((row) => (selection[row] = true));
    return selection;
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
      preSelectedRows: this.getPreselectedRowState(),
      defaultSort: this.defaultSort,

      ...(this.manualPaginationOptions && {
        manualPagination: true,
        pageCount: this.manualPaginationOptions.pageCount,
      }),
      ...(this.manualSortingOptions && {
        manualSorting: true,
        sortingState: this.manualSortingOptions.currentSortingState,
      }),
      getRowId: (originalRow: unknown, index: number, parent?: Row<unknown>) => this.getRowId(originalRow, index, parent),
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

  setTableState(state: TableState): void {
    this.tableState = { ...this.tableState, ...state };
  }

  updateTableCore(updater: Updater<unknown>, key: string, event: EventEmitter<unknown> = null) {
    const newTableState = { ...this.tableState };
    newTableState[key] = this.tableCore.getState(updater, this.tableState[key]);
    /**
     * Maintaining a local state of the table is necessary for the component to re-render and stay consistent with the internal state of Tanstack table.
     */
    this.setTableState(newTableState);
    this.tableCore.setState(key, this.tableState[key]);
    if (event) event.emit(this.tableState[key]);
  }

  updateData(updater: Updater<unknown>, context: TableCellEdited): void {
    this.data = this.tableCore.getState(updater, this.data) as unknown[];
    this.tableCore.setState('data', this.data);
    this.cellValueChange.emit({ ...context, data: this.data });
  }

  updateRowSelection(updater: Updater<unknown>): void {
    this.updateTableCore(updater, ROW_SELECTION_STATE_KEY);
    this.rowSelectionChange.emit(
      this.tableCore
        .getTableInstance()
        .getSelectedRowModel()
        .flatRows.map((row) => {
          row.original['id'] = row.id;
          return row.original;
        })
    );
  }

  updateColumnSizingInfo(updater: Updater<ColumnSizingInfoState>): void {
    this.updateTableCore(updater, COLUMN_SIZING_INFO_STATE_KEY);
    this.isColumnResizing = !this.tableState.columnSizingInfo.isResizingColumn ? false : true;
  }

  renderToolBar(): JSX.Element | null {
    return (
      this.toolbar &&
      this.toolbarOptions && (
        <modus-table-toolbar context={this._context}>
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

  renderMain(): JSX.Element | null {
    const {
      displayOptions: { borderless, cellBorderless },
    } = this._context;
    const tableContainerClass = {
      'table-container': true,
      borderless: borderless,
    };

    return (
      <Fragment>
        <div class={tableContainerClass} style={{ maxHeight: this.maxHeight }}>
          {this.renderTable()}

          {!this.fullWidth && (
            <modus-table-filler-column
              container={this.element}
              summary-row={this.summaryRow}
              cell-borderless={cellBorderless}></modus-table-filler-column>
          )}
        </div>
        <slot name="customFooter" />
      </Fragment>
    );
  }

  renderTable(): JSX.Element | null {
    const {
      tableInstance: { getTotalSize },
    } = this._context;
    const totalSize = getTotalSize();

    const tableMainClass = `
      ${this.displayOptions?.borderless ? 'borderless' : ''}
      ${this.displayOptions?.cellBorderless ? 'cell-borderless' : ''}
      ${this.classByDensity.get(this.density)}
    `;

    const tableStyle = this.fullWidth
      ? { width: '100%', tableLayout: 'fixed' }
      : totalSize > 0
        ? { width: `${totalSize}px`, tableLayout: 'fixed' }
        : { tableLayout: 'fixed' };

    return (
      <table data-test-id="main-table" class={tableMainClass} style={tableStyle}>
        {this.renderTableHeader()}
        {this.renderTableBody()}
        {this.renderTableFooter()}
      </table>
    );
  }

  renderTableHeader(): JSX.Element | null {
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
        context={this._context}
        setColumnResizing={setColumnResizing}
        getColumnResizing={getColumnResizing}
        onDragStart={onDragStart}></ModusTableHeader>
    );
  }

  renderTableBody(): JSX.Element | null {
    return <ModusTableBody context={this._context}></ModusTableBody>;
  }

  renderTableFooter(): JSX.Element | null {
    return this.summaryRow ? <ModusTableFooter context={this._context} /> : null;
  }

  renderPagination(): JSX.Element | null {
    return this.pagination && <ModusTablePagination context={this._context} />;
  }

  render(): void {
    return (
      <Host id={this._id}>
        <div style={{ maxWidth: this.maxWidth }}>
          {this.renderToolBar()}
          {this.renderMain()}
          {this.renderPagination()}
          <ModusTableColumnDragItem draggingState={this.itemDragState} />
          <ModusTableColumnDropIndicator position={this.itemDragState?.dropIndicator} />
          <modus-table-row-actions-menu context={this._context}></modus-table-row-actions-menu>
        </div>
      </Host>
    );
  }
}

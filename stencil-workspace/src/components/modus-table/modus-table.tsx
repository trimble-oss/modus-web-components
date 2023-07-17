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
  HeaderGroup,
  PaginationState,
  Table,
  TableOptionsResolved,
  Updater,
  VisibilityState,
  createTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/table-core';
import { ModusTableColumn, ModusTableDisplayOptions, ModusTableSortingState, ModusTablePanelOptions } from './models';
import { ModusTableCell } from './parts/modus-table-cell';
import { ModusTablePagination } from './parts/modus-table-pagination';
import { ModusTableSummaryRow } from './parts/modus-table-summary-row';
import { DefaultPageSizes } from './constants/constants';
import { ModusTableHeader } from './parts/header/modus-table-header';
import { ColumnDragState } from './models/column-drag-state.model';
import { DragAndDrop } from './utilities/drag-and-drop.utility';
import { ModusTableDragItem } from './parts/modus-table-drag-item';

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
  @Watch('columns') updateColumsOnChange() {
    this.table.options.columns = this.columns;
  }

  /** (Required) To display data in the table. */
  @Prop({ mutable: true }) data!: unknown[];
  @Watch('data') updateDataOnChange() {
    this.table.options.data = this.data;
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

  /** Emits event on sort change */
  @Event() sortChange: EventEmitter<ModusTableSortingState>;

  /**
   * ColumnSizing has info about width of the column
   * whereas ColumnSizingInfo has the detailed info about resizing of the column
   */
  @State() columnSizing: ColumnSizingState = {};
  @State() columnSizingInfo: ColumnSizingInfoState = {} as ColumnSizingInfoState;

  @State() sorting: ModusTableSortingState = [];
  @State() table: Table<unknown>;
  @State() paginationState: PaginationState = {
    pageIndex: 0,
    pageSize: this.pageSizeList[0],
  };
  @State() columnVisibility: VisibilityState = {};
  @State() columnOrder: string[] = [];
  @State() itemDragState: ColumnDragState;
  @State() dragAndDropObj: DragAndDrop = new DragAndDrop();

  /** Column reorder variables start */
  private tableHeaderRowRef: HTMLTableRowElement;
  private headersList: NodeListOf<ChildNode>;
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
      this.itemDragState = null;
      this.dragAndDropObj.setValues(
        this.columnOrder,
        this.columnReorder,
        this.columnResizeEnabled,
        this.tableHeaderRowRef,
        this.headersList,
        this.table,
        this.itemDragState
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
        columnVisibility: {},
        columnOrder: this.columnReorder ? this.columnOrder : [],
        sorting: this.sorting,
      },
      enableSorting: this.sort,
      columnResizeMode: 'onChange',
      enableColumnResizing: this.columnResize,
      enableHiding: !!this.panelOptions?.columnsVisibility,
      sortDescFirst: false, // To-Do, workaround to prevent sort descending on certain columns, e.g. numeric.
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
    const tableStyle = this.fullWidth
      ? { width: '100%' }
      : { width: `${this.table.getTotalSize()}px`, tableLayout: 'fixed' };

    const headerGroups: HeaderGroup<unknown>[] = this.table.getHeaderGroups();
    const footerGroups: HeaderGroup<unknown>[] = this.table.getFooterGroups();
    const className = `
      ${this.displayOptions.borderless && 'borderless'}
      ${this.displayOptions.cellBorderless && 'cell-borderless'}
    `;

    return (
      <Host>
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
          <tbody>
            {this.table.getRowModel()?.rows.map((row) => {
              return (
                <tr key={row.id} class={this.hover && 'enable-hover'}>
                  {row.getAllCells()?.map((cell) => {
                    return <ModusTableCell cell={cell} />;
                  })}
                </tr>
              );
            })}
          </tbody>
          {this.summaryRow ? <ModusTableSummaryRow footerGroups={[footerGroups[0]]} tableData={this.data} /> : ''}
        </table>
        <slot name="customFooter"></slot>
        {this.pagination && (
          <ModusTablePagination table={this.table} totalCount={this.data.length} pageSizeList={this.pageSizeList} />
        )}

        <ModusTableDragItem draggingState={this.itemDragState}></ModusTableDragItem>
      </Host>
    );
  }
}

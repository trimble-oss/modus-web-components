import {
  JSX,
  Host,
  Element,
  State,
  Watch,
  Component,
  Prop,
  Method,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell } from '@tanstack/table-core';
import { ModusTableCellBadge, ModusTableCellEditorArgs, ModusTableCellLink } from '../../../models/modus-table.models';
import {
  COLUMN_DEF_DATATYPE_KEY,
  COLUMN_DEF_DATATYPE_INTEGER,
  COLUMN_DEF_CELL_EDITOR_TYPE_KEY,
  ALLOWED_CELL_EDIT_TYPES,
  CELL_EDIT_TYPE_TEXT,
  COLUMN_DEF_CELL_EDITOR_ARGS_KEY,
  COLUMN_DEF_DATATYPE_LINK,
  KEYBOARD_ENTER,
  KEYBOARD_ESCAPE,
  COLUMN_DEF_DATATYPE_BADGE,
} from '../../../modus-table.constants';
import NavigateTableCells from '../../../utilities/table-cell-navigation.utility';
import { CellFormatter } from '../../../utilities/table-cell-formatter.utility';
import { ModusTableCellLinkElement } from '../modus-table-cell-link-element';
import { ModusTableCellBadgeElement } from '../modus-table-cell-badge-element';
import { TableContext, TableCellEdited } from '../../../models/table-context.models';
import ModusTableCellExpandIcons from '../modus-table-cell-expand-icons';

@Component({
  tag: 'modus-table-cell-main',
})
export class ModusTableCellMain {
  @Element() el: HTMLElement;
  @Prop() cell: Cell<unknown, unknown>;
  @Prop() context: TableContext;
  @Prop() hasRowsExpandable: boolean;
  @Prop() valueChange: (props: TableCellEdited) => void;

  @State() editMode: boolean;
  @Watch('editMode') onEditModeChange(newValue: boolean) {
    if (newValue) this.cellEl.classList.add('edit-mode');
    else this.cellEl.classList.remove('edit-mode');
  }

  private cellEl: HTMLElement;
  private onCellClick: (e: MouseEvent) => void = (e) => this.handleCellClick(e);
  private onCellKeyDown: (e: KeyboardEvent) => void = (e: KeyboardEvent) => this.handleCellKeydown(e);
  private onCellBlur: (e: FocusEvent) => void = (e) => this.handleCellBlur(e);

  readonly cellEditableKey = 'cellEditable';
  readonly accessorKey = 'accessorKey';

  connectedCallback() {
    this.cellEl = this.el.parentElement;
    this.cellEl.addEventListener('click', this.onCellClick);
    this.cellEl.addEventListener('keydown', this.onCellKeyDown);
    this.cellEl.addEventListener('blur', this.onCellBlur);
  }

  disconnectedCallback() {
    if (this.cellEl) {
      this.cellEl.removeEventListener('click', this.onCellClick);
      this.cellEl.removeEventListener('keydown', this.onCellKeyDown);
      this.cellEl.removeEventListener('blur', this.onCellBlur);
    }
  }

  getEditorType(): string {
    const editorType = this.cell.column.columnDef[COLUMN_DEF_CELL_EDITOR_TYPE_KEY];
    const dataType = this.cell.column.columnDef[COLUMN_DEF_DATATYPE_KEY];

    let editorTypeToReturn = CELL_EDIT_TYPE_TEXT;

    if (!editorType) {
      if (ALLOWED_CELL_EDIT_TYPES.includes(dataType)) editorTypeToReturn = dataType;
    } else {
      editorTypeToReturn = editorType;
    }

    return editorTypeToReturn;
  }

  getEditorArgs(): ModusTableCellEditorArgs {
    return this.cell.column.columnDef[COLUMN_DEF_CELL_EDITOR_ARGS_KEY];
  }

  handleCellClick = (event: MouseEvent) => {
    if (event.defaultPrevented) return;

    if (this.cell.column.columnDef[this.cellEditableKey]) {
      this.editMode = true;
    } else {
      const { rowClick } = this.context;
      rowClick.emit({ row: this.cell.row.original, column: this.cell.column.id });
    }
  };

  /**
   * Returns whether a cell is editable based on row index and column ID.
   * @param rowIndex The index of the row.
   * @param columnId The ID of the column.
   * @returns Boolean indicating if the cell is editable.
   */
  @Method()
  async handleCellEdit(rowIndex: string, columnId: string): Promise<void> {
    const tableInstance = this.cell.getContext().table;
    const row = tableInstance.getRowModel().rows[rowIndex];

    if (!row) return;

    const cell = row.getAllCells().find((cell) => cell.column.id === columnId);
    if (!cell) return;

    // Focus on the cell element
    const cellElement = this.el.querySelector(`[data-cell-id="${rowIndex}-${columnId}"]`) as HTMLElement;
    if (cellElement) {
      cellElement.focus();
    }

    this.editMode = true;
  }

  handleCellBlur = (event: FocusEvent) => {
    if (!this.el.contains(event.relatedTarget as HTMLElement)) {
      this.editMode = false;
    }
  };

  handleCellKeydown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) return;

    const key = event.key?.toLowerCase();
    const isCellEditable = this.cell.column.columnDef[this.cellEditableKey];

    if (key === KEYBOARD_ENTER) {
      event.stopPropagation();
      if (isCellEditable && !this.editMode) {
        this.editMode = true;
      } else {
        const { rowClick } = this.context;
        rowClick.emit({ row: this.cell.row.original, column: this.cell.column.id });
      }
    } else {
      NavigateTableCells({
        eventKey: event.key,
        cellElement: this.cellEl,
      });
    }
  };

  handleCellEditorValueChange(newValue: string, oldValue: string) {
    if (this.editMode && newValue !== oldValue && this.valueChange) {
      this.valueChange({
        row: this.cell.row,
        accessorKey: this.cell.column.columnDef[this.accessorKey],
        newValue,
        oldValue,
      });
    }

    this.editMode = false;
  }

  handleCellEditorKeyDown = (event: KeyboardEvent, newValue: string, oldValue: string) => {
    const key = event.key?.toLowerCase();
    if (key === KEYBOARD_ENTER) {
      this.handleCellEditorValueChange(newValue, oldValue);
      NavigateTableCells({
        eventKey: KEYBOARD_ENTER,
        cellElement: this.cellEl,
      });
    } else if (key === KEYBOARD_ESCAPE) {
      this.editMode = false;
      this.cellEl.focus();
    } else return;

    event.stopPropagation();
  };

  renderCellValue(): JSX.Element[] {
    const { row, getValue } = this.cell;
    const cellValue = getValue();

    if (cellValue === null || cellValue === undefined) return null;

    const { cellLinkClick, wrapText } = this.context;
    const cellDataType = cellValue['_type'] ?? this.cell.column.columnDef[COLUMN_DEF_DATATYPE_KEY];
    const wrap: boolean = cellDataType === COLUMN_DEF_DATATYPE_BADGE ? false : wrapText;

    const classes = {
      'cell-content': true,
      'truncate-text': !wrap,
      'wrap-text': wrap,
      'text-align-right': cellDataType === COLUMN_DEF_DATATYPE_INTEGER,
    };

    const renderCell = () => {
      if (cellDataType === COLUMN_DEF_DATATYPE_LINK) {
        return (
          <ModusTableCellLinkElement
            link={cellValue as ModusTableCellLink}
            onLinkClick={(link: ModusTableCellLink) => {
              this.cellEl.focus();
              cellLinkClick.emit(link);
            }}
          />
        );
      } else if (cellDataType === COLUMN_DEF_DATATYPE_BADGE) {
        return (
          <ModusTableCellBadgeElement
            badge={cellValue as ModusTableCellBadge}
            onBadgeClick={() => {
              this.cellEl.focus();
            }}
          />
        );
      } else {
        return CellFormatter(this.cell.column.columnDef.cell, this.cell.getContext());
      }
    };

    return (
      <div class={classes}>
        {this.hasRowsExpandable && <ModusTableCellExpandIcons row={row} />}

        <span class={wrap ? 'wrap-text' : 'truncate-text'}>{renderCell()}</span>
      </div>
    );
  }

  render(): void {
    const valueString = this.cell.getValue()?.toString();

    return (
      <Host>
        {this.editMode ? (
          <modus-table-cell-editor
            data-type={this.cell.column.columnDef[COLUMN_DEF_DATATYPE_KEY]}
            value={this.cell.getValue()}
            type={this.getEditorType()}
            args={this.getEditorArgs()}
            valueChange={(newVal: string) => this.handleCellEditorValueChange(newVal, valueString)}
            keyDown={(event: KeyboardEvent, newVal: string) => this.handleCellEditorKeyDown(event, newVal, valueString)}
          />
        ) : (
          this.renderCellValue()
        )}
      </Host>
    );
  }
}

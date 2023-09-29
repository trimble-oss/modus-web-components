import {
  JSX,
  Host,
  Element,
  State,
  Watch,
  Component,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Cell, Row } from '@tanstack/table-core';
import {
  ModusTableCellEditorArgs,
  ModusTableCellLink,
  ModusTableDataUpdaterProps,
} from '../../../models/modus-table.models';
import {
  COLUMN_DEF_DATATYPE_KEY,
  COLUMN_DEF_DATATYPE_INTEGER,
  COLUMN_DEF_CELL_EDITOR_TYPE_KEY,
  ALLOWED_CELL_EDIT_TYPES,
  CELL_EDIT_TYPE_TEXT,
  COLUMN_DEF_CELL_EDITOR_ARGS_KEY,
  COLUMN_DEF_DATATYPE_LINK,
} from '../../../modus-table.constants';
import ModusTableCellExpandIcons from '../modus-table-cell-expand-icons';
import NavigateCell from '../../../utilities/table-cell-navigation.utility';
import { CellFormatter } from '../../../utilities/table-cell-formatter.utility';
import { ModusTableCellLinkElement } from '../modus-table-cell-link-element';
import RowActions from '../../../models/row-actions.model';

@Component({
  tag: 'modus-table-cell-main',
})
export class ModusTableCellMain {
  @Element() el: HTMLElement;
  @Prop() cell: Cell<unknown, unknown>;
  @Prop() cellIndex: number;
  @Prop() rowActions: RowActions;
  @Prop() valueChange: (props: ModusTableDataUpdaterProps) => void;
  @Prop() linkClick: (link: ModusTableCellLink) => void;

  @State() editMode: boolean;
  @Watch('editMode') onEditModeChange(newValue: boolean) {
    if (newValue) this.cellEl.classList.add('edit-mode');
    else this.cellEl.classList.remove('edit-mode');
  }

  private cellEl: HTMLElement;
  private onClick: () => void = () => this.handleClick();
  private onKeyDown: (e: KeyboardEvent) => void = (e: KeyboardEvent) => this.handleKeydown(e);
  private onBlur: (e: FocusEvent) => void = (e) => this.handleBlur(e);

  readonly cellEditableKey = 'cellEditable';
  readonly accessorKey = 'accessorKey';

  connectedCallback() {
    this.cellEl = this.el.parentElement;
    this.cellEl.addEventListener('click', this.onClick);
    this.cellEl.addEventListener('keydown', this.onKeyDown);
    this.cellEl.addEventListener('blur', this.onBlur);
  }

  disconnectedCallback() {
    if (this.cellEl) {
      this.cellEl.removeEventListener('click', this.onClick);
      this.cellEl.removeEventListener('keydown', this.onKeyDown);
      this.cellEl.removeEventListener('blur', this.onBlur);
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

  handleClick = () => {
    if (this.cell.column.columnDef[this.cellEditableKey]) {
      this.editMode = true;
    }
  };

  handleBlur = (event: FocusEvent) => {
    if (!this.el.contains(event.relatedTarget as HTMLElement)) {
      this.editMode = false;
    }
  };

  handleKeydown = (event: KeyboardEvent) => {
    NavigateCell(event, this.cell.column.columnDef[this.cellEditableKey], this.cellEl, this.cellIndex);
  };

  handleCellValueChange(newValue: string, oldValue: string, rowId: string) {
    this.editMode = false;

    if (newValue !== oldValue && this.valueChange) {
      this.valueChange({ rowId, accessorKey: this.cell.column.columnDef[this.accessorKey], newValue, oldValue });
    }
    this.cellEl?.focus();
  }

  renderCellValue(cellValue: unknown, row: Row<unknown>): JSX.Element[] {
    if (!cellValue) return null;

    const cellDataType = cellValue['_type'] ?? this.cell.column.columnDef[COLUMN_DEF_DATATYPE_KEY];
    const classes = {
      'cell-content': true,
      'text-align-right': cellDataType === COLUMN_DEF_DATATYPE_INTEGER,
    };

    return (
      <div class={classes}>
        {this.rowActions?.expandable && <ModusTableCellExpandIcons row={row} />}
        <span class="wrap-text">
          {cellDataType === COLUMN_DEF_DATATYPE_LINK ? (
            <ModusTableCellLinkElement
              link={cellValue as ModusTableCellLink}
              onLinkClick={(link: ModusTableCellLink) => {
                this.linkClick(link);
              }}
            />
          ) : (
            CellFormatter(this.cell.column.columnDef.cell, this.cell.getContext())
          )}
        </span>
      </div>
    );
  }

  render(): void {
    const cellValue = this.cell.getValue();
    const row = this.cell.row;
    return (
      <Host>
        {this.editMode ? (
          <modus-table-cell-editor
            value={cellValue as string}
            type={this.getEditorType()}
            args={this.getEditorArgs()}
            valueEntered={(newVal: string, oldVal: string) => this.handleCellValueChange(newVal, oldVal, row.id)}
          />
        ) : (
          this.renderCellValue(cellValue, row)
        )}
      </Host>
    );
  }
}

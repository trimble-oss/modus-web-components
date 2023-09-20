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
import { ModusTableCellEditorArgs, ModusTableCellLink } from '../../../models/modus-table.models';
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
} from '../../../modus-table.constants';
import ModusTableCellExpandIcons from '../modus-table-cell-expand-icons';
import NavigateTableCells from '../../../utilities/table-cell-navigation.utility';
import { CellFormatter } from '../../../utilities/table-cell-formatter.utility';
import { ModusTableCellLinkElement } from '../modus-table-cell-link-element';
import RowActions from '../../../models/row-actions.model';
import { ModusTableCellEdited } from '../../modus-table-body';

@Component({
  tag: 'modus-table-cell-main',
})
export class ModusTableCellMain {
  @Element() el: HTMLElement;
  @Prop() cell: Cell<unknown, unknown>;
  @Prop() cellIndex: number;
  @Prop() rowActions: RowActions;
  @Prop() valueChange: (props: ModusTableCellEdited) => void;
  @Prop() linkClick: (link: ModusTableCellLink) => void;

  @State() editMode: boolean;
  @Watch('editMode') onEditModeChange(newValue: boolean) {
    if (newValue) this.cellEl.classList.add('edit-mode');
    else this.cellEl.classList.remove('edit-mode');
  }

  private cellEl: HTMLElement;
  private onCellClick: () => void = () => this.handleCellClick();
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

  handleCellClick = () => {
    if (this.cell.column.columnDef[this.cellEditableKey]) {
      this.editMode = true;
    }
  };

  handleCellBlur = (event: FocusEvent) => {
    if (!this.el.contains(event.relatedTarget as HTMLElement)) {
      this.editMode = false;
    }
  };

  handleCellKeydown = (event: KeyboardEvent) => {
    const key = event.key?.toLowerCase();
    const isCellEditable = this.cell.column.columnDef[this.cellEditableKey];

    if (isCellEditable && !this.editMode && key === KEYBOARD_ENTER) {
      this.editMode = true;
      event.stopPropagation();
    } else {
      NavigateTableCells({
        key: event.key,
        cellElement: this.cellEl,
        cellIndex: this.cellIndex,
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
        key: KEYBOARD_ENTER,
        cellElement: this.cellEl,
        cellIndex: this.cellIndex,
      });
    } else if (key === KEYBOARD_ESCAPE) {
      this.editMode = false;
      this.cellEl.focus();
    } else return;

    event.stopPropagation();
  };

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
    const valueString = cellValue?.toString();
    const row = this.cell.row;

    return (
      <Host>
        {this.editMode ? (
          <modus-table-cell-editor
            value={valueString}
            type={this.getEditorType()}
            args={this.getEditorArgs()}
            valueChange={(newVal: string) => this.handleCellEditorValueChange(newVal, valueString)}
            keyDown={(event: KeyboardEvent, newVal: string) => this.handleCellEditorKeyDown(event, newVal, valueString)}
          />
        ) : (
          this.renderCellValue(cellValue, row)
        )}
      </Host>
    );
  }
}

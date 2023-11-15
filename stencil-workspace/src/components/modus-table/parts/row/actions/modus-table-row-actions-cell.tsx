import {
  Component,
  Element,
  Host,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Row } from '@tanstack/table-core';
import NavigateTableCells from '../../../utilities/table-cell-navigation.utility';
import { KEYBOARD_ENTER } from '../../../modus-table.constants';
import TableContext from '../../../models/table-context.model';

@Component({
  tag: 'modus-table-row-actions-cell',
})
export class ModusTableRowActionsCell {
  @Element() el: HTMLElement;
  @Prop() row: Row<unknown>;
  @Prop() context: TableContext;

  private cellEl: HTMLElement;

  private onCellKeyDown: (e: KeyboardEvent) => void = (e: KeyboardEvent) => this.handleCellKeydown(e);
  connectedCallback() {
    this.cellEl = this.el.parentElement;
    this.cellEl.addEventListener('keydown', this.onCellKeyDown);
  }

  disconnectedCallback() {
    if (this.cellEl) {
      this.cellEl.removeEventListener('keydown', this.onCellKeyDown);
    }
  }
  handleCellKeydown = (event: KeyboardEvent) => {
    if (event.defaultPrevented) return;

    const key = event.key?.toLowerCase();

    if (key === KEYBOARD_ENTER) {
      (this.el.firstChild?.firstChild as HTMLModusButtonElement)?.focusButton();
      event.stopPropagation();
    } else {
      NavigateTableCells({
        eventKey: event.key,
        cellElement: this.cellEl,
      });
    }
  };

  render(): void {
    return (
      <Host>
        <modus-table-row-actions row={this.row} context={this.context} />
      </Host>
    );
  }
}

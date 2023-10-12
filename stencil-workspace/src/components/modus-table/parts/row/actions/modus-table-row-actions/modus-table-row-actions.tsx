import {
  Host,
  Component,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  Fragment,
  Event,
  EventEmitter,
} from '@stencil/core';
import { Row } from '@tanstack/table-core';
import { ModusTableRowAction } from '../../../../models/modus-table.models';
import TableContext, { TableRowActionsMenuEvent } from '../../../../models/table-context.model';
import ModusTableCellExpandIcons from '../../../cell/modus-table-cell-expand-icons';

@Component({
  tag: 'modus-table-row-actions',
  styleUrl: './modus-table-row-actions.scss',
})
export class ModusTableRowActions {
  @Prop() row: Row<unknown>;
  @Prop() context: TableContext;

  @Event() overflowRowActions: EventEmitter<TableRowActionsMenuEvent>;

  private overflowButtonRef: HTMLElement;

  handleMoreButtonClick(e: MouseEvent, menu: ModusTableRowAction[]): void {
    const { left, top, height } = this.overflowButtonRef.getBoundingClientRect();

    this.overflowRowActions.emit({
      items: menu,
      position: { x: left, y: top + height },
      row: this.row,
    });
    e.stopImmediatePropagation();
  }

  handleActionButtonClick(e: MouseEvent, actionId: string): void {
    const { rowActionClick } = this.context;
    rowActionClick.emit({ actionId, row: this.row });
    e.stopImmediatePropagation();
  }

  render(): void {
    const { rowActions, rowsExpandable } = this.context;
    let actionButtons: ModusTableRowAction[];
    let overflowMenu: ModusTableRowAction[];

    if (rowActions) {
      const sortedActions = rowActions.filter((a) => a.isVisible(this.row)).sort((a, b) => a.index - b.index);
      const visibleLimit = rowsExpandable ? 2 : 3;
      actionButtons = sortedActions.splice(0, visibleLimit);
      overflowMenu = sortedActions;
    }
    return (
      <Host>
        {rowsExpandable && <ModusTableCellExpandIcons row={this.row} />}

        {actionButtons?.map(({ icon, id }) => {
          return (
            <modus-button
              ref={(el) => (this.overflowButtonRef = el)}
              button-style="borderless"
              color="secondary"
              icon-only={icon}
              size="small"
              onClick={(e) => this.handleActionButtonClick(e, id)}></modus-button>
          );
        })}

        {overflowMenu?.length > 0 && (
          <Fragment>
            <modus-button
              button-style="borderless"
              color="secondary"
              icon-only="vertical-ellipsis"
              size="small"
              onClick={(e) => this.handleMoreButtonClick(e, overflowMenu)}></modus-button>
          </Fragment>
        )}
      </Host>
    );
  }
}

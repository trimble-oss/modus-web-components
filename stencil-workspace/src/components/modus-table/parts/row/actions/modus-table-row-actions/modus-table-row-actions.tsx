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

  handleMoreButtonClick(e: Event, menu: ModusTableRowAction[]): void {
    const { left, top, height } = this.overflowButtonRef.getBoundingClientRect();

    this.overflowRowActions.emit({
      items: menu,
      position: { x: left, y: top + height },
      row: this.row,
    });
    e.stopImmediatePropagation();
  }

  handleMoreButtonKeydown(e: KeyboardEvent, menu: ModusTableRowAction[]): void {
    if (e.key.toLowerCase() === 'enter') {
      this.handleMoreButtonClick(e, menu)
      e.preventDefault();
    }
  }

  handleActionButtonClick(e: Event, actionId: string): void {
    const { rowActionClick } = this.context;
    rowActionClick.emit({ actionId, row: this.row });
    e.stopImmediatePropagation();
  }

  handleActionButtonKeydown(e: KeyboardEvent, actionId: string): void {
    if (e.key.toLowerCase() === 'enter') {
      this.handleActionButtonClick(e, actionId)
      e.preventDefault();
    }
  }

  render(): void {
    const { rowActions, rowsExpandable } = this.context;
    let actionButtons: ModusTableRowAction[];
    let overflowMenu: ModusTableRowAction[];

    if (rowActions) {
      const sortedActions = rowActions.filter((a) => a.isVisible === undefined || a.isVisible === null || a.isVisible(this.row)).sort((a, b) => a.index - b.index);
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
              class="row-actions"
              ref={(el) => (this.overflowButtonRef = el)}
              button-style="borderless"
              color="secondary"
              icon-only={icon}
              size="small"
              onKeyDown={(e) => this.handleActionButtonKeydown(e, id)}
              onClick={(e) => this.handleActionButtonClick(e, id)}></modus-button>
          );
        })}

        {overflowMenu?.length > 0 && (
          <Fragment>
            <modus-button
              class="row-actions-menu-button"
              button-style="borderless"
              color="secondary"
              icon-only="vertical-ellipsis"
              size="small"
              onKeyDown={(e) => this.handleMoreButtonKeydown(e, overflowMenu)}
              onClick={(e) => this.handleMoreButtonClick(e, overflowMenu)}></modus-button>
          </Fragment>
        )}
      </Host>
    );
  }
}

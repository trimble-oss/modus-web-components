import {
  Component,
  Event,
  EventEmitter, // eslint-disable-line @typescript-eslint/no-unused-vars
  Fragment,
  Host,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Row } from '@tanstack/table-core';
import { ModusTableRowAction } from '../../../../models/modus-table.models';
import { TableContext } from '../../../../models/table-context.models';

@Component({
  tag: 'modus-table-row-actions',
  styleUrl: './modus-table-row-actions.scss',
})
export class ModusTableRowActions {
  @Prop() row: Row<unknown>;
  @Prop() context: TableContext;

  @Event() overflowRowActions: EventEmitter<unknown>;

  private overflowButtonRef: HTMLModusButtonElement;

  handleMoreButtonClick(e: Event, menu: ModusTableRowAction[]): void {
    const { left, top, height } = this.overflowButtonRef.getBoundingClientRect();

    this.overflowRowActions.emit({
      componentId: this.context.componentId,
      actions: menu,
      position: { x: left, y: top + height },
      row: this.row,
      onClose: () => this.overflowButtonRef.focusButton(),
    });
    e.preventDefault();
  }

  handleMoreButtonKeydown(e: KeyboardEvent, menu: ModusTableRowAction[]): void {
    if (e.key.toLowerCase() === 'enter') {
      this.handleMoreButtonClick(e, menu);
      e.preventDefault();
    }
  }

  handleActionButtonClick(e: Event, actionId: string): void {
    const { rowActionClick } = this.context;
    rowActionClick.emit({ actionId, row: this.row.original });
    e.preventDefault();
  }

  handleActionButtonKeydown(e: KeyboardEvent, actionId: string): void {
    if (e.key.toLowerCase() === 'enter') {
      this.handleActionButtonClick(e, actionId);
      e.preventDefault();
    }
  }

  render(): void {
    const { rowActions } = this.context;
    let actionButtons: ModusTableRowAction[];
    let overflowMenu: ModusTableRowAction[];

    if (rowActions) {
      actionButtons = rowActions.filter((action) => !action.isOverflow);
      overflowMenu = rowActions.filter((action) => action.isOverflow);
    }
    return (
      <Host>
        {actionButtons?.map(({ label, icon, id, isDisabled = () => false }) => {
          const disabled = isDisabled(this.row.original);
          return (
            <modus-button
              class="row-actions"
              button-style="borderless"
              color="secondary"
              icon-only={icon}
              size="small"
              ariaLabel={label}
              disabled={disabled}
              onKeyDown={(e) => this.handleActionButtonKeydown(e, id)}
              onClick={(e) => (!disabled ? this.handleActionButtonClick(e, id) : e.preventDefault())}></modus-button>
          );
        })}

        {overflowMenu?.length > 0 && (
          <Fragment>
            <modus-button
              ref={(el) => (this.overflowButtonRef = el)}
              class="row-actions-menu-button"
              button-style="borderless"
              color="secondary"
              icon-only="more_vertical"
              ariaLabel="overflow button"
              size="small"
              onKeyDown={(e) => this.handleMoreButtonKeydown(e, overflowMenu)}
              onClick={(e) => this.handleMoreButtonClick(e, overflowMenu)}></modus-button>
          </Fragment>
        )}
      </Host>
    );
  }
}

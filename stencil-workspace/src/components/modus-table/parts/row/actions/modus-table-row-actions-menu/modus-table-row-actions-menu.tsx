import {
  Component,
  h,
  State,
  Listen,
  Host,
  Watch,
  Prop, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableRowAction } from '../../../../models/modus-table.models';
import TableContext, { TableRowActionsMenuEvent } from '../../../../models/table-context.model';
import Position from '../../../../models/position.model';
import { Element } from '@stencil/core';
import { Row } from '@tanstack/table-core';

@Component({
  tag: 'modus-table-row-actions-menu',
  styleUrl: './modus-table-row-actions-menu.scss',
})
export class ModusTableRowActionsMenu {
  @Element() element: HTMLElement;
  @Prop() context: TableContext;
  @State() isMenuOpen = false;
  @Watch('isMenuOpen') onMenuOpenChange(newValue: boolean) {
    if (!newValue) {
      this.overFlowMenu = null;
      this.position = null;
      this.tableRow = null;
    }
  }

  @State() overFlowMenu: ModusTableRowAction[];
  @State() position: Position;
  tableRow: Row<unknown>;

  @Listen('overflowRowActions', { target: 'document' })
  handleOverflowRowActions(event: CustomEvent<TableRowActionsMenuEvent>): void {
    const { items, position, row } = event.detail;
    this.isMenuOpen = this.tableRow?.id === row.id ? false : true;
    if (this.isMenuOpen) {
      this.overFlowMenu = items;
      this.position = position;
      this.tableRow = row;
    }

    // event.stopImmediatePropagation();
  }

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent): void {
    if (this.element.contains(event.target as HTMLElement) || event.defaultPrevented) {
      return;
    }

    this.isMenuOpen = false;
  }

  handleListItemClick(id: string): void {
    const { rowActionClick } = this.context;
    rowActionClick.emit({ actionId: id, row: this.tableRow.original });
  }

  handleListItemKeydown(e: KeyboardEvent): void {
    if (e.key.toLowerCase() === 'escape' || e.key.toLowerCase() === 'enter') {
      this.isMenuOpen = false;
      e.preventDefault();
    }
  }

  render(): void {
    if (!(this.overFlowMenu?.length && this.position)) return null;

    const { x, y } = this.position;
    // TODO: we need to remove the 33% offset, which is a hack to get the menu to align with the row
    const style = {
      transform: `translate(calc(${x}px + 19.5px), calc(${y}px))`,
    };

    return (
      <Host>
        {this.isMenuOpen && (
          <div style={{ ...style }} class="row-actions-menu">
            <modus-list class="hydrated">
              {this.overFlowMenu.map(({ label, id, isDisabled = () => false }) => {
                const disabled = isDisabled(this.tableRow?.original);
                return (
                  <modus-list-item
                    disabled={disabled}
                    onItemClick={() => this.handleListItemClick(id)}
                    class="hydrated row-actions-menu-item"
                    onKeyDown={(e) => this.handleListItemKeydown(e)}
                    tabindex={0}>
                    {label}
                  </modus-list-item>
                );
              })}
            </modus-list>
          </div>
        )}
      </Host>
    );
  }

  componentDidRender(): void {
    if (this.isMenuOpen) {
      (this.element.children.item(0)?.children.item(0)?.children.item(0) as HTMLElement)?.focus();
    }
  }
}

import {
  Component,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  State,
  Listen,
  Host,
  Watch,
  Prop,
} from '@stencil/core';
import { ModusTableRowAction, ModusTableRowActionClick } from '../../../../models/modus-table.models';
import { TableContext } from '../../../../models/table-context.models';
import Position from '../../../../models/position.model';
import { Element } from '@stencil/core';
import { Row } from '@tanstack/table-core';
import { TableRowActionsMenuEvent } from '../../../../models/table-row-actions.models';

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

  private tableRow: Row<unknown>;

  // a local state to keep track of the overflow icon click to prevent `handleClickOutside` from closing the menu
  // event.preventDefault would not solve the problem when multiple tables are present on the page
  private isOverflowIconClicked = false;

  private onCloseMenu: () => void;
  private onOverflowRowActions: (event: CustomEvent<TableRowActionsMenuEvent>) => void = (e) =>
    this.handleOverflowRowActions(e);
  private onRowActionClick: (event: CustomEvent<ModusTableRowActionClick>) => void = (e) =>
    this.handleRowActionButtonClick(e);
  private onRowExpanded: (event: CustomEvent) => void = () => (this.isMenuOpen = false);

  componentDidRender(): void {
    if (this.isMenuOpen) {
      const firstItem = Array.from(this.element.querySelectorAll('modus-list-item'))?.find(
        (el: HTMLModusListItemElement) => !el.disabled
      );
      firstItem?.focusItem();
    }
  }

  connectedCallback(): void {
    const { element } = this.context;
    element.addEventListener('overflowRowActions', this.onOverflowRowActions);
    element.addEventListener('rowActionClick', this.onRowActionClick);
    element.addEventListener('rowExpanded', this.onRowExpanded);
  }

  disconnectedCallback(): void {
    const { element } = this.context;
    element.removeEventListener('overflowRowActions', this.onOverflowRowActions);
    element.removeEventListener('rowActionClick', this.onRowActionClick);
    element.removeEventListener('rowExpanded', this.onRowExpanded);
  }

  handleOverflowRowActions(event: CustomEvent<TableRowActionsMenuEvent>): void {
    const { componentId, actions, position, row, onClose } = event.detail;
    if (componentId !== this.context.componentId) return;

    this.isMenuOpen = this.tableRow?.id === row.id ? false : true;
    if (this.isMenuOpen) {
      this.overFlowMenu = actions;
      this.position = position;
      this.tableRow = row;
      this.onCloseMenu = onClose;
    }
    this.isOverflowIconClicked = this.isMenuOpen;

    event.stopPropagation();
  }

  handleRowActionButtonClick({ detail: { actionId } }: CustomEvent<ModusTableRowActionClick>): void {
    const rowActionButtonClicked = this.overFlowMenu && this.overFlowMenu.find((action) => action.id !== actionId);
    if (rowActionButtonClicked) this.isMenuOpen = false;
  }

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent): void {
    if (!(this.element.contains(event.target as HTMLElement) || this.isOverflowIconClicked)) {
      this.isMenuOpen = false;
    }

    this.isOverflowIconClicked = false;
  }

  handleListItemClick(id: string): void {
    const { rowActionClick } = this.context;
    rowActionClick.emit({ actionId: id, row: this.tableRow.original });
  }

  handleListItemKeydown(e: KeyboardEvent): void {
    if (e.key.toLowerCase() === 'escape' || e.key.toLowerCase() === 'enter') {
      this.isMenuOpen = false;
      this.onCloseMenu?.();
      e.preventDefault();
    }
  }

  render(): void {
    if (!(this.overFlowMenu?.length && this.position)) return null;

    const { x, y } = this.position;
    const style = {
      transform: `translate(calc(${x}px - 40px), calc(${y}px))`,
      right: `calc(${x}px)`
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
                    style={{minWidth: '140px'}}
                    disabled={disabled}
                    onItemClick={() => this.handleListItemClick(id)}
                    class="hydrated row-actions-menu-item"
                    onKeyDown={(e) => this.handleListItemKeydown(e)}
                    tabindex={disabled ? -1 : 0}>
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
}

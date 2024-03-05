import {
  Component,
  Prop,
  State,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column } from '@tanstack/table-core';
import { KEYBOARD_DOWN, KEYBOARD_UP, KEYBOARD_ENTER, KEYBOARD_SPACE, KEYBOARD_TAB } from '../../../modus-table.constants';
import { JSX } from '@stencil/core/internal';
import { ModusTableColumnsVisibilityOptions } from '../../../models/modus-table.models';

@Component({
  tag: 'modus-table-columns-visibility',
  styleUrl: './modus-table-columns-visibility.scss',
  shadow: true,
})
export class ModusTableColumnsVisibility {
  /** Table data. */
  @Prop() getAllLeafColumns: () => Column<unknown, unknown>[];

  /** Column visibility options */
  @Prop() columnsVisibility: ModusTableColumnsVisibilityOptions;

  @Prop() showDropdown: boolean;

  @Prop() menuIconContainerRef: HTMLDivElement;

  @Prop() toggleDropdown: (show: boolean) => void;

  @Prop() maxHeight: string;

  @State() columnsVisibilityState: Map<string, boolean> = new Map();

  private refItemContent: HTMLElement[] = [];

  componentWillLoad() {
    // Initialize columns visibility state based on hiddenColumns
    this.initializeVisibilityState();
  }

  applyColumnsVisibility() {
    this.getAllLeafColumns().forEach((column) => {
      if (this.columnsVisibilityState.has(column.id)) {
        column.toggleVisibility(this.columnsVisibilityState.get(column.id));
      }
    });
    this.toggleDropdown(!this.showDropdown);
    this.menuIconContainerRef.focus();
  }

  closeDropdown() {
    this.columnsVisibilityState = new Map();
    this.toggleDropdown(!this.showDropdown);
    this.menuIconContainerRef.focus();
  }

  handleApplyKeyDown(event: KeyboardEvent): void {
    if (event.key.toLowerCase() === KEYBOARD_TAB && !event.shiftKey) {
      this.toggleDropdown(false);
    }
  }

  /**
   * Handling columns dropdown keyboard(arrowUp/arrowDown) navigation
   * @param event keyboard event
   * @param columnIndex column index
   */
  handleColumnItemKeyDown(event: KeyboardEvent, columnIndex: number): void {
    let currentRefItemIndex: number;
    const recursiveTillAnotherFocusItem = (refItemIndex, isIncrement) => {
      this.refItemContent[refItemIndex]
        ? this.refItemContent[refItemIndex].focus()
        : recursiveTillAnotherFocusItem(isIncrement ? refItemIndex + 1 : refItemIndex - 1, isIncrement);
    };

    const eventKey = event.key.toLowerCase();
    if (eventKey === KEYBOARD_ENTER || eventKey === KEYBOARD_SPACE) {
      this.toggleColumnVisibility(columnIndex);
    } else if (eventKey === KEYBOARD_DOWN) {
      currentRefItemIndex = columnIndex + 1 < this.refItemContent.length ? columnIndex + 1 : this.refItemContent.length - 1;
      recursiveTillAnotherFocusItem(currentRefItemIndex, true);
      event.preventDefault();
    } else if (eventKey === KEYBOARD_UP) {
      currentRefItemIndex = columnIndex - 1 >= 0 ? columnIndex - 1 : 0;
      recursiveTillAnotherFocusItem(currentRefItemIndex, false);
      event.preventDefault();
    }
  }

  /**
   * Adding column item refs(not disabled)
   */
  handleRefColumnItemContent(el: HTMLDivElement, i: number, requiredColumn: boolean) {
    if (!requiredColumn) {
      this.refItemContent[i] = el;
    }
  }

  private initializeVisibilityState() {
    // Set the visibility state based on hiddenColumns prop
    this.getAllLeafColumns().forEach((column) => {
      const isRequired = this.columnsVisibility?.requiredColumns?.includes(column.id);
      const isHidden = this.columnsVisibility?.hiddenColumns?.includes(column.id);

      if (!isRequired && isHidden) {
        column.toggleVisibility(false);
      }
    });
  }

  private toggleColumnVisibility(columnIndex: number) {
    const shadowRootChildren: HTMLCollection = this.refItemContent[columnIndex].children[0].shadowRoot
      .children as HTMLCollection;
    const modusCheckboxElement: HTMLElement = shadowRootChildren[shadowRootChildren.length - 1] as HTMLElement;

    modusCheckboxElement.click();
  }

  /**
   * Returns true if the column is required column
   */
  private checkIfRequiredColumn(columnId: string): boolean {
    return this.columnsVisibility?.requiredColumns?.includes(columnId);
  }

  renderColumnsChecklist(): JSX.Element | null {
    const columnVisibilityItemControls = (columnId, columnIndex) => {
      return {
        key: columnId,
        tabIndex: this.checkIfRequiredColumn(columnId) ? -1 : 0,
        ref: (el) => {
          this.handleRefColumnItemContent(el, columnIndex, this.checkIfRequiredColumn(columnId));
        },
        onClick: () => this.toggleColumnVisibility(columnIndex),
        onKeyDown: (event) => this.handleColumnItemKeyDown(event, columnIndex),
      };
    };

    return this.getAllLeafColumns().map((column, index) => {
      return (
        <div {...columnVisibilityItemControls(column.id, index)} class="column-visibility-item">
          <modus-checkbox
            ariaLabel={column.columnDef.header as string}
            label={column.columnDef.header as string}
            checked={column.getIsVisible()}
            onCheckboxClick={(e) => this.columnsVisibilityState.set(column.id, e.detail)}
            disabled={this.columnsVisibility?.requiredColumns?.includes(column.id)}
            stopPropagation></modus-checkbox>
        </div>
      );
    });
  }

  renderCancelApplyButtons(): JSX.Element | null {
    return (
      <div class="column-visibility-buttons-container">
        <modus-button size="small" buttonStyle="outline" onClick={() => this.closeDropdown()}>
          Cancel
        </modus-button>
        <modus-button
          size="small"
          onClick={() => this.applyColumnsVisibility()}
          onKeyDown={(event) => this.handleApplyKeyDown(event)}>
          Apply
        </modus-button>
      </div>
    );
  }

  render(): void {
    return (
      <div class="columns-visibility-menu" style={{ maxHeight: this.maxHeight || '60dvh' }}>
        <div class="column-visibility-header">{this.columnsVisibility.title || 'Columns'}</div>
        <div class="column-visibility-content">{this.renderColumnsChecklist()}</div>
        {this.renderCancelApplyButtons()}
      </div>
    );
  }
}

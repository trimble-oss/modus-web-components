import { State } from '@stencil/core';
import {
  Component,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';

/**
 * ModusFillerColumn is to fill empty space within a table or grid when the content in other columns is not wide enough to occupy the entire available width
 */
@Component({
  tag: 'modus-table-filler-column',
  styleUrl: './modus-table-filler-column.scss',
})
export class ModusTableFillerColumn {
  @Prop() cellBorderless: boolean;

  @Prop() summaryRow: boolean;

  @Prop() container?: HTMLElement;

  @State() showFillerTable = false;
  private targetTable: HTMLTableElement;
  private fillerTableRef: HTMLTableElement;
  private observer: ResizeObserver | null = null;

  componentDidLoad(): void {
    this.targetTable = this.container.shadowRoot.querySelector('table');
    if (this.targetTable) {
      this.updateContainerLayout();
      this.connectDOMObserver();
    }
  }

  disconnectedCallback(): void {
    this.disconnectDOMObserver();
  }

  connectDOMObserver(): void {
    this.observer = new ResizeObserver(this.updateContainerLayout);
    this.observer.observe(this.targetTable);
  }

  disconnectDOMObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  updateContainerLayout = (): void => {
    const tableWidth = this.targetTable.getBoundingClientRect()?.width;
    const parentWidth = this.targetTable.parentElement?.getBoundingClientRect()?.width;

    this.showFillerTable = tableWidth < parentWidth;
    if (!this.showFillerTable) return;

    if (this.fillerTableRef) {
      this.fillerTableRef.querySelector('thead').style.height = `${this.targetTable
        .querySelector('thead')
        ?.getBoundingClientRect().height}px`;

      if (this.summaryRow) {
        this.fillerTableRef.querySelector('tfoot').style.height = `${this.targetTable
          .querySelector('tfoot')
          ?.getBoundingClientRect().height}px`;
      }
      this.fillerTableRef.querySelector('tbody').style.height = `${this.targetTable
        .querySelector('tbody')
        ?.getBoundingClientRect().height}px`;
    }
  };

  render(): void {
    return (
      <table
        id="table-filler-column"
        class={{ 'cell-borderless': this.cellBorderless, 'd-none': !this.showFillerTable }}
        ref={(el) => (this.fillerTableRef = el)}>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
        {this.summaryRow && (
          <tfoot>
            <tr class="summary-row">
              <td></td>
            </tr>
          </tfoot>
        )}
      </table>
    );
  }
}

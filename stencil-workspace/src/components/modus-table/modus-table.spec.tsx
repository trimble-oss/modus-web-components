import { newSpecPage } from '@stencil/core/testing';
import { ModusTable } from './modus-table';

describe('modus-table', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusTable],
      html: '<modus-table></modus-table>',
    });
    expect(root).toEqualHtml(`
    <modus-table>
      <mock:shadow-root>
        <div>
          <div class="table-container">
            <table data-test-id="main-table" style="table-layout: fixed;">
              <thead>
                <tr></tr>
              </thead>
              <tbody></tbody>
            </table>
            <modus-table-filler-column></modus-table-filler-column>
          </div>
          <slot name="customFooter"></slot>
          <div class="dropdownMenu" id="dropdown-null" style="top: 0px; left: 0px; position: absolute;"></div>
        </div>
      </mock:shadow-root>
    </modus-table>
  `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { ModusDataTable } from './modus-data-table';

describe('modus-data-table', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusDataTable],
      html: '<modus-data-table></modus-data-table>',
    });
    expect(root).toEqualHtml(`
      <modus-data-table>
        <mock:shadow-root>
          <table  class="false" style="width: 100%">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <slot name="customFooter"></slot>
        </mock:shadow-root>
      </modus-data-table>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { ModusDataTable } from './modus-data-table';

xdescribe('modus-data-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusDataTable],
      html: '<modus-data-table></modus-data-table>',
    });
    expect(page.root).toEqualHtml(`
      <modus-data-table>
        <mock:shadow-root>
          <table class="borderless cell-borderless">
            <thead>
              <tr></tr>
            </thead>
            <tbody></tbody>
          </table>
        </mock:shadow-root>
      </modus-data-table>
    `);
  });
});

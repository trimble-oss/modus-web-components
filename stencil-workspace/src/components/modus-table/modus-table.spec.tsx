import { newSpecPage } from '@stencil/core/testing';
import { ModusTable } from './modus-table';

xdescribe('modus-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusTable],
      html: '<modus-table></modus-table>',
    });
    expect(page.root).toEqualHtml(`
      <modus-table>
        <mock:shadow-root>
          <table class="borderless cell-borderless">
            <thead>
              <tr></tr>
            </thead>
            <tbody></tbody>
          </table>
        </mock:shadow-root>
      </modus-table>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { ModusDataTable } from './modus-data-table';

describe('modus-data-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusDataTable],
      html: `<modus-data-table></modus-data-table>`,
    });
    expect(page.root).toEqualHtml(`
      <modus-data-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modus-data-table>
    `);
  });
});

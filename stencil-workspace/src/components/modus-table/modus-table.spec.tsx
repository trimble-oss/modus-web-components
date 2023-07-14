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
          <table class="false" style="width: 0px; table-layout: fixed;">
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <slot name="customFooter"></slot>
        </mock:shadow-root>
      </modus-table>
    `);
  });
});

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
            <table>
              <thead>
                <tr></tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <slot name="customFooter"></slot>
        </div>
      </mock:shadow-root>
    </modus-table>
  `);
  });
});

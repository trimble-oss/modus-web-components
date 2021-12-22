import { newSpecPage } from '@stencil/core/testing';
import { ModusSpinner } from './modus-spinner';

describe('modus-spinner', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusSpinner],
      html: '<modus-spinner></modus-spinner>',
    });
    expect(root).toEqualHtml(`
      <modus-spinner>
        <mock:shadow-root>
          <div aria-busy="true" class='spinner' style='border-color: #005F9E; border-right-color: transparent; height: 2rem; width: 2rem;'></div>
        </mock:shadow-root>
      </modus-spinner>
    `);
  });
});

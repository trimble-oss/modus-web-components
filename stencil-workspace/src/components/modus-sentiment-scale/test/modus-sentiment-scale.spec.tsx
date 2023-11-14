import { newSpecPage } from '@stencil/core/testing';
import { ModusSentimentScale } from '../modus-sentiment-scale';

describe('modus-sentiment-scale', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusSentimentScale],
      html: `<modus-sentiment-scale></modus-sentiment-scale>`,
    });
    expect(page.root).toEqualHtml(`
      <modus-sentiment-scale>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modus-sentiment-scale>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { ModusCard } from './modus-card';

describe('modus-card', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusCard],
      html: '<modus-card></modus-card>',
    });
    expect(root).toEqualHtml(`
      <modus-card>
        <mock:shadow-root>
          <article style='height: 269px; width: 240px;'>
            <slot></slot>
          </article>
        </mock:shadow-root>
      </modus-card>
    `);
  });

  it('renders with slot value', async () => {
    const { root } = await newSpecPage({
      components: [ModusCard],
      html: '<modus-card><div class="test">Test</div></modus-card>',
    });
    expect(root).toEqualHtml(`
      <modus-card>
        <mock:shadow-root>
          <article style='height: 269px; width: 240px;'>
            <slot></slot>
          </article>
        </mock:shadow-root>
        <div class='test'>Test</div>
      </modus-card>
    `);
  });
});

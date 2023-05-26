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
          <article class="card-border shadow" style='height: 269px; width: 240px;'>
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
          <article class="card-border shadow" style='height: 269px; width: 240px;'>
            <slot></slot>
          </article>
        </mock:shadow-root>
        <div class='test'>Test</div>
      </modus-card>
    `);
  });

  it('should have flag "showCardBorder" set on true as default', async () => {
    const modusCard = new ModusCard();
    const flag = modusCard.showCardBorder;

    expect(flag.toString()).toEqual('true');
  });

  it('should have flag "showShadowOnHover" set on true as default', async () => {
    const modusCard = new ModusCard();
    const flag = modusCard.showShadowOnHover;

    expect(flag.toString()).toEqual('true');
  });
});

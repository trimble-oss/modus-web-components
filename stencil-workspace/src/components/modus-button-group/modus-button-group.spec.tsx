import { newSpecPage } from '@stencil/core/testing';
import { ModusButtonGroup } from './modus-button-group';

describe('modus-button-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusButtonGroup],
      html: `<modus-button-group></modus-button-group>`,
    });
    expect(page.root).toEqualHtml(`
      <modus-button-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modus-button-group>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { ModusCheckbox } from './modus-checkbox';

describe('modus-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusCheckbox],
      html: `<modus-checkbox></modus-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <modus-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modus-checkbox>
    `);
  });
});

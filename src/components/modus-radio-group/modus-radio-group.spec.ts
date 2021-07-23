import { newSpecPage } from '@stencil/core/testing';
import { ModusRadioGroup } from './modus-radio-group';

describe('modus-radio-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusRadioGroup],
      html: '<modus-radio-group></modus-radio-group>',
    });
    expect(root).toEqualHtml(`
      <modus-radio-group>
        <mock:shadow-root>
          <ul></ul>
        </mock:shadow-root>
      </modus-radio-group>
    `);
  });
});

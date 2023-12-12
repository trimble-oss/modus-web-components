import { newSpecPage } from '@stencil/core/testing';
import { ModusSwitch } from './modus-switch';

describe('modus-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusSwitch],
      html: '<modus-switch></modus-switch>',
    });
    expect(page.root).toEqualHtml(`
      <modus-switch>
        <mock:shadow-root>
          <div class="medium modus-switch" tabindex="0">
            <div class="switch">
              <span class="slider"></span>
            </div>
            <input role="switch" type="checkbox">
          </div>
        </mock:shadow-root>
      </modus-switch>
    `);
  });
});

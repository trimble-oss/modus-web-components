import { newSpecPage } from '@stencil/core/testing';
import { ModusRadioButton } from './modus-radio-button';

describe('modus-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusRadioButton],
      html: '<modus-switch></modus-switch>',
    });
    expect(page.root).toEqualHtml(`
      <modus-switch>
        <mock:shadow-root>
          <div class="modus-switch">
            <div class="switch">
              <span class="slider"></span>
            </div>
            <input type="checkbox">
          </div>
        </mock:shadow-root>
      </modus-switch>
    `);
  });
});

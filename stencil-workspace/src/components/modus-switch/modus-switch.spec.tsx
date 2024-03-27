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

  it('sets tabindex to -1 when disabled', async () => {
    const page = await newSpecPage({
      components: [ModusSwitch],
      html: '<modus-switch disabled></modus-switch>',
    });
    expect(page.root).toEqualHtml(`
      <modus-switch disabled>
        <mock:shadow-root>
          <div class="disabled medium modus-switch" tabindex="-1">
            <div class="switch">
              <span class="slider"></span>
            </div>
            <input role="switch" aria-disabled="true" disabled type="checkbox">
          </div>
        </mock:shadow-root>
      </modus-switch>
    `);
  });
});

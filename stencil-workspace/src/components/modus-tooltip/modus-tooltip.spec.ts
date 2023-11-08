import { newSpecPage } from '@stencil/core/testing';
import { ModusTooltip } from './modus-tooltip';

describe('modus-tooltip', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusTooltip],
      html: '<modus-tooltip text="message"></modus-tooltip>',
    });
    expect(root).toEqualHtml(`
      <modus-tooltip text="message">
        <mock:shadow-root>
            <slot></slot>
            <div class="tooltip" role="tooltip" tabindex="-1">
              message
              <div data-popper-arrow id="arrow"></div>
            </div>
        </mock:shadow-root>
      </modus-tooltip>
    `);
  });
});

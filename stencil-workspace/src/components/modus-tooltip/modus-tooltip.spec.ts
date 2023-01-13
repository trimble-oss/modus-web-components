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
          <div class="modus-tooltip top">
            <slot></slot>
            <div class="text" role="tooltip">message</div>
          </div>
        </mock:shadow-root>
      </modus-tooltip>
    `);
  });
});

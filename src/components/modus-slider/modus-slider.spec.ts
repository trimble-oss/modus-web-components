import { newSpecPage } from '@stencil/core/testing';
import { ModusSlider } from './modus-slider';

describe('modus-slider', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusSlider],
      html: '<modus-slider></modus-slider>',
    });
    expect(root).toEqualHtml(`
      <modus-slider>
        <mock:shadow-root>
          <div aria-valuemax="100" aria-valuemin="0" class="modus-slider">
            <input class="slider" max="100" min="0" type="range">
          </div>
        </mock:shadow-root>
      </modus-slider>
    `);
  });
});

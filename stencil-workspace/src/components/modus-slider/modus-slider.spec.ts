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
          <div class="modus-slider" style="--value-percent: 50%; margin-bottom: 50px; margin-top: 50px;">
            <input class="slider" id="mwc_id_0_slider" max="100" min="0" type="range" value="50">
          </div>
        </mock:shadow-root>
      </modus-slider>
    `);
  });
});

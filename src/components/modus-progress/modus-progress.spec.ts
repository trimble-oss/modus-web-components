import { newSpecPage } from '@stencil/core/testing';
import { ModusProgress } from './modus-progress';

describe('modus-progress', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusProgress],
      html: '<modus-progress></modus-progress>',
    });
    expect(root).toEqualHtml(`
      <modus-progress>
        <mock:shadow-root>
          <div class="modus-progress" style="background-color: #FFFFFF;">
            <div class="progress" style="background-color: #005F9E; color: #FFFFFF; width: 0%;">
            </div>
          </div>
        </mock:shadow-root>
      </modus-progress>
    `);
  });

  it('should default to background color $col_white', async () => {
    const modusProgress = new ModusProgress();
    expect(modusProgress.backgroundColor).toEqual('#FFFFFF');
  });

  it('should default to color $col_trimble_blue_mid', async () => {
    const modusProgress = new ModusProgress();
    expect(modusProgress.color).toEqual('#005F9E');
  });

  it('should default to no display text', async () => {
    const modusProgress = new ModusProgress();
    expect(modusProgress.displayText).toBeFalsy();
  });

  it('should default to max value of 100', async () => {
    const modusProgress = new ModusProgress();
    expect(modusProgress.maxValue).toEqual(100);
  });

  it('should default to min value of 0', async () => {
    const modusProgress = new ModusProgress();
    expect(modusProgress.minValue).toEqual(0);
  });

  it('should default to percentage color $col_white', async () => {
    const modusProgress = new ModusProgress();
    expect(modusProgress.percentageColor).toEqual('#FFFFFF');
  });

  it('should default value to 0', async () => {
    const modusProgress = new ModusProgress();
    expect(modusProgress.value).toEqual(0);
  });
});

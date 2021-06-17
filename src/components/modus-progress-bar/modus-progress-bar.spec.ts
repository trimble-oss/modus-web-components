import { newSpecPage } from '@stencil/core/testing';
import { ModusProgressBar } from './modus-progress-bar';

describe('modus-progress-bar', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusProgressBar],
      html: '<modus-progress-bar></modus-progress-bar>',
    });
    expect(root).toEqualHtml(`
      <modus-progress-bar>
        <mock:shadow-root>
          <div class="modus-progress-bar" style="background-color: #FFFFFF;">
            <div class="progress" style="background-color: #005F9E; color: #FFFFFF; width: 0%;">
            </div>
          </div>
        </mock:shadow-root>
      </modus-progress-bar>
    `);
  });

  it('should default to background color $col_white', async () => {
    const modusProgress = new ModusProgressBar();
    expect(modusProgress.backgroundColor).toEqual('#FFFFFF');
  });

  it('should default to color $col_trimble_blue_mid', async () => {
    const modusProgress = new ModusProgressBar();
    expect(modusProgress.color).toEqual('#005F9E');
  });

  it('should default to no display text', async () => {
    const modusProgress = new ModusProgressBar();
    expect(modusProgress.text).toBeFalsy();
  });

  it('should default to max value of 100', async () => {
    const modusProgress = new ModusProgressBar();
    expect(modusProgress.maxValue).toEqual(100);
  });

  it('should default to min value of 0', async () => {
    const modusProgress = new ModusProgressBar();
    expect(modusProgress.minValue).toEqual(0);
  });

  it('should default to percentage color $col_white', async () => {
    const modusProgress = new ModusProgressBar();
    expect(modusProgress.percentageColor).toEqual('#FFFFFF');
  });

  it('should default value to 0', async () => {
    const modusProgress = new ModusProgressBar();
    expect(modusProgress.value).toEqual(0);
  });
});

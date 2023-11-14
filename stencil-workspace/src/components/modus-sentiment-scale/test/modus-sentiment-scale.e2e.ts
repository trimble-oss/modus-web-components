import { newE2EPage } from '@stencil/core/testing';

describe('modus-sentiment-scale', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(element).toHaveClass('hydrated');
  });
});

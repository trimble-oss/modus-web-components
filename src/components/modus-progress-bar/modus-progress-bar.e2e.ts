import { newE2EPage } from '@stencil/core/testing';

describe('modus-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-progress-bar></modus-progress-bar>');
    const element = await page.find('modus-progress-bar');
    expect(element).toHaveClass('hydrated');
  });
});

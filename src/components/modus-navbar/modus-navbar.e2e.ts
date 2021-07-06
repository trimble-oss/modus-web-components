import { newE2EPage } from '@stencil/core/testing';

describe('modus-navbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-navbar></modus-navbar>');
    const element = await page.find('modus-navbar');
    expect(element).toHaveClass('hydrated');
  });
});

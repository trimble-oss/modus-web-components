import { newE2EPage } from '@stencil/core/testing';

describe('modus-navbar-main-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-navbar-main-menu></modus-navbar-main-menu>');
    const element = await page.find('modus-navbar-main-menu');
    expect(element).toHaveClass('hydrated');
  });
});

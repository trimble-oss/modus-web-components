import { newE2EPage } from '@stencil/core/testing';

describe('modus-navbar-main-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-floating-navbar-main-menu></modus-floating-navbar-main-menu>');
    const element = await page.find('modus-floating-navbar-main-menu');
    expect(element).toHaveClass('hydrated');
  });
});

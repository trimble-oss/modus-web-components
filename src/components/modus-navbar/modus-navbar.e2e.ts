import { newE2EPage } from '@stencil/core/testing';

describe('modus-navbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-navbar></modus-navbar>');
    const element = await page.find('modus-navbar');
    expect(element).toHaveClass('hydrated');
  });

  it('shows shadow when showShadow is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-navbar show-shadow></modus-navbar>');
    const element = await page.find('modus-navbar >>> nav');
    expect(element).toHaveClass('shadow');
  });

  it('shows no shadow when showShadow is false', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-navbar></modus-navbar>');
    const element = await page.find('modus-navbar >>> nav');
    expect(element).not.toHaveClass('shadow');
  });
});

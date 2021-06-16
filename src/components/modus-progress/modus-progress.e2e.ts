import { newE2EPage } from '@stencil/core/testing';

describe('modus-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-progress></modus-progress>');
    const element = await page.find('modus-progress');
    expect(element).toHaveClass('hydrated');
  });
});

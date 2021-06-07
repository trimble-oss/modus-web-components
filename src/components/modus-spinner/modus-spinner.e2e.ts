import { newE2EPage } from '@stencil/core/testing';

describe('modus-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-spinner></modus-spinner>');
    const element = await page.find('modus-spinner');
    expect(element).toHaveClass('hydrated');
  });
});

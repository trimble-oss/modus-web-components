import { newE2EPage } from '@stencil/core/testing';

describe('modus-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-checkbox></modus-checkbox>');

    const element = await page.find('modus-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});

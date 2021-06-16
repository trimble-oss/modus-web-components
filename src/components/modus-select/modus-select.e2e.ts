import { newE2EPage } from '@stencil/core/testing';

describe('modus-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');
    const element = await page.find('modus-select');
    expect(element).toHaveClass('hydrated');
  });
});

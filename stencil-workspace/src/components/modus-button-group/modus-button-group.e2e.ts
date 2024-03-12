import { newE2EPage } from '@stencil/core/testing';

describe('modus-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-button-group></modus-button-group>');

    const element = await page.find('modus-button-group');
    expect(element).toHaveClass('hydrated');
  });
});

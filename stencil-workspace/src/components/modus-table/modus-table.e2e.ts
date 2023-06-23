import { newE2EPage } from '@stencil/core/testing';

describe('modus-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-table></modus-table>');

    const element = await page.find('modus-table');
    expect(element).toHaveClass('hydrated');
  });
});

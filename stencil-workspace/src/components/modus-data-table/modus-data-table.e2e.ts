import { newE2EPage } from '@stencil/core/testing';

describe('modus-data-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-data-table></modus-data-table>');

    const element = await page.find('modus-data-table');
    expect(element).toHaveClass('hydrated');
  });
});

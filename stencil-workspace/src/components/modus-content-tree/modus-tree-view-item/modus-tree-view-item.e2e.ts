import { newE2EPage } from '@stencil/core/testing';

describe('modus-tree-view-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-tree-view-item></modus-tree-view-item>');

    const element = await page.find('modus-tree-view-item');
    expect(element).toHaveClass('hydrated');
  });
});

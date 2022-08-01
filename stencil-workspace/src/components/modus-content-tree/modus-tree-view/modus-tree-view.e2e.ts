import { newE2EPage } from '@stencil/core/testing';

describe('modus-tree-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-tree-view></modus-tree-view>');

    const element = await page.find('modus-tree-view');
    expect(element).toHaveClass('hydrated');
  });
});

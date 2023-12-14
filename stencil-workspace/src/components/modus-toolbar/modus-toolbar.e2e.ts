import { newE2EPage } from '@stencil/core/testing';

describe('modus-toolbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toolbar></modus-toolbar>');
    const element = await page.find('modus-toolbar');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the layout prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toolbar></modus-toolbar>');
    const component = await page.find('modus-toolbar');
    const element = await page.find('modus-toolbar >>> div');
    expect(element).toHaveClass('layout-horizontal');

    component.setProperty('layout', 'vertical');
    await page.waitForChanges();
    expect(element).toHaveClass('layout-vertical');
  });

  it('renders changes to the toolbarStyle prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toolbar></modus-toolbar>');
    const component = await page.find('modus-toolbar');
    const element = await page.find('modus-toolbar >>> div');
    expect(element).toHaveClass('style-combined');

    component.setProperty('toolbarStyle', 'split');
    await page.waitForChanges();
    expect(element).toHaveClass('style-split');
  });
});

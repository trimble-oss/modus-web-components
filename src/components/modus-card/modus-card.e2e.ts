import { newE2EPage } from '@stencil/core/testing';

describe('modus-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const element = await page.find('modus-card');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the height prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const component = await page.find('modus-card');
    const element = await page.find('modus-card >>> article');
    let computedStyle = await element.getComputedStyle();
    expect(computedStyle['height']).toEqual('269px');

    component.setProperty('height', '300px');
    await page.waitForChanges();
    computedStyle = await element.getComputedStyle();
    expect(computedStyle['height']).toEqual('300px');
  });

  it('renders changes to the width prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const component = await page.find('modus-card');
    const element = await page.find('modus-card >>> article');
    let computedStyle = await element.getComputedStyle();
    expect(computedStyle['width']).toEqual('240px');

    component.setProperty('width', '200px');
    await page.waitForChanges();
    computedStyle = await element.getComputedStyle();
    expect(computedStyle['width']).toEqual('200px');
  });
});

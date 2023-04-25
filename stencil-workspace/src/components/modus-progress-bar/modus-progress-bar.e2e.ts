import { newE2EPage } from '@stencil/core/testing';

describe('modus-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-progress-bar></modus-progress-bar>');
    const element = await page.find('modus-progress-bar');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to background color prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-progress-bar></modus-progress-bar>');
    const component = await page.find('modus-progress-bar');
    const el = await page.find('modus-progress-bar >>> .modus-progress-bar');

    component.setProperty('backgroundColor', '#FF0000');
    await page.waitForChanges();
    const computedStyle = await el.getComputedStyle();
    expect(computedStyle['background-color']).toEqual('rgb(255, 0, 0)');
  });

  it('renders changes to color prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-progress-bar></modus-progress-bar>');
    const component = await page.find('modus-progress-bar');
    const el = await page.find('modus-progress-bar >>> .progress');

    component.setProperty('color', '#FF0000');
    await page.waitForChanges();
    const computedStyle = await el.getComputedStyle();
    expect(computedStyle['background-color']).toEqual('rgb(255, 0, 0)');
  });

  it('renders changes to text color prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-progress-bar></modus-progress-bar>');
    const component = await page.find('modus-progress-bar');
    const el = await page.find('modus-progress-bar >>> .progress');

    component.setProperty('textColor', '#FF0000');
    await page.waitForChanges();
    const computedStyle = await el.getComputedStyle();
    expect(computedStyle['color']).toEqual('rgb(255, 0, 0)');
  });

  it('renders changes to text prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-progress-bar></modus-progress-bar>');
    const component = await page.find('modus-progress-bar');
    const el = await page.find('modus-progress-bar >>> .progress');
    expect(await el.innerText).toEqual('');

    component.setProperty('text', 'Hello, World!');
    await page.waitForChanges();
    expect(await el.innerText).toEqual('Hello, World!');
  });

  it('renders changes to size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-progress-bar></modus-progress-bar>');
    const component = await page.find('modus-progress-bar');
    const el = await page.find('modus-progress-bar >>> .modus-progress-bar');

    expect(el).toHaveClass('default');
    component.setProperty('size', 'compact');
    await page.waitForChanges();
    expect(el).toHaveClass('compact');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('modus-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tooltip></modus-tooltip>');
    const element = await page.find('modus-tooltip');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to text', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tooltip text="Hello"></modus-tooltip>');

    let text = await page.find('modus-tooltip >>> .text');
    expect(text.textContent).toEqual('Hello');

    const tooltip = await page.find('modus-tooltip');
    tooltip.setProperty('text', 'Something else');
    await page.waitForChanges();
    text = await page.find('modus-tooltip >>> .text');
    expect(text.textContent).toEqual('Something else');
  });

  it('renders changes to the position', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tooltip></modus-tooltip>');
    const component = await page.find('modus-tooltip');
    const element = await page.find('modus-tooltip >>> .modus-tooltip');
    expect(element).toHaveClass('top');

    component.setProperty('position', 'bottom');
    await page.waitForChanges();
    expect(element).toHaveClass('bottom');
  });


  it('tooltip should show or hide if disabled prop set', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-tooltip text="Hello"></modus-tooltip>');
    const tooltip = await page.find('modus-tooltip');

    tooltip.setProperty('disabled', false);
    await page.waitForChanges();
    let text = await page.find('modus-tooltip >>> .text');
    expect(text.textContent).toEqual('Hello');

    tooltip.setProperty('disabled', true);
    await page.waitForChanges();
    text = await page.find('modus-tooltip >>> .text');
    expect(text).toEqual(null);
  });
});

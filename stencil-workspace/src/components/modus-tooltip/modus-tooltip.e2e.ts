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

    let text = await page.find('modus-tooltip >>> .tooltip');
    expect(text.textContent).toEqual('Hello');

    const tooltip = await page.find('modus-tooltip');
    tooltip.setProperty('text', 'Something else');
    await page.waitForChanges();
    text = await page.find('modus-tooltip >>> .tooltip');
    expect(text.textContent).toEqual('Something else');
  });

  it('renders changes to the position', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tooltip text="Tooltip text...">
          <modus-button>Button</modus-button>
        </modus-tooltip>
    `);
    const component = await page.find('modus-tooltip');
    let element = await page.find('modus-tooltip >>> .tooltip');
    expect(element.getAttribute('data-popper-placement')).toEqual('top');

    component.setProperty('position', 'bottom');
    await page.waitForChanges();
    element = await page.find('modus-tooltip >>> .tooltip');
    expect(element.getAttribute('data-popper-placement')).toEqual('bottom');
  });

  it('tooltip should show or hide if disabled prop set', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-tooltip text="Hello"></modus-tooltip>');
    const tooltip = await page.find('modus-tooltip');

    tooltip.setProperty('disabled', false);
    await page.waitForChanges();
    let text = await page.find('modus-tooltip >>> .tooltip');
    expect(text.textContent).toEqual('Hello');

    tooltip.setProperty('disabled', true);
    await page.waitForChanges();
    text = await page.find('modus-tooltip >>> .tooltip');
    expect(text).toEqual(null);
  });
});

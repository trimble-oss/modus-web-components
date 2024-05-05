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

    await page.setContent('<modus-tooltip></modus-tooltip>');

    let text = await page.find('modus-tooltip >>> .tooltip');
    expect(text).toHaveClass('hide');

    const tooltip = await page.find('modus-tooltip');
    tooltip.setProperty('text', 'Something');
    await page.waitForChanges();

    text = await page.find('modus-tooltip >>> .tooltip');
    expect(text.textContent).toEqual('Something');
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
    expect(text).not.toHaveClass('hide');

    tooltip.setProperty('disabled', true);
    await page.waitForChanges();
    text = await page.find('modus-tooltip >>> .tooltip');
    expect(text).toHaveClass('hide');
  });

  it('should display tooltip on hover', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-tooltip text="Tooltip text">
            <modus-button>Button</modus-button>
          </modus-tooltip>
      `);
    await page.hover('modus-button'); // Hover over the element that triggers the tooltip
    await page.waitForChanges();

    const tooltip = await page.find('modus-tooltip >>> .tooltip');
    expect(tooltip.getAttribute('data-show')).not.toBeNull();

    const button = await page.find('modus-button >>> button');
    await button.click();
    await page.waitForChanges();
    expect(tooltip.getAttribute('data-show')).toBeNull();
  });

  it('preserves tabindex on hide', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-tooltip text="Tooltip text">
        <modus-button tabindex="3" id="tooltip-button">Button</modus-button>
      </modus-tooltip>
      <modus-button id="not-tooltip-button">Other button</modus-button>
      `);

    const tooltip = await page.find('modus-tooltip');
    const button = await tooltip.find('#tooltip-button');
    await page.hover('#tooltip-button');
    await page.waitForChanges();
    expect(button.getAttribute('tabindex')).toEqual('3');

    await page.hover('#not-tooltip-button');
    await page.waitForChanges();
    expect(button.getAttribute('tabindex')).toEqual('3');
  });

  it('preserves lack of tabindex on hide', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-tooltip text="Tooltip text">
        <modus-button id="tooltip-button">Button</modus-button>
      </modus-tooltip>
      <modus-button id="not-tooltip-button">Other button</modus-button>
      `);

    const tooltip = await page.find('modus-tooltip');
    const button = await tooltip.find('#tooltip-button');
    await page.hover('#tooltip-button');
    await page.waitForChanges();
    expect(button.getAttribute('tabindex')).toEqual('-1');

    await page.hover('#not-tooltip-button');
    await page.waitForChanges();
    expect(button.getAttribute('tabindex')).toBeNull();
  });

  it('focuses the tooltipped element on show', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-tooltip text="Tooltip text">
        <modus-button id="tooltip-button">Button</modus-button>
      </modus-tooltip>
      `);

    await page.hover('#tooltip-button');
    await page.waitForChanges();
    const activeElementId = await page.evaluate(() => document.activeElement!.id);
    expect(activeElementId).toEqual('tooltip-button');
  });

  it('hides the tooltip on "escape" key', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-tooltip text="Tooltip text">
        <modus-button tabindex="3" id="tooltip-button">Button</modus-button>
      </modus-tooltip>
      `);

    const tooltip = await page.find('modus-tooltip >>> .tooltip');
    await page.hover('#tooltip-button');

    await page.waitForChanges();
    expect(tooltip).toHaveAttribute('data-show');

    page.keyboard.press('Escape');
    await page.waitForChanges();
    expect(tooltip).not.toHaveAttribute('data-show');
  });

  it('renders aria-label on div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tooltip aria-label="test label"></modus-tooltip>');
    let element = await page.find('modus-tooltip >>> .tooltip');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tooltip></modus-tooltip>');
    let element = await page.find('modus-tooltip >>> .tooltip');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tooltip aria-label=""></modus-tooltip>');
    let element = await page.find('modus-tooltip >>> .tooltip');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });
});

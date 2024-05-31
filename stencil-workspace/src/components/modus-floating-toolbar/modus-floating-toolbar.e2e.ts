import { newE2EPage } from '@stencil/core/testing';

describe('modus-floating-toolbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <modus-floating-toolbar>
        <modus-button>Button</modus-button>
      </modus-floating-toolbar>
    `);

    const element = await page.find('modus-floating-toolbar');
    expect(element).toHaveClass('hydrated');
  });

  it('should render a divider', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <modus-floating-toolbar>
        <modus-divider></modus-divider>
      </modus-floating-toolbar>
    `);

    const element = await page.find('modus-floating-toolbar');
    expect(element).toHaveClass('hydrated');
  });

  it('renders buttons inside the toolbar', async () => {
    const page = await newE2EPage();

    await page.setContent(`
        <modus-floating-toolbar>
          <modus-button>Button 1</modus-button>
          <modus-button>Button 2</modus-button>
        </modus-floating-toolbar>
      `);
    const buttons = await page.findAll('modus-floating-toolbar >>> modus-button');
    expect(buttons.length).toBe(2);
  });

  it('renders dividers between buttons', async () => {
    const page = await newE2EPage();

    await page.setContent(`
        <modus-floating-toolbar>
          <modus-button>Button 1</modus-button>
          <modus-divider></modus-divider>
          <modus-button>Button 2</modus-button>
        </modus-floating-toolbar>
      `);
    const dividers = await page.findAll('modus-floating-toolbar >>> modus-divider');
    expect(dividers.length).toBe(1);
  });

  it('disables buttons when the disabled prop is set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-floating-toolbar disabled></modus-floating-toolbar>');
    const toolbar = await page.find('modus-floating-toolbar');
    toolbar.setProperty('disabled', true);
    await page.waitForChanges();

    const buttons = await page.findAll('modus-floating-toolbar >>> modus-button');
    for (const button of buttons) {
      expect(button.getAttribute('disabled')).toBe('true');
    }
  });

  it('applies the aria-label to buttons', async () => {
    const ariaLabel = 'Test Label';
    const page = await newE2EPage();

    await page.setContent('<modus-floating-toolbar></modus-floating-toolbar>');
    const toolbar = await page.find('modus-floating-toolbar');
    toolbar.setProperty('ariaLabel', ariaLabel);
    await page.waitForChanges();

    const buttons = await page.findAll('modus-floating-toolbar >>> modus-button');
    for (const button of buttons) {
      expect(button.getAttribute('aria-label')).toBe(ariaLabel);
    }
  });

  it('has the correct floating position and style', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-floating-toolbar></modus-floating-toolbar>');
    const toolbar = await page.find('modus-floating-toolbar');
    const style = await toolbar.getComputedStyle();

    expect(style.position).toBe('fixed');
    expect(style.bottom).toBe('20px');
    expect(style.right).toBe('20px');
  });

  it('renders button properties correctly', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-floating-toolbar>
        <modus-button icon-only="close">Close</modus-button>
      </modus-floating-toolbar>
    `);

    const button = await page.find('modus-floating-toolbar >>> modus-button');
    expect(button).not.toBeNull();
    expect(button.textContent).toEqual('Close');
    expect(button.getAttribute('icon-only')).toEqual('close');
    expect(button.getAttribute('button-style')).toEqual('borderless');
    expect(button.getAttribute('color')).toEqual('secondary');
  });
});

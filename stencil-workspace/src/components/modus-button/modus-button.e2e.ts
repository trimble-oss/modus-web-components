import { newE2EPage } from '@stencil/core/testing';

describe('modus-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const element = await page.find('modus-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the buttonStyle prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const component = await page.find('modus-button');
    const element = await page.find('modus-button >>> button');
    expect(element).toHaveClass('style-fill');

    component.setProperty('buttonStyle', 'borderless');
    await page.waitForChanges();
    expect(element).toHaveClass('style-borderless');
  });

  it('renders changes to the color prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const component = await page.find('modus-button');
    const element = await page.find('modus-button >>> button');
    expect(element).toHaveClass('color-primary');

    component.setProperty('color', 'primary');
    await page.waitForChanges();
    expect(element).toHaveClass('color-primary');
  });

  it('renders changes to the iconOnly prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    await page.waitForChanges();

    const component = await page.find('modus-button');
    const element = await page.find('modus-button >>> button');
    expect(element).not.toHaveClass('icon-only');

    component.setProperty('iconOnly', 'add');
    await page.waitForChanges();
    const icon = await page.find('modus-button >>> .icon-add');
    expect(icon).toBeTruthy();
  });

  it('renders changes to the leftIcon prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    await page.waitForChanges();

    const component = await page.find('modus-button');
    let icon = await page.find('modus-button >>> .left-icon');
    expect(icon).toBeFalsy();

    component.setProperty('leftIcon', 'add');
    await page.waitForChanges();
    icon = await page.find('modus-button >>> .left-icon');
    expect(icon).toBeTruthy();
  });

  it('renders changes to the rightIcon prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    await page.waitForChanges();

    const component = await page.find('modus-button');
    let icon = await page.find('modus-button >>> .right-icon');
    expect(icon).toBeFalsy();

    component.setProperty('rightIcon', 'add');
    await page.waitForChanges();
    icon = await page.find('modus-button >>> .right-icon');
    expect(icon).toBeTruthy();
  });

  it('renders changes to the showCaret prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    await page.waitForChanges();

    const component = await page.find('modus-button');
    let icon = await page.find('modus-button >>> .icon-caret-down');
    expect(icon).toBeFalsy();

    component.setProperty('showCaret', true);
    await page.waitForChanges();
    icon = await page.find('modus-button >>> .icon-caret-down');
    expect(icon).toBeTruthy();
  });

  it('should not render right icon when caret icon is visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button right-icon="add"></modus-button>');
    await page.waitForChanges();

    const component = await page.find('modus-button');
    await page.waitForChanges();
    let icon = await page.find('modus-button >>> .right-icon');
    expect(icon).toBeTruthy();

    component.setProperty('showCaret', true);
    await page.waitForChanges();
    icon = await page.find('modus-button >>> .icon-caret-down');
    expect(icon).toBeTruthy();
    icon = await page.find('modus-button >>> .right-icon');
    expect(icon).toBeFalsy();
  });

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const component = await page.find('modus-button');
    const element = await page.find('modus-button >>> button');
    expect(element).not.toHaveAttribute('disabled');

    component.setProperty('disabled', true);
    await page.waitForChanges();
    expect(element).toHaveAttribute('disabled');
  });

  it('renders changes to the size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const component = await page.find('modus-button');
    const element = await page.find('modus-button >>> button');
    expect(element).toHaveClass('size-medium');

    component.setProperty('size', 'large');
    await page.waitForChanges();
    expect(element).toHaveClass('size-large');
  });

  it('emits buttonClick event on button click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const buttonClick = await page.spyOnEvent('buttonClick');
    const element = await page.find('modus-button >>> button');

    await element.click();
    await page.waitForChanges();
    expect(buttonClick).toHaveReceivedEvent();
  });

  it('does not emit buttonClick event on disabled button click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const buttonClick = await page.spyOnEvent('buttonClick');
    const component = await page.find('modus-button');
    const element = await page.find('modus-button >>> button');
    component.setProperty('disabled', true);
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(buttonClick).not.toHaveReceivedEvent();
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button aria-label="test label"></modus-button>');
    const element = await page.find('modus-button >>> button');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const element = await page.find('modus-button >>> button');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button aria-label=""></modus-button>');
    const element = await page.find('modus-button >>> button');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('renders progress animation when progress is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-button></modus-button>');
    await page.waitForChanges();

    const component = await page.find('modus-button');
    const element = await page.find('modus-button >>> button');
    expect(element).toHaveClass('color-primary');

    component.setProperty('color', 'danger');
    await page.waitForChanges();

    component.setProperty('criticalAction', true);
    await page.waitForChanges();

    await element.click({ clickCount: 1, delay: 3000 });
    await page.waitForChanges();

    const progressWidth = await page.evaluate(() => {
      const button = document.querySelector('modus-button').shadowRoot.querySelector('button');
      return getComputedStyle(button).getPropertyValue('--progress-width');
    });

    expect(progressWidth.trim()).toBe('100%');
  });
});

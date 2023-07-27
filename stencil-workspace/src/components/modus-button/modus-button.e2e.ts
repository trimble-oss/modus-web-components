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
});

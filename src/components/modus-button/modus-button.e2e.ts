import { newE2EPage } from '@stencil/core/testing';

describe('modus-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const element = await page.find('modus-button');
    expect(element).toHaveClass('hydrated');
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
    expect(element).toHaveClass('medium');

    component.setProperty('size', 'large');
    await page.waitForChanges();
    expect(element).toHaveClass('large');
  });

  it('renders changes to the type prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const component = await page.find('modus-button');
    const element = await page.find('modus-button >>> button');
    expect(element).toHaveClass('tertiary');

    component.setProperty('type', 'primary');
    await page.waitForChanges();
    expect(element).toHaveClass('primary');
  });

  it('emits buttonClick event on click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button></modus-button>');
    const buttonClick = await page.spyOnEvent('buttonClick');
    const element = await page.find('modus-button >>> button');

    await element.click();
    await page.waitForChanges();
    expect(buttonClick).toHaveReceivedEvent();
  });
});

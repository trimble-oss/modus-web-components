import { newE2EPage } from '@stencil/core/testing';

describe('modus-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-switch></modus-switch>');

    const element = await page.find('modus-switch');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-switch></modus-switch>');
    const component = await page.find('modus-switch');

    let label = await page.find('modus-switch >>> .modus-switch > label');
    expect(label).toBeNull();

    component.setProperty('label', 'Hello, world!');
    await page.waitForChanges();

    label = await page.find('modus-switch >>> .modus-switch > label');
    expect(label.innerText).toBe('Hello, world!');
  });

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-switch label="Hello, World!"></modus-switch>');
    const component = await page.find('modus-switch');

    component.setProperty('disabled', 'true');
    await page.waitForChanges();

    const input = await page.find('modus-switch >>> input');
    expect(input).toHaveAttribute('disabled');

    const container = await page.find('modus-switch >>> .modus-switch');
    expect(container).toHaveClass('disabled');
  });

  it('renders changes to the checked prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-switch></modus-switch>');
    const component = await page.find('modus-switch');

    component.setProperty('checked', 'true');
    await page.waitForChanges();

    const input = await page.find('modus-switch >>> input');
    expect(await input.getProperty('checked')).toBeTruthy();
  });

  it('emits switchClick event on switch click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-switch></modus-switch>');
    const switchClick = await page.spyOnEvent('switchClick');
    const element = await page.find('modus-switch >>> .modus-switch');
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(switchClick).toHaveReceivedEvent();
  });

  it('does not emit switchClick event on disabled switch click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-switch disabled></modus-switch>');
    const switchClick = await page.spyOnEvent('switchClick');
    const element = await page.find('modus-switch >>> .modus-switch');
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(switchClick).not.toHaveReceivedEvent();
  });

  it('updates input checked on click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-switch></modus-switch>');
    const modusSwitch = await page.find('modus-switch');
    const element = await page.find('modus-switch >>> .modus-switch');
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();

    const input = await page.find('modus-switch >>> input');
    expect(await modusSwitch.getProperty('checked')).toBeTruthy();
    expect(await input.getProperty('checked')).toBeTruthy();

    await element.click();
    await page.waitForChanges();

    expect(await modusSwitch.getProperty('checked')).toBeFalsy();
    expect(await input.getProperty('checked')).toBeFalsy();
  });
});

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
    const input = await page.find('modus-switch >>> input');
    expect(await input.getProperty('checked')).toBeFalsy();

    component.setProperty('checked', 'true');
    await page.waitForChanges();

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
  it('renders with medium size', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-switch></modus-switch>');

    const element = await page.find('modus-switch >>> .modus-switch');
    expect(element).toHaveClass('medium');
  });

  it('renders with small size', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-switch size="small"></modus-switch>');

    const element = await page.find('modus-switch >>> .modus-switch');
    expect(element).toHaveClass('small');
  });

  it('sets tabindex to -1 when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-switch disabled></modus-switch>');

    const element = await page.find('modus-switch >>> .modus-switch');
    expect(element).toHaveAttribute('tabindex');
    expect(element.getAttribute('tabindex')).toEqual('-1');
  });

  it('renders with "for" on label equal to "id" on input', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-switch label="test label"></modus-switch>');

    const input = await page.find('modus-switch >>> input');
    const id = await input.getAttribute('id');

    const label = await page.find('modus-switch >>> label');
    const forAttr = await label.getAttribute('for');

    expect(id).toEqual(forAttr);
  });
});

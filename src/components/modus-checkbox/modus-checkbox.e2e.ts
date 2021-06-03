import { newE2EPage } from '@stencil/core/testing';

describe('modus-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-checkbox></modus-checkbox>');

    const element = await page.find('modus-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('default renders to no label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');

    const label = await page.find('modus-checkbox >>> label');
    expect(label).toBeNull();
  });

  it('renders changes to the size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const component = await page.find('modus-checkbox');
    const element = await page.find('modus-checkbox >>> .modus-checkbox');
    expect(element).toHaveClass('medium');

    component.setProperty('size', 'small');
    await page.waitForChanges();
    expect(element).toHaveClass('small');
  });

  it('renders changes to the label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const component = await page.find('modus-checkbox');

    component.setProperty('label', 'Hello, world!');
    await page.waitForChanges();

    const label = await page.find('modus-checkbox >>> label');
    expect(label.textContent).toBe('Hello, world!');
  });

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox label="Hello, World!"></modus-checkbox>');
    const component = await page.find('modus-checkbox');

    component.setProperty('disabled', 'true');
    await page.waitForChanges();

    const input = await page.find('modus-checkbox >>> input');
    expect(input).toHaveAttribute('disabled');

    const label = await page.find('modus-checkbox >>> label');
    expect(label).toHaveClass('disabled');
  });

  it('renders changes to the checked prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const component = await page.find('modus-checkbox');

    component.setProperty('checked', 'true');
    await page.waitForChanges();

    const input = await page.find('modus-checkbox >>> input');
    expect(await input.getProperty('checked')).toBeTruthy();
  });

  it('emits checkboxClick event on checkbox click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const checkboxClick = await page.spyOnEvent('checkboxClick');
    const element = await page.find('modus-checkbox >>> .modus-checkbox')
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(checkboxClick).toHaveReceivedEvent();
  });

  it('does not emit checkboxClick event on disabled checkbox click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox disabled></modus-checkbox>');
    const checkboxClick = await page.spyOnEvent('checkboxClick');
    const element = await page.find('modus-checkbox >>> .modus-checkbox')
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(checkboxClick).not.toHaveReceivedEvent();
  });

  it('updates input checked on click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const modusCheckbox = await page.find('modus-checkbox');
    const element = await page.find('modus-checkbox >>> .modus-checkbox')
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();

    const input = await page.find('modus-checkbox >>> input');
    expect(await modusCheckbox.getProperty('checked')).toBeTruthy();
    expect(await input.getProperty('checked')).toBeTruthy();

    await element.click();
    await page.waitForChanges();

    expect(await modusCheckbox.getProperty('checked')).toBeFalsy();
    expect(await input.getProperty('checked')).toBeFalsy();
  });
});

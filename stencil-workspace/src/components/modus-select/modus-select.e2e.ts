import { newE2EPage } from '@stencil/core/testing';

describe('modus-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');
    const element = await page.find('modus-select');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const select = await page.find('modus-select');
    const button = await page.find('modus-select >>> button');

    expect(select).not.toHaveClass('disabled');
    expect(await button.getProperty('disabled')).toBeFalsy();

    select.setProperty('disabled', 'true');
    await page.waitForChanges();

    expect(await button.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to errorText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const select = await page.find('modus-select');
    select.setProperty('errorText', 'Error.');
    await page.waitForChanges();

    const button = await page.find('modus-select >>> button');
    expect(button).toHaveClass('error');

    const errorLabel = await page.find('modus-select >>> label.error');
    expect(errorLabel).not.toBeNull();
  });

  it('renders changes to validText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const select = await page.find('modus-select');
    select.setProperty('validText', 'Valid.');
    await page.waitForChanges();

    const button = await page.find('modus-select >>> button');
    expect(button).toHaveClass('valid');

    const validLabel = await page.find('modus-select >>> label.valid');
    expect(validLabel).not.toBeNull();
  });

  it('renders changes to helperText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const select = await page.find('modus-select');
    select.setProperty('helperText', 'Helper.');
    await page.waitForChanges();

    const helperLabel = await page.find('modus-select >>> label.helper');
    expect(helperLabel).not.toBeNull();
  });

  it('renders changes to label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const select = await page.find('modus-select');
    select.setProperty('label', 'Hello Label');
    await page.waitForChanges();

    const label = await page.find('modus-select >>> .label-container label');
    expect(label.textContent).toEqual('Hello Label');
  });

  it('renders changes to required', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const select = await page.find('modus-select');
    select.setProperty('required', 'true');
    await page.waitForChanges();

    const required = await page.find('modus-select >>> span.required');
    expect(required).not.toBeNull();
  });

  it('renders changes to value', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const options = [{ display: 'Some value' }];
    const select = await page.find('modus-select');
    select.setProperty('options', options);
    select.setProperty('optionsDisplayProp', 'display');
    select.setProperty('value', options[0]);
    await page.waitForChanges();

    const button = await page.find('modus-select >>> button');
    expect(await button.getProperty('textContent')).toEqual(options[0].display);
  });

  it('renders changes to menuSize', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-select></modus-select>');
    const options = [{ display: 'Some value' }];
    const select = await page.find('modus-select');
    select.setProperty('options', options);
    await page.waitForChanges();

    const dropdown = await page.find('modus-select >>> .dropdown-list');
    expect(dropdown).toHaveClass('menu-medium');
    let computedStyle = await dropdown.getComputedStyle();
    expect(computedStyle['max-height']).toEqual('240px');

    select.setProperty('menuSize', 'small');
    await page.waitForChanges();

    expect(dropdown).toHaveClass('menu-small');
    computedStyle = await dropdown.getComputedStyle();
    expect(computedStyle['max-height']).toEqual('140px');
  });

  it('emits valueChange event', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const options = [{ display: 'Some value' }];
    const select = await page.find('modus-select');
    select.setProperty('options', options);
    select.setProperty('optionsDisplayProp', 'display');
    select.setProperty('value', options[0]);
    await page.waitForChanges();

    const valueChange = await page.spyOnEvent('valueChange');
    const element = await page.find('modus-select >>> button');

    await element.click();
    await page.waitForChanges();
    const item = await page.find('modus-select >>> .dropdown-list-item');
    await item.click();
    await page.waitForChanges();

    expect(valueChange).toHaveReceivedEvent();
    expect(valueChange).toHaveReceivedEventDetail(options[0]);
  });

  it('emits valueChange event on enter', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-select></modus-select>');

    const options = [{ display: 'Some value' }];
    const select = await page.find('modus-select');
    select.setProperty('options', options);
    select.setProperty('optionsDisplayProp', 'display');
    select.setProperty('value', options[0]);
    await page.waitForChanges();

    const valueChange = await page.spyOnEvent('valueChange');
    const element = await page.find('modus-select >>> button');

    await element.click();
    await page.waitForChanges();
    const item = await page.find('modus-select >>> .dropdown-list-item');
    item.press('Enter');
    await page.waitForChanges();

    expect(valueChange).toHaveReceivedEvent();
    expect(valueChange).toHaveReceivedEventDetail(options[0]);
  });
});

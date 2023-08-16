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

    expect(select).not.toHaveClass('disabled');
    expect(await select.getProperty('disabled')).toBeFalsy();

    select.setProperty('disabled', true);
    await page.waitForChanges();

    expect(await select.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to errorText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const select = await page.find('modus-select');
    select.setProperty('errorText', 'Error.');
    await page.waitForChanges();

    const button = await page.find('modus-select >>> select');
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

    const button = await page.find('modus-select >>> select');
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
    select.setProperty('required', true);
    await page.waitForChanges();

    const required = await page.find('modus-select >>> span.required');
    expect(required).not.toBeNull();
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

    const button = await page.find('modus-select >>> select');
    expect(await button.getProperty('textContent')).toEqual(options[0].display);
  });

  it('emits valueChange event', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-select></modus-select>');

    const options = [{ display: 'Option 0' }, { display: 'Option 1 - Select me!' }, { display: 'Option 2' }];
    const select = await page.find('modus-select');
    select.setProperty('optionsDisplayProp', 'display');
    select.setProperty('options', options);
    await page.waitForChanges();

    const valueChangeSpy = await page.spyOnEvent('valueChange');
    const selectElement = await page.find('modus-select >>> select');
    await selectElement.focus();
    await page.waitForChanges();

    // Simulate option selection by changing the value and triggering the change event
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(valueChangeSpy).toHaveReceivedEvent();
    expect(valueChangeSpy).toHaveReceivedEventDetail(options[1]);
  });
});

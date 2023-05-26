import { newE2EPage } from '@stencil/core/testing';

describe('modus-time-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-time-picker></modus-time-picker>');

    const element = await page.find('modus-time-picker');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');

    const textInput = await page.find('modus-time-picker');
    const input = await page.find('modus-time-picker >>> input');

    expect(textInput).not.toHaveClass('disabled');
    expect(await input.getProperty('disabled')).toBeFalsy();

    textInput.setProperty('disabled', 'true');
    await page.waitForChanges();

    expect(await input.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to errorText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');

    const textInput = await page.find('modus-time-picker');
    textInput.setProperty('errorText', 'Error.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-time-picker >>> .input-container');
    expect(inputContainer).toHaveClass('error');

    const errorLabel = await page.find('modus-time-picker >>> label.error');
    expect(errorLabel).not.toBeNull();
  });

  it('renders changes to validText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');

    const textInput = await page.find('modus-time-picker');
    textInput.setProperty('validText', 'Valid.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-time-picker >>> .input-container');
    expect(inputContainer).toHaveClass('valid');

    const validLabel = await page.find('modus-time-picker >>> label.valid');
    expect(validLabel).not.toBeNull();
  });

  it('renders changes to helperText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');

    const textInput = await page.find('modus-time-picker');
    textInput.setProperty('helperText', 'Helper.');
    await page.waitForChanges();

    const helperLabel = await page.find('modus-time-picker >>> label.helper');
    expect(helperLabel).not.toBeNull();
  });

  it('renders changes to label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');

    const textInput = await page.find('modus-time-picker');
    textInput.setProperty('label', 'Hello Label');
    await page.waitForChanges();

    const label = await page.find('modus-time-picker >>> .label-container label');
    expect(label.textContent).toEqual('Hello Label');
  });

  it('renders changes to placeholder', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');

    const textInput = await page.find('modus-time-picker');
    textInput.setProperty('placeholder', 'Placeholder');
    await page.waitForChanges();

    const input = await page.find('modus-time-picker >>> input');
    expect(await input.getProperty('placeholder')).toEqual('Placeholder');
  });

  it('renders changes to required', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');

    const textInput = await page.find('modus-time-picker');
    textInput.setProperty('required', 'true');
    await page.waitForChanges();

    const required = await page.find('modus-time-picker >>> span.required');
    expect(required).not.toBeNull();
  });

  it('renders changes to value', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');

    const textInput = await page.find('modus-time-picker');
    textInput.setProperty('value', '12:00');
    await page.waitForChanges();

    const input = await page.find('modus-time-picker >>> input');
    expect(await input.getProperty('value')).toEqual('12:00');
  });

  it('renders changes to autoFocusInput', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker auto-focus-input="true"></modus-time-picker>');
    await page.waitForChanges();

    const input = await page.find('modus-time-picker >>> input');
    expect(await input.getProperty('autofocus')).toBeTruthy();
  });

  it('renders changes to disableValidation', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-time-picker></modus-time-picker>');

    // Input an invalid time
    const component = await page.find('modus-time-picker');
    component.setProperty('disableValidation', true);
    await page.waitForChanges();

    const input = await page.find('modus-time-picker >>> input');
    await input.type('121', { delay: 20 });
    await page.waitForChanges();

    const body = await page.find('body');
    await body.click();
    await page.waitForChanges();

    const inputContainer = await page.find('modus-time-picker >>> .input-container');
    expect(inputContainer).not.toHaveClass('error');

    const errorLabel = await page.find('modus-time-picker >>> label.error');
    expect(errorLabel).toBeNull();
  });

  // Verifies 12 hour clock as input
  it('renders changes to ampm', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-time-picker></modus-time-picker>');

    const input = await page.find('modus-time-picker >>> input');
    await input.type('12:00 AM', { delay: 20 });
    await page.waitForChanges();

    const body = await page.find('body');
    await body.click();
    await page.waitForChanges();

    const component = await page.find('modus-time-picker');
    expect(await component.getProperty('value')).toEqual('12:00');

    // Input an invalid time
    component.setProperty('ampm', true);
    await page.waitForChanges();

    await input.type(' AM', { delay: 20 });
    await page.waitForChanges();

    await body.click();
    await page.waitForChanges();

    const container = await page.find('modus-time-picker >>> .input-container');
    expect(container).not.toHaveClass('error');
  });

  it('renders changes to autoFormat', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker auto-focus-input="true"></modus-time-picker>');
    await page.waitForChanges();

    // Set autoFormat
    const component = await page.find('modus-time-picker');
    component.setProperty('autoFormat', true);
    await page.waitForChanges();

    // Input '12'
    const input = await page.find('modus-time-picker >>> input');
    await input.type('12', { delay: 20 });
    await page.waitForChanges();

    // Formatted
    expect(await input.getProperty('value')).toEqual('12:');
  });

  it('renders changes to allowedCharsRegex', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');
    await page.waitForChanges();

    const textInput = await page.find('modus-time-picker');
    textInput.setProperty('allowedCharsRegex', '.');
    await page.waitForChanges();

    const input = await page.find('modus-time-picker >>> input');
    await input.type('12', { delay: 20 });
    await page.waitForChanges();

    expect(await input.getProperty('value')).toEqual('12');
  });

  it('renders changes to min', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker label="Time"></modus-time-picker>');
    await page.waitForChanges();

    const component = await page.find('modus-time-picker');
    component.setProperty('min', '14:00');
    await page.waitForChanges();

    const input = await page.find('modus-time-picker >>> input');
    await input.type('11:00', { delay: 20 });
    await page.waitForChanges();

    const label = await page.find('modus-time-picker >>> .label-container');
    await label.click();
    await page.waitForChanges();

    const errorLabel = await page.find('modus-time-picker >>> label.error');
    expect(errorLabel).not.toBeNull();
  });

  it('renders changes to max', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker label="Time"></modus-time-picker>');
    await page.waitForChanges();

    const component = await page.find('modus-time-picker');
    component.setProperty('max', '14:00');
    await page.waitForChanges();

    const input = await page.find('modus-time-picker >>> input');
    await input.type('20:00', { delay: 20 });
    await page.waitForChanges();

    const label = await page.find('modus-time-picker >>> .label-container');
    await label.click();
    await page.waitForChanges();

    const errorLabel = await page.find('modus-time-picker >>> label.error');
    expect(errorLabel).not.toBeNull();
  });

  it('checks validation', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-time-picker label="Time"></modus-time-picker>');

    // Input an invalid time
    const input = await page.find('modus-time-picker >>> input');
    await input.type('121', { delay: 20 });
    await page.waitForChanges();

    const label = await page.find('modus-time-picker >>> .label-container');
    await label.click();
    await page.waitForChanges();

    const inputContainer = await page.find('modus-time-picker >>> .input-container');
    expect(await input.getProperty('value')).toEqual('121');
    expect(inputContainer).toHaveClass('error');

    const errorLabel = await page.find('modus-time-picker >>> label.error');
    expect(errorLabel.innerHTML).toContain('Invalid time');
  });

  it('emits valueChange event', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker></modus-time-picker>');
    const valueChange = await page.spyOnEvent('valueChange');
    const element = await page.find('modus-time-picker >>> input');
    await page.waitForChanges();

    await element.type('12', { delay: 20 });
    await page.waitForChanges();
    expect(valueChange).toHaveReceivedEvent();
  });

  it('emits timeInputBlur event', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-time-picker label="Time"></modus-time-picker>');
    const timeInputBlur = await page.spyOnEvent('timeInputBlur');

    const input = await page.find('modus-time-picker >>> input');
    await input.type('12', { delay: 20 });
    await page.waitForChanges();

    const label = await page.find('modus-time-picker >>> .label-container');
    await label.click();
    await page.waitForChanges();

    expect(timeInputBlur).toHaveReceivedEvent();
  });
});

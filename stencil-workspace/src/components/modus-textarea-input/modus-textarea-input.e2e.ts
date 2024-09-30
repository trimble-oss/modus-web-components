import { newE2EPage } from '@stencil/core/testing';

describe('modus-textarea-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-textarea-input></modus-textarea-input>');

    const element = await page.find('modus-textarea-input');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to clearable', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input clearable></modus-textarea-input>');

    let clear = await page.find('modus-textarea-input >>> .clear');
    expect(clear).toBeNull();

    const textInput = await page.find('modus-textarea-input');
    textInput.setProperty('value', 'Some value');
    await page.waitForChanges();
    clear = await page.find('modus-textarea-input >>> .clear');
    expect(clear).not.toBeNull();
  });

  it('renders changes to disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');

    const textInput = await page.find('modus-textarea-input');
    const input = await page.find('modus-textarea-input >>> textarea');

    expect(textInput).not.toHaveClass('disabled');
    expect(await input.getProperty('disabled')).toBeFalsy();

    textInput.setProperty('disabled', 'true');
    await page.waitForChanges();

    expect(await input.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to errorText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');

    const textInput = await page.find('modus-textarea-input');
    textInput.setProperty('errorText', 'Error.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-textarea-input >>> .input-container');
    expect(inputContainer).toHaveClass('error');

    const errorLabel = await page.find('modus-textarea-input >>> label.error');
    expect(errorLabel).not.toBeNull();
  });

  it('renders changes to validText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');

    const textInput = await page.find('modus-textarea-input');
    textInput.setProperty('validText', 'Valid.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-textarea-input >>> .input-container');
    expect(inputContainer).toHaveClass('valid');

    const validLabel = await page.find('modus-textarea-input >>> label.valid');
    expect(validLabel).not.toBeNull();
  });

  it('renders changes to helperText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');

    const textInput = await page.find('modus-textarea-input');
    textInput.setProperty('helperText', 'Helper.');
    await page.waitForChanges();

    const helperLabel = await page.find('modus-textarea-input >>> label.helper');
    expect(helperLabel).not.toBeNull();
  });

  it('renders changes to label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');

    const textInput = await page.find('modus-textarea-input');
    textInput.setProperty('label', 'Hello Label');
    await page.waitForChanges();

    const label = await page.find('modus-textarea-input >>> .label-container label');
    expect(label.textContent).toEqual('Hello Label');
  });

  it('renders changes to value', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');

    const textInput = await page.find('modus-textarea-input');
    const input = await page.find('modus-textarea-input >>> textarea');
    expect(await textInput.getProperty('value')).toBeFalsy();
    expect(await input.getProperty('value')).toBeFalsy();

    textInput.setProperty('value', 'am changed');
    await page.waitForChanges();
    expect(await textInput.getProperty('value')).toEqual('am changed');
    expect(await input.getProperty('value')).toEqual('am changed');
  });

  it('renders changes to placeholder', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');

    const textInput = await page.find('modus-textarea-input');
    textInput.setProperty('placeholder', 'Placeholder');
    await page.waitForChanges();

    const input = await page.find('modus-textarea-input >>> textarea');
    expect(await input.getProperty('placeholder')).toEqual('Placeholder');
  });

  it('renders changes to required', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');

    const textInput = await page.find('modus-textarea-input');
    textInput.setProperty('required', 'true');
    await page.waitForChanges();

    const required = await page.find('modus-textarea-input >>> span.required');
    expect(required).not.toBeNull();
  });

  it('renders changes to value', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input clearable></modus-textarea-input>');

    const textInput = await page.find('modus-textarea-input');
    textInput.setProperty('value', 'Some value');
    await page.waitForChanges();

    const input = await page.find('modus-textarea-input >>> textarea');
    expect(await input.getProperty('value')).toEqual('Some value');

    const clear = await page.find('modus-textarea-input >>> .clear');
    expect(clear).not.toBeNull();
  });

  it('renders changes to autoFocusInput', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input auto-focus-input="true"></modus-textarea-input>');
    await page.waitForChanges();

    const input = await page.find('modus-textarea-input >>> textarea');
    expect(await input.getProperty('autofocus')).toBeTruthy();
  });

  it('renders changes to textAlign', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');
    await page.waitForChanges();

    const modusTextInput = await page.find('modus-textarea-input');
    expect(await page.find('modus-textarea-input >>> textarea')).toHaveClass('text-align-left');

    modusTextInput.setProperty('textAlign', 'right');
    await page.waitForChanges();

    expect(await page.find('modus-textarea-input >>> textarea')).toHaveClass('text-align-right');
  });

  it('should clear on handleClear', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input clearable value="Some value"></modus-textarea-input>');

    const valueChange = await page.spyOnEvent('valueChange');
    const clear = await page.find('modus-textarea-input >>> span.clear');
    await clear.click();

    await page.waitForChanges();

    const textInput = await page.find('modus-textarea-input');
    expect(await textInput.getProperty('value')).toBeFalsy();
    expect(valueChange).toHaveReceivedEvent();
  });

  it('emits valueChange event', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-textarea-input></modus-textarea-input>');
    const valueChange = await page.spyOnEvent('valueChange');
    const element = await page.find('modus-textarea-input >>> textarea');
    await page.waitForChanges();

    await element.type('modus-textarea-input >>> textarea', { delay: 20 });
    await page.waitForChanges();
    expect(valueChange).toHaveReceivedEvent();
  });
});

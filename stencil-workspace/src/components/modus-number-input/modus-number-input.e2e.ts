import { newE2EPage } from '@stencil/core/testing';

describe('modus-number-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-number-input></modus-number-input>');

    const element = await page.find('modus-number-input');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');

    const numberInput = await page.find('modus-number-input');
    const input = await page.find('modus-number-input >>> input');

    expect(numberInput).not.toHaveClass('disabled');
    expect(await input.getProperty('disabled')).toBeFalsy();

    numberInput.setProperty('disabled', 'true');
    await page.waitForChanges();

    expect(await input.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to errorText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');

    const numberInput = await page.find('modus-number-input');

    let errorLabel = await page.find('modus-number-input >>> label.error');
    expect(errorLabel).toBeNull();

    numberInput.setProperty('errorText', 'Error.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-number-input >>> .input-container');
    expect(inputContainer).toHaveClass('error');

    errorLabel = await page.find('modus-number-input >>> label.error');
    expect(errorLabel).not.toBeNull();
  });

  it('renders changes to validText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');

    const numberInput = await page.find('modus-number-input');
    let validLabel = await page.find('modus-number-input >>> label.valid');
    expect(validLabel).toBeNull();

    numberInput.setProperty('validText', 'Valid.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-number-input >>> .input-container');
    expect(inputContainer).toHaveClass('valid');

    validLabel = await page.find('modus-number-input >>> label.valid');
    expect(validLabel).not.toBeNull();
  });

  it('renders changes to helperText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');

    let helperLabel = await page.find('modus-number-input >>> label.helper');
    expect(helperLabel).toBeNull();

    const numberInput = await page.find('modus-number-input');
    numberInput.setProperty('helperText', 'Helper.');
    await page.waitForChanges();

    helperLabel = await page.find('modus-number-input >>> label.helper');
    expect(helperLabel).not.toBeNull();
  });

  it('renders changes to label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');

    let label = await page.find('modus-number-input >>> .label-container label');
    expect(label).toBeNull();

    const numberInput = await page.find('modus-number-input');
    numberInput.setProperty('label', 'Hello Label');
    await page.waitForChanges();
    label = await page.find('modus-number-input >>> .label-container label');
    expect(label.textContent).toEqual('Hello Label');
  });

  it('renders changes to placeholder', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');

    const numberInput = await page.find('modus-number-input');
    const input = await page.find('modus-number-input >>> input');
    expect(await input.getProperty('placeholder')).toBeFalsy();

    numberInput.setProperty('placeholder', 'Placeholder');
    await page.waitForChanges();
    expect(await input.getProperty('placeholder')).toEqual('Placeholder');
  });

  it('renders changes to required', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');

    const numberInput = await page.find('modus-number-input');
    let required = await page.find('modus-number-input >>> span.required');
    expect(required).toBeNull();

    numberInput.setProperty('required', 'true');
    await page.waitForChanges();
    required = await page.find('modus-number-input >>> span.required');
    expect(required).not.toBeNull();
  });

  it('renders changes to value', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');

    const numberInput = await page.find('modus-number-input');
    const input = await page.find('modus-number-input >>> input');
    expect(await numberInput.getProperty('value')).toBeFalsy();
    expect(await input.getProperty('value')).toBeFalsy();

    numberInput.setProperty('value', '3');
    await page.waitForChanges();
    expect(await numberInput.getProperty('value')).toEqual('3');
    expect(await input.getProperty('value')).toEqual('3');
  });

  it('emits valueChange event on value change', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');
    const valueChange = await page.spyOnEvent('valueChange');
    const element = await page.find('modus-number-input >>> input');
    await page.waitForChanges();

    await element.type('modus-number-input >>> input', { delay: 20 });
    await page.waitForChanges();
    expect(valueChange).toHaveReceivedEvent();
  });

  it('renders changes to maxValue', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');
    const numberInput = await page.find('modus-number-input');
    const element = await page.find('modus-number-input >>> input');
    expect(await element.getProperty('max')).toBeFalsy();

    numberInput.setProperty('maxValue', '3');
    await page.waitForChanges();
    expect(await element.getProperty('max')).toEqual('3');
  });

  it('renders changes to minValue', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');
    const numberInput = await page.find('modus-number-input');
    const element = await page.find('modus-number-input >>> input');
    expect(await element.getProperty('min')).toBeFalsy();

    numberInput.setProperty('minValue', '3');
    await page.waitForChanges();
    expect(await element.getProperty('min')).toEqual('3');
  });

  it('renders changes to readOnly', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');
    const numberInput = await page.find('modus-number-input');
    numberInput.setProperty('readOnly', 'true');
    const element = await page.find('modus-number-input >>> input');
    await page.waitForChanges();

    expect(await element.getProperty('readOnly')).toEqual(true);
  });

  it('renders changes to step', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');
    const numberInput = await page.find('modus-number-input');
    numberInput.setProperty('step', '2');
    const element = await page.find('modus-number-input >>> input');
    await page.waitForChanges();

    expect(await element.getProperty('step')).toEqual('2');
  });

  it('should not update value if value is set to not a number', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-number-input></modus-number-input>');
    const numberInput = await page.find('modus-number-input');
    numberInput.setProperty('value', '2');
    await page.waitForChanges();

    numberInput.setProperty('value', 'abcd');
    await page.waitForChanges();

    const element = await page.find('modus-number-input >>> input');

    expect(await element.getProperty('value')).toEqual('2');
  });
});

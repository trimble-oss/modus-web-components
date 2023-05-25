import { newE2EPage } from '@stencil/core/testing';

describe('modus-date-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-date-input></modus-date-input>');

    const element = await page.find('modus-date-input');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to label prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-date-input></modus-date-input>');

    const component = await page.find('modus-date-input');
    component.setProperty('label', 'Test');
    await page.waitForChanges();

    const element = await page.find('modus-date-input >>> .label-container > label');
    expect(element.innerHTML).toEqual('Test');
  });

  it('renders changes to disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    const input = await page.find('modus-date-input >>> input');

    expect(textInput).not.toHaveClass('disabled');
    expect(await input.getProperty('disabled')).toBeFalsy();

    textInput.setProperty('disabled', 'true');
    await page.waitForChanges();

    expect(await input.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to errorText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('errorText', 'Error.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-date-input >>> .input-container');
    expect(inputContainer).toHaveClass('error');

    const errorLabel = await page.find('modus-date-input >>> label.error');
    expect(errorLabel).not.toBeNull();
  });

  it('renders changes to validText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('validText', 'Valid.');
    await page.waitForChanges();

    const inputContainer = await page.find('modus-date-input >>> .input-container');
    expect(inputContainer).toHaveClass('valid');

    const validLabel = await page.find('modus-date-input >>> label.valid');
    expect(validLabel).not.toBeNull();
  });

  it('renders changes to helperText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('helperText', 'Helper.');
    await page.waitForChanges();

    const helperLabel = await page.find('modus-date-input >>> label.helper');
    expect(helperLabel).not.toBeNull();
  });

  it('renders changes to placeholder', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('placeholder', 'Placeholder');
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('placeholder')).toEqual('Placeholder');
  });

  it('renders changes to required', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('required', 'true');
    await page.waitForChanges();

    const required = await page.find('modus-date-input >>> span.required');
    expect(required).not.toBeNull();
  });

  it('renders changes to autoFocusInput', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input auto-focus-input="true"></modus-date-input>');
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('autofocus')).toBeTruthy();
  });

  // it('renders changes to autoFormat', async () => {
  //   const page = await newE2EPage();

  //   await page.setContent('<modus-date-input></modus-date-input>');
  //   await page.waitForChanges();

  //   // Input '12'
  //   const input = await page.find('modus-date-input >>> input');
  //   await input.type('12', { delay: 20 });
  //   await page.waitForChanges();

  //   // Formatted
  //   expect(await input.getProperty('value')).toEqual('12/');
  // });

  it('renders changes to format', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');
    await page.waitForChanges();

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('format', 'yyyy-mm');
    await page.waitForChanges();

    textInput.setProperty('value', '2022-12-23');
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('value')).toEqual('2022-12');
  });

  it('renders changes to allowedCharsRegex', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');
    await page.waitForChanges();

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('allowedCharsRegex', /\d/gi);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    await input.type('JK', { delay: 20 });
    await page.waitForChanges();

    expect(await input.getProperty('value')).toEqual('');
  });

  it('renders changes to value', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('value', '2022-11-21'); // ISO 8601 Format
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('value')).toEqual('11/21/2022'); // default display format
  });

  it('renders changes to readOnly', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-date-input></modus-date-input>');

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('readOnly', true);
    await page.waitForChanges();

    const input = await page.find('modus-date-input >>> input');
    expect(await input.getProperty('readOnly')).toEqual(true);
  });

  it('renders changes to showCalendarIcon', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-date-input></modus-date-input>');

    let calendar = await page.find('modus-date-input >>> .icon-calendar');
    expect(calendar).toBeFalsy();

    const textInput = await page.find('modus-date-input');
    textInput.setProperty('showCalendarIcon', true);
    await page.waitForChanges();

    calendar = await page.find('modus-date-input >>> .icon-calendar');
    expect(calendar).toBeTruthy();
  });

  it('renders changes to the size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');
    const component = await page.find('modus-date-input');
    const element = await page.find('modus-date-input >>> .input-container');
    expect(element).not.toHaveClass('large');

    component.setProperty('size', 'large');
    await page.waitForChanges();
    expect(element).toHaveClass('large');
  });

  it('emits calendarIconClicked event', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input show-calendar-icon></modus-date-input>');
    const calendarIconClicked = await page.spyOnEvent('calendarIconClicked');
    const calendar = await page.find('modus-date-input >>> .icon-calendar');

    await calendar.click();
    await page.waitForChanges();
    expect(calendarIconClicked).toHaveReceivedEvent();
  });

  it('emits valueChange event', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input></modus-date-input>');
    const valueChange = await page.spyOnEvent('valueChange');
    const element = await page.find('modus-date-input >>> input');
    await page.waitForChanges();

    await element.type('1/1/2023', { delay: 20 });
    await page.waitForChanges();
    expect(valueChange).toHaveReceivedEvent();
  });

  it('checks invalid date validation', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-date-input show-calendar-icon="true"></modus-date-input>');
    const input = await page.find('modus-date-input >>> input');
    await page.waitForChanges();

    await input.type('1//2023', { delay: 20 });
    await page.waitForChanges();

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input >>> .sub-text > label');
    expect(errorText.innerHTML).toEqual('Invalid date');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('modus-autocomplete', () => {
  let page = null;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<modus-autocomplete></modus-autocomplete>');
  });

  it('renders', async () => {
    const element = await page.find('modus-autocomplete');
    expect(element).toHaveClass('hydrated');
  });

  it('should render changes to options prop', async () => {
    const element = await page.find('modus-autocomplete');
    expect(element).toHaveClass('hydrated');

    element.setProperty('options', [
      { id: 1, value: 'Test 1' },
      { id: 2, value: 'Test 2' },
    ]);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await page.waitForChanges();

    const options = await page.findAll('modus-autocomplete >>> .options-container li');
    expect(options.length).toEqual(2);
  });

  it('should convert string options to options', async () => {
    const element = await page.find('modus-autocomplete');
    expect(element).toHaveClass('hydrated');

    element.setProperty('options', ['Test 1', 'Test 2']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await page.waitForChanges();

    const options = await page.findAll('modus-autocomplete >>> .options-container li');
    expect(options.length).toEqual(2);
  });

  it('should render changes to options', async () => {
    const element = await page.find('modus-autocomplete');
    expect(element).toHaveClass('hydrated');

    element.setProperty('options', ['Test 1', 'Test 2']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await page.waitForChanges();

    element.setProperty('options', ['Test 1']);
    await page.waitForChanges();

    const options = await page.findAll('modus-autocomplete >>> .options-container li');
    expect(options.length).toEqual(1);
  });

  it('should render changes to custom options slot', async () => {
    const p = await newE2EPage();
    await p.setContent(`
      <modus-autocomplete>
        <li id="item-1" data-search-value="Test" data-id="1" style="padding: 8px">
          <div style="font-weight: bold">Test Option</div>
          <div style="font-size: 12px">Option Description</div>
        </li>
      </modus-autocomplete>
    `);
    await p.waitForChanges();

    const textInput = await p.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await p.waitForChanges();

    const options = await p.findAll('modus-autocomplete >>> .custom-option');
    expect(options.length).toEqual(1);
  });

  it('should render changes to size prop', async () => {
    const element = await page.find('modus-autocomplete');
    let size = await element.getProperty('size');
    expect(size).toEqual('medium');

    element.setProperty('size', 'large');
    await page.waitForChanges();

    size = await element.getProperty('size');
    expect(size).toEqual('large');
  });

  it('should render changes to showNoResultsFoundMessage prop', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('options', ['Test 1', 'Test 2']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test 3');
    await page.waitForChanges();

    let noResultsFoundMessage = await page.find('modus-autocomplete >>> .no-results');
    expect(noResultsFoundMessage).toBeTruthy();

    element.setProperty('showNoResultsFoundMessage', false);
    await page.waitForChanges();
    noResultsFoundMessage = await page.find('modus-autocomplete >>> .no-results');
    expect(noResultsFoundMessage).toBeFalsy();
  });

  it('should render changes to noResultsFoundText prop', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('options', ['Test 1', 'Test 2']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test 3');
    await page.waitForChanges();

    let noResultsFoundMessage = await page.find('modus-autocomplete >>> .no-results');
    expect(noResultsFoundMessage.innerText.includes('No results found')).toBeTruthy();

    element.setProperty('noResultsFoundText', 'Test text');
    await page.waitForChanges();

    noResultsFoundMessage = await page.find('modus-autocomplete >>> .no-results');
    expect(noResultsFoundMessage.innerText.includes('Test text')).toBeTruthy();
  });

  it('should render changes to noResultsFoundSubtext prop', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('options', ['Test 1', 'Test 2']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test 3');
    await page.waitForChanges();

    let noResultsFoundMessage = await page.find('modus-autocomplete >>> .no-results');
    expect(noResultsFoundMessage.innerText.includes('No results found')).toBeTruthy();

    element.setProperty('noResultsFoundSubtext', 'Test text');
    await page.waitForChanges();

    noResultsFoundMessage = await page.find('modus-autocomplete >>> .no-results');
    expect(noResultsFoundMessage.innerText.includes('Test text')).toBeTruthy();
  });

  it('should fire valueChange event on input', async () => {
    const element = await page.find('modus-autocomplete');

    const valueChange = await element.spyOnEvent('valueChange');
    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('1234');
    await page.waitForChanges();

    expect(valueChange).toHaveReceivedEventTimes(4);
  });

  it('should fire optionSelected and valueChange on option click', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('options', ['Test 1']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await page.waitForChanges();

    const optionSelected = await element.spyOnEvent('optionSelected');
    const valueChange = await element.spyOnEvent('valueChange');

    const option = await page.find('modus-autocomplete >>> li');
    await option.click();
    await page.waitForChanges();

    expect(optionSelected).toHaveReceivedEventTimes(1);
    expect(valueChange).toHaveReceivedEventTimes(1);
  });

  it('should fire optionSelected and valueChange on custom option click', async () => {
    const p = await newE2EPage();
    await p.setContent(`
      <modus-autocomplete>
        <li id="item-1" data-search-value="Test" data-id="1" style="padding: 8px">
          <div style="font-weight: bold">Test Option</div>
          <div style="font-size: 12px">Option Description</div>
        </li>
      </modus-autocomplete>
    `);

    const textInput = await p.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await p.waitForChanges();

    const element = await p.find('modus-autocomplete');
    const optionSelected = await element.spyOnEvent('optionSelected');
    const valueChange = await element.spyOnEvent('valueChange');

    const option = await p.find('modus-autocomplete >>> li');
    await option.click();
    await p.waitForChanges();

    expect(optionSelected).toHaveReceivedEventTimes(1);
    expect(valueChange).toHaveReceivedEventTimes(1);
  });

  it('should filter options when value is not empty', async () => {
    const element = await page.find('modus-autocomplete');
    expect(element).toHaveClass('hydrated');

    element.setProperty('options', ['Test 1', 'Test 2']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test 1');

    const options = await page.findAll('modus-autocomplete >>> .options-container li');
    expect(options.length).toEqual(1);
  });

  it('should display options on focus when showOptionsOnFocus prop is true', async () => {
    const element = await page.find('modus-autocomplete');
    expect(element).toHaveClass('hydrated');

    element.setProperty('options', [
      { id: 1, value: 'Test 1' },
      { id: 2, value: 'Test 2' },
    ]);

    element.setProperty('showOptionsOnFocus', true);

    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();

    await page.waitForChanges();

    const options = await page.findAll('modus-autocomplete >>> .options-container li');

    expect(options.length).toEqual(2);
  });

  it('should display noResultsFoundText prop when value property change and not matching', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('options', ['Test 1', 'Test 2']);
    await page.waitForChanges();

    let textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await page.waitForChanges();

    const options = await page.findAll('modus-autocomplete >>> .options-container li');

    await options[1].click();

    element.setProperty('value', 'hello');

    await page.waitForChanges();

    textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();

    const noResultsFoundMessage = await page.find('modus-autocomplete >>> .no-results');
    expect(noResultsFoundMessage.innerText.includes('No results found')).toBeTruthy();
  });

  it('should display all options when value property change to empty value', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('options', ['Test 1', 'Test 2']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test 1');
    await page.waitForChanges();

    let options = await page.findAll('modus-autocomplete >>> .options-container li');

    expect(options.length).toBe(1);

    element.setProperty('value', '');

    await page.waitForChanges();

    await textInput.click();

    await textInput.type('T');
    await page.waitForChanges();
    options = await page.findAll('modus-autocomplete >>> .options-container li');
    expect(options.length).toBe(2);
  });

  it('should display selected option when value property change to a matching option', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('options', ['Test 1', 'Test 2']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test 1');
    await page.waitForChanges();

    let options = await page.findAll('modus-autocomplete >>> .options-container li');

    expect(options.length).toBe(1);

    element.setProperty('value', 'Test 2');

    await page.waitForChanges();

    await textInput.click();

    await page.waitForChanges();
    options = await page.findAll('modus-autocomplete >>> .options-container li');
    expect(options.length).toBe(1);
  });

  it('should add chip when option is selected and multiple is true', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('multiple', true);
    await page.waitForChanges();

    element.setProperty('options', ['Test 1']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await page.waitForChanges();

    const option = await page.find('modus-autocomplete >>> li');
    await option.click();
    await page.waitForChanges();

    const chipsContainer = await page.find('modus-autocomplete >>> .chips-container');

    const chips = await chipsContainer.findAll('modus-chip');

    expect(chips.length).toEqual(1);

    expect(await chips[0].getProperty('value')).toBe('Test 1');
  });

  it('should not add chip when multiple is false', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('multiple', false);
    await page.waitForChanges();

    element.setProperty('options', ['Test 1']);
    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await page.waitForChanges();

    const option = await page.find('modus-autocomplete >>> li');
    await option.click();
    await page.waitForChanges();

    const chipsContainer = await page.find('modus-autocomplete >>> .chips-container');

    const chips = await chipsContainer.findAll('modus-chip');

    expect(chips.length).toEqual(0);
  });

  it('should render clear button when clearable is true and there is a value', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('clearable', true);

    element.setProperty('options', ['Test 1']);

    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await page.waitForChanges();

    const option = await page.find('modus-autocomplete >>> li');
    await option.click();
    await page.waitForChanges();

    const clearButton = await element.findAll('.icons-close');
    expect(clearButton).not.toBeNull();
  });

  it('should not render clear button when clearable is false or there is no value', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('clearable', false);

    element.setProperty('options', ['Test 1']);

    await page.waitForChanges();

    const textInput = await page.find('modus-autocomplete >>> modus-text-input');
    await textInput.click();
    await textInput.type('Test');
    await page.waitForChanges();

    const option = await page.find('modus-autocomplete >>> li');
    await option.click();
    await page.waitForChanges();

    const clearButton = await element.findAll('.icons-close');
    expect(clearButton).toEqual([]);
  });

  it('should disable the autocomplete when disabled is true', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('disabled', true);
    await page.waitForChanges();

    expect(await element.getProperty('disabled')).toBe(true);
  });

  it('should enable the autocomplete when disabled is false', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('disabled', false);
    await page.waitForChanges();

    expect(await element.getProperty('disabled')).toBe(false);
  });

  it('should display error message when there is an error', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('errorText', "This field can't be empty");
    await page.waitForChanges();
    const errorLabel = await page.findAll('modus-autocomplete >>> .error label');

    expect(errorLabel.length).toEqual(1);
  });

  it('should not display error message when there is no error', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('errorText', '');
    await page.waitForChanges();
    const errorLabel = await page.findAll('modus-autocomplete >>> .error label');

    expect(errorLabel.length).toEqual(0);
  });

  it('should include search icon when includeSearchIcon is true', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('includeSearchIcon', true);
    await page.waitForChanges();

    const searchIcon = await page.findAll('modus-autocomplete >>> .chips-container .icon-search');
    expect(searchIcon.length).toEqual(1);
  });

  it('should not include search icon when includeSearchIcon is false', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('includeSearchIcon', false);
    await page.waitForChanges();

    const searchIcon = await page.findAll('modus-autocomplete >>> .chips-container .icon-search');
    expect(searchIcon.length).toEqual(0);
  });

  it('should render label when label is provided', async () => {
    const element = await page.find('modus-autocomplete');
    const label = 'Select an option';
    element.setProperty('label', label);
    await page.waitForChanges();

    const labelContainer = await page.findAll('modus-autocomplete >>> .label-container');
    expect(labelContainer.length).toEqual(1);
  });

  it('should not render label when label is not provided', async () => {
    const element = await page.find('modus-autocomplete');
    element.setProperty('label', '');
    await page.waitForChanges();

    const labelContainer = await page.findAll('modus-autocomplete >>> .label-container');
    expect(labelContainer.length).toEqual(0);
  });
});

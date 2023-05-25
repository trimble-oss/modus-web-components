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
});

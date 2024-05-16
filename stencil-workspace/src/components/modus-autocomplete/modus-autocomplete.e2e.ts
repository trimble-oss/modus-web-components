import { newE2EPage } from '@stencil/core/testing';

describe('modus-autocomplete', () => {
  let page = null;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<modus-autocomplete></modus-autocomplete>');
  });

  // Created using: ContractTest
  describe('with default mode', () => {
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

    it('should render changes to size prop', async () => {
      const element = await page.find('modus-autocomplete');
      let size = await element.getProperty('size');
      expect(size).toEqual('medium');

      element.setProperty('size', 'large');
      await page.waitForChanges();

      size = await element.getProperty('size');
      expect(size).toEqual('large');
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

    it('should default text input autocomplete to off', async () => {
      const element = await page.find('modus-autocomplete');
      expect(element).toHaveClass('hydrated');

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');

      const autocomplete = await textInput.getProperty('autocomplete');
      expect(autocomplete).toEqual('off');
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

      textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await textInput.type('hello');

      await page.waitForChanges();

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

    it('should select the option by hitting Space', async () => {
      const element = await page.find('modus-autocomplete');
      expect(element).toHaveClass('hydrated');

      element.setProperty('disableCloseOnSelect', true);
      element.setProperty('options', [
        { id: 1, value: 'Test 1' },
        { id: 2, value: 'Test 2' },
      ]);
      await page.waitForChanges();

      const optionSelected = await page.spyOnEvent('optionSelected');

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();

      await page.waitForChanges();

      let options = await page.findAll('modus-autocomplete >>> .options-container li');

      await options[0].focus();
      await page.waitForChanges();

      await page.keyboard.press(' '); // Space
      await page.waitForChanges();
      expect(optionSelected).toHaveReceivedEvent();
      expect(optionSelected).toHaveReceivedEventDetail(1);
    });

    it('should select the option by hitting Enter', async () => {
      const element = await page.find('modus-autocomplete');
      expect(element).toHaveClass('hydrated');

      element.setProperty('disableCloseOnSelect', true);
      element.setProperty('options', [
        { id: 1, value: 'Test 1' },
        { id: 2, value: 'Test 2' },
      ]);
      await page.waitForChanges();

      const optionSelected = await page.spyOnEvent('optionSelected');

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await page.waitForChanges();

      let options = await page.findAll('modus-autocomplete >>> .options-container li');

      await options[1].focus();
      await page.waitForChanges();

      await page.keyboard.press('Enter');
      await page.waitForChanges();
      expect(optionSelected).toHaveReceivedEvent();
      expect(optionSelected).toHaveReceivedEventDetail(2);
    });

    it('should focus first element when arrow key down is pressed', async () => {
      const element = await page.find('modus-autocomplete');
      expect(element).toHaveClass('hydrated');

      element.setProperty('options', [
        { id: 1, value: 'Test 1' },
        { id: 2, value: 'Test 2' },
      ]);
      await page.waitForChanges();

      const optionSelected = await page.spyOnEvent('optionSelected');

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await textInput.type('Test');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(optionSelected).toHaveReceivedEvent();
      expect(optionSelected).toHaveReceivedEventDetail(1);
    });

    it('should focus second element when arrow key down is pressed twice', async () => {
      const element = await page.find('modus-autocomplete');
      expect(element).toHaveClass('hydrated');

      element.setProperty('options', [
        { id: 1, value: 'Test 1' },
        { id: 2, value: 'Test 2' },
      ]);
      await page.waitForChanges();

      const optionSelected = await page.spyOnEvent('optionSelected');

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await textInput.type('Test');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(optionSelected).toHaveReceivedEvent();
      expect(optionSelected).toHaveReceivedEventDetail(2);
    });

    it('should focus first element when arrow key up is pressed', async () => {
      const element = await page.find('modus-autocomplete');
      expect(element).toHaveClass('hydrated');

      element.setProperty('options', [
        { id: 1, value: 'Test 1' },
        { id: 2, value: 'Test 2' },
      ]);
      await page.waitForChanges();

      const optionSelected = await page.spyOnEvent('optionSelected');

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await textInput.type('Test');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      // Press Down Up
      await page.keyboard.press('ArrowUp');
      await page.waitForChanges();

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(optionSelected).toHaveReceivedEvent();
      expect(optionSelected).toHaveReceivedEventDetail(1);
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
  });

  // Created using: ContractTest
  describe('with custom mode', () => {
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

    it('should display custom options on focus without close when disableCloseOnSelect prop is true', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <modus-autocomplete>
          <li id="item-1" data-search-value="Test Option 1" data-id="1" style="padding: 8px">
            <div style="font-weight: bold">Test Option 1</div>
            <div style="font-size: 12px">Option Description</div>
          </li>
          <li id="item-2" data-search-value="Test Option 2" data-id="2" style="padding: 8px">
            <div style="font-weight: bold">Test Option 2</div>
            <div style="font-size: 12px">Option Description</div>
          </li>
        </modus-autocomplete>
      `);
      await page.waitForChanges();

      const element = await page.find('modus-autocomplete');

      element.setProperty('disableCloseOnSelect', true);

      await page.waitForChanges();

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();

      await page.waitForChanges();

      const options = await page.findAll('modus-autocomplete >>> .options-container li.custom-option');

      options[0].click();
      await page.waitForChanges();
      expect(options.length).toEqual(2);
    });

    it('should focus custom first element when arrow key down is pressed', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <modus-autocomplete>
          <li id="1" data-search-value="Test Option 1" data-id="1" style="padding: 8px">
            <div style="font-weight: bold">Test Option 1</div>
            <div style="font-size: 12px">Option Description</div>
          </li>
          <li id="2" data-search-value="Test Option 2" data-id="2" style="padding: 8px">
            <div style="font-weight: bold">Test Option 2</div>
            <div style="font-size: 12px">Option Description</div>
          </li>
        </modus-autocomplete>
      `);
      await page.waitForChanges();

      const optionSelected = await page.spyOnEvent('optionSelected');

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await textInput.type('Test');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(optionSelected).toHaveReceivedEvent();
      expect(optionSelected).toHaveReceivedEventDetail('1');
    });

    it('should focus custom second element when arrow key down is pressed twice', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <modus-autocomplete>
          <li id="1" data-search-value="Test Option 1" data-id="1" style="padding: 8px">
            <div style="font-weight: bold">Test Option 1</div>
            <div style="font-size: 12px">Option Description</div>
          </li>
          <li id="2" data-search-value="Test Option 2" data-id="2" style="padding: 8px">
            <div style="font-weight: bold">Test Option 2</div>
            <div style="font-size: 12px">Option Description</div>
          </li>
        </modus-autocomplete>
      `);
      await page.waitForChanges();

      const optionSelected = await page.spyOnEvent('optionSelected');

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await textInput.type('Test');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(optionSelected).toHaveReceivedEvent();
      expect(optionSelected).toHaveReceivedEventDetail('2');
    });

    it('should focus custom first element when arrow key up is pressed', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <modus-autocomplete>
          <li id="1" data-search-value="Test Option 1" data-id="1" style="padding: 8px">
            <div style="font-weight: bold">Test Option 1</div>
            <div style="font-size: 12px">Option Description</div>
          </li>
          <li id="2" data-search-value="Test Option 2" data-id="2" style="padding: 8px">
            <div style="font-weight: bold">Test Option 2</div>
            <div style="font-size: 12px">Option Description</div>
          </li>
        </modus-autocomplete>
      `);
      await page.waitForChanges();

      const optionSelected = await page.spyOnEvent('optionSelected');

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await textInput.type('Test');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      // Press Down Arrow
      await page.keyboard.press('ArrowDown');
      await page.waitForChanges();

      // Press Down Up
      await page.keyboard.press('ArrowUp');
      await page.waitForChanges();

      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(optionSelected).toHaveReceivedEvent();
      expect(optionSelected).toHaveReceivedEventDetail('1');
    });
  });

  // Created using: DecisionTableTest
  describe('with showOptionsOnFocus control', () => {
    it('should display options on focus when showOptionsOnFocus prop is true using default mode', async () => {
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

    it('should display options on focus when showOptionsOnFocus prop is true using custom mode', async () => {
      const element = await newE2EPage();
      await element.setContent(`
        <modus-autocomplete show-options-on-focus="true">
          <li id="item-1" data-search-value="Test1" data-id="1" style="padding: 8px">
            <div style="font-weight: bold">Test1 Option</div>
            <div style="font-size: 12px">Option1 Description</div>
          </li>
          <li id="item-2" data-search-value="Test2" data-id="2" style="padding: 8px">
            <div style="font-weight: bold">Test2 Option</div>
            <div style="font-size: 12px">Option2 Description</div>
          </li>
        </modus-autocomplete>
      `);
      await element.waitForChanges();

      // Click on Input
      let textInput = await element.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();

      await element.waitForChanges();

      // Expect 2 items
      let options = await element.findAll('modus-autocomplete >>> .options-container li.custom-option');

      expect(options.length).toEqual(2);

      // Then click on Input and type item 1
      textInput = await element.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await textInput.type('Test1');
      await element.waitForChanges();

      // Click on item 1
      options = await element.findAll('modus-autocomplete >>> .options-container li.custom-option');
      await options[0].click();
      await element.waitForChanges();

      // Then click on Input again and it should show 1 option filtered
      textInput = await element.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      options = await element.findAll('modus-autocomplete >>> .options-container li.custom-option');
      expect(options.length).toEqual(1);
    });
  });

  // Created using: DecisionTableTest
  describe('with disableCloseOnSelect control', () => {
    it('should display options on focus without close when disableCloseOnSelect prop is true', async () => {
      const element = await page.find('modus-autocomplete');
      expect(element).toHaveClass('hydrated');

      element.setProperty('options', [
        { id: 1, value: 'Test 1' },
        { id: 2, value: 'Test 2' },
      ]);

      element.setProperty('disableCloseOnSelect', true);

      await page.waitForChanges();

      const textInput = await page.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();

      await page.waitForChanges();

      const options = await page.findAll('modus-autocomplete >>> .options-container li');

      options[0].click();
      await page.waitForChanges();
      expect(options.length).toEqual(2);
    });

    it('should display options on focus when disableCloseOnSelect prop is true using custom mode', async () => {
      const element = await newE2EPage();
      await element.setContent(`
        <modus-autocomplete disable-close-on-select="true">
          <li id="item-1" data-search-value="Test1" data-id="1" style="padding: 8px">
            <div style="font-weight: bold">Test1 Option</div>
            <div style="font-size: 12px">Option1 Description</div>
          </li>
          <li id="item-2" data-search-value="Test2" data-id="2" style="padding: 8px">
            <div style="font-weight: bold">Test2 Option</div>
            <div style="font-size: 12px">Option2 Description</div>
          </li>
        </modus-autocomplete>
      `);
      await element.waitForChanges();

      // Click on Input
      let textInput = await element.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();

      await element.waitForChanges();

      // Expect 2 items
      let options = await element.findAll('modus-autocomplete >>> .options-container li.custom-option');

      expect(options.length).toEqual(2);

      // Then click on Input and type item 1
      textInput = await element.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      await textInput.type('Test1');
      await element.waitForChanges();

      // Click on item 1
      options = await element.findAll('modus-autocomplete >>> .options-container li.custom-option');
      await options[0].click();
      await element.waitForChanges();

      // Then click on Input again and it should show all options again
      textInput = await element.find('modus-autocomplete >>> modus-text-input');
      await textInput.click();
      options = await element.findAll('modus-autocomplete >>> .options-container li.custom-option');
      expect(options.length).toEqual(2);
    });
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-autocomplete aria-label="test label"></modus-autocomplete>');
    let element = await page.find('modus-autocomplete >>> div.autocomplete');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-autocomplete></modus-autocomplete>');
    let element = await page.find('modus-autocomplete >>> div.autocomplete');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-autocomplete aria-label=""></modus-autocomplete>');
    let element = await page.find('modus-autocomplete >>> div.autocomplete');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });
});

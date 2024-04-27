import { newE2EPage } from '@stencil/core/testing';

describe('modus-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dropdown></modus-dropdown>');
    const element = await page.find('modus-dropdown');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the animateList prop', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id'>Dropdown</modus-button>
        <modus-list>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);
    const component = await page.find('modus-dropdown');
    const element = await page.find('modus-dropdown >>> .dropdown-list');
    expect(element).not.toHaveClass('animate-list');

    component.setProperty('animateList', 'true');
    await page.waitForChanges();
    expect(element).toHaveClass('animate-list');
  });

  it('renders changes to the placement prop', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id'>Dropdown</modus-button>
        <modus-list>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);
    const component = await page.find('modus-dropdown');
    const element = await page.find('modus-dropdown >>> .dropdown-list');
    expect(element).toHaveClass('bottom');

    component.setProperty('placement', 'top');
    await page.waitForChanges();
    expect(element).toHaveClass('top');
  });

  it('renders changes to the showDropdownListBorder prop', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id' show-dropdown-list-border="true">
        <modus-button id='toggle-id'>Dropdown</modus-button>
        <modus-list>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);
    const component = await page.find('modus-dropdown');
    const element = await page.find('modus-dropdown >>> .dropdown-list');
    expect(element).toHaveClass('list-border');

    component.setProperty('showDropdownListBorder', 'false');
    await page.waitForChanges();
    expect(element).not.toHaveClass('list-border');
  });

  it('renders changes to div.dropdown-list on toggle', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);
    const component = await page.find('modus-dropdown >>> .dropdown-list');
    expect(component).toHaveClass('hidden');

    const buttonElement = await page.find('modus-button >>> button');
    await buttonElement.click();
    expect(component).not.toHaveClass('hidden');
    expect(component).toHaveClass('visible');
  });

  it('emits close event on modus-list-item click', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);
    const dropdownClose = await page.spyOnEvent('dropdownClose');
    const buttonElement = await page.find('modus-button >>> button');
    await buttonElement.click();

    const liElement = await page.find('modus-list-item >>> li');
    await liElement.click();
    await page.waitForChanges();
    expect(dropdownClose).toHaveReceivedEvent();
  });

  it('emits close on 2nd modus-button click', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);
    const dropdownClose = await page.spyOnEvent('dropdownClose');
    const buttonElement = await page.find('modus-button >>> button');
    await buttonElement.click();
    await page.waitForChanges();
    await buttonElement.click();
    await page.waitForChanges();
    expect(dropdownClose).toHaveReceivedEvent();
  });

  it('should close dropdown when Enter is pressed outside the toggle element', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
      <div id="not-dropdown">
    `);

    const dropdown = await page.find('modus-dropdown');
    await dropdown.focus();
    await page.keyboard.press('Enter');
    expect(dropdown.find('.dropdown-list.visible')).toBeTruthy();

    const notDropdownComponent = await page.find('#not-dropdown');
    await notDropdownComponent.focus();
    await page.keyboard.press('Enter');
    expect(dropdown.find('.dropdown-list.hidden')).toBeTruthy();
  });

  it('should close dropdown when Space is pressed outside the toggle element', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
      <div id="not-dropdown">
    `);

    const dropdown = await page.find('modus-dropdown');
    await dropdown.focus();
    await page.keyboard.press(' ');
    expect(dropdown.find('.dropdown-list.visible')).toBeTruthy();

    const notDropdownComponent = await page.find('#not-dropdown');
    await notDropdownComponent.focus();
    await page.keyboard.press(' ');
    expect(dropdown.find('.dropdown-list.hidden')).toBeTruthy();
  });

  it('should toggle visibility when Enter is pressed on the toggle element', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);

    const dropdown = await page.find('modus-dropdown');
    await dropdown.focus();
    await page.keyboard.press('Enter');
    expect(dropdown.find('.dropdown-list.visible')).toBeTruthy();

    await page.keyboard.press('Enter');
    expect(dropdown.find('.dropdown-list.hidden')).toBeTruthy();
  });

  it('should toggle visibility when clicked', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);

    const dropdown = await page.find('modus-dropdown');
    await dropdown.focus();
    await dropdown.click();
    await page.waitForChanges();
    expect(dropdown.find('.dropdown-list.visible')).toBeTruthy();

    await dropdown.click();
    await page.waitForChanges();
    expect(dropdown.find('.dropdown-list.hidden')).toBeTruthy();
  });

  it('should not toggle visibility dropdown is disabled and clicked', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown disabled toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);

    const dropdown = await page.find('modus-dropdown');
    await dropdown.click();
    expect(dropdown.find('.dropdown-list.hidden')).toBeTruthy();
  });

  it('should toggle visibility when Space is pressed on the toggle element', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);

    const dropdown = await page.find('modus-dropdown');
    await dropdown.focus();
    await page.keyboard.press(' ');
    expect(dropdown.find('.dropdown-list.visible')).toBeTruthy();

    await page.keyboard.press(' ');
    expect(dropdown.find('.dropdown-list.hidden')).toBeTruthy();
  });

  it('should close dropdown when Escape is pressed', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);

    const dropdown = await page.find('modus-dropdown');
    await dropdown.focus();
    await page.keyboard.press(' ');
    expect(dropdown.find('.dropdown-list.visible')).toBeTruthy();

    await page.keyboard.press('Escape');
    expect(dropdown.find('.dropdown-list.hidden')).toBeTruthy();
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dropdown aria-label="test label"></modus-dropdown>');
    let element = await page.find('modus-dropdown >>> .dropdown');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dropdown></modus-dropdown>');
    let element = await page.find('modus-dropdown >>> .dropdown');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dropdown aria-label=""></modus-dropdown>');
    let element = await page.find('modus-dropdown >>> .dropdown');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });
  
  it('does not set the toggle element to disabled when "disabled" is not in as an attribute', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);

    const button = await page.find('#toggle-id');
    expect(button.getAttribute('disabled')).toBeNull();
  });

  it('should have disabled class on dropdown element when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown disabled toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);

    const dropdown = await page.find('modus-dropdown >>> .dropdown');
    expect(dropdown).not.toBeNull();
    expect(dropdown.classList.contains('disabled')).toBeTruthy();
  });

  it('should have disabled class on dropdown element when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-dropdown toggle-element-id='toggle-id'>
        <modus-button id='toggle-id' slot='dropdownToggle'>Dropdown</modus-button>
        <modus-list slot='dropdownList'>
          <modus-list-item>Item 1</modus-list-item>
        </modus-list>
      </modus-dropdown>
    `);

    const dropdown = await page.find('modus-dropdown >>> .dropdown');
    expect(dropdown).not.toBeNull();
    expect(dropdown.classList.contains('disabled')).toBeFalsy();
  });
});

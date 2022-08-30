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
});

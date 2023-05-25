import { newE2EPage } from '@stencil/core/testing';

describe('modus-side-navigation', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-side-navigation></modus-side-navigation>');

    const element = await page.find('modus-side-navigation');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to expanded prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation');
    const element1 = await page.find('modus-side-navigation >>> nav');
    expect(element1).not.toHaveClass('expanded');
    const element2 = await page.find('modus-side-navigation-item >>> li');
    expect(element2).not.toHaveClass('expanded');

    component.setProperty('expanded', 'true');
    await page.waitForChanges();

    expect(element1).toHaveClass('expanded');
    expect(element2.getProperty('expanded')).toBeTruthy();
  });

  it('renders changes to data prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation');
    component.setProperty('data', [
      {
        id: 'test',
        menuIcon:
          "data:image/svg+xml, %3Csvg slot='menu-icon' xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cpath d='M30 25h-1v-9a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v9h-2V5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v20h-2V12a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13H3a1 1 0 1 0 0 2h27a1 1 0 1 0 0-2zM6 25V13h3v12H6zm9 0V6h3v19h-3zm9 0v-8h3v8h-3z' /%3E%3C/svg%3E",
        label: 'test label',
      },
    ]);
    await page.waitForChanges();

    const sideNavItem = await page.find('modus-side-navigation >>> modus-side-navigation-item');
    expect(sideNavItem).toBeTruthy();
    await page.waitForChanges();

    const label = await sideNavItem.getProperty('label');
    expect(label).toEqual('test label');

    const id = await sideNavItem.getProperty('id');
    expect(id).toEqual('test');

    const menuIcon = await sideNavItem.getProperty('menuIcon');
    expect(menuIcon).toBeTruthy();
  });

  it('renders changes to maxWidth prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation');
    const element = await page.find('modus-side-navigation-item >>> li');
    let computedStyle = await element.getComputedStyle();
    expect(computedStyle['width']).toEqual('64px');

    component.setProperty('expanded', 'true');
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300));

    computedStyle = await element.getComputedStyle();
    expect(computedStyle['width']).toEqual('256px');

    component.setProperty('maxWidth', '300px');
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300));

    computedStyle = await element.getComputedStyle();
    expect(computedStyle['width']).toEqual('300px');
  });

  it('renders changes to mode prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<div><modus-side-navigation max-width="300px">
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>
  <div id="content">Test</div>
  </div>`);

    const component = await page.find('modus-side-navigation');
    const element = await page.find('#content');

    component.setProperty('mode', 'push');
    component.setProperty('targetContent', '#content');
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300));

    let computedStyle = await element.getComputedStyle();
    expect(computedStyle['marginLeft']).toEqual('64px');

    component.setProperty('expanded', true);
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300));

    computedStyle = await element.getComputedStyle();
    expect(computedStyle['marginLeft']).toEqual('300px');
  });

  it('emits sideNavExpand event', async () => {
    const page = await newE2EPage();

    await page.setContent(`
  <modus-side-navigation>
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);
    const component = await page.find('modus-side-navigation');
    const expandEvent = await page.spyOnEvent('sideNavExpand');

    component.setProperty('expanded', 'true');
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300));

    expect(expandEvent).toHaveReceivedEvent();
    expect(expandEvent).toHaveReceivedEventDetail(true);
  });
});

// Modus side navigation item
describe('modus-side-navigation-item', () => {
  it('renders changes to label prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
    <modus-side-navigation-item>
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation-item');
    component.setProperty('label', 'Test');
    await page.waitForChanges();

    component.setProperty('expanded', 'true');
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300));

    const element = await page.find('modus-side-navigation-item >>> .menu-text');
    expect(element.innerHTML).toEqual('Test');
  });

  it('renders changes to expanded prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation-item');
    const element = await page.find('modus-side-navigation-item >>> li');
    expect(element).not.toHaveClass('disabled');

    component.setProperty('expanded', 'true');
    await page.waitForChanges();

    expect(element).toHaveClass('expanded');
  });

  it('renders changes to disabled prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation-item');
    const element = await page.find('modus-side-navigation-item >>> li');
    expect(element).not.toHaveClass('disabled');

    component.setProperty('disabled', 'true');
    await page.waitForChanges();

    expect(element).toHaveClass('disabled');
  });

  it('renders changes to disableSelection prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation-item');
    const element = await page.find('modus-side-navigation-item >>> li');
    expect(element).not.toHaveClass('disabled');

    component.setProperty('disableSelection', 'true');
    await page.waitForChanges();

    await component.click();
    await page.waitForChanges();

    expect(element).not.toHaveClass('selected');
  });

  it('renders changes to showExpandIcon prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation-item');
    let element = await page.find('modus-side-navigation-item >>> .level-icon > svg');

    expect(element).toBeFalsy();

    component.setProperty('showExpandIcon', 'true');
    await page.waitForChanges();

    element = await page.find('modus-side-navigation-item >>> .level-icon > svg');
    expect(element).toBeTruthy();
  });

  it('renders changes to selected prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation-item');
    const element = await page.find('modus-side-navigation-item >>> li');

    await component.click();
    await page.waitForChanges();

    expect(element).toHaveClass('selected');
  });

  it('renders changes to menuIcon prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<modus-side-navigation>
    <modus-side-navigation-item label="Test">
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    // Test a svg url
    const component = await page.find('modus-side-navigation-item');
    component.setProperty(
      'menuIcon',
      "data:image/svg+xml, %3Csvg slot='menu-icon' xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cpath d='M30 25h-1v-9a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v9h-2V5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v20h-2V12a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13H3a1 1 0 1 0 0 2h27a1 1 0 1 0 0-2zM6 25V13h3v12H6zm9 0V6h3v19h-3zm9 0v-8h3v8h-3z' /%3E%3C/svg%3E"
    );
    await page.waitForChanges();

    let element = await page.find('modus-side-navigation-item >>> img ');
    expect(element).toBeTruthy();

    const prop = await element.getProperty('src');
    expect(prop).toEqual(
      "data:image/svg+xml, %3Csvg slot='menu-icon' xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cpath d='M30 25h-1v-9a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v9h-2V5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v20h-2V12a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13H3a1 1 0 1 0 0 2h27a1 1 0 1 0 0-2zM6 25V13h3v12H6zm9 0V6h3v19h-3zm9 0v-8h3v8h-3z' /%3E%3C/svg%3E"
    );

    // Test a built-in icon
    component.setProperty('menuIcon', 'add');
    await page.waitForChanges();

    element = await page.find('modus-side-navigation-item >>> svg.icon-add ');
    expect(element).toBeTruthy();
  });

  it('emits sideNavItemClicked event', async () => {
    const page = await newE2EPage();

    await page.setContent(`
  <modus-side-navigation>
    <modus-side-navigation-item label="Test">
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);
    const component = await page.find('modus-side-navigation-item');
    const clickedEvent = await page.spyOnEvent('sideNavItemClicked');
    const focusEvent = await page.spyOnEvent('sideNavItemFocus');

    await component.click();
    await page.waitForChanges();

    expect(clickedEvent).toHaveReceivedEvent();
    expect(focusEvent).toHaveReceivedEvent();
  });
});

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
    expect(element2).toHaveClass('expanded');
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
    await page.setContent(`<modus-side-navigation expanded="true">
    <modus-side-navigation-item>
      <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
        <g>
          <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
        </g>
      </svg>
    </modus-side-navigation-item>
  </modus-side-navigation>`);

    const component = await page.find('modus-side-navigation-item');
    const element = await page.find('modus-side-navigation-item >>> .menu-text > span');

    component.setProperty('label', 'Test');
    await page.waitForChanges();

    expect(element.innerHTML).toEqual('Test');
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

  it('emits sideNavItemSelected event', async () => {
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
    const selectedEvent = await page.spyOnEvent('sideNavItemSelected');

    await component.click();
    await page.waitForChanges();

    expect(selectedEvent).toHaveReceivedEvent();
    expect(selectedEvent).toHaveReceivedEventDetail(true);
  });
});


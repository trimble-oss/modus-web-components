import { newE2EPage } from '@stencil/core/testing';

describe('modus-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-alert></modus-alert>');
    const element = await page.find('modus-alert');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the dismissible prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-alert dismissible></modus-alert>');
    const component = await page.find('modus-alert');
    let element = await page.find('modus-alert >>> svg.icon-close');
    expect(element).toBeDefined();

    component.setProperty('dismissible', false);
    await page.waitForChanges();
    element = await page.find('modus-alert >>> svg.icon-close');
    expect(element).toBeNull();
  });

  it('renders changes to the message prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-alert message="Hello"></modus-alert>');
    const component = await page.find('modus-alert');
    const element = await page.find('modus-alert >>> div.message');
    expect(element.innerHTML).toContain('Hello');

    component.setProperty('message', 'Hello world!');
    await page.waitForChanges();
    expect(element.innerHTML).toContain('Hello world!');
  });

  it('renders changes to the type prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-alert></modus-alert>');
    const component = await page.find('modus-alert');
    const element = await page.find('modus-alert >>> div.alert');
    expect(element).toHaveClass('type-info');

    component.setProperty('type', 'error');
    await page.waitForChanges();
    expect(element).toHaveClass('type-error');
  });

  it('renders the correct icon by type', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-alert></modus-alert>');
    const component = await page.find('modus-alert');
    let element = await page.find('modus-alert >>> svg.icon-info');
    expect(element).toBeDefined();

    component.setProperty('type', 'error');
    await page.waitForChanges();
    element = await page.find('modus-alert >>> svg.icon-error');
    expect(element).toBeDefined();

    component.setProperty('type', 'success');
    await page.waitForChanges();
    element = await page.find('modus-alert >>> svg.icon-check-circle');
    expect(element).toBeDefined();

    component.setProperty('type', 'warning');
    await page.waitForChanges();
    element = await page.find('modus-alert >>> svg.icon-warning');
    expect(element).toBeDefined();
  });

  it('emits dismissClick event on icon close click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-alert dismissible></modus-alert>');
    const dismissClick = await page.spyOnEvent('dismissClick');
    const element = await page.find('modus-alert >>> .icon-close-container');

    await element.click();
    await page.waitForChanges();
    expect(dismissClick).toHaveReceivedEvent();
  });

  it('emits actionClick event on action button click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-alert button-text="Action"></modus-alert>');
    const actionClick = await page.spyOnEvent('actionClick');
    const element = await page.find('modus-alert >>> modus-button');

    await element.click();
    await page.waitForChanges();
    expect(actionClick).toHaveReceivedEvent();
  });

  it('should render complete message text when length less than 300', async () => {
    const page = await newE2EPage();
    const message = 'a'.repeat(299);

    await page.setContent(`<modus-alert message="${message}"></modus-alert>`);
    const element = await page.find('modus-alert >>> div.message');

    expect(element.textContent.length).toEqual(299);
    expect(element.textContent).not.toMatch(/.*\.\.\.$/);
  });

  it('should render complete message text when length equals 300', async () => {
    const page = await newE2EPage();
    const message = 'a'.repeat(300);

    await page.setContent(`<modus-alert message="${message}"></modus-alert>`);
    const element = await page.find('modus-alert >>> div.message');

    expect(element.textContent.length).toEqual(300);
    expect(element.textContent).not.toMatch(/.*\.\.\.$/);
  });

  it('should render truncated message text when length is greater than 300', async () => {
    const page = await newE2EPage();
    const message = 'a'.repeat(301);

    await page.setContent(`<modus-alert message="${message}"></modus-alert>`);
    const element = await page.find('modus-alert >>> div.message');

    expect(element.textContent.length).toEqual(303);
    expect(element.textContent).toMatch(/.*\.\.\.$/);
  });
});

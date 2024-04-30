import { newE2EPage } from '@stencil/core/testing';

describe('modus-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const element = await page.find('modus-toast');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to type', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const component = await page.find('modus-toast');
    let element = await page.find('modus-toast >>> svg.icon-info');
    expect(element).toBeDefined();

    component.setProperty('type', 'warning');
    await page.waitForChanges();
    element = await page.find('modus-toast >>> svg.icon-warning');
    expect(element).toBeDefined();
  });

  it('renders changes to showIcon', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const component = await page.find('modus-toast');
    let element = await page.find('modus-toast >>> svg.icon-info');
    expect(element).toBeDefined();

    component.setProperty('showIcon', 'false');
    await page.waitForChanges();
    element = await page.find('modus-toast >>> svg.icon-info');
    expect(element).toBeNull();
  });

  it('renders changes to dismissible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const component = await page.find('modus-toast');
    let element = await page.find('modus-toast >>> svg.icon-close');
    expect(element).toBeNull();

    component.setProperty('dismissible', 'true');
    await page.waitForChanges();
    element = await page.find('modus-toast >>> svg.icon-close');
    expect(element).toBeDefined();
  });

  it('emits dismissClick event on icon close click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast dismissible></modus-toast>');
    const dismissClick = await page.spyOnEvent('dismissClick');
    const element = await page.find('modus-toast >>> svg.icon-close');

    await element.click();
    await page.waitForChanges();
    expect(dismissClick).toHaveReceivedEvent();
  });

  it('emits dismissClick event after 15000ms', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast></modus-toast>');
    const dismissClick = await page.spyOnEvent('dismissClick');

    await page.waitForTimeout(15000);
    expect(dismissClick).toHaveReceivedEvent();
  });

  it('emits dismissClick event after 15000ms', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-toast delay="10000"></modus-toast>');
    const dismissClick = await page.spyOnEvent('dismissClick');

    await page.waitForTimeout(10000);
    expect(dismissClick).toHaveReceivedEvent();
  });
});

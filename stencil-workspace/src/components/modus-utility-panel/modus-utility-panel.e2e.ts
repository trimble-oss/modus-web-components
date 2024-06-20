import { newE2EPage } from '@stencil/core/testing';

describe('modus-utility-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-utility-panel></modus-utility-panel>');

    const element = await page.find('modus-utility-panel');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to expanded prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-utility-panel></modus-utility-panel>');

    const component = await page.find('modus-utility-panel');
    component.setProperty('expanded', true);
    await page.waitForChanges();

    const element = await page.find('modus-utility-panel >>> .utility-panel');
    expect(element).toHaveClass('open');
  });

  it('renders changes to pushContent prop', async () => {
    const page = await newE2EPage();
    await page.setContent('<div id="content">Test Content</div><modus-utility-panel></modus-utility-panel>');

    const component = await page.find('modus-utility-panel');
    component.setProperty('targetContent', '#content');
    component.setProperty('pushContent', true);
    component.setProperty('expanded', true);
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300)); // Allow transition to complete

    const content = await page.find('#content');
    const computedStyle = await content.getComputedStyle();
    expect(computedStyle['marginRight']).toEqual('312px');

    component.setProperty('expanded', false);
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300)); // Allow transition to complete

    const updatedStyle = await content.getComputedStyle();
    expect(updatedStyle['marginRight']).toEqual('0px');
  });

  it('emits panelOpened event', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-utility-panel></modus-utility-panel>');

    const component = await page.find('modus-utility-panel');
    const openedEvent = await page.spyOnEvent('panelOpened');

    component.setProperty('expanded', true);
    await page.waitForChanges();

    expect(openedEvent).toHaveReceivedEvent();
  });

  it('emits panelClosed event', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-utility-panel></modus-utility-panel>');

    const component = await page.find('modus-utility-panel');
    const closedEvent = await page.spyOnEvent('panelClosed');

    component.setProperty('expanded', true);
    await page.waitForChanges();
    component.setProperty('expanded', false);
    await page.waitForChanges();

    expect(closedEvent).toHaveReceivedEvent();
  });

  it('adjusts content margin when expanded with pushContent true', async () => {
    const page = await newE2EPage();
    await page.setContent('<div id="content">Test Content</div><modus-utility-panel></modus-utility-panel>');

    const component = await page.find('modus-utility-panel');
    component.setProperty('targetContent', '#content');
    component.setProperty('pushContent', true);
    component.setProperty('expanded', true);
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300)); // Allow transition to complete

    const content = await page.find('#content');
    const computedStyle = await content.getComputedStyle();
    expect(computedStyle['marginRight']).toEqual('312px');
  });

  it('adjusts content margin when collapsed with pushContent true', async () => {
    const page = await newE2EPage();
    await page.setContent('<div id="content">Test Content</div><modus-utility-panel></modus-utility-panel>');

    const component = await page.find('modus-utility-panel');
    component.setProperty('targetContent', '#content');
    component.setProperty('pushContent', true);
    component.setProperty('expanded', true);
    await page.waitForChanges();

    component.setProperty('expanded', false);
    await page.waitForChanges();
    await new Promise((r) => setTimeout(r, 300)); // Allow transition to complete

    const content = await page.find('#content');
    const computedStyle = await content.getComputedStyle();
    expect(computedStyle['marginRight']).toEqual('0px');
  });
});

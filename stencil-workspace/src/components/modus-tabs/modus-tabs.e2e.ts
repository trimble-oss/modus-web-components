import { newE2EPage } from '@stencil/core/testing';

describe('modus-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tabs></modus-tabs>');
    const element = await page.find('modus-tabs');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to size', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tabs></modus-tabs>');
    const modusTabs = await page.find('modus-tabs');
    const tabs = await page.find('modus-tabs >>> .modus-tabs');
    expect(tabs).toHaveClass('medium');

    await modusTabs.setProperty('size', 'small');
    await page.waitForChanges();
    expect(tabs).toHaveClass('small');
  });

  it('renders changes to tabs', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tabs></modus-tabs>');
    const modusTabs = await page.find('modus-tabs');
    let tabs = await page.findAll('modus-tabs >>> .tab');
    expect(tabs.length).toBeFalsy();

    modusTabs.setProperty('tabs', [{ id: 0, label: 'Tab1' }]);
    await page.waitForChanges();
    tabs = await page.findAll('modus-tabs >>> .tab');
    expect(tabs.length).toEqual(1);
  });

  it('emits pageChange on page click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tabs></modus-tabs>');
    const tabChange = await page.spyOnEvent('tabChange');

    const modusTabs = await page.find('modus-tabs');
    modusTabs.setProperty('tabs', [
      { active: true, id: 0, label: 'Tab1' },
      { id: 1, label: 'Tab2' },
    ]);
    await page.waitForChanges();
    const element = await page.find('modus-tabs >>> div.active + div');

    await element.click();
    await page.waitForChanges();
    expect(tabChange).toHaveReceivedEvent();
  });
});

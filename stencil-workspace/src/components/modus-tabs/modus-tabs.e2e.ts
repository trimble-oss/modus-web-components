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

    modusTabs.setProperty('tabs', [{ id: 'tab-1', label: 'Tab1' }]);
    await page.waitForChanges();
    tabs = await page.findAll('modus-tabs >>> .tab');

    expect(tabs.length).toEqual(1);
    expect(tabs[0].id).toEqual('tab-1');
  });

  it('emits tabChange on tab click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tabs></modus-tabs>');
    const tabChange = await page.spyOnEvent('tabChange');

    const modusTabs = await page.find('modus-tabs');
    modusTabs.setProperty('tabs', [
      { active: true, id: 0, label: 'Tab1' },
      { id: 1, label: 'Tab2' },
    ]);
    await page.waitForChanges();
    const element = await page.find('modus-tabs >>> button.active + button');

    await element.click();
    await page.waitForChanges();
    expect(tabChange).toHaveReceivedEvent();
  });

  it('renders changes on tabs even without tab id provided', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tabs></modus-tabs>');
    const modusTabs = await page.find('modus-tabs');
    modusTabs.setProperty('tabs', [{ label: 'Tab1' }, { id: 0, label: 'Tab 2' }]);
    await page.waitForChanges();
    const element = await page.find('modus-tabs >>> button');

    expect(element.id).toEqual('tab-label-tab1');
  });

  it('renders aria-label on tabs div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tabs aria-label="test label"></modus-tabs>');
    const element = await page.find('modus-tabs >>> .modus-tabs');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on tabs div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tabs></modus-tabs>');
    const element = await page.find('modus-tabs >>> .modus-tabs');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on tabs div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-tabs aria-label=""></modus-tabs>');
    const element = await page.find('modus-tabs >>> .modus-tabs');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });
});

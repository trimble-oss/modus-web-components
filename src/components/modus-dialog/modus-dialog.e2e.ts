import { newE2EPage } from '@stencil/core/testing';

describe('modus-dialog', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dialog></modus-dialog>');
    const element = await page.find('modus-dialog');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the headerText prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dialog></modus-dialog>');
    const component = await page.find('modus-dialog');
    const element = await page.find('modus-dialog >>> .header-text');
    expect(element.innerText).toBeFalsy();

    component.setProperty('headerText', 'Dialog Header');
    await page.waitForChanges();
    expect(element.innerText).toEqual('Dialog Header');
  });

  it('renders changes to the primaryButtonText prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dialog></modus-dialog>');
    const component = await page.find('modus-dialog');
    const element = await page.find('modus-dialog >>> modus-button:last-child');
    expect(element.innerText).toEqual('Save Changes');

    component.setProperty('primaryButtonText', 'Save');
    await page.waitForChanges();
    expect(element.innerText).toEqual('Save');
  });

  it('renders changes to the secondaryButtonText prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dialog></modus-dialog>');
    const component = await page.find('modus-dialog');
    const element = await page.find('modus-dialog >>> modus-button:first-child');
    expect(element.innerText).toEqual('Close');

    component.setProperty('secondaryButtonText', 'Cancel');
    await page.waitForChanges();
    expect(element.innerText).toEqual('Cancel');
  });

  it('renders changes to the showSecondaryButton prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dialog></modus-dialog>');
    const component = await page.find('modus-dialog');
    let element = await page.find('modus-dialog >>> modus-button:first-child');
    expect(element.innerText).toEqual('Close');

    component.setProperty('showSecondaryButton', false);
    await page.waitForChanges();
    expect(element.innerText).not.toEqual('Close');
  });

  it('renders changes to the visible prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dialog></modus-dialog>');
    const component = await page.find('modus-dialog');
    let element = await page.find('modus-dialog >>> .overlay');
    expect(element).not.toHaveClass('visible');

    component.setProperty('visible', true);
    await page.waitForChanges();
    expect(element).toHaveClass('visible');
  });

  it('emits dialogClose event on icon close click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dialog visible></modus-dialog>');
    const dialogClose = await page.spyOnEvent('dialogClose');
    const element = await page.find('modus-dialog >>> svg.icon-close');

    await element.click();
    await page.waitForChanges();
    expect(dialogClose).toHaveReceivedEvent();
  });

  it('emits primaryButtonClick event on primary button click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dialog visible></modus-dialog>');
    const primaryButtonClick = await page.spyOnEvent('primaryButtonClick');
    const element = await page.find('modus-dialog >>> modus-button:last-child');

    await element.click();
    await page.waitForChanges();
    expect(primaryButtonClick).toHaveReceivedEvent();
  });

  it('emits secondaryButtonClick event on secondary button click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-dialog visible></modus-dialog>');
    const secondaryButtonClick = await page.spyOnEvent('secondaryButtonClick');
    const element = await page.find('modus-dialog >>> modus-button:first-child');

    await element.click();
    await page.waitForChanges();
    expect(secondaryButtonClick).toHaveReceivedEvent();
  });
});

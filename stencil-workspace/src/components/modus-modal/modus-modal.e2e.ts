import { newE2EPage } from '@stencil/core/testing';

describe('modus-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    const element = await page.find('modus-modal');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to headerText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal header-text="Header Text"></modus-modal>');
    const component = await page.find('modus-modal');
    const element = await page.find('modus-modal >>> div');
    expect(element.innerText).toContain('Header Text');

    component.setProperty('headerText', 'New Text');
    await page.waitForChanges();
    expect(element.innerText).toContain('New Text');
  });

  it('does not have the role of "dialog" when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    const element = await page.find('modus-modal >>> div');
    expect(element.getAttribute('role')).not.toEqual('dialog');
  });

  it('has the role of "dialog" when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    const component = await page.find('modus-modal');
    const element = await page.find('modus-modal >>> div');
    await component.callMethod('open');
    await page.waitForChanges();
    expect(element.getAttribute('role')).toEqual('dialog');
  });

  it('does not have aria-modal attribute when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    const element = await page.find('modus-modal >>> div');
    expect(element.getAttribute('aria-modal')).toBeNull();
  });

  it('has aria-modal attribute set to true when visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    const component = await page.find('modus-modal');
    const element = await page.find('modus-modal >>> div');
    await component.callMethod('open');
    await page.waitForChanges();
    expect(element.getAttribute('aria-modal')).toBeTruthy();
  });

  it('does not have aria-label attribute when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal aria-label="test"></modus-modal>');
    const element = await page.find('modus-modal >>> div');
    expect(element.getAttribute('aria-label')).toBeNull();
  });

  it('has aria-modal attribute set to true when visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal aria-label="test"></modus-modal>');
    const component = await page.find('modus-modal');
    const element = await page.find('modus-modal >>> div');
    await component.callMethod('open');
    await page.waitForChanges();
    expect(element.getAttribute('aria-label')).toEqual('test');
  });

  it('has aria-hidden attribute set to true when not visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    const element = await page.find('modus-modal >>> div');
    expect(element.getAttribute('aria-hidden')).toBeTruthy();
  });

  it('does not have aria-modal attribute set to true when visible', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    const component = await page.find('modus-modal');
    const element = await page.find('modus-modal >>> div');
    await component.callMethod('open');
    await page.waitForChanges();
    expect(element.getAttribute('aria-hidden')).toBeFalsy();
  });

  it('renders changes to primaryButtonText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal primary-button-text="Primary Text"></modus-modal>');
    const component = await page.find('modus-modal');
    const element = await page.find('modus-modal >>> modus-button');
    expect(element.innerText).toContain('Primary Text');

    component.setProperty('primaryButtonText', 'New Text');
    await page.waitForChanges();
    expect(element.innerText).toContain('New Text');
  });

  it('renders changes to secondaryButtonText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal secondary-button-text="Secondary Text"></modus-modal>');
    const component = await page.find('modus-modal');
    await page.waitForChanges();
    const element = await page.find('modus-modal >>> modus-button');
    expect(element.innerText).toContain('Secondary Text');

    component.setProperty('secondaryButtonText', 'New Text');
    await page.waitForChanges();
    expect(element.innerText).toContain('New Text');
  });

  it('renders changes to primaryButtonDisabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal primary-button-text="Primary Text"></modus-modal>');

    const element = await page.find('modus-modal >>> modus-button');
    expect(await element.getProperty('disabled')).toBeFalsy();

    const component = await page.find('modus-modal');
    component.setProperty('primaryButtonDisabled', true);
    await page.waitForChanges();

    expect(await element.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to secondaryButtonDisabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal secondary-button-text="Secondary Text"></modus-modal>');

    const element = await page.find('modus-modal >>> modus-button');
    expect(await element.getProperty('disabled')).toBeFalsy();

    const component = await page.find('modus-modal');
    component.setProperty('secondaryButtonDisabled', true);
    await page.waitForChanges();

    expect(await element.getProperty('disabled')).toBeTruthy();
  });

  it('does not render buttons if text is not specified', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    await page.waitForChanges();
    const elements = await page.findAll('modus-modal >>> modus-button');
    expect(elements.length).toBeFalsy();
  });

  it('emits primaryButtonClick on click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal primary-button-text="Primary Text"></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    await page.waitForChanges();
    const element = await page.find('modus-modal >>> modus-button');
    const primaryButtonClick = await page.spyOnEvent('primaryButtonClick');

    await element.click();
    await page.waitForChanges();
    expect(primaryButtonClick).toHaveReceivedEvent();
  });

  it('emits secondaryButtonClick on click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal secondary-button-text="Secondary Text"></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    await page.waitForChanges();
    const element = await page.find('modus-modal >>> modus-button');
    const secondaryButtonClick = await page.spyOnEvent('secondaryButtonClick');

    await element.click();
    await page.waitForChanges();
    expect(secondaryButtonClick).toHaveReceivedEvent();
  });

  it('should not emit primaryButtonClick on click when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal primary-button-text="Primary Text"></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    await page.waitForChanges();
    const element = await page.find('modus-modal >>> modus-button');
    const primaryButtonClick = await page.spyOnEvent('primaryButtonClick');

    modal.setProperty('primaryButtonDisabled', true);
    await page.waitForChanges();

    expect(await element.getProperty('disabled')).toBeTruthy();

    await element.click();
    await page.waitForChanges();
    expect(primaryButtonClick).not.toHaveReceivedEvent();
  });

  it('should not emit secondaryButtonClick on click when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal secondary-button-text="Secondary Text"></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    await page.waitForChanges();
    const element = await page.find('modus-modal >>> modus-button');
    const secondaryButtonClick = await page.spyOnEvent('secondaryButtonClick');

    modal.setProperty('secondaryButtonDisabled', true);
    await page.waitForChanges();

    expect(await element.getProperty('disabled')).toBeTruthy();

    await element.click();
    await page.waitForChanges();
    expect(secondaryButtonClick).not.toHaveReceivedEvent();
  });

  it('emits opened on open call', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal secondary-button-text="Secondary Text"></modus-modal>');
    const modal = await page.find('modus-modal');
    const opened = await page.spyOnEvent('opened');
    await modal.callMethod('open');
    await page.waitForChanges();
    expect(opened).toHaveReceivedEvent();
  });

  it('emits closed on close call', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal secondary-button-text="Secondary Text"></modus-modal>');
    const modal = await page.find('modus-modal');
    const closed = await page.spyOnEvent('closed');
    await modal.callMethod('open');
    await page.waitForChanges();
    await modal.callMethod('close');
    await page.waitForChanges();
    expect(closed).toHaveReceivedEvent();
  });

  it('closes on overlay click', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-modal secondary-button-text="Secondary Text"></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    const closed = await page.spyOnEvent('closed');

    // Was having trouble finding the modal's overlay, so click it through evaluate().
    await page.evaluate(() => {
      const overlay = document.querySelector('modus-modal').shadowRoot.querySelector('.overlay');
      overlay.scrollIntoView({ block: 'center', inline: 'center' });
      (overlay as HTMLElement).click();
    });

    await page.waitForChanges();
    expect(closed).toHaveReceivedEvent();
  });

  it('closes on overlay click when backdrop is default', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-modal secondary-button-text="Secondary Text" backdrop="default"></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    const closed = await page.spyOnEvent('closed');

    // Was having trouble finding the modal's overlay, so click it through evaluate().
    await page.evaluate(() => {
      const overlay = document.querySelector('modus-modal').shadowRoot.querySelector('.overlay');
      overlay.scrollIntoView({ block: 'center', inline: 'center' });
      (overlay as HTMLElement).click();
    });

    await page.waitForChanges();
    expect(closed).toHaveReceivedEvent();
  });

  it('does not closes on overlay click when backdrop is static', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-modal secondary-button-text="Secondary Text" backdrop="static"></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    const closed = await page.spyOnEvent('closed');

    // Was having trouble finding the modal's overlay, so click it through evaluate().
    await page.evaluate(() => {
      const overlay = document.querySelector('modus-modal').shadowRoot.querySelector('.overlay');
      overlay.scrollIntoView({ block: 'center', inline: 'center' });
      (overlay as HTMLElement).click();
    });

    await page.waitForChanges();
    expect(closed).not.toHaveReceivedEvent();
  });

  it('has a default overlay background color', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-modal secondary-button-text="Secondary Text"></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');

    // Computed overlay color is returned from page.evaluate()

    const backgroundColor = await page.evaluate(async (): Promise<string> => {
      const overlay = document.querySelector('modus-modal').shadowRoot.querySelector('.overlay');
      overlay.scrollIntoView({ block: 'center', inline: 'center' });

      const styles = window.getComputedStyle(overlay);
      return styles.backgroundColor;
    });

    await page.waitForChanges();
    console.error(backgroundColor);
    expect(backgroundColor).toBe('rgba(37, 42, 46, 0.75)');
  });
});

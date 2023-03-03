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
    const element = await page.find('modus-modal >>> div.header');
    expect(element.innerText).toContain('Header Text');

    component.setProperty('headerText', 'New Text');
    await page.waitForChanges();
    expect(element.innerText).toContain('New Text');
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
      overlay.scrollIntoView({ block: "center", inline: "center" });
      (overlay as HTMLElement).click();
    });

    await page.waitForChanges();
    expect(closed).toHaveReceivedEvent();
  });

  it('has a default overlay background color', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<modus-modal secondary-button-text="Secondary Text"></modus-modal>'
    );
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');

    // Computed overlay color is returned from page.evaluate()

    const backgroundColor = await page.evaluate(async (): Promise<string> => {
      const overlay = document
        .querySelector('modus-modal')
        .shadowRoot.querySelector('.overlay');
      overlay.scrollIntoView({ block: 'center', inline: 'center' });

      const styles = window.getComputedStyle(overlay);
      return styles.backgroundColor;
    });

    await page.waitForChanges();
    console.error(backgroundColor);
    expect(backgroundColor).toBe('rgba(37, 42, 46, 0.75)');
  });

});

import {newE2EPage} from '@stencil/core/testing';
import {ModusModalButtons} from './modus-modal';

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
    await page.setContent('<modus-modal></modus-modal>');
    let component = await page.find('modus-modal');
    let buttons: ModusModalButtons = {
      primary: {
        text: 'Primary Text',
        ariaLabel: 'Primary Text'
      }
    };
    await page.waitForChanges();
    component.setProperty('buttons', buttons);
    await page.waitForChanges();
    let element = await page.find('modus-modal >>> div >>>buttons');
    expect(element.innerText).toContain('Primary');
  });

  it('renders changes to secondaryButtonText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    let component = await page.find('modus-modal');
    let buttons: ModusModalButtons = {
      secondary: {
        text: 'Secondary Text',
        ariaLabel: 'Secondary Text'
      }
    };
    await page.waitForChanges();
    component.setProperty('buttons', buttons);
    await page.waitForChanges();
    let element = await page.find('modus-modal >>> div >>>buttons');
    expect(element.innerText).toContain('Secondary Text');
  });

  it('renders changes to outlineButtonText', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    let component = await page.find('modus-modal');
    let buttons: ModusModalButtons = {
      secondary: {
        text: 'Outline Text',
        ariaLabel: 'Outline Text'
      }
    };
    await page.waitForChanges();
    component.setProperty('buttons', buttons);
    await page.waitForChanges();
    let element = await page.find('modus-modal >>> div >>>buttons');
    expect(element.innerText).toContain('Outline Text');
  });

  it('renders changes to primaryButtonDisabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-modal></modus-modal>');
    let component = await page.find('modus-modal');
    let button: ModusModalButtons = {
      primary: {
        text: 'Primary Text',
        ariaLabel: 'Primary Text',
        disabled: true
      }
    };
    await page.waitForChanges();
    component.setProperty('button', button);
    await page.waitForChanges();
    let element = await page.find('modus-modal >>> div >>>button');
    expect(element.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to secondaryButtonDisabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-modal></modus-modal>');
    let component = await page.find('modus-modal');
    let button: ModusModalButtons = {
      secondary: {
        text: 'secondary',
        ariaLabel: 'secondary',
        disabled: true
      }
    };
    await page.waitForChanges();
    component.setProperty('button', button);
    await page.waitForChanges();
    let element = await page.find('modus-modal >>> div >>>button');
    expect(element.getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to outlineButtonDisabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-modal></modus-modal>');
    let component = await page.find('modus-modal');
    let button: ModusModalButtons = {
      secondary: {
        text: 'Outline Text',
        ariaLabel: 'Outline Text',
        disabled: true
      }
    };
    await page.waitForChanges();
    component.setProperty('button', button);
    await page.waitForChanges();
    let element = await page.find('modus-modal >>> div >>>button');
    expect(element.getProperty('disabled')).toBeTruthy();
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
    await page.setContent('<modus-modal></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    let button: ModusModalButtons = {
      primary: {
        text: 'primary',
        ariaLabel: 'primary'
      }
    };
    modal.setProperty('button', button);
    await page.waitForChanges();
    const element = await page.find('modus-modal >>> div >>> button');
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

    await page.setContent('<modus-modal></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    await page.waitForChanges();
    let button: ModusModalButtons = {
      primary: {
        text: 'primary',
        ariaLabel: 'primary',
        disabled: true
      }
    };
    await page.waitForChanges();
    modal.setProperty('button', button);
    const element = await page.find('modus-modal >>> div >>>button');
    const primaryButtonClick = await page.spyOnEvent('primaryButtonClick');
    await page.waitForChanges();
    expect(element.getProperty('disabled')).toBeTruthy();

    await element.click();
    await page.waitForChanges();
    expect(primaryButtonClick).not.toHaveReceivedEvent();
  });

  it('should not emit secondaryButtonClick on click when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    await page.waitForChanges();
    let button: ModusModalButtons = {
      secondary: {
        text: 'secondary',
        ariaLabel: 'secondary',
        disabled: true
      }
    };
    await page.waitForChanges();
    modal.setProperty('button', button);
    const element = await page.find('modus-modal >>> div >>>button');
    const secondaryButtonClick = await page.spyOnEvent('secondaryButtonClick');
    await page.waitForChanges();

    expect(element.getProperty('disabled')).toBeTruthy();

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

  it('should not emit outlineButtonClick on click when disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-modal></modus-modal>');
    const modal = await page.find('modus-modal');
    await modal.callMethod('open');
    await page.waitForChanges();
    let button: ModusModalButtons = {
      secondary: {
        text: 'Outline Text',
        ariaLabel: 'outline Text',
        disabled: true
      }
    };
    await page.waitForChanges();
    modal.setProperty('button', button);
    const element = await page.find('modus-modal >>> div >>>button');
    const secondaryButtonClick = await page.spyOnEvent('secondaryButtonClick');
    await page.waitForChanges();

    expect(element.getProperty('disabled')).toBeTruthy();

    await element.click();
    await page.waitForChanges();
    expect(secondaryButtonClick).not.toHaveReceivedEvent();
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
      overlay.scrollIntoView({block: 'center', inline: 'center'});
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
      overlay.scrollIntoView({block: 'center', inline: 'center'});
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
      overlay.scrollIntoView({block: 'center', inline: 'center'});
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
      overlay.scrollIntoView({block: 'center', inline: 'center'});

      const styles = window.getComputedStyle(overlay);
      return styles.backgroundColor;
    });

    await page.waitForChanges();
    console.error(backgroundColor);
    expect(backgroundColor).toBe('rgba(37, 42, 46, 0.75)');
  });
});

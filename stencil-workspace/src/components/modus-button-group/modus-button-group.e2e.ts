import { newE2EPage } from '@stencil/core/testing';

describe('modus-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button-group role="group"></modus-button-group>');
    const element = await page.find('modus-button-group');
    expect(element).toHaveClass('hydrated');
  });

  it('renders buttons length in Button Group', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group role="group">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);

    const buttons = await page.findAll('modus-button');
    expect(buttons.length).toBe(2);
  });

  it('renders buttons with primary variant', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group role="group">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);
    await page.waitForChanges();

    const buttongroup = await page.findAll('modus-button');
    expect(buttongroup).toBeTruthy();

    for (let i = 0; i < 2; i++) {
      const button = await buttongroup[i]?.shadowRoot.querySelector('button');
      expect(button).toBeTruthy();
      expect(button).toHaveClass('color-primary');
    }
  });

  it('does not mark buttons active for default selectionType', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group role="group">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);
    await page.waitForChanges();

    const buttonGroup = await page.find('modus-button-group');
    expect(buttonGroup).toBeTruthy();

    const buttons = await page.findAll('modus-button');
    expect(buttons).toBeTruthy();

    buttons[0].click();
    await page.waitForChanges();

    for (let i = 0; i < buttons.length; i++) {
      const button = await buttons[i]?.shadowRoot.querySelector('button');
      expect(button).toBeTruthy();
      expect(button).not.toHaveClass('active');
    }

    buttons[1].click();
    await page.waitForChanges();

    for (let i = 0; i < buttons.length; i++) {
      const button = await buttons[i]?.shadowRoot.querySelector('button');
      expect(button).toBeTruthy();
      expect(button).not.toHaveClass('active');
    }
  });

  it('handles single selectionType correctly', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group selection-type="single" role="group">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
        <modus-button>Button 3</modus-button>
      </modus-button-group>
    `);
    await page.waitForChanges();

    const buttonGroup = await page.find('modus-button-group');
    expect(buttonGroup).toBeTruthy();

    const buttons = await page.findAll('modus-button');
    expect(buttons).toBeTruthy();

    buttons[0].click();
    const emittedButtons = await buttonGroup.spyOnEvent('buttonSelectionChange');
    await page.waitForChanges();

    expect(emittedButtons).toHaveReceivedEventTimes(1);
    expect(emittedButtons.events[0]?.detail.length).toBe(1);

    expect(emittedButtons.length).toBe(1);
    const button = await buttons[0]?.shadowRoot.querySelector('button');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('active');
    for (let i = 1; i < buttons.length; i++) {
      const button = await buttons[i]?.shadowRoot.querySelector('button');
      expect(button).toBeTruthy();
      expect(button).not.toHaveClass('active');
    }

    buttons[1].click();
    await page.waitForChanges();

    expect(emittedButtons).toHaveReceivedEventTimes(2);
    expect(emittedButtons.events[1]?.detail.length).toBe(1);

    const button1 = await buttons[1]?.shadowRoot.querySelector('button');
    expect(button1).toBeTruthy();
    expect(button1).toHaveClass('active');
    const indicesToCheck = [0, 2];

    for (const i of indicesToCheck) {
      const button = await buttons[i]?.shadowRoot.querySelector('button');
      expect(button).toBeTruthy();
      expect(button).not.toHaveClass('active');
    }
  });

  it('handles multiple selectionType correctly', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group selection-type="multiple" role="group">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
        <modus-button>Button 3</modus-button>
      </modus-button-group>
    `);
    await page.waitForChanges();

    const buttonGroup = await page.find('modus-button-group');
    expect(buttonGroup).toBeTruthy();

    const buttons = await page.findAll('modus-button');
    expect(buttons).toBeTruthy();

    buttons[0].click();
    const emittedButtons = await buttonGroup.spyOnEvent('buttonSelectionChange');
    await page.waitForChanges();

    expect(emittedButtons).toHaveReceivedEventTimes(1);
    expect(emittedButtons.events[0]?.detail.length).toBe(1);

    expect(emittedButtons.length).toBe(1);
    const button = await buttons[0]?.shadowRoot.querySelector('button');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('active');
    for (let i = 1; i < buttons.length; i++) {
      const button = await buttons[i]?.shadowRoot.querySelector('button');
      expect(button).toBeTruthy();
      expect(button).not.toHaveClass('active');
    }

    buttons[1].click();
    await page.waitForChanges();

    expect(emittedButtons).toHaveReceivedEventTimes(2);
    expect(emittedButtons.events[1]?.detail.length).toBe(2);
    const indicesToCheck = [0, 1];
    for (const i of indicesToCheck) {
      const button = await buttons[i]?.shadowRoot.querySelector('button');
      expect(button).toBeTruthy();
      expect(button).toHaveClass('active');
    }

    const button1 = await buttons[2]?.shadowRoot.querySelector('button');
    expect(button1).toBeTruthy();
    expect(button1).not.toHaveClass('active');
  });

  it('disables all buttons when the group is disabled', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group disabled role="group">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);
    await page.waitForChanges();

    const buttons = await page.findAll('modus-button');

    for (const button of buttons) {
      const buttonDisabled = await button.getProperty('disabled');
      expect(buttonDisabled).toBe(true);
    }
  });

  it('reflects style changes to all buttons', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group button-style="solid" role="group">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);
    await page.waitForChanges();

    const buttonGroup = await page.find('modus-button-group');
    expect(buttonGroup.getAttribute('button-style')).toBe('solid');

    const buttons = await page.findAll('modus-button');
    for (let i = 0; i < buttons.length; i++) {
      expect(await buttons[i].getProperty('buttonStyle')).toBe('solid');
    }

    buttonGroup.setProperty('buttonStyle', 'outline');
    await page.waitForChanges();

    for (let i = 0; i < buttons.length; i++) {
      expect(await buttons[i].getProperty('buttonStyle')).toBe('outline');
    }
  });

  it('sets aria-label and aria-disabled correctly', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group aria-label="Group Label" aria-disabled="true" role="group">
        <modus-button>Button 1</modus-button>
      </modus-button-group>
    `);
    await page.waitForChanges();

    const buttonGroup = await page.find('modus-button-group');
    expect(buttonGroup.getAttribute('aria-label')).toBe('Group Label');
    expect(buttonGroup.getAttribute('aria-disabled')).toBe('true');
  });
});

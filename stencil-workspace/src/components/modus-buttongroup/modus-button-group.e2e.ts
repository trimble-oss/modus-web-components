import { newE2EPage } from '@stencil/core/testing';

describe('modus-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button-group></modus-button-group>');
    const element = await page.find('modus-button-group');
    expect(element).toHaveClass('hydrated');
  });

  it('renders buttons length in Button Group', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group>
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
      <modus-button-group>
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

  it('emits selected buttons for default selectionType', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group>
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
      <modus-button-group selection-type="single">
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
    const emittedButtons = await buttonGroup.spyOnEvent('buttonsSelected');
    await page.waitForChanges();

    expect(emittedButtons).toHaveReceivedEventTimes(1);

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
});

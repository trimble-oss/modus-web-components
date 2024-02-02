import { newE2EPage } from '@stencil/core/testing';

describe('modus-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-button-group></modus-button-group>');
    const element = await page.find('modus-button-group');
    expect(element).toHaveClass('hydrated');
  });

  it('renders buttons according to props', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group
        group-style="outline"
        selection-type="single"
        variant="secondary"
      >
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);

    const buttons = await page.findAll('modus-button-group >>> .modus-button');
    expect(buttons.length).toBe(2);

    const button1 = buttons[0];
    const button2 = buttons[1];
    expect(button1).toHaveClass('outline');
    expect(button2).toHaveClass('outline');
  });

  it('positions buttons correctly based on group length', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group>
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
        <modus-button>Button 3</modus-button>
      </modus-button-group>
    `);
    await page.waitForChanges();

    const buttongroup = await page.findAll('modus-button-group >>> modus-button');
    expect(buttongroup).toBeTruthy();

    const buttonClasses = ['left', 'center', 'right'];
    for (let i = 0; i <= 2; i++) {
      const button = await buttongroup[i];
      const comp = button.shadowRoot.querySelector('button');
      expect(comp.className).toContain(buttonClasses[i]);
    }
  });

  it('handles selectionType correctly for default state of selection', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group >
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);
    await page.waitForChanges();
    const buttongroup = await page.findAll('modus-button-group >>> modus-button');
    expect(buttongroup).toBeTruthy();

    const button = await buttongroup[0];
    button.click();
    await page.waitForChanges();

    const button1 = await buttongroup[0].shadowRoot.querySelector('button');
    expect(button1.className).not.toContain('active');

    const button2 = await buttongroup[1]; //.shadowRoot.querySelector('button');
    await page.waitForChanges();
    expect(button2.className).not.toContain('active');
  });

  it('handles selectionType correctly for single selection', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <modus-button-group selection-type="single">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);

    const buttongroup = await page.findAll('modus-button-group >>> modus-button');
    expect(buttongroup).toBeTruthy();

    const button = await buttongroup[0];

    button.click();
    await page.waitForChanges();

    const button1 = await buttongroup[0].shadowRoot.querySelector('button');
    expect(button1.className).toContain('active');

    const button2 = await buttongroup[1].shadowRoot.querySelector('button');
    await page.waitForChanges();
    expect(button2.className).not.toContain('active');
  });
});

it('renders buttons with primary variant', async () => {
  const page = await newE2EPage();

  await page.setContent(`
      <modus-button-group variant="primary">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);
  await page.waitForChanges();

  const buttongroup = await page.findAll('modus-button-group >>> modus-button');
  expect(buttongroup).toBeTruthy();

  for (let i = 0; i < 2; i++) {
    const button = await buttongroup[i].shadowRoot.querySelector('button');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('color-primary');
  }
});

it('renders buttons with secondary variant', async () => {
  const page = await newE2EPage();

  await page.setContent(`
      <modus-button-group variant="secondary">
        <modus-button>Button 1</modus-button>
        <modus-button>Button 2</modus-button>
      </modus-button-group>
    `);

  await page.waitForChanges();

  const buttongroup = await page.findAll('modus-button-group >>> modus-button');
  expect(buttongroup).toBeTruthy();

  for (let i = 0; i < 2; i++) {
    const button = await buttongroup[i].shadowRoot.querySelector('button');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('color-secondary');
  }
});

it('emits groupClick event on button click', async () => {
  const page = await newE2EPage();

  await page.setContent(`
      <modus-button-group>
        <modus-button>Button 1</modus-button>
      </modus-button-group>
    `);

  const element = await page.find('modus-button-group >>> .modus-button');
  const groupClick = await page.spyOnEvent('groupClick');

  await element.click();
  await page.waitForChanges();

  expect(groupClick).toHaveReceivedEvent();
});

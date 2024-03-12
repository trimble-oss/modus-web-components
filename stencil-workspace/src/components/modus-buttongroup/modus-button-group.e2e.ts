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

  it('handles selectionType correctly for default state of selection', async () => {
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

    buttongroup[0].click();
    await page.waitForChanges();

    const button = await buttongroup[0]?.shadowRoot.querySelector('button');
    expect(button).toBeTruthy();
    expect(button).toHaveClass('active');
    const button2 = await buttongroup[1]?.shadowRoot.querySelector('button');
    expect(button2).not.toHaveClass('active');
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
});

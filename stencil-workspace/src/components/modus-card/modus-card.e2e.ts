import { newE2EPage } from '@stencil/core/testing';

describe('modus-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const element = await page.find('modus-card');
    expect(element).toHaveClass('hydrated');
  });

  it('should have "shadow" and "card-border" as default classes', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const element = await page.find('modus-card >>> article');

    expect(element).toHaveClass('shadow');
    expect(element).toHaveClass('card-border');
  });

  it('renders changes to the height prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const component = await page.find('modus-card');
    const element = await page.find('modus-card >>> article');
    let computedStyle = await element.getComputedStyle();
    expect(computedStyle['height']).toEqual('269px');

    component.setProperty('height', '300px');
    await page.waitForChanges();
    computedStyle = await element.getComputedStyle();

    expect(computedStyle['height']).toEqual('300px');
  });

  it('renders changes to the width prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const component = await page.find('modus-card');
    const element = await page.find('modus-card >>> article');
    let computedStyle = await element.getComputedStyle();
    expect(computedStyle['width']).toEqual('240px');

    component.setProperty('width', '200px');
    await page.waitForChanges();
    computedStyle = await element.getComputedStyle();
    expect(computedStyle['width']).toEqual('200px');
  });

  it('renders changes to the borderRadius prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const component = await page.find('modus-card');
    const element = await page.find('modus-card >>> article');
    let computedStyle = await element.getComputedStyle();
    expect(computedStyle['borderRadius']).toEqual('4px');

    component.setProperty('borderRadius', '10px');
    await page.waitForChanges();
    computedStyle = await element.getComputedStyle();
    expect(computedStyle['borderRadius']).toEqual('10px');
  });

  it('should remove class "shadow" when showShadowOnHover flag is set on "false"', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const component = await page.find('modus-card');
    const element = await page.find('modus-card >>> article');
    expect(element).toHaveClass('shadow');

    component.setProperty('showShadowOnHover', 'false');
    await page.waitForChanges();
    expect(element).not.toHaveClass('shadow');
  });

  it('should remove class "card-border" when showCardBorder flag is set on "false"', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    const component = await page.find('modus-card');
    const element = await page.find('modus-card >>> article');
    expect(element).toHaveClass('card-border');

    component.setProperty('showCardBorder', 'false');
    await page.waitForChanges();
    expect(element).not.toHaveClass('card-border');
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card aria-label="test label"></modus-card>');
    let element = await page.find('modus-card >>> article');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card></modus-card>');
    let element = await page.find('modus-card >>> article');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-card aria-label=""></modus-card>');
    let element = await page.find('modus-card >>> article');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });
});

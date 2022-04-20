import { newE2EPage } from '@stencil/core/testing';

describe('modus-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-badge></modus-badge>');
    const element = await page.find('modus-badge');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the color prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-badge></modus-badge>');
    const component = await page.find('modus-badge');
    const element = await page.find('modus-badge >>> div.badge');
    expect(element).toHaveClass('color-primary');

    component.setProperty('color', 'danger');
    await page.waitForChanges();
    expect(element).toHaveClass('color-danger');
  });

  it('renders changes to the size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-badge></modus-badge>');
    const component = await page.find('modus-badge');
    const element = await page.find('modus-badge >>> div.badge');
    expect(element).toHaveClass('size-medium');

    component.setProperty('size', 'small');
    await page.waitForChanges();
    expect(element).toHaveClass('size-small');
  });

  it('renders changes to the type prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-badge></modus-badge>');
    const component = await page.find('modus-badge');
    const element = await page.find('modus-badge >>> div.badge');
    expect(element).toHaveClass('type-default');

    component.setProperty('type', 'counter');
    await page.waitForChanges();
    expect(element).toHaveClass('type-counter');
  });
});

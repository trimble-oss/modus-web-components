import { newE2EPage } from '@stencil/core/testing';

describe('modus-message', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-message></modus-message>');
    const element = await page.find('modus-message');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to type', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-message></modus-message>');
    const element = await page.find('modus-message');

    const message = await page.find('modus-message >>> .modus-message');
    expect(message).toHaveClass('info');

    await element.setProperty('type', 'question');
    await page.waitForChanges();

    expect(message).toHaveClass('question');
  });

  it('renders changes to icon', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-message></modus-message>');
    const element = await page.find('modus-message');

    await page.waitForChanges();

    let icon = await page.find('modus-message >>> .icon-check');
    expect(icon).toBeNull();
    element.setProperty('icon', 'check');
    await page.waitForChanges();
    icon = await page.find('modus-message >>> .icon-check');
    expect(icon).not.toBeNull();
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-message aria-label="test label"></modus-message>');
    let element = await page.find('modus-message >>> .modus-message');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-message></modus-message>');
    let element = await page.find('modus-message >>> .modus-message');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-message aria-label=""></modus-message>');
    let element = await page.find('modus-message >>> .modus-message');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('modus-alert', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion></modus-accordion>');
    const element = await page.find('modus-accordion');
    expect(element).toHaveClass('hydrated');
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion aria-label="test label"></modus-accordion>');
    let element = await page.find('modus-accordion >>> div.accordion');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion></modus-accordion>');
    let element = await page.find('modus-accordion >>> div.accordion');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion aria-label=""></modus-accordion>');
    let element = await page.find('modus-accordion >>> div.accordion');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });
});

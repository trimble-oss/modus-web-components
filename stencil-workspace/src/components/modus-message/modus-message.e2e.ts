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
});

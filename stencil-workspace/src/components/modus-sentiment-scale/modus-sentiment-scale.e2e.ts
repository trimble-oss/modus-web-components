import { newE2EPage } from '@stencil/core/testing';

describe('modus-sentiment-scale', () => {
  it('renders with default values', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="smileys"></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with thumbs icons', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="thumbs"></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(element).toHaveClass('hydrated');
  });

  it('emits sentimentSelection event on sentiment click for smileys container', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="smileys"></modus-sentiment-scale>');

    const sentimentSelection = await page.spyOnEvent('sentimentSelection');
    const element = await page.find('modus-sentiment-scale >>> .sentiment-scale-container .smileys-container');

    await element.click();
    await page.waitForChanges();

    expect(sentimentSelection).toHaveReceivedEvent();
  });

  it('emits sentimentSelection event on sentiment click for thumbs container', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="thumbs"></modus-sentiment-scale>');

    const sentimentSelection = await page.spyOnEvent('sentimentSelection');
    const element = await page.find('modus-sentiment-scale >>> .sentiment-scale-container .thumbs-container');

    await element.click();
    await page.waitForChanges();

    expect(sentimentSelection).toHaveReceivedEvent();
  });
  it('does not emit sentimentSelection event on disabled sentiment click for smileys container', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="smileys" disabled></modus-sentiment-scale>');

    const sentimentSelection = await page.spyOnEvent('sentimentSelection');
    const element = await page.find('modus-sentiment-scale >>> .sentiment-scale-container .smileys-container');

    await element.click();
    await page.waitForChanges();

    expect(sentimentSelection).not.toHaveReceivedEvent();
  });

  it('does not emit sentimentSelection event on disabled sentiment click for thumbs container', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="thumbs" disabled></modus-sentiment-scale>');

    const sentimentSelection = await page.spyOnEvent('sentimentSelection');
    const element = await page.find('modus-sentiment-scale >>> .sentiment-scale-container .thumbs-container');

    await element.click();
    await page.waitForChanges();

    expect(sentimentSelection).not.toHaveReceivedEvent();
  });

  it('renders with disabled property set to true', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale disabled></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    element.setProperty('disabled', 'true');
    await page.waitForChanges();
    expect(await element.getProperty('disabled')).toBe(true);
  });

  it('renders with disabled property set to false', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale></modus-sentiment-scale>');
    const element = await page.find('modus-sentiment-scale');
    expect(await element.getProperty('disabled')).toBe(false);
  });

  it('renders without "aria-disabled" attribute on sentiment scale container when not disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="thumbs"></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale >>> .sentiment-scale-container');

    expect(element).not.toHaveAttribute('aria-disabled');
  });

  it('renders with "aria-disabled" attribute on sentiment scale container set as "true" when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="thumbs" disabled></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale >>> .sentiment-scale-container');

    expect(element.getAttribute('aria-disabled')).toEqual('true');
  });

  it('renders with default type as "smileyIcons"', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(await element.getProperty('type')).toBe('smileys');
  });

  it('renders with type as "thumbIcons" when set', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="thumbs"></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(await element.getProperty('type')).toBe('thumbs');
  });
});

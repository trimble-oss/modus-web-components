import { newE2EPage } from '@stencil/core/testing';

describe('modus-sentiment-scale', () => {
  it('renders with default values', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale icons-type="smileys"></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with thumbs icons', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale icons-type="thumbs"></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(element).toHaveClass('hydrated');
  });

  it('emits sentimentSelection event on sentiment click', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale icons-type="smileys"></modus-sentiment-scale>');

    const sentimentSelection = await page.spyOnEvent('sentimentSelection');
    const element = await page.find('modus-sentiment-scale >>> .sentiment-scale-container .icon-container');

    await element.click();
    await page.waitForChanges();

    expect(sentimentSelection).toHaveReceivedEventDetail('smiley-dissatisfied');
  });

  it('does not emit sentimentSelection event on disabled sentiment click', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale icons-type="smileys" disabled></modus-sentiment-scale>');

    const sentimentSelection = await page.spyOnEvent('sentimentSelection');
    const element = await page.find('modus-sentiment-scale >>> .sentiment-scale-container .icon-container');

    await element.click();
    await page.waitForChanges();

    expect(sentimentSelection).not.toHaveReceivedEvent();
  });
  it('renders with disabled property set to true', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale disabled></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(await element.getProperty('disabled')).toBe(true);
  });
  it('renders with disabled property set to false', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(await element.getProperty('disabled')).toBe(false);
  });

  it('renders with default type as "smileyIcons"', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(await element.getProperty('type')).toBe('smileys');
  });

  it('renders with iconsType as "thumbIcons" when set', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-sentiment-scale type="thumbs"></modus-sentiment-scale>');

    const element = await page.find('modus-sentiment-scale');
    expect(await element.getProperty('type')).toBe('thumbs');
  });
});

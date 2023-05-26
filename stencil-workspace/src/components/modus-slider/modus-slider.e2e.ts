import { newE2EPage } from '@stencil/core/testing';

describe('modus-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-slider></modus-slider>');
    const element = await page.find('modus-slider');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-slider></modus-slider>');
    const slider = await page.find('modus-slider');
    expect(await slider.getProperty('disabled')).toBeFalsy();

    slider.setProperty('disabled', 'true');
    await page.waitForChanges();
    expect(await slider.getProperty('disabled')).toBeTruthy();

    const shadowContainer = await page.find('modus-slider >>> .modus-slider');
    expect(await shadowContainer.classList.contains('disabled'));
  });

  it('renders changes to minValue', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-slider></modus-slider>');
    const slider = await page.find('modus-slider');
    expect(await slider.getProperty('minValue')).toEqual(0);

    slider.setProperty('minValue', 10);
    await page.waitForChanges();
    expect(await slider.getProperty('minValue')).toEqual(10);
  });

  it('renders changes to maxValue', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-slider></modus-slider>');
    const slider = await page.find('modus-slider');
    expect(await slider.getProperty('maxValue')).toEqual(100);

    slider.setProperty('maxValue', 10);
    await page.waitForChanges();
    expect(await slider.getProperty('maxValue')).toEqual(10);
  });

  it('renders changes to label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-slider></modus-slider>');

    const slider = await page.find('modus-slider');
    slider.setProperty('label', 'Hello Label');
    await page.waitForChanges();

    const label = await page.find('modus-slider >>> label');
    expect(label.textContent).toEqual('Hello Label');
  });

  it('renders changes to value', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-slider></modus-slider>');

    const slider = await page.find('modus-slider');
    slider.setProperty('value', 50);
    await page.waitForChanges();

    expect(await slider.getProperty('value')).toEqual('50');
  });
});

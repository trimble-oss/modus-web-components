import { newE2EPage } from '@stencil/core/testing';

describe('modus-chip', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip></modus-chip>');
    const element = await page.find('modus-chip');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to chip style', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip></modus-chip>');
    const chip = await page.find('modus-chip');
    expect(await chip.getProperty('chipStyle')).toEqual('solid');

    chip.setProperty('chipStyle', 'outline');
    await page.waitForChanges();
    expect(await chip.getProperty('chipStyle')).toEqual('outline');

    const shadowContainer = await page.find('modus-chip >>> .modus-chip');
    expect(await shadowContainer.classList.contains('style-outline'));
  });

  it('renders changes to disabled', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip></modus-chip>');
    const chip = await page.find('modus-chip');
    expect(await chip.getProperty('disabled')).toBeFalsy();

    chip.setProperty('disabled', 'true');
    await page.waitForChanges();
    expect(await chip.getProperty('disabled')).toBeTruthy();

    const shadowContainer = await page.find('modus-chip >>> .modus-chip');
    expect(await shadowContainer.classList.contains('disabled'));
  });

  it('renders changes to hasError', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip></modus-chip>');
    const chip = await page.find('modus-chip');
    expect(await chip.getProperty('hasError')).toBeFalsy();

    chip.setProperty('hasError', 'true');
    await page.waitForChanges();
    expect(await chip.getProperty('hasError')).toBeTruthy();

    const shadowContainer = await page.find('modus-chip >>> .modus-chip');
    expect(await shadowContainer.classList.contains('has-error'));
  });

  it('renders changes to imageUrl', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip show-checkmark></modus-chip>');
    const chip = await page.find('modus-chip');
    expect(await chip.getProperty('imageUrl')).toBeFalsy();

    chip.setProperty('imageUrl', 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');
    await page.waitForChanges();
    expect(await chip.getProperty('imageUrl')).toBeTruthy();

    const shadowImage = await page.find('modus-chip >>> img');
    expect(shadowImage).not.toBeNull();

    const shadowIconCheck = await page.find('modus-chip >>> .icon-check');
    expect(shadowIconCheck).toBeNull();
  });

  it('renders changes to show checkmark', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip></modus-chip>');
    const chip = await page.find('modus-chip');
    expect(await chip.getProperty('showCheckmark')).toBeFalsy();

    chip.setProperty('showCheckmark', 'true');
    await page.waitForChanges();
    expect(await chip.getProperty('showCheckmark')).toBeTruthy();

    const shadowIconCheck = await page.find('modus-chip >>> .icon-check');
    expect(shadowIconCheck).not.toBeNull();
  });

  it('renders changes to show close', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip></modus-chip>');
    const chip = await page.find('modus-chip');
    expect(await chip.getProperty('showClose')).toBeFalsy();

    chip.setProperty('showClose', 'true');
    await page.waitForChanges();
    expect(await chip.getProperty('showClose')).toBeTruthy();

    const shadowIconRemove = await page.find('modus-chip >>> .icon-remove');
    expect(shadowIconRemove).not.toBeNull();
  });

  it('renders changes to size', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip></modus-chip>');
    const chip = await page.find('modus-chip');
    expect(await chip.getProperty('size')).toEqual('medium');

    chip.setProperty('size', 'small');
    await page.waitForChanges();
    expect(await chip.getProperty('size')).toEqual('small');

    const shadowContainer = await page.find('modus-chip >>> .modus-chip');
    expect(await shadowContainer.classList.contains('small'));
  });

  it('renders changes to value', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip></modus-chip>');
    const chip = await page.find('modus-chip');
    expect(await chip.getProperty('value')).toBeFalsy();

    chip.setProperty('value', 'Hello');
    await page.waitForChanges();
    expect(await chip.getProperty('value')).toEqual('Hello');

    const shadowValue = await page.find('modus-chip >>> span');
    expect(await shadowValue.textContent).toEqual('Hello');
  });

  it('emits chip click event on chip click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip></modus-chip>');
    const chipClick = await page.spyOnEvent('chipClick');
    const shadowContainer = await page.find('modus-chip >>> .modus-chip');
    await page.waitForChanges();

    await shadowContainer.click();
    await page.waitForChanges();
    expect(chipClick).toHaveReceivedEvent();
  });

  it('emits close click event on close icon click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-chip show-close></modus-chip>');
    const closeClick = await page.spyOnEvent('closeClick');
    const chipClick = await page.spyOnEvent('chipClick');
    const shadowCloseIcon = await page.find('modus-chip >>> .icon-remove');
    await page.waitForChanges();

    await shadowCloseIcon.click();
    await page.waitForChanges();
    expect(chipClick).not.toHaveReceivedEvent();
    expect(closeClick).toHaveReceivedEvent();
  });
});

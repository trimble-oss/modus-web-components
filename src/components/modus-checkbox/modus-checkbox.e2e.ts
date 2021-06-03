import { newE2EPage } from '@stencil/core/testing';

describe('modus-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-checkbox></modus-checkbox>');

    const element = await page.find('modus-checkbox');
    expect(element).toHaveClass('hydrated');
  });

  it('renders defaults with no label rendered', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');

    const label = await page.find('modus-checkbox >>> label');
    expect(label).toBeNull();
  });

  it('renders changes to the size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const component = await page.find('modus-checkbox');
    const element = await page.find('modus-checkbox >>> .container');
    expect(element).toHaveClass('medium');

    component.setProperty('size', 'small');
    await page.waitForChanges();
    expect(element).toHaveClass('small');
  });

  it('renders changes to the label', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const component = await page.find('modus-checkbox');

    component.setProperty('label', 'Hello, world!');
    await page.waitForChanges();

    // Having issues selecting this label since >>> cannot be used twice in a row
    // https://stackoverflow.com/questions/60804053/stenciljs-e2e-testing-how-to-find-a-child-of-a-child-in-the-shadow-dom
    // Might be able to use component.find instead of page.find
    const label = await page.find('modus-checkbox >>> .container >>> label');
    expect(label.textContent).toBe('Hello, world!');
  });

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-checkbox></modus-checkbox>');
    const component = await page.find('modus-checkbox');

    component.setProperty('disabled', 'true');
    await page.waitForChanges();

    // Having issues selecting this label since >>> cannot be used twice in a row
    // https://stackoverflow.com/questions/60804053/stenciljs-e2e-testing-how-to-find-a-child-of-a-child-in-the-shadow-dom
    // Might be able to use component.find instead of page.find
    const label = await page.find('modus-checkbox >>> .container >>> label');
    expect(label).toHaveClass('disabled');
  });
});

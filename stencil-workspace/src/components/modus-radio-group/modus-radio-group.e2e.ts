import { newE2EPage } from '@stencil/core/testing';
import { RadioButton } from './modus-radio-group';

describe('modus-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-radio-group></modus-radio-group>');
    const element = await page.find('modus-radio-group');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to radio buttons', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-radio-group></modus-radio-group>');
    const component = await page.find('modus-radio-group');
    let elements = await page.findAll('modus-radio-group >>> .modus-radio-button');
    expect(elements.length).toEqual(0);

    const radioButtons = [
      { id: '1', label: 'Option 1' },
      { id: '2', label: 'Option 2' },
      { id: '3', label: 'Option 3' },
    ];
    component.setProperty('radioButtons', radioButtons);
    await page.waitForChanges();
    elements = await page.findAll('modus-radio-group >>> .modus-radio-button');
    expect(elements.length).toEqual(3);
  });

  it('renders changes to name', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-radio-group></modus-radio-group>');
    const component = await page.find('modus-radio-group');
    const radioButtons = [
      { id: '1', label: 'Option 1' },
      { id: '2', label: 'Option 2', checked: true },
      { id: '3', label: 'Option 3' },
    ];
    component.setProperty('radioButtons', radioButtons);
    component.setProperty('name', 'Some group');
    await page.waitForChanges();

    const elements = await page.findAll('modus-radio-group >>> .modus-radio-button input');

    expect(await elements[0].getProperty('name')).toEqual('Some group');
    expect(await elements[1].getProperty('name')).toEqual('Some group');
    expect(await elements[2].getProperty('name')).toEqual('Some group');
  });

  it('renders changes to radioButton props', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-radio-group></modus-radio-group>');
    let component = await page.find('modus-radio-group');
    let radioButtons: RadioButton[] = [{ id: '1', label: 'Option 1' }];
    component.setProperty('radioButtons', radioButtons);
    await page.waitForChanges();

    let inputs = await page.findAll('modus-radio-group >>> .modus-radio-button input');
    expect(await inputs[0].getProperty('checked')).toBeFalsy();
    expect(await inputs[0].getProperty('disabled')).toBeFalsy();

    radioButtons = [{ id: '2', label: 'Option 2', checked: true, disabled: true }];
    component.setProperty('radioButtons', radioButtons);
    await page.waitForChanges();

    inputs = await page.findAll('modus-radio-group >>> .modus-radio-button input');
    expect(await inputs[0].getProperty('checked')).toBeTruthy();
    expect(await inputs[0].getProperty('disabled')).toBeTruthy();
  });

  it('renders changes to checkedId', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-radio-group></modus-radio-group>');
    let component = await page.find('modus-radio-group');
    let radioButtons: RadioButton[] = [
      { id: '1', label: 'Option 1', checked: true },
      { id: '2', label: 'Option 2' },
    ];
    component.setProperty('radioButtons', radioButtons);
    await page.waitForChanges();

    let inputs = await page.findAll('modus-radio-group >>> .modus-radio-button input');
    expect(inputs[0].getProperty('checked')).toBeTruthy();

    component.setProperty('checkedId', '2');
    await page.waitForChanges();

    inputs = await page.findAll('modus-radio-group >>> .modus-radio-button input');
    expect(inputs[1].getProperty('checked')).toBeTruthy();
  });

  it('emits buttonClick event on button click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-radio-group></modus-radio-group>');
    const component = await page.find('modus-radio-group');
    const radioButtons = [
      { id: '1', label: 'Option 1' },
      { id: '2', label: 'Option 2', checked: true },
      { id: '3', label: 'Option 3' },
    ];
    component.setProperty('radioButtons', radioButtons);
    await page.waitForChanges();

    const buttonClick = await page.spyOnEvent('buttonClick');

    const elements = await page.findAll('modus-radio-group >>> .modus-radio-button');
    await elements[0].click();

    expect(buttonClick).toHaveReceivedEvent();
    expect(buttonClick).toHaveReceivedEventDetail('1');
  });
});

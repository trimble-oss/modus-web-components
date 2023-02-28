import { newSpecPage } from '@stencil/core/testing';
import { ModusTimePicker } from './modus-time-picker';

describe('modus-time-picker', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [ModusTimePicker],
      html: '<modus-time-picker></modus-time-picker>',
    });
    expect(page.root).toEqualHtml(`
    <modus-time-picker>
      <mock:shadow-root>
        <div class="modus-time-picker">
            <div class="time-input-wrapper">
              <div class="input-container medium"><input id="time-input" inputmode="text" tabindex="0"  maxlength="5" type="text"></div>
            </div>
            <div class="time-zone-wrapper">
              <slot name="timeZone"></slot>
            </div>
        </div>
      </mock:shadow-root>
  </modus-time-picker>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusTimeInput = new ModusTimePicker();
    const className = modusTimeInput.classBySize.get(modusTimeInput.size);
    expect(className).toEqual('medium');
  });

  it('should default to enabled', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.disabled).toBeFalsy();
  });

  it('should default to no error text', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.errorText).toBeFalsy();
  });

  it('should default to no valid text', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.validText).toBeFalsy();
  });

  it('should default to no helper text', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.helperText).toBeFalsy();
  });

  it('should default to size medium', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.size).toEqual('medium');
  });

  it('should default with no label', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.label).toBeFalsy();
  });

  it('should default with no placeholder', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.placeholder).toBeFalsy();
  });

  it('should default to not required', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.required).toBeFalsy();
  });

  it('should default with no value', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.value).toBeFalsy();
  });

  it('should default with no ampm set true', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.ampm).toBeFalsy();
  });

  it('should default with no min set', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.min).toBeFalsy();
  });

  it('should default with no max set', async () => {
    const modusTimeInput = new ModusTimePicker();
    expect(modusTimeInput.max).toBeFalsy();
  });
});

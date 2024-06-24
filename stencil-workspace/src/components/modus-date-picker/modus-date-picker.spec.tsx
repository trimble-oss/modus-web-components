import { newSpecPage } from '@stencil/core/testing';
import { ModusDatePicker } from './modus-date-picker';

describe('modus-date-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusDatePicker],
      html: `<modus-date-picker label="Date range:" >
        <modus-date-input show-calendar-icon label="Start" type="start" ></modus-date-input>
        <modus-date-input show-calendar-icon label="End" type="end" ></modus-date-input>
    </modus-date-picker>`,
    });
    expect(page.root).toEqualHtml(`
   <modus-date-picker label="Date range:">
    <mock:shadow-root>
     <div class="modus-date-picker">
       <div class="label-container">
         <label>
           Date range:
         </label>
       </div>
       <div class="date-inputs" part="date-inputs">
         <slot></slot>
       </div>
       <div style="display: inline-flex;"></div>
     </div>
   </mock:shadow-root>
   <modus-date-input label="Start" show-calendar-icon="" type="start"></modus-date-input>
   <modus-date-input label="End" show-calendar-icon="" type="end"></modus-date-input>
  </modus-date-picker>
    `);
  });
});

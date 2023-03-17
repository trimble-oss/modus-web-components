import { newSpecPage } from '@stencil/core/testing';
import { ModusDateInput } from './modus-date-input';

describe('modus-date-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusDateInput],
      html: '<modus-date-input label="Single Date"></modus-date-input>',
    });
    expect(page.root).toEqualHtml(`
     <modus-date-input label="Single Date">
       <mock:shadow-root>
         <div class="modus-date-input">
           <div class="label-container">
             <label htmlFor="date-input">
               Single Date
             </label>
           </div>
           <div class="input-container medium">
             <input id="date-input" inputmode="text" maxlength="10" tabindex="0" type="text">
           </div>
           <div class="sub-text">
           </div>
         </div>
    `);
  });
});

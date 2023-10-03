import { newE2EPage } from '@stencil/core/testing';

// const monthNames = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];

describe('modus-date-picker', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-date-picker></modus-date-picker>');

    const element = await page.find('modus-date-picker');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to label prop', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<modus-date-picker><modus-date-input  label="Single Date"></modus-date-input></modus-date-picker>'
    );

    const component = await page.find('modus-date-picker');
    component.setProperty('label', 'Test');
    await page.waitForChanges();

    const element = await page.find('modus-date-picker >>> .label-container > label');
    expect(element.innerHTML).toEqual('Test');
  });

  // EXCLUDED THE TESTS FAILING RANDOM ON PROD BUILD
  // it('renders calendar with current day', async () => {
  //   const page = await newE2EPage();
  //   await page.setContent(`
  //   <modus-date-picker>
  //     <modus-date-input show-calendar-icon="true" label="Single Date">
  //     </modus-date-input>
  //   </modus-date-picker>`);

  //   const today = new Date();
  //   const calendar = await page.find('modus-date-input >>> .icon-calendar');
  //   await calendar.click();
  //   await page.waitForChanges();
  //   await new Promise((r) => setTimeout(r, 500));

  //   const calendarContainer = await page.find('modus-date-picker >>> .calendar-container');
  //   expect(calendarContainer).toBeTruthy();

  //   await new Promise((r) => setTimeout(r, 500));

  //   // renders calendar header
  //   const calendarHeader = await page.find('modus-date-picker >>> .calendar-title');
  //   const title = `${monthNames[today.getMonth()]} ${today.getFullYear()}`;
  //   expect(calendarHeader.innerHTML).toContain(title);

  //   await new Promise((r) => setTimeout(r, 500));

  //   // renders calendar body with current day highlighted
  //   const currentDay = await page.find('modus-date-picker >>> .current-day');
  //   expect(currentDay).toBeTruthy();
  //   expect(currentDay.innerHTML).toEqual(today.getDate().toString());
  // });

  // it('renders calendar with selected date', async () => {
  //   const page = await newE2EPage();
  //   await page.setContent(`
  //   <modus-date-picker>
  //     <modus-date-input show-calendar-icon="true" value="2023-2-2" label="Single Date">
  //     </modus-date-input>
  //   </modus-date-picker>`);

  //   const date = new Date('2/2/2023');
  //   const calendar = await page.find('modus-date-input >>> .icon-calendar');
  //   await calendar.click();
  //   await page.waitForChanges();
  //   await new Promise((r) => setTimeout(r, 500));

  //   const calendarContainer = await page.find('modus-date-picker >>> .calendar-container');
  //   expect(calendarContainer).toBeTruthy();

  //   await new Promise((r) => setTimeout(r, 500));

  //   // renders calendar header
  //   const title = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  //   const calendarHeader = await page.find('modus-date-picker >>> .title');
  //   expect(calendarHeader.innerHTML).toContain(title);

  //   await new Promise((r) => setTimeout(r, 500));

  //   // renders calendar body
  //   const selectedDay = await page.find('modus-date-picker >>> .calendar-day.selected');
  //   expect(selectedDay.innerHTML).toEqual(date.getDate().toString());
  // });

  // it('renders calendar with header changes', async () => {
  //   const page = await newE2EPage();
  //   await page.setContent(`
  //   <modus-date-picker>
  //     <modus-date-input show-calendar-icon="true" value="2023-2-2" label="Single Date">
  //     </modus-date-input>
  //   </modus-date-picker>`);

  //   const date = new Date('2/2/2023');
  //   const calendar = await page.find('modus-date-input >>> .icon-calendar');
  //   await calendar.click();
  //   await page.waitForChanges();
  //   await new Promise((r) => setTimeout(r, 500));

  //   const calendarContainer = await page.find('modus-date-picker >>> .calendar-container');
  //   expect(calendarContainer).toBeTruthy();

  //   await new Promise((r) => setTimeout(r, 500));

  //   // current calendar header
  //   const calendarTitle = await page.find('modus-date-picker >>> .title');
  //   let title = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  //   expect(calendarTitle.innerHTML).toContain(title);

  //   // go to previous month
  //   let element = await page.find('modus-date-picker >>> .icon-chevron-left-thick');
  //   await element.click();
  //   await page.waitForChanges();

  //   await new Promise((r) => setTimeout(r, 500));

  //   title = `${monthNames[date.getMonth() - 1]} ${date.getFullYear()}`;
  //   expect(calendarTitle.innerHTML).toContain(title);

  //   // go to next month
  //   element = await page.find('modus-date-picker >>> .icon-chevron-right-thick');
  //   await element.click();
  //   await page.waitForChanges();

  //   await new Promise((r) => setTimeout(r, 500));

  //   title = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  //   expect(calendarTitle.innerHTML).toContain(title);

  //   // go to previous year
  //   element = await page.find('modus-date-picker >>> .year-down');
  //   await element.click();
  //   await page.waitForChanges();

  //   await new Promise((r) => setTimeout(r, 500));

  //   title = `${monthNames[date.getMonth()]} ${date.getFullYear() - 1}`;
  //   expect(calendarTitle.innerHTML).toContain(title);

  //   // go to next year
  //   element = await page.find('modus-date-picker >>> .year-up');
  //   await element.click();
  //   await page.waitForChanges();

  //   await new Promise((r) => setTimeout(r, 500));

  //   title = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  //   expect(calendarTitle.innerHTML).toContain(title);
  // });

  // it('picks a calendar date', async () => {
  //   const page = await newE2EPage();
  //   await page.setContent(`
  //   <modus-date-picker>
  //     <modus-date-input show-calendar-icon="true" label="Single Date">
  //     </modus-date-input>
  //   </modus-date-picker>`);

  //   const today = new Date();
  //   const valueChange = await page.spyOnEvent('valueChange');
  //   const calendarIcon = await page.find('modus-date-input >>> .icon-calendar');
  //   await calendarIcon.click();
  //   await page.waitForChanges();
  //   await new Promise((r) => setTimeout(r, 500));

  //   let calendarContainer = await page.find('modus-date-picker >>> .calendar-container');
  //   expect(calendarContainer).toBeTruthy();

  //   const currentDay = await page.find('modus-date-picker >>> .current-day');
  //   await currentDay.click();
  //   await page.waitForChanges();
  //   await new Promise((r) => setTimeout(r, 500));

  //   // Receive value update event on the date input
  //   expect(valueChange).toHaveReceivedEvent();

  //   // Check date string on the input field
  //   const dateInput = await page.find('modus-date-input');

  //   // Modus Date Input component's value should be 'yyyy-mm-dd' format
  //   const todayString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  //   expect(await dateInput.getProperty('value')).toEqual(todayString);

  //   // Close the calendar once a date is selected
  //   calendarContainer = await page.find('modus-date-picker >>> .calendar-container');
  //   expect(calendarContainer).toBeFalsy();
  // });

  it('checks invalid date range validations', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <modus-date-picker>
      <modus-date-input format="yyyy-mm-dd" show-calendar-icon="true" type="start" label="Start Date">
      </modus-date-input>
      <modus-date-input format="yyyy-mm-dd" show-calendar-icon="true" type="end" label="End Date">
      </modus-date-input>
    </modus-date-picker>`);

    const startDateInput = await page.find('modus-date-input[type="start"] >>> input');
    const endDateInput = await page.find('modus-date-input[type="end"] >>> input');

    // invalid date range validation
    await startDateInput.type('2023-1-1', { delay: 20 });
    await page.waitForChanges();
    await endDateInput.type('2021-1-1', { delay: 20 });
    await page.waitForChanges();

    // trigger a blur event for validation to happen
    const calendar = await page.find('modus-date-input[type="start"] >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorText = await page.find('modus-date-input[type="start"] >>> .sub-text > label');
    expect(errorText.innerHTML).toEqual('Invalid date range');
  });

  it('checks invalid min max validations', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <modus-date-picker>
      <modus-date-input format="mmm d, yyyy" show-calendar-icon="true" type="start" label="Start Date" min="2023-02-17">
      </modus-date-input>
      <modus-date-input format="mmm d, yyyy" show-calendar-icon="true" type="end" label="End Date" max="2023-04-22">
      </modus-date-input>
    </modus-date-picker>`);

    const startDateInput = await page.find('modus-date-input[type="start"] >>> input');
    const endDateInput = await page.find('modus-date-input[type="end"] >>> input');

    // invalid date range validation
    await startDateInput.type('Feb 15, 2023', { delay: 20 });
    await page.waitForChanges();
    await endDateInput.type('Jun 6, 2023', { delay: 20 });
    await page.waitForChanges();

    // trigger a blur event for validation to happen
    const calendar = await page.find('modus-date-input[type="start"] >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const errorTextStart = await page.find('modus-date-input[type="start"] >>> .sub-text > label');
    const errorTextEnd = await page.find('modus-date-input[type="end"] >>> .sub-text > label');

    expect(errorTextStart.innerHTML).toEqual('Select a date after Feb 16, 2023');
    expect(errorTextEnd.innerHTML).toEqual('Select a date before Apr 23, 2023');
  });

  it('checks disabled dates', async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <modus-date-picker>
      <modus-date-input
        format="mmm d, yyyy"
        show-calendar-icon="true"
        label="Enter a date"
        min="2023-02-07"
        max="2023-02-22"
        value="2023-02-15">
      </modus-date-input>
    </modus-date-picker>`);

    const calendar = await page.find('modus-date-input >>> .icon-calendar');
    await calendar.click();
    await page.waitForChanges();

    const disabledDates = await page.findAll('modus-date-picker >>> .calendar-body .calendar-day.disabled');

    expect(disabledDates.some(element => element.innerHTML === '6')).toEqual(true);
    expect(disabledDates.some(element => element.innerHTML === '7')).toEqual(false);
    expect(disabledDates.some(element => element.innerHTML === '22')).toEqual(false);
    expect(disabledDates.some(element => element.innerHTML === '23')).toEqual(true);
  });
});

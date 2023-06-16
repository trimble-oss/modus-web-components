import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-date-picker-examples',
  template: `
    <h3>Date Picker</h3>
    <modus-date-input
      helperText="mmm dd, yyyy"
      label="Single date"
      [allowedCharsRegex]="regex"
      format="mmm dd, yyyy"
      value="2022-12-22"></modus-date-input>
    <modus-date-picker label="Select date range">
      <modus-date-input
        type="start"
        label="Start"
        format="dd-mm-yyyy"
        helper-text="dd-mm-yyyy"
        [allowedCharsRegex]="regex"
        show-calendar-icon="true"
        value="2022-12-22"></modus-date-input>

      <modus-date-input
        type="end"
        label="End"
        format="dd-mm-yyyy"
        helper-text="dd-mm-yyyy"
        [allowedCharsRegex]="regex"
        show-calendar-icon="true"
        value="2022-12-22"></modus-date-input>
    </modus-date-picker>
  `,
})
export class ModusDatePickerExamplesComponent implements OnInit {
  regex = `[\\d,- ]`;
  constructor() {}

  ngOnInit(): void {}
}

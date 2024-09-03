import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-radio-group-examples',
  template: `
    <h3>Radio group</h3>
    <modus-radio-group checked-id="1" name="my-group" [radioButtons]="radioButtons"></modus-radio-group>
  `,
})
export class ModusRadioGroupExamplesComponent implements OnInit {
  radioButtons = [
    {
      id: '0',
      label: 'Radio 1',
    },
    {
      id: '1',
      checked: true,
      label: 'Radio 2',
    },
    {
      id: '2',
      label: 'Radio 3',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

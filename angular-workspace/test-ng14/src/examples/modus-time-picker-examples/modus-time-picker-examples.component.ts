import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-time-picker-examples',
  templateUrl: './modus-time-picker-examples.component.html',
})
export class ModusTimePickerExamplesComponent implements OnInit {
  options = [
    { display: 'Alpha Time Zone' },
    { display: 'Australian Central Daylight Time' },
    { display: 'Atlantic Daylight Time' },
  ];

  constructor() {}

  ngOnInit(): void {}
}

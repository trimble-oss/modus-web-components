import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-select-examples',
  templateUrl: './modus-select-examples.component.html',
})
export class ModusSelectExamplesComponent implements OnInit {
  options = [{ display: 'Option 1' }, { display: 'Option 2' }, { display: 'Option 3' }];
  handleChange = (event: any) => {
    const selectedValue = event.detail;
    event.target.value = selectedValue;
  };

  selectedValue = { display: 'Option 1' };

  constructor() {}

  ngOnInit(): void {}
}

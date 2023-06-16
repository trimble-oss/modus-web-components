import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-checkbox-examples',
  template: `
    <h3>Checkbox</h3>
    <modus-checkbox></modus-checkbox>
    <modus-checkbox disabled></modus-checkbox>
    <modus-checkbox label="Checkbox"></modus-checkbox>
    <modus-checkbox disabled label="Checkbox"></modus-checkbox>
    <modus-checkbox checked disabled label="Checkbox"></modus-checkbox>
    <modus-checkbox indeterminate></modus-checkbox>
  `,
})
export class ModusCheckboxExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

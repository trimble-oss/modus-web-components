import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-list-examples',
  template: `
    <h3>List</h3>
    <modus-list>
      <modus-list-item size="condensed">Condensed</modus-list-item>
      <modus-list-item selected size="condensed">Condensed & Selected</modus-list-item>
      <modus-list-item>Default</modus-list-item>
      <modus-list-item selected>Selected</modus-list-item>
      <modus-list-item disabled>Disabled</modus-list-item>
      <modus-list-item size="large">Large</modus-list-item>
      <modus-list-item selected size="large">Large & Selected</modus-list-item>
    </modus-list>
  `,
})
export class ModusListExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

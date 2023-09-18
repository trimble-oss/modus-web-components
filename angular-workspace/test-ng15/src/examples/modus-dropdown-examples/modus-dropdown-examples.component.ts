import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-dropdown-examples',
  template: `
    <h3>Dropdown</h3>
    <modus-dropdown toggle-element-id="toggleElement">
      <modus-button id="toggleElement" slot="dropdownToggle">Dropdown</modus-button>
      <modus-list slot="dropdownList">
        <modus-list-item size="condensed">Item 1</modus-list-item>
        <modus-list-item size="condensed">Item 2</modus-list-item>
        <modus-list-item size="condensed">Item 3</modus-list-item>
      </modus-list>
    </modus-dropdown>
  `,
})
export class ModusDropdownExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

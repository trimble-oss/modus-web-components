import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-autocomplete-examples',
  template: `
    <h3>Autocomplete</h3>
    <div style="width: 500px">
      <modus-autocomplete
        id="default"
        label="Default Autocomplete"
        placeholder="Search..."
        [options]="basicOptions"></modus-autocomplete>

      <modus-autocomplete
        id="with-option"
        label="Autocomplete using option model"
        placeholder="Search..."
        [options]="complexOptions"></modus-autocomplete>

      <modus-autocomplete label="Employee Search" clearable placeholder="Search...">
        <li data-search-value="The Git Guru" data-id="1" style="padding: 8px">
          <div style="font-weight: bold">The Git Guru</div>
          <div style="font-size: 12px">Lead DevOps Engineer</div>
        </li>
        <li data-search-value="Bob the Builder" data-id="2" style="padding: 8px">
          <div style="font-weight: bold">Bob the Builder</div>
          <div style="font-size: 12px">Senior Construction Engineer</div>
        </li>
      </modus-autocomplete>
    </div>
  `,
})
export class ModusAutocompleteExamplesComponent implements OnInit {
  basicOptions = ['Apple', 'Banana', 'Orange'];
  complexOptions = [
    { id: '0', value: 'Apple' },
    { id: '1', value: 'Banana' },
    { id: '2', value: 'Orange' },
  ];
  constructor() {}

  ngOnInit(): void {}
}

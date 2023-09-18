import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-data-table-examples',
  template: `
    <h3>Data Table</h3>
    <div style="width: 500px">
      <modus-data-table [columns]="columns" [data]="data"></modus-data-table>
    </div>
  `,
})
export class ModusDataTableExamplesComponent implements OnInit {
  columns = ['Name', 'Age', 'Contacted'];
  data = [
    ['John', 25, false],
    ['Jane', 26, false],
    ['Joe', 27, true],
  ];
  constructor() {}

  ngOnInit(): void {}
}

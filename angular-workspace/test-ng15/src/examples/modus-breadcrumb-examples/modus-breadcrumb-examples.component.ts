import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-breadcrumb-examples',
  template: `
    <h3>Breadcrumbs</h3>
    <modus-breadcrumb [crumbs]="crumbs"></modus-breadcrumb>
  `,
})
export class ModusBreadcrumbExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  crumbs = [
    { id: '1', display: 'Crumb 1' },
    { id: '2', display: 'Crumb 2' },
    { id: '3', display: 'Crumb 3' },
    { id: '4', display: 'Crumb 4' },
  ];
}

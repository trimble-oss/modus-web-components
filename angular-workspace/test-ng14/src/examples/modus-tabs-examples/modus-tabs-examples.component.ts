import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-tabs-examples',
  template: ` <h3>Tabs</h3>
    <div style="display: flex; flex-direction:column; ">
      <modus-tabs [tabs]="tabs"></modus-tabs>
      <modus-tabs size="small" [tabs]="tabs"></modus-tabs>
    </div>`,
})
export class ModusTabsExamplesComponent implements OnInit {
  tabs = [
    {
      id: 0,
      label: 'Tab 1',
    },
    {
      active: true,
      id: 1,
      label: 'Tab 2',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

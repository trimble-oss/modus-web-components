import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-switch-examples',
  template: `
    <h3>Switch</h3>
    <div style="display: flex; flex-direction:row; gap:5px;">
      <modus-switch label="Default"></modus-switch>
      <modus-switch checked label="Checked"></modus-switch>
      <modus-switch disabled label="Disabled"></modus-switch>
    </div>
  `,
})
export class ModusSwitchExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

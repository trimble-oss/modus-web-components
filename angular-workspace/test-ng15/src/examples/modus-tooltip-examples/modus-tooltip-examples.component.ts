import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-tooltip-examples',
  template: `
    <h3>Tooltip</h3>
    <modus-tooltip text="Tooltip text..." position="right">
      <modus-button>Button</modus-button>
    </modus-tooltip>
  `,
})
export class ModusTooltipExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

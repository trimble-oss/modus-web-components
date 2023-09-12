import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-button-examples',
  template: `
    <h3>Buttons</h3>
    <div class="flex-column">
      <div class="flex-row">
        <modus-button color="primary">Primary</modus-button>
        <modus-button color="secondary">Secondary</modus-button>
        <modus-button color="tertiary">Tertiary</modus-button>
      </div>

      <div class="flex-row">
        <modus-button color="danger">Danger</modus-button>
        <modus-button disabled color="danger">Disabled</modus-button>
      </div>

      <div class="flex-row">
        <modus-button size="small" color="primary">Small</modus-button>
        <modus-button size="large" color="primary">Large</modus-button>
      </div>

      <div class="flex-row">
        <modus-button button-style="borderless">Borderless</modus-button>
      </div>

      <div class="flex-row">
        <modus-button button-style="outline" color="primary">Outline</modus-button>
        <modus-button button-style="outline" color="secondary">Outline</modus-button>
      </div>
    </div>
  `,
})
export class ModusButtonExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-spinner-examples',
  template: `
    <h3>Spinner</h3>
    <div style="display: flex; flex-direction:column; gap:20px;">
      <!-- Spinner -->
      <modus-spinner></modus-spinner>

      <modus-spinner color="secondary"></modus-spinner>

      <modus-spinner color="tertiary"></modus-spinner>

      <!-- Render in another element with different color and size -->
      <modus-button color="primary" disabled>
        <modus-spinner color="white" size=".5rem"></modus-spinner>
        &nbsp;Loading...
      </modus-button>
    </div>
  `,
})
export class ModusSpinnerExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

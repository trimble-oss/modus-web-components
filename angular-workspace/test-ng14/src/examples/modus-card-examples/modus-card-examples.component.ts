import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-card-examples',
  template: `
    <h3>Cards</h3>
    <modus-card>
      <div style="padding:10px">
        <h4 id="card-title">Card title</h4>
        <h5>Card subtitle</h5>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <modus-button color="primary">Go somewhere</modus-button>
      </div>
    </modus-card>
  `,
})
export class ModusCardExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

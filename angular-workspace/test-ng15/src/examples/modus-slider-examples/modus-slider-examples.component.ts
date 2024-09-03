import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-slider-examples',
  template: `
    <h3>Slider</h3>
    <div style="display: flex; flex-direction:column; gap:20px; ">
      <modus-slider label="Slider"></modus-slider>
      <modus-slider disabled label="Disabled slider"></modus-slider>
    </div>
  `,
})
export class ModusSliderExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

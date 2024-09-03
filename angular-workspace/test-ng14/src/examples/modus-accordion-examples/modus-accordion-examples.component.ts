import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-accordion-examples',
  template: `
    <h3>Accordions</h3>
    <div class="flex-column">
      <modus-accordion>
        <modus-accordion-item header-text="Item 1">Content</modus-accordion-item>
        <modus-accordion-item header-text="Item 2">Content</modus-accordion-item>
        <modus-accordion-item disabled header-text="Item 3">Content</modus-accordion-item>
      </modus-accordion>

      <modus-accordion>
        <modus-accordion-item header-text="Item 1" size="condensed">Content</modus-accordion-item>
        <modus-accordion-item header-text="Item 2" size="condensed">Content</modus-accordion-item>
        <modus-accordion-item disabled expanded header-text="Item 3" size="condensed">Content</modus-accordion-item>
      </modus-accordion>
    </div>
  `,
})
export class ModusAccordionExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

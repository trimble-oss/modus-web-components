import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-chip-examples',
  template: `
    <h3>Chips</h3>
    <modus-chip image-url="https://example.com/image.jpg" show-close value="Bryan"></modus-chip>
    <modus-chip has-error image-url="https://example.com/image.jpg" show-close value="Bryan"></modus-chip>
    <modus-chip disabled image-url="https://example.com/image.jpg" show-close value="Bryan"></modus-chip>

    <modus-chip image-url="https://example.com/image.jpg" show-close chip-style="outline" value="Bryan"></modus-chip>
    <modus-chip
      has-error
      image-url="https://example.com/image.jpg"
      show-close
      chip-style="outline"
      value="Bryan"></modus-chip>
    <modus-chip
      disabled
      image-url="https://example.com/image.jpg"
      show-close
      chip-style="outline"
      value="Bryan"></modus-chip>

    <modus-chip show-checkmark size="small" value="Pets OK"></modus-chip>
  `,
})
export class ModusChipExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

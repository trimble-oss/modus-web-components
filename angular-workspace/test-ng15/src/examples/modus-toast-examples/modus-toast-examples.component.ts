import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-toast-examples',
  template: ` <h3>Toasts</h3>
    <div style="display: flex; flex-direction:column; gap:20px;">
      <modus-toast type="default">Default</modus-toast>
      <modus-toast type="danger">Danger</modus-toast>
      <modus-toast type="dark">Dark</modus-toast>
      <modus-toast type="primary">Primary</modus-toast>
      <modus-toast type="secondary">Secondary</modus-toast>
      <modus-toast type="success">Success</modus-toast>
      <modus-toast type="warning">Warning</modus-toast>
    </div>`,
})
export class ModusToastExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

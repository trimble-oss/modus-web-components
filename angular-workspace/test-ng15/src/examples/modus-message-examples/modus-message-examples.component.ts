import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-message-examples',
  template: `
    <h3>Messages</h3>
    <div class="flex-column">
      <modus-message type="info">Info message.</modus-message>
      <modus-message type="question">Question message?</modus-message>
    </div>
  `,
})
export class ModusMessageExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

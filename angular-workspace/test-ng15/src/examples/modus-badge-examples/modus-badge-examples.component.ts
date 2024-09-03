import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-badge-examples',
  template: `
    <h3>Badges</h3>
    <div class="flex-column">
      <div class="flex-row">
        <modus-badge>Default</modus-badge>
        <modus-badge color="secondary">Secondary</modus-badge>
        <modus-badge color="tertiary">Tertiary</modus-badge>
        <modus-badge color="dark">Dark</modus-badge>
        <modus-badge color="warning">Warning</modus-badge>
        <modus-badge color="danger">Danger</modus-badge>
      </div>

      <div class="flex-row">
        <modus-badge size="small">Small</modus-badge>
        <modus-badge size="medium">Medium</modus-badge>
        <modus-badge size="large">Large</modus-badge>
      </div>

      <div class="flex-row">
        <modus-badge type="counter">Counter</modus-badge>
        <modus-badge color="secondary" type="counter">Counter</modus-badge>
        <modus-badge color="tertiary" type="counter">Counter</modus-badge>
        <modus-badge color="dark" type="counter">Counter</modus-badge>
        <modus-badge color="warning" type="counter">Counter</modus-badge>
        <modus-badge color="danger" type="counter">Counter</modus-badge>
      </div>

      <div class="flex-row">
        <modus-badge size="small" type="counter">Small</modus-badge>
        <modus-badge size="medium" type="counter">Medium</modus-badge>
        <modus-badge size="large" type="counter">Large</modus-badge>
      </div>

      <div class="flex-row">
        <modus-badge type="text">Primary</modus-badge>
        <modus-badge color="secondary" type="text">Secondary</modus-badge>
        <modus-badge color="dark" type="text">High Contrast</modus-badge>
        <modus-badge color="success" type="text">Success</modus-badge>
        <modus-badge color="danger" type="text">Danger</modus-badge>
      </div>

      <div class="flex-row">
        <modus-badge size="small" type="text">Small</modus-badge>
        <modus-badge size="medium" type="text">Medium</modus-badge>
        <modus-badge size="large" type="text">Large</modus-badge>
      </div>
    </div>
  `,
})
export class ModusBadgeExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

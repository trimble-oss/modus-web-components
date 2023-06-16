import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-alert-examples',
  template: `
    <h3>Alerts</h3>
    <div class="flex-column">
      <modus-alert message="Info alert (default)"></modus-alert>
      <modus-alert dismissible message="Dismissible alert"></modus-alert>
      <modus-alert message="Error alert" type="error"></modus-alert>
      <modus-alert message="Info gray alert" type="info-gray"></modus-alert>
      <modus-alert message="Info gray dark alert" type="info-gray-dark"></modus-alert>
      <modus-alert message="Success alert" type="success"></modus-alert>
      <modus-alert message="Warning alert" type="warning"></modus-alert>
    </div>
  `,
})
export class ModusAlertExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

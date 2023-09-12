import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-modal-examples',
  template: `
    <h3>Modal</h3>
    <modus-button id="btn-modal" color="primary" (buttonClick)="handleButtonClick($event)">Open modal</modus-button>
    <modus-modal
      header-text="Modal title"
      primary-button-text="Save changes"
      secondary-button-text="Sweet!"
      primary-button-aria-label="Save changes"
      secondary-button-aria-label="Sweet"
      [primaryButtonDisabled]="disableButton">
      <p>Woo-hoo, you're reading this text in a modal!</p>
    </modus-modal>
  `,
})
export class ModusModalExamplesComponent implements OnInit {
  disableButton = false;
  openModal = false;
  handleButtonClick = (e: any) => {
    this.openModal = true;
    this.disableButton = true;
  };
  constructor() {}

  ngOnInit(): void {}
}

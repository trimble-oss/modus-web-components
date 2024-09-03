import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-file-dropzone-examples',
  template: `
    <h3>File Upload Dropzone</h3>
    <modus-file-dropzone
      aria-Label="dropzone"
      description="File dropzone description"
      dropzone-Height="175px"
      dropzone-Width="400px"
      label="Dropzone Label"
      multiple="false"
      (files)="handleFiles($event)">
    </modus-file-dropzone>
  `,
})
export class ModusFileDropzoneExamplesComponent implements OnInit {
  handleFiles = (event: any) => {
    const [files, error] = event.detail;
    console.log(files);
    console.log(error);
  };
  constructor() {}

  ngOnInit(): void {}
}

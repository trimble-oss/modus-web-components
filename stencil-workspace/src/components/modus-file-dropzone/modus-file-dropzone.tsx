// eslint-disable-next-line
import { Component, h, Prop, State, Event, EventEmitter, Method, Listen, Host } from '@stencil/core';
import { IconUploadCloud } from '../icons/icon-upload-cloud';
import { IconCancel } from '../icons/icon-cancel';

@Component({
  tag: 'modus-file-dropzone',
  styleUrl: 'modus-file-dropzone.scss',
  shadow: true,
})
export class ModusFileDropzone {
  @State() dropzoneFiles: Array<File> = [];
  @State() error: 'maxFileCount' | 'maxFileNameLength' | 'maxTotalFileSize' | null = null;
  @State() fileDraggedOver = false;

  /** (optional) The dropzone's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The dropzone's description text. */
  @Prop() description: string;

  /** (optional) The dropzone's height. */
  @Prop() dropzoneHeight: string;

  /** (optional) The dropzone's width. */
  @Prop() dropzoneWidth: string;

  /** (optional) Whether to include the upload icon. */
  @Prop() includeStateIcon = true;

  /** (optional) The dropzone's label text. */
  @Prop() label: string;

  /** (optional) The dropzone's max file count. */
  @Prop() maxFileCount: number;

  /** (optional) The dropzone's max file name length of each file. */
  @Prop() maxFileNameLength: number;

  /** (optional) The dropzone's max total file size. */
  @Prop() maxTotalFileSizeBytes: number;

  /** (optional) Whether multiple files can be uploaded. */
  @Prop() multiple = true;

  /** An event that fires when files have been added or removed, regardless of whether they're valid. */
  @Event() files: EventEmitter<[File[], string | null]>;

  @Listen('keydown')
  elementKeydownHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Enter':
        this.fileInput.click();
        break;
    }
  }

  /** Add a file to the dropzone. */
  @Method()
  async addFile(file: File): Promise<void> {
    this.dropzoneFiles.push(file);
    this.updateDropzoneState();

    this.files.emit([this.dropzoneFiles, this.error]);
  }

  /** Get the dropzone's error. */
  @Method()
  async getError(): Promise<string | null> {
    return this.error;
  }

  /** Get the dropzone's files. */
  @Method()
  async getFiles(): Promise<File[]> {
    return this.dropzoneFiles;
  }

  /** Remove a file from the dropzone. */
  @Method()
  async removeFile(fileName: string): Promise<void> {
    const file = this.dropzoneFiles.find((f: File) => f.name === fileName);
    const index = this.dropzoneFiles.indexOf(file);
    if (index > -1) {
      this.dropzoneFiles.splice(index, 1);
      this.dropzoneFiles = [...this.dropzoneFiles];
    }

    this.updateDropzoneState();
    this.files.emit([this.dropzoneFiles, this.error]);
  }

  errorMessageBottom: string;
  errorMessageTop: string;
  fileInput!: HTMLInputElement;

  onDragLeave = (event: DragEvent): void => {
    this.fileDraggedOver = false;
    event.preventDefault();
  };

  onDragOver = (event: DragEvent): void => {
    if (this.error) {
      return;
    }

    this.fileDraggedOver = true;
    event.preventDefault();
  };

  onDrop = (event: DragEvent): void => {
    this.fileDraggedOver = false;
    event.preventDefault();

    this.dropzoneFiles = [...this.dropzoneFiles, ...Array.from(event.dataTransfer.files)];
    this.updateDropzoneState();
    this.files.emit([this.dropzoneFiles, this.error]);

    this.fileInput.value = null;
  };

  onFileChange = (): void => {
    this.dropzoneFiles = [...this.dropzoneFiles, ...Array.from(this.fileInput.files)];
    this.updateDropzoneState();
    this.files.emit([this.dropzoneFiles, this.error]);

    this.fileInput.value = null;
  };

  openBrowse = (): void => {
    this.fileInput.click();
  };

  updateDropzoneState = (): void => {
    // Raise error if having multiple files is invalid.
    if (!this.multiple && this.dropzoneFiles.length > 1) {
      this.error = 'maxFileCount';
      this.errorMessageTop = 'Multiple files are not allowed.';
      return;
    }

    // Raise error if the max file count has been exceeded.
    if (this.maxFileCount && this.maxFileCount < this.dropzoneFiles.length) {
      this.error = 'maxFileCount';
      this.errorMessageTop = `You can only upload ${this.maxFileCount} ${this.maxFileCount > 1 ? 'files' : 'file'}.`;
      return;
    }

    // Raise error if the max file name length has been exceeded.
    if (this.dropzoneFiles.some((file) => file.name.length > this.maxFileNameLength)) {
      this.error = 'maxFileNameLength';
      this.errorMessageTop = `File name exceeds length limit: ${
        this.dropzoneFiles.find((file) => file.name.length > this.maxFileNameLength).name
      }`;
      return;
    }

    // Raise error if the max total file size has been exceeded.
    const totalFileSize = this.dropzoneFiles.reduce((total, file) => total + file.size, 0);
    if (this.maxTotalFileSizeBytes && this.maxTotalFileSizeBytes < totalFileSize) {
      this.error = 'maxTotalFileSize';
      this.errorMessageTop = 'File exceeds size limit.';
      this.errorMessageBottom = `You can only upload a total file size of ${this.maxTotalFileSizeBytes} bytes.`;
      return;
    }

    this.error = null;
    this.errorMessageTop = '';
    this.errorMessageBottom = '';
  };

  render(): unknown {
    return (
      <Host aria-label={this.ariaLabel} role="button">
        <div class="modus-file-dropzone">
          <input
            onChange={this.onFileChange}
            multiple={this.multiple}
            ref={(el) => (this.fileInput = el as HTMLInputElement)}
            type="file"
          />
          <div class="header">
            <label>{this.label}</label>
            <span>{this.description}</span>
          </div>
          <div
            class={`dropzone ${this.fileDraggedOver ? 'highlight' : null} ${this.error ? 'error' : null}`}
            onDragLeave={(e) => this.onDragLeave(e)}
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e)}
            style={{ height: this.dropzoneHeight, width: this.dropzoneWidth }}
            tabIndex={0}>
            {this.includeStateIcon && (this.error ? <IconCancel size={'36'} /> : <IconUploadCloud size={'36'} />)}
            {!this.error && (
              <div>
                Drag files here
                {!this.fileDraggedOver && (
                  <span>
                    {' '}
                    or
                    <span class="browse" onClick={this.openBrowse}>
                      {' '}
                      browse
                    </span>{' '}
                    to upload
                  </span>
                )}
                .
              </div>
            )}
            {this.error && (
              <div class="error-messages">
                {this.errorMessageTop && <span>{this.errorMessageTop}</span>}
                {this.errorMessageBottom && <span>{this.errorMessageBottom}</span>}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}

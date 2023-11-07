import { Component, Host, h, Prop, Event, EventEmitter, FunctionalComponent } from '@stencil/core';
import { IconCheck } from '../icons/icon-check';
import { IconDelete } from '../icons/icon-delete';
import { IconFolder } from '../icons/icon-folder';
import { IconPause } from '../icons/icon-pause';

interface UploadControlsProps {
  currentProgress: number;
  onPauseUpload?: () => void;
  onCancelUpload?: () => void;
}

const UploadControls: FunctionalComponent<UploadControlsProps> = (props: UploadControlsProps) =>
  props.currentProgress < 100 ? (
    <div class="controls">
      <span tabindex={0}>
        <IconPause onClick={() => props.onPauseUpload()}></IconPause>
      </span>
      <span tabindex={1}>
        <IconDelete onClick={() => props.onCancelUpload()}></IconDelete>
      </span>
    </div>
  ) : (
    <div class="controls">
      <IconCheck></IconCheck>
    </div>
  );

@Component({
  tag: 'modus-file-upload-progress',
  styleUrl: 'modus-file-upload-progress.scss',
  shadow: true,
})
export class ModusFileUploadProgress {
  @Prop() totalFiles: number;
  @Prop() filesUploaded: number;
  @Prop() currentUploadSize: string;
  @Prop() currentUploadProgress: number;
  @Prop() folderName: string;
  @Prop() backgroundColor = 'transparent';

  @Event() onPauseUpload: EventEmitter;
  @Event() onCancelUpload: EventEmitter;

  render() {
    const isFolder = this.totalFiles > 1;

    return (
      <Host>
        <article style={{ backgroundColor: this.backgroundColor }} class="modus-upload-progress-container">
          {isFolder && (
            <section class="folder-upload-header">
              <div class="file-count">
                <IconFolder></IconFolder>
                <span>
                  {this.filesUploaded} of {this.totalFiles} uploaded successfully.
                </span>
              </div>
              {this.totalFiles > 1 && <UploadControls currentProgress={this.currentUploadProgress} />}
            </section>
          )}
          <section class="progress-container">
            {!isFolder && <IconFolder size="32"></IconFolder>}
            <div class="progress">
              <div class="folder-name">
                <span> {this.folderName}</span>
                {!isFolder && <UploadControls currentProgress={this.currentUploadProgress} />}
              </div>
              <modus-progress-bar size="small" value={this.currentUploadProgress}></modus-progress-bar>
              <div class="current-progress">
                {this.currentUploadProgress}% of {this.currentUploadSize}
              </div>
            </div>
          </section>
        </article>
      </Host>
    );
  }
}

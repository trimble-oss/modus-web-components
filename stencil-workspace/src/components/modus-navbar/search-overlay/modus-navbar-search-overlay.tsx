import {
  Component,
  Event,
  EventEmitter,
  Host,
  Element,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { IconClose } from '../../icons/icon-close';

@Component({
  tag: 'modus-navbar-search-overlay',
  styleUrl: 'modus-navbar-search-overlay.scss',
})
export class ModusNavbarSearchOverlay {
  @Element() element: HTMLElement;

  /** An event that fires on clicking on close button of search overlay */
  @Event() close: EventEmitter<void>;

  /** An event that fires on search value change. */
  @Event() search: EventEmitter<string>;

  modusTextInput: HTMLModusTextInputElement;

  componentDidRender(): void {
    this.modusTextInput?.focusInput();
  }

  render() {
    return (
      <Host>
        <div class="overlay-wrapper">
          <div class="search-box">
            <modus-text-input
              placeholder="Search"
              size="large"
              clearable={true}
              onValueChange={(event: CustomEvent<string>) => this.search.emit(event.detail)}
              include-search-icon
              ref={(el) => (this.modusTextInput = el as HTMLModusTextInputElement)}></modus-text-input>
          </div>
          <div class="navbar-button" data-test-id="close-button">
            <span
              class="navbar-button-icon"
              tabIndex={0}
              onKeyDown={(event: KeyboardEvent) => event.code === 'Enter' && this.close.emit()}
              onClick={() => this.close.emit()}>
              <IconClose size="24" />
            </span>
          </div>
        </div>
      </Host>
    );
  }
}

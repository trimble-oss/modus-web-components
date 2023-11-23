import { Component, Prop, Watch, State, h, Event, EventEmitter } from '@stencil/core';
import { IconMap } from '../icons/IconMap';
import { MODUS_SENTIMENT_CONSTANTS, SMILEY_ICONS, THUMB_ICONS } from './modus-sentiment.constants';

export interface ModusSentimentScaleItem {
  key: string;
  icon: string;
  label: string;
  order: number;
}

@Component({
  tag: 'modus-sentiment-scale',
  styleUrl: 'modus-sentiment-scale.scss',
  shadow: true,
})
export class ModusSentimentScale {
  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;
  /** The type of icons to be displayed. */
  @Prop() type: typeof SMILEY_ICONS | typeof THUMB_ICONS = 'smileys';
  /** (optional) Whether the sentiment scale is disabled. */
  @Prop() disabled?: boolean = false;

  @Watch('type')
  watchTypeChange(type: string) {
    if (type) {
      if (type === MODUS_SENTIMENT_CONSTANTS.ICON_TYPES.THUMBS) {
        this.icons = MODUS_SENTIMENT_CONSTANTS.ICON_KEY.THUMBS;
      } else if (type === MODUS_SENTIMENT_CONSTANTS.ICON_TYPES.SMILEYS) {
        this.icons = MODUS_SENTIMENT_CONSTANTS.ICON_KEY.SMILEYS;
      }
    }
  }
  /** An event that fires the selected sentiment. */
  @Event() sentimentSelection: EventEmitter;

  @State() icons: string[];
  @State() selectedIcon: string;
  @State() sentimentScaleElement: HTMLDivElement;

  componentWillLoad() {
    this.watchTypeChange(this.type);
  }

  handleSentimentClick(selectedOutlineIcon: string) {
    if (!this.disabled) {
      const selectedSentiment = selectedOutlineIcon;
      this.selectedIcon = selectedSentiment;
      this.sentimentSelection.emit(this.getType(selectedOutlineIcon));
    }
  }

  handleSentimentHover(selectedOutlineIcon: string) {
    this.sentimentScaleElement
      .querySelector('.icon-' + selectedOutlineIcon)
      ?.querySelector('svg')
      .focus();
  }

  getType(icon: string) {
    if (icon != null) {
      if (icon.includes('-outlined')) {
        return icon.replace('-outlined', '');
      }
      if (icon.includes('-solid')) {
        return icon.replace('-solid', '');
      }
    }
  }
  handleKeyDown(event: KeyboardEvent, id: string) {
    if (event.code !== 'Enter') {
      return;
    }

    this.handleSentimentClick(id);
  }

  render() {
    return (
      <div class="sentiment-scale-container" ref={(el) => (this.sentimentScaleElement = el)}>
        {this.icons &&
          this.icons.map((buttonIcon: string) => {
            let ariaSelected = false;
            if (buttonIcon == this.getType(this.selectedIcon)) {
              ariaSelected = true;
              buttonIcon = buttonIcon + '-solid';
            } else {
              ariaSelected = false;
              buttonIcon = buttonIcon + '-outlined';
            }
            return (
              <div
                aria-label={this.getType(buttonIcon)}
                aria-selected={ariaSelected}
                role="button"
                tabIndex={0}
                class={`icon-container ${this.type + '-container'} ${this.disabled ? ' disabled' : ''}`}
                onClick={() => this.handleSentimentClick(buttonIcon)}
                onKeyDown={(event) => this.handleKeyDown(event, buttonIcon)}>
                <IconMap
                  icon={buttonIcon}
                  size={`${this.type === MODUS_SENTIMENT_CONSTANTS.ICON_TYPES.THUMBS ? '56' : '24'}`}></IconMap>
              </div>
            );
          })}
      </div>
    );
  }
}

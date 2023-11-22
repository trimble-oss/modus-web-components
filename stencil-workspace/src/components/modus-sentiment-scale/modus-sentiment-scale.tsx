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
  /** The type of icons to be displayed. */
  @Prop() iconsType: typeof SMILEY_ICONS | typeof THUMB_ICONS = 'smileys';
  /** (optional) Whether the sentiment scale is disabled. */
  @Prop() disabled?: boolean = false;

  @Watch('iconsType')
  watchIconTypeChange(iconType: string) {
    if (iconType) {
      if (iconType === MODUS_SENTIMENT_CONSTANTS.ICON_TYPES.THUMBS) {
        this.icons = MODUS_SENTIMENT_CONSTANTS.ICON_KEY.THUMBS;
      } else if (iconType === MODUS_SENTIMENT_CONSTANTS.ICON_TYPES.SMILEYS) {
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
    this.watchIconTypeChange(this.iconsType);
  }

  handleSentimentClick(selectedOutlineIcon: string) {
    if (!this.disabled) {
      const selectedSentiment = selectedOutlineIcon;
      this.selectedIcon = selectedSentiment;
      this.sentimentSelection.emit(this.getIconType(selectedOutlineIcon));
    }
  }

  handleSentimentHover(selectedOutlineIcon: string) {
    this.sentimentScaleElement
      .querySelector('.icon-' + selectedOutlineIcon)
      ?.querySelector('svg')
      .focus();
  }

  getIconType(icon: string) {
    if (icon != null) {
      if (icon.includes('-outlined')) {
        return icon.replace('-outlined', '');
      }
      if (icon.includes('-solid')) {
        return icon.replace('-solid', '');
      }
    }
  }

  render() {
    return (
      <div class="sentiment-scale-container" ref={(el) => (this.sentimentScaleElement = el)}>
        {this.icons &&
          this.icons.map((buttonIcon: string) => {
            buttonIcon =
              buttonIcon == this.getIconType(this.selectedIcon) ? buttonIcon + '-solid' : buttonIcon + '-outlined';
            return (
              <div
                tabIndex={0}
                class={`icon-container ${this.iconsType + '-container'} ${this.disabled ? ' disabled' : ''}`}
                onClick={() => this.handleSentimentClick(buttonIcon)}>
                <IconMap
                  icon={buttonIcon}
                  size={`${this.iconsType === MODUS_SENTIMENT_CONSTANTS.ICON_TYPES.THUMBS ? '56' : '24'}`}></IconMap>
              </div>
            );
          })}
      </div>
    );
  }
}

import { Component, Prop, Watch, State, h, Event, Listen } from '@stencil/core';
import { IconMap } from '../icons/IconMap';
import { KeyBoardEventIcon, MODUS_SENTIMENT_CONSTANTS } from './modus-sentiment.constants';
import { EventEmitter } from 'puppeteer';

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
  @Prop() iconsType: 'smileys' | 'thumbs';
  @Prop() disabled?: boolean = false;

  @State() selectedButtonIcons: string[];
  @State() unSelectedButtonIcons: string[];
  @State() selectedIcon: string;
  @State() sentimentScaleElement: HTMLDivElement;

  @Event() sentimentSelection: EventEmitter;

  @Watch('iconsType')
  watchIconTypeChange(iconType: string) {
    if (iconType) {
      if (iconType === MODUS_SENTIMENT_CONSTANTS.ICON_TYPES.THUMBS) {
        this.selectedButtonIcons = MODUS_SENTIMENT_CONSTANTS.ICON_KEY.THUMBS.OUTLINED;
        this.unSelectedButtonIcons = MODUS_SENTIMENT_CONSTANTS.ICON_KEY.THUMBS.SOLID;
      } else if (iconType === MODUS_SENTIMENT_CONSTANTS.ICON_TYPES.SMILEYS) {
        this.selectedButtonIcons = MODUS_SENTIMENT_CONSTANTS.ICON_KEY.SMILEYS.OUTLINED;
        this.unSelectedButtonIcons = MODUS_SENTIMENT_CONSTANTS.ICON_KEY.SMILEYS.SOLID;
      }
    }
  }

  componentWillLoad() {
    console.log('sentiment scale', this.iconsType);
    this.watchIconTypeChange(this.iconsType);
  }

  handleSentimentClick(selectedOutlineIcon: string) {
    if (this.selectedIcon != selectedOutlineIcon && !this.disabled) {
      this.selectedIcon = selectedOutlineIcon;
      let selectedSentiment = this.getIconName(selectedOutlineIcon);
      this.sentimentSelection.emit(selectedSentiment);
    }
  }

  handleSentimentHover(selectedOutlineIcon: string) {
    this.sentimentScaleElement
      .querySelector('.icon-' + selectedOutlineIcon)
      ?.querySelector('svg')
      .focus();
  }

  getIconName(icon: string) {
    if (icon.includes('outlined')) {
      return icon.replace('-outlined', '');
    } else {
      return null;
    }
  }

  handlePrimaryKeydown(keyDetails: KeyBoardEventIcon): void {
    switch (keyDetails.event.code) {
      case 'Enter':
        this.handleSentimentClick(keyDetails.buttonIcon);
        break;
      case 'Tab':
        this.handleSentimentHover(keyDetails.buttonIcon);
        break;
    }
  }

  render() {
    return (
      <div class="sentiment-scale-container" ref={(el) => (this.sentimentScaleElement = el)}>
        {this.selectedButtonIcons &&
          this.selectedButtonIcons.map((buttonIcon: string, index: number) => {
            buttonIcon == this.selectedIcon ? (buttonIcon = this.unSelectedButtonIcons[index]) : buttonIcon;
            return (
              <div
                tabIndex={0}
                class={`icon-container ${this.iconsType + '-container'} ${this.disabled ? ' disabled' : ''}`}
                onClick={() => this.handleSentimentClick(buttonIcon)}
                onKeyDown={(event) => this.handlePrimaryKeydown({ event, buttonIcon })}>
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

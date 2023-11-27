import { Component, Prop, Watch, State, h, Event, EventEmitter } from '@stencil/core';
import { IconMap } from '../icons/IconMap';
import {
  SMILEY_ICONS,
  THUMB_ICONS,
  MODUS_SENTIMENT_CONSTANTS_THUMB,
  MODUS_SENTIMENT_CONSTANTS_SMILEYS,
} from './modus-sentiment.constants';

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
      console.log('type', type);
      if (type === THUMB_ICONS) {
        this.labelMap = MODUS_SENTIMENT_CONSTANTS_THUMB;
      } else if (type === SMILEY_ICONS) {
        this.labelMap = MODUS_SENTIMENT_CONSTANTS_SMILEYS;
      }
    }
  }
  /** An event that fires the selected sentiment. */
  @Event() sentimentSelection: EventEmitter;

  @State() labelMap: Map<string, string>;
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
    }
  }
  handleKeyDown(event: KeyboardEvent, id: string) {
    if (event.code !== 'Enter') {
      return;
    }

    this.handleSentimentClick(id);
  }

  render() {
    const iconKeys = Array.from(this.labelMap.keys());
    return (
      <div class="sentiment-scale-container" role="group" ref={(el) => (this.sentimentScaleElement = el)}>
        {iconKeys &&
          iconKeys.map((buttonIcon: string) => {
            let ariaSelected = false;
            const isIconSelected = buttonIcon === this.getType(this.selectedIcon);
            const containerClass = `${this.type + '-container'} ${this.disabled ? ' disabled' : ''} ${
              isIconSelected ? 'selected' : ''
            }`;
            if (buttonIcon == this.getType(this.selectedIcon)) {
              ariaSelected = true;
            } else {
              ariaSelected = false;
              buttonIcon = buttonIcon + '-outlined';
            }
            return (
              <div
                aria-label={this.labelMap.get(buttonIcon)}
                aria-selected={ariaSelected}
                role="button"
                tabIndex={0}
                class={`icon-container ${containerClass}`}
                onClick={() => this.handleSentimentClick(buttonIcon)}
                onKeyDown={(event) => this.handleKeyDown(event, buttonIcon)}>
                <IconMap icon={buttonIcon} size={`${this.type === THUMB_ICONS ? '56' : '24'}`}></IconMap>
              </div>
            );
          })}
      </div>
    );
  }
}

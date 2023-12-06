import { Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';
import { IconMap } from '../icons/IconMap';
import { SMILEYS_TYPE_MAP, THUMBS_TYPE_MAP, THUMB_SENTIMENT_TYPE, SMILEY_SENTIMENT_TYPE } from './modus-sentiment.constants';
import { ModusSentimentScaleType } from './modus-sentiment-scale.models';
@Component({
  tag: 'modus-sentiment-scale',
  styleUrl: 'modus-sentiment-scale.scss',
  shadow: true,
})
export class ModusSentimentScale {
  /** (optional) Tab Index for the checkbox */
  @Prop() tabIndexValue = 0;

  /** (optional) The input's aria-label. */
  @Prop() ariaLabel: string | null;

  /** The type of icons to be displayed. */
  @Prop() type: ModusSentimentScaleType = 'smileys';

  /** (optional) Whether the sentiment scale is disabled. */
  @Prop() disabled?: boolean = false;

  /** An event that fires the selected sentiment. */
  @Event() sentimentSelection: EventEmitter;

  @State() selected: string;

  getSentimentScaleMap(): Map<string, string> {
    if (this.type === THUMB_SENTIMENT_TYPE) {
      return THUMBS_TYPE_MAP;
    } else if (this.type === SMILEY_SENTIMENT_TYPE) {
      return SMILEYS_TYPE_MAP;
    }
    return null;
  }

  handleSentimentClick(selected: string) {
    if (!this.disabled) {
      this.selected = selected;
      this.sentimentSelection.emit(selected);
    }
  }

  handleKeyDown(event: KeyboardEvent, id: string) {
    if (event.code.toUpperCase() !== 'ENTER') {
      return;
    }

    this.handleSentimentClick(id);
  }

  render() {
    const tabIndexValue = this.disabled ? -1 : this.tabIndexValue;
    const iconsMap = this.getSentimentScaleMap();

    let containerClass = `${this.type + '-container'} ${this.disabled ? ' disabled' : ''}`;
    return (
      <div class="sentiment-scale-container" role="group">
        {iconsMap &&
          Array.from(iconsMap).map(([key, value]) => {
            const isIconSelected = key === this.selected;
            let iconName = key;
            if (isIconSelected) {
              containerClass = `${containerClass} selected`;
            } else {
              iconName = `${key}-outlined`;
              containerClass = `${containerClass.replace('selected', '')} `;
            }
            return (
              <div
                aria-label={value}
                aria-selected={isIconSelected}
                role="button"
                tabIndex={tabIndexValue}
                class={containerClass}
                onClick={() => this.handleSentimentClick(key)}
                onKeyDown={(event) => this.handleKeyDown(event, key)}>
                <IconMap icon={iconName} size={`${this.type === THUMB_SENTIMENT_TYPE ? '32' : '24'}`}></IconMap>
              </div>
            );
          })}
      </div>
    );
  }
}

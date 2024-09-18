// eslint-disable-next-line
import { Component, Event, EventEmitter, Fragment, h, JSX, Prop } from '@stencil/core';
import { ModusIconMap } from '../../icons/ModusIconMap';
import { kebabCase } from '../../utils/utils';

export interface Tab {
  active?: boolean;
  iconOnly?: string;
  id: string;
  label?: string;
  leftIcon?: string;
  rightIcon?: string;
}

@Component({
  tag: 'modus-tabs',
  styleUrl: 'modus-tabs.scss',
  shadow: true,
})
export class ModusTabs {
  /* (optional) Whether the Tabs take up the full width of their parent container. */
  @Prop() fullWidth = false;

  /* (optional) The tabs' aria-label. */
  @Prop() ariaLabel: string | null;

  /* (optional) The tabs' size. */
  @Prop() size: 'medium' | 'small' = 'medium';

  /** The tabs to render. */
  @Prop({ mutable: true }) tabs: Tab[] = [];

  /** An event that fires on tab change. */
  @Event() tabChange: EventEmitter<string>;

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['small', 'small'],
  ]);

  handleKeyDown(event: KeyboardEvent, id: string): void {
    if (event.code !== 'Enter') {
      return;
    }

    this.handleTabChange(id);
  }

  handleTabChange(id: string): void {
    const activeTab = this.tabs.find((tab) => tab.active);

    if (activeTab?.id === id) {
      return;
    }

    this.tabs = this.tabs.map((tab) => {
      return { ...tab, active: tab.id === id };
    });

    this.tabChange.emit(id);
  }

  renderIconWithText(label: string, leftIcon?: string, rightIcon?: string): JSX.Element {
    return (
      <Fragment>
        {leftIcon && (
          <span class="icon left-icon">
            <ModusIconMap icon={leftIcon} size={this.size === 'small' ? '16' : '24'}></ModusIconMap>
          </span>
        )}
        <span class="label">{label}</span>
        {rightIcon && (
          <span class="icon right-icon">
            <ModusIconMap icon={rightIcon} size={this.size === 'small' ? '16' : '24'}></ModusIconMap>
          </span>
        )}
      </Fragment>
    );
  }

  renderIconOnly(iconOnly: string): JSX.Element {
    return (
      <span class="icon">
        <ModusIconMap icon={iconOnly} size={this.size === 'small' ? '16' : '24'}></ModusIconMap>
      </span>
    );
  }

  render(): unknown {
    const tabs = this.tabs.map((tab: Tab) => {
      if (!tab.id) {
        tab.id = tab?.label ? `tab-label-${kebabCase(tab.label)}` : `tab-label-${this.tabs.indexOf(tab).toString()}`;
      }

      return (
        <button
          id={`${tab.id}`}
          class={`tab ${tab.active ? 'active' : ''} ${this.classBySize.get(this.size)} ${
            this.fullWidth ? 'resizable' : ''
          } `}
          onClick={() => this.handleTabChange(tab.id)}
          onKeyDown={(event) => this.handleKeyDown(event, tab.id)}>
          {tab.iconOnly
            ? this.renderIconOnly(tab.iconOnly)
            : this.renderIconWithText(tab.label, tab.leftIcon, tab.rightIcon)}
        </button>
      );
    });

    return (
      <div aria-label={this.ariaLabel || undefined} class={`modus-tabs ${this.classBySize.get(this.size)}`}>
        {tabs}
      </div>
    );
  }
}

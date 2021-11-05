// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

export interface Tab {
    active?: boolean;
    id: string;
    label: string;
}

@Component({
  tag: 'modus-tabs',
  styleUrl: 'modus-tabs.scss',
  shadow: true,
})
export class ModusTabs {
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

  handleTabChange(id: string): void {
    if (id === this.tabs.find(tab => tab.active).id) { return; }

    this.tabs = this.tabs.map(tab => {
      return { ...tab, active: tab.id === id };
    });

    this.tabChange.emit(id);
  }

  render(): unknown {
    const tabs = this.tabs.map((tab: Tab) => {
      return (
        <div class={`tab ${tab.active ? 'active' : ''} ${this.classBySize.get(this.size)}`} onClick={() => this.handleTabChange(tab.id)}>
          {tab.label}
        </div>
      );});

    return (
      <div class={`modus-tabs ${this.classBySize.get(this.size)}`}>
        {tabs}
      </div>
    );
  }
}

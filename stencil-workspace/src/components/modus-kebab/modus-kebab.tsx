// eslint-disable-next-line
import { Component, h, Prop, Watch } from '@stencil/core';
import {  KebabOptions, KebabPosition } from './modus-kebab.interface'
@Component({
  tag: 'modus-kebab',
  styleUrl: 'modus-kebab.scss',
  shadow: true,
})
export class ModusKebab {

  private _optionsData: KebabOptions[]

  @Prop() ariaLabel: string | null

  @Prop() options: KebabOptions[] | null

  @Prop() position?: KebabPosition

  @Watch('options')
  optionsWatcher(newValue: KebabOptions[]) {
    this._optionsData = newValue;
  }

  componentWillLoad() {
    this.optionsWatcher(this.options);
  }

  render(){
    return (
    <modus-dropdown aria-label={this.ariaLabel} toggle-element-id="kebabMenu" class="kebab-menu">
        <modus-button id="kebabMenu" slot="dropdownToggle" aria-controls="kebab-control" size="small" color="secondary" icon-only="vertical-ellipsis"></modus-button>
        <modus-list class={`menu-items ${this.position}`} id="kebab-control" role="menu" slot="dropdownList">
            { this._optionsData.map(
                (option) =>  (
                <modus-list-item 
                    size="condensed"
                    class="menu-item"
                    role="menuitem"
                    tabindex="0"
                    disabled={option.disabled}
                    onClick={(event)=> {
                        if(option.func){
                            option.func(event)
                        }
                    }}
                    onKeyPress={(event)=> {
                       if(event.code === 'Enter' || event.code === 'Space' && option.func) {
                            return option.func(event);
                        }
                    }}
                >
                    {option.name}
                </modus-list-item>)
            )}
        </modus-list>
    </modus-dropdown>     
    );
  }
}

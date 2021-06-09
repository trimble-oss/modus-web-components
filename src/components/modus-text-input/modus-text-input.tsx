// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { IconSearch } from '../icons/icon-search';
import { IconClose } from '../icons/icon-close';

@Component({
  tag: 'modus-text-input',
  styleUrl: 'modus-text-input.scss',
  shadow: true,
})
export class ModusTextInput {
  /** (optional) Whether the text input has a clear button. */
  @Prop() clearable = true;

  /** (optional) Whether the text input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The text input's error text. */
  @Prop() error: string;

  /** (optional) Whether the search icon is included. */
  @Prop() includeSearchIcon: boolean;

  /** (optional) The text input label. */
  @Prop() label: string;

  /** (optional) The text input's max length. */
  @Prop() maxLength: number;

  /** The text input's minimum length. */
  @Prop() minLength: number;

  /** (optional) The text input placeholder text. */
  @Prop() placeholder: string;

  /** (optional) Whether the text input contents is read-only */
  @Prop() readOnly: boolean;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The text input value. */
  @Prop() value: string;

  /** An event that fires on text input value change. */
  @Event() valueChange: EventEmitter<string>;

  textInput: HTMLInputElement;

  handleClear(): void {
    this.textInput.value = null;
    this.value = null;
    this.valueChange.emit(null);
  }

  handleOnInput(event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }

  render(): unknown {
    const className = `modus-text-input ${this.disabled ? 'disabled' : ''}`;

    return (
      <div class={className}>
        <div class={'label-container'}>{this.label ? <label>{this.label}</label> : null}{this.required ? <span class="required">*</span> : null}</div>
        <div class={`input-container ${this.error ? 'error' : ''}`}>
          {this.includeSearchIcon ? <IconSearch /> : null}
          <input class={this.includeSearchIcon ? 'has-icon' : ''}
                 disabled={this.disabled}
                 maxlength={this.maxLength}
                 minlength={this.minLength}
                 onInput={(event) => this.handleOnInput(event)}
                 placeholder={this.placeholder}
                 readonly={this.readOnly}
                 ref={(el) => this.textInput = el as HTMLInputElement}
                 type="text"
                 value={this.value}/>
          {(this.clearable && !this.readOnly && !!this.value) ?
            <span class="icons clear">
              <IconClose onClick={() => this.handleClear()} size="16" />
            </span> :
            <span class="icons"></span>}
        </div>
        {this.error ? <label class="error">{this.error}</label> : null}
      </div>
    );
  }
}

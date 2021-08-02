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
  /** (optional) Whether the input has a clear button. */
  @Prop() clearable = true;

  /** (optional) Whether the input is disabled. */
  @Prop() disabled: boolean;

  /** (optional) The input's error state text. */
  @Prop() errorText: string;

  /** (optional) The input's helper text displayed below the input. */
  @Prop() helperText: string;

  /** (optional) Whether the search icon is included. */
  @Prop() includeSearchIcon: boolean;

  /** (optional) The input's label. */
  @Prop() label: string;

  /** (optional) The input's maximum length. */
  @Prop() maxLength: number;

  /** (optional) The input's minimum length. */
  @Prop() minLength: number;

  /** (optional) The input's placeholder text. */
  @Prop() placeholder: string;

  /** (optional) Whether the input's content is read-only */
  @Prop() readOnly: boolean;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The input's size. */
  @Prop() size: 'medium' | 'large' = 'medium';

  /** (optional) The input's valid state text. */
  @Prop() validText: string;

  /** (optional) The input's value. */
  @Prop() value: string;

  /** An event that fires on input value change. */
  @Event() valueChange: EventEmitter<string>;

  classBySize: Map<string, string> = new Map([
    ['medium', 'medium'],
    ['large', 'large']
  ]);

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
        {this.label || this.required
         ? <div class={'label-container'}>
             {this.label ? <label>{this.label}</label> : null}{this.required ? <span class="required">*</span> : null}
           </div>
         : null
        }
        <div
          class={`input-container ${this.errorText ? 'error' : this.validText ? 'valid' : ''} ${this.classBySize.get(this.size)}`}
          onClick={() => this.textInput.focus()}>
            {this.includeSearchIcon ? <IconSearch size="16" /> : null}
            <input class={`${this.includeSearchIcon ? 'has-left-icon' : ''} ${this.clearable ? 'has-right-icon' : null}`}
                   disabled={this.disabled}
                   maxlength={this.maxLength}
                   minlength={this.minLength}
                   onInput={(event) => this.handleOnInput(event)}
                   placeholder={this.placeholder}
                   readonly={this.readOnly}
                   ref={(el) => this.textInput = el as HTMLInputElement}
                   type="text"
                   value={this.value}/>
            {this.clearable && !this.readOnly && !!this.value
             ? <span class="icons clear">
                  <IconClose onClick={() => this.handleClear()} size="16" />
                </span>
             : <span class="icons"></span>
            }
        </div>
        {
          this.errorText ? <label class="sub-text error">{this.errorText}</label> :
          this.validText ? <label class="sub-text valid">{this.validText}</label> :
          this.helperText ? <label class="sub-text helper">{this.helperText}</label> :
          null
        }
      </div>
    );
  }
}

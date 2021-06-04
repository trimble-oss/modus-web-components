// eslint-disable-next-line
import { Component, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';

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

  /** (optional) The text input placeholder text. */
  @Prop() placeholder: string;

  /** (optional) Whether the input is required. */
  @Prop() required: boolean;

  /** (optional) The text input value. */
  @Prop() value: string;

  /** An event that fires on text input value change. */
  @Event() valueChange: EventEmitter<string>;

  @Watch('value')
  updateShowClear(): void {
    this.showClear = !!this.value;
  }

  @State() showClear: boolean;

  textInput: HTMLInputElement;

  connectedCallback(): void {
    this.showClear = !!this.value;
  }

  handleClear(): void {
    this.showClear = false;
    this.textInput.value = null;
    this.value = null;
  }

  handleOnInput(event: Event): void {
    const value = (event.currentTarget as HTMLInputElement).value;
    this.value = value;
    this.showClear = !!value;
    this.valueChange.emit(value);
  }

  render(): unknown {
    const className = `modus-text-input ${this.disabled ? 'disabled' : ''}`;

    return (
      <div class={className}>
        <div class={'label-container'}>{this.label ? <label>{this.label}</label> : null}{this.required ? <span class="required">*</span> : null}</div>
        <div class={`input-container ${this.error ? 'error' : ''}`}>
          {this.includeSearchIcon ?
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.37336 8.80503H10.0057L14 12.8073L12.8073 14L8.80503 10.0057V9.37336L8.58891 9.14923C7.67639 9.93368 6.49171 10.4059 5.20297 10.4059C2.32933 10.4059 0 8.07662 0 5.20297C0 2.32933 2.32933 0 5.20297 0C8.07662 0 10.4059 2.32933 10.4059 5.20297C10.4059 6.49171 9.93368 7.67639 9.14923 8.58891L9.37336 8.80503ZM1.60092 5.20298C1.60092 7.19612 3.20984 8.80504 5.20298 8.80504C7.19612 8.80504 8.80504 7.19612 8.80504 5.20298C8.80504 3.20984 7.19612 1.60092 5.20298 1.60092C3.20984 1.60092 1.60092 3.20984 1.60092 5.20298Z" fill="#6A6976"/>
          </svg> : null}
          <input type="text"
                 class={this.includeSearchIcon ? 'has-icon' : ''}
                 disabled={this.disabled}
                 onInput={(event) => this.handleOnInput(event)}
                 placeholder={this.placeholder}
                 ref={(el) => this.textInput = el as HTMLInputElement}
                 value={this.value}/>
          {(this.clearable && this.showClear) ?
            <span class="modus-icons clear" onClick={() => this.handleClear()}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M8.66667 0.872857L7.79381 0L4.33333 3.46048L0.872857 0L0 0.872857L3.46048 4.33333L0 7.79381L0.872857 8.66667L4.33333 5.20619L7.79381 8.66667L8.66667 7.79381L5.20619 4.33333L8.66667 0.872857Z" fill="#6A6976"/>
              </svg>
            </span> : <span class="modus-icons"></span>}
        </div>
        {this.error ? <label class="error">{this.error}</label> : null}
      </div>
    );
  }
}

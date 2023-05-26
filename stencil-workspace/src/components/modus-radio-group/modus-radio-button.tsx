// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

export interface RadioButton {
  checked?: boolean;
  disabled?: boolean;
  id: string;
  label: string;
}

interface ModusRadioButtonProps {
  checked: boolean;
  disabled: boolean;
  handleButtonClick: (id: string) => void;
  handleKeydown: (event: KeyboardEvent, id: string) => void;
  id: string;
  label: string;
  name: string;
}

export const ModusRadioButton: FunctionalComponent<ModusRadioButtonProps> = (props: ModusRadioButtonProps) => (
  <div
    class={`modus-radio-button ${props.disabled ? 'disabled' : ''}`}
    onClick={() => props.handleButtonClick(props.id)}
    onKeyDown={(event) => props.handleKeydown(event, props.id)}
    tabIndex={0}>
    <div class="radio">
      <input checked={props.checked} disabled={props.disabled} name={props.name} type="radio"></input>
      <span class="checkmark"></span>
      <label>{props.label}</label>
    </div>
  </div>
);

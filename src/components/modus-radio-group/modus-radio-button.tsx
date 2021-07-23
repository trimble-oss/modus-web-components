// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface ModusRadioButtonProps {
  checked: boolean;
  disabled: boolean;
  handleButtonClick: (id: string) => void;
  id: string;
  label: string;
  name: string;
}

export const ModusRadioButton: FunctionalComponent<ModusRadioButtonProps> = (props: ModusRadioButtonProps) => (
  <div class={`modus-radio-button ${props.disabled ? 'disabled' : ''}`} onClick={() => props.handleButtonClick(props.id)}>
    <div class="radio">
      <input
        checked={props.checked}
        disabled={props.disabled}
        name={props.name}
        type="radio">
      </input>
      <span class="checkmark"></span>
      <label>
        {props.label}
      </label>
    </div>
  </div>
);

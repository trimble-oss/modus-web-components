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
  size: 'small' | 'medium';
}

export const ModusRadioButton: FunctionalComponent<ModusRadioButtonProps> = (
  props: ModusRadioButtonProps & { size: 'small' | 'medium' }
) => (
  <div class={`modus-radio-button ${props.disabled ? 'disabled' : ''}`}>
    <div
      class={`radio ${props.size}`}
      tabIndex={0}
      onClick={() => props.handleButtonClick(props.id)}
      onKeyDown={(event) => props.handleKeydown(event, props.id)}>
      <input
        id={`radio-${props.id}`}
        checked={props.checked}
        disabled={props.disabled}
        name={props.name}
        type="radio"></input>
      <span class={`checkmark`}></span>
      <label htmlFor={`radio-${props.id}`}>{props.label}</label>
    </div>
  </div>
);

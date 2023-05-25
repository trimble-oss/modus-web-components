// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconUploadCloud: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill={props.color}
    class="modus-icon"
    onClick={props.onClick}
    viewBox="0 0 32 32">
    <g>
      <g>
        <path d="M23,14a8.9688,8.9688,0,0,1,6.4447,2.7311A7.0022,7.0022,0,0,0,22.42,7.02,8,8,0,0,0,7.05,9.07,6.0031,6.0031,0,0,0,8,21h6.2318A9.01,9.01,0,0,1,23,14Z" />
        <path d="M23,30a7,7,0,1,0-7-7A6.9949,6.9949,0,0,0,23,30Zm-3.5547-8.832,3-2a.9364.9364,0,0,1,.1088-.0512.9515.9515,0,0,1,.1-.0469.8933.8933,0,0,1,.6928,0,.9515.9515,0,0,1,.1.0469.9364.9364,0,0,1,.1088.0512l3,2a1,1,0,0,1-1.1094,1.664L24,21.8687V26a1,1,0,0,1-2,0V21.8687l-1.4453.9633a1,1,0,1,1-1.1094-1.664Z" />
      </g>
    </g>
  </svg>
);

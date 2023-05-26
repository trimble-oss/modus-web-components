// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconCancel: FunctionalComponent<IconProps> = (props: IconProps) => (
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
        <path d="M21.3027,10.6973a1.503,1.503,0,0,0-2.1211,0L16,13.8789l-3.1821-3.1816a1.5,1.5,0,0,0-2.1211,2.1211L13.8789,16l-3.1821,3.1816a1.5012,1.5012,0,0,0,0,2.1211,1.5363,1.5363,0,0,0,2.1211,0L16,18.1211l3.1816,3.1816a1.5,1.5,0,1,0,2.1211-2.1211L18.1211,16l3.1816-3.1816A1.5012,1.5012,0,0,0,21.3027,10.6973Z" />
        <path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12.0134,12.0134,0,0,1,16,28Z" />
      </g>
    </g>
  </svg>
);

// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import IconProps from './IconProps';

export const IconDrag: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg class="icon-drag" height={props.size ?? 16} width={props.size ?? 16} onClick={props.onClick ? (event) => props.onClick(event) : null} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11,18a2,2,0,1,1-2-2A2.006,2.006,0,0,1,11,18ZM9,10a2,2,0,1,0,2,2A2.006,2.006,0,0,0,9,10ZM9,4a2,2,0,1,0,2,2A2.006,2.006,0,0,0,9,4Zm6,4a2,2,0,1,0-2-2A2.006,2.006,0,0,0,15,8Zm0,2a2,2,0,1,0,2,2A2.006,2.006,0,0,0,15,10Zm0,6a2,2,0,1,0,2,2A2.006,2.006,0,0,0,15,16Z"
      fill="#252a2e"
    />
  </svg>
);

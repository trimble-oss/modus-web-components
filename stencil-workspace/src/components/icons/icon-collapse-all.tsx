// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconCollapseAll: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-collapse-all"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0H24V24H0Z" fill="none" />
    <path
      d="M7.41,18.59,8.83,20,12,16.83,15.17,20l1.41-1.41L12,14ZM16.59,5.41,15.17,4,12,7.17,8.83,4,7.41,5.41,12,10Z"
      fill="#252a2e"
    />
  </svg>
);

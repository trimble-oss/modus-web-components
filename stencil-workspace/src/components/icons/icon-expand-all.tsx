// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconExpandAll: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-expand-all"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0H24V24H0Z" fill="rgba(0,0,0,0)" />
    <path
      d="M12,5.83,15.17,9l1.41-1.41L12,3,7.41,7.59,8.83,9Zm0,12.34L8.83,15,7.42,16.41,12,21l4.59-4.59L15.17,15Z"
      fill="#252a2e"
    />
  </svg>
);

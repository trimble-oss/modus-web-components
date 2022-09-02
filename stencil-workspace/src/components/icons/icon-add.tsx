// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import IconProps from './IconProps';

export const IconApps: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg class="icon-add" height={props.size ?? 16} width={props.size ?? 16} onClick={props.onClick ? (event) => props.onClick(event) : null} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0H24V24H0Z" fill="none" />
    <path d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z" fill="#252a2e" />
  </svg>
);

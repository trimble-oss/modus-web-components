// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import IconProps from './IconProps';

export const IconEdit: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg class="icon-edit" height={props.size ?? 16} width={props.size ?? 16} onClick={props.onClick ? (event) => props.onClick(event) : null} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,0H24V24H0Z" fill="none" />
    <path d="M3,17.25V21H6.75L17.81,9.94,14.06,6.19ZM20.71,7.04a1,1,0,0,0,0-1.41L18.37,3.29a1,1,0,0,0-1.41,0L15.13,5.12l3.75,3.75,1.83-1.83Z" fill="#252a2e" />
  </svg>
);

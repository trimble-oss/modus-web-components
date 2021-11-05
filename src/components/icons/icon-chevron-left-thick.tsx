// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronLeftThick: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg height={props.size ?? 16} width={props.size ?? 16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_434_74" maskUnits="userSpaceOnUse" x="6" y="5" width="8" height="10">
      <path d="M13.0875 6.175L11.9125 5L6.91248 10L11.9125 15L13.0875 13.825L9.27081 10L13.0875 6.175Z" fill="white" />
    </mask>
    <g mask="url(#mask0_434_74)">
      <path d="M13.0875 6.175L11.9125 5L6.91248 10L11.9125 15L13.0875 13.825L9.27081 10L13.0875 6.175Z" fill={props.color ?? '#6A6976'} />
    </g>
  </svg>

);

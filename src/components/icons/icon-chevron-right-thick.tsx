// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronRightThick: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg height={props.size ?? 16} width={props.size ?? 16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_434_80" maskUnits="userSpaceOnUse" x="6" y="5" width="8" height="10">
      <path d="M8.08748 5L6.91248 6.175L10.7291 10L6.91248 13.825L8.08748 15L13.0875 10L8.08748 5Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_434_80)">
      <path d="M8.08748 5L6.91248 6.175L10.7291 10L6.91248 13.825L8.08748 15L13.0875 10L8.08748 5Z" fill={props.color ?? '#6A6976'} />
    </g>
  </svg>
);

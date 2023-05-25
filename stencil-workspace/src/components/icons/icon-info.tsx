// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconInfo: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-info"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={() => props.onClick()}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21ZM11 7H13V9H11V7ZM11 11H13L13 17H11L11 11Z"
      fill={props.color ?? '#6A6976'}
    />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21ZM11 7H13V9H11V7ZM11 11H13L13 17H11L11 11Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)"></g>
  </svg>
);

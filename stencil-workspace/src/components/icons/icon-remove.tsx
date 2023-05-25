// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: (event: MouseEvent) => void;
  size?: string;
}

export const IconRemove: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-remove"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 12C3 7.03691 7.03691 3 12 3C16.9623 3 21 7.03691 21 12C21 16.9623 16.9623 21 12 21C7.03691 21 3 16.9623 3 12ZM15.8889 7L17 8.11113L13.1111 12L17 15.8889L15.8889 17L12 13.1111L8.11113 17L7 15.8889L10.8889 12L7 8.11113L8.11113 7L12 10.8889L15.8889 7Z"
      fill={props.color ?? '#6A6976'}
    />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 12C3 7.03691 7.03691 3 12 3C16.9623 3 21 7.03691 21 12C21 16.9623 16.9623 21 12 21C7.03691 21 3 16.9623 3 12ZM15.8889 7L17 8.11113L13.1111 12L17 15.8889L15.8889 17L12 13.1111L8.11113 17L7 15.8889L10.8889 12L7 8.11113L8.11113 7L12 10.8889L15.8889 7Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)"></g>
  </svg>
);

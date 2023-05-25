// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconInfoOutline: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-info-outline"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={() => props.onClick()}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 12C3 16.9631 7.03773 21 12 21C16.9623 21 21 16.9631 21 12C21 7.03773 16.9623 3 12 3C7.03773 3 3 7.03773 3 12ZM4.81555 12C4.81555 8.03836 8.03836 4.81555 12 4.81555C15.9616 4.81555 19.1845 8.03836 19.1845 12C19.1845 15.9616 15.9616 19.1845 12 19.1845C8.03836 19.1845 4.81555 15.9616 4.81555 12ZM11 17V11H13V17H11ZM11 7V9H13V7H11Z"
      fill={props.color ?? '#6A6976'}
    />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 12C3 16.9631 7.03773 21 12 21C16.9623 21 21 16.9631 21 12C21 7.03773 16.9623 3 12 3C7.03773 3 3 7.03773 3 12ZM4.81555 12C4.81555 8.03836 8.03836 4.81555 12 4.81555C15.9616 4.81555 19.1845 8.03836 19.1845 12C19.1845 15.9616 15.9616 19.1845 12 19.1845C8.03836 19.1845 4.81555 15.9616 4.81555 12ZM11 17V11H13V17H11ZM11 7V9H13V7H11Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)"></g>
  </svg>
);

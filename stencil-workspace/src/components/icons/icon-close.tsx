// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconClose: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-close"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? () => props.onClick() : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0)">
      <path
        d="M19 7.30929L17.6907 6L12.5 11.1907L7.30929 6L6 7.30929L11.1907 12.5L6 17.6907L7.30929 19L12.5 13.8093L17.6907 19L19 17.6907L13.8093 12.5L19 7.30929Z"
        fill={props.color ?? '#6A6976'}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

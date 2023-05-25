// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconError: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-error"
    height={props.size ?? 16}
    width={props.size ?? 16}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3 12C3 7.032 7.032 3 12 3C16.968 3 21 7.032 21 12C21 16.968 16.968 21 12 21C7.032 21 3 16.968 3 12ZM12.9221 12.6706H11.078L10.7707 7.96292H13.2295L12.9221 12.6706ZM12.0001 16.0989C11.3264 16.0989 10.7823 15.5432 10.7823 14.8811C10.7823 14.2191 11.3264 13.6634 12.0001 13.6634C12.6738 13.6634 13.2178 14.2191 13.2178 14.8811C13.2178 15.5432 12.6738 16.0989 12.0001 16.0989Z"
      fill={props.color ?? '#6A6976'}
    />
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="18" height="18">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3 12C3 7.032 7.032 3 12 3C16.968 3 21 7.032 21 12C21 16.968 16.968 21 12 21C7.032 21 3 16.968 3 12ZM12.9221 12.6706H11.078L10.7707 7.96292H13.2295L12.9221 12.6706ZM12.0001 16.0989C11.3264 16.0989 10.7823 15.5432 10.7823 14.8811C10.7823 14.2191 11.3264 13.6634 12.0001 13.6634C12.6738 13.6634 13.2178 14.2191 13.2178 14.8811C13.2178 15.5432 12.6738 16.0989 12.0001 16.0989Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)"></g>
  </svg>
);

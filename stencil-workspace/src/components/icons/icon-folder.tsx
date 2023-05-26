// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconFolder: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-folder"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    height={props.size ?? 24}
    width={props.size ?? 24}
    viewBox="0 0 32 32">
    <path d="M28.79 12.39A1 1 0 0 0 28 12h-2V9c0-.55-.45-1-1-1h-9.59l-1.7-1.71C13.52 6.11 13.27 6 13 6H4c-.55 0-1 .45-1 1v17c0 .04.02.07.02.11.01.05.02.11.04.16.02.09.06.17.1.25.02.03.02.06.05.09.01.01.03.02.04.03.07.08.15.14.23.19.04.03.06.05.1.07.13.06.27.1.42.1h21c.13 0 .25-.03.36-.07.04-.02.07-.04.1-.06.07-.04.14-.08.2-.13.03-.03.06-.06.09-.1.05-.05.09-.11.12-.18a.31.31 0 0 0 .06-.13c.01-.02.03-.04.03-.07l3-11c.09-.3.02-.62-.17-.87zM5 8h7.59l1.7 1.71c.19.18.44.29.71.29h9v2H7c-.45 0-.85.3-.96.74L5 16.53V8z" />
  </svg>
);

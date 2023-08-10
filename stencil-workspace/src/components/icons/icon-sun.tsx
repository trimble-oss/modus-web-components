// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconSun: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-moon"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 12c0-.34.03-.67.08-1H3c-.55 0-1 .45-1 1s.45 1 1 1h2.08c-.05-.33-.08-.66-.08-1Zm1.4-4.19c.4-.54.88-1.01 1.41-1.41L6.34 4.93a.996.996 0 1 0-1.41 1.41L6.4 7.81Zm11.2 0 1.47-1.47a.996.996 0 1 0-1.41-1.41L16.19 6.4c.54.4 1.01.88 1.41 1.41ZM6.4 16.18l-1.47 1.47a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l1.47-1.47c-.54-.4-1.01-.88-1.41-1.41ZM13 5.07V2.99c0-.55-.45-1-1-1s-1 .45-1 1v2.08c.33-.05.66-.08 1-.08s.67.03 1 .08Zm8 5.92h-2.08c.05.33.08.66.08 1s-.03.67-.08 1H21c.55 0 1-.45 1-1s-.45-1-1-1Zm-3.4 5.19c-.4.54-.88 1.01-1.41 1.41l1.47 1.47c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 0 0 0-1.41l-1.47-1.47ZM12 6.99c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm-1 11.92v2.08c0 .55.45 1 1 1s1-.45 1-1v-2.08c-.33.05-.66.08-1 .08s-.67-.03-1-.08Z"
      fill="#252a2e"
    />
  </svg>
);

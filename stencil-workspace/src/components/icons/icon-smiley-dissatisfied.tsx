// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconSmileyDissatisfied: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-smiley-dissatistied"
    width={props.size ?? '16'}
    height={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8Zm8 8.99s-.07.01-.11.01a.51.51 0 0 1-.49-.39c-.42-1.83-2.02-3.11-3.9-3.11s-3.49 1.28-3.9 3.11a.503.503 0 0 1-.98-.22C7.64 14.1 9.65 12.5 12 12.5s4.36 1.6 4.88 3.89c.06.27-.11.54-.38.6Zm-1-5.99c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5Z"
      fill={props.color ?? '#019aeb'}
    />
  </svg>
);

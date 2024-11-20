// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconSmileyDissatisfiedOutline: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-smiley-dissatistied-outline ${props.pressed ? 'pressed' : ''}`}
    width={props.size ?? '16'}
    height={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none">
    <path
      d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm1 8.99c.27-.06.44-.33.38-.6-.52-2.29-2.53-3.89-4.88-3.89s-4.36 1.6-4.88 3.89a.503.503 0 0 0 .98.22c.42-1.83 2.02-3.11 3.9-3.11s3.49 1.28 3.9 3.11c.05.23.26.39.49.39.04 0 .07 0 .11-.01Z"
      fill={props.color ?? 'currentColor'}
    />
  </svg>
);

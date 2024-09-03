// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconSmileySatisfied: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-smiley-satistied ${props.pressed ? 'pressed' : ''}`}
    width={props.size ?? '16'}
    height={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8Zm8.38 6.11C16.36 16.4 14.35 18 12 18s-4.36-1.6-4.88-3.89a.503.503 0 0 1 .98-.22C8.52 15.72 10.12 17 12 17s3.49-1.28 3.9-3.11a.503.503 0 0 1 .98.22ZM15.5 11c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5Z"
      fill={props.color ?? 'currentColor'}
    />
  </svg>
);

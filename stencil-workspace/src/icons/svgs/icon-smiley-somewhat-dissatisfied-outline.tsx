// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconSmileySomewhatDissatisfiedOutline: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-smiley-somewhat-dissatistied-outline ${props.pressed ? 'pressed' : ''}`}
    width={props.size ?? '16'}
    height={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none">
    <path
      d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm.21 8.88c.21-.18.23-.5.05-.71-.95-1.08-2.32-1.71-3.76-1.71s-2.81.62-3.76 1.71c-.18.21-.16.52.05.71.21.18.52.16.71-.05.76-.87 1.86-1.36 3.01-1.36s2.25.5 3.01 1.36c.1.11.24.17.38.17.12 0 .23-.04.33-.12Z"
      fill={props.color ?? 'currentColor'}
    />
  </svg>
);

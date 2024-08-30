import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconArrowUp: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-arrow-up ${props.pressed ? 'pressed' : ''}`}
    data-test-id="iconArrowUp"
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    width={props.size ?? 16}>
    <path d="M14 20h-4c-.55 0-1-.45-1-1v-7H5.21c-.45 0-.67-.54-.35-.85l6.44-6.44a.996.996 0 0 1 1.41 0l6.44 6.44a.5.5 0 0 1-.35.85h-3.79v7c0 .55-.45 1-1 1Z" />{' '}
  </svg>
);

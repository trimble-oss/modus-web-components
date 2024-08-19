// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconRefresh: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`${props.pressed ? 'pressed' : ''}`}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill={props.color ?? 'currentColor'}>
    <path d="M18.36 5.64a8.976 8.976 0 0 0-7.16-2.61c-4.2.36-7.66 3.73-8.13 7.92C2.46 16.39 6.68 21 12 21c3.59 0 6.67-2.1 8.11-5.13.36-.75-.18-1.62-1.01-1.62-.42 0-.82.22-.99.6-1.07 2.3-3.4 3.9-6.11 3.9-3.62 0-6.7-3.02-6.75-6.64S8.24 5.25 12 5.25c1.87 0 3.53.78 4.75 2l-1.92 1.92c-.63.63-.18 1.71.71 1.71H20c.55 0 1-.45 1-1V5.42c0-.89-1.08-1.34-1.71-.71l-.94.94Z" />
  </svg>
);

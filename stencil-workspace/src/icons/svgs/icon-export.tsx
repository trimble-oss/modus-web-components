// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconExport: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-export ${props.pressed ? 'pressed' : ''}`}
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    width={props.size ?? 16}>
    <path d="m14.92 16.79-1.88 1.88h-.01V13c0-.55-.45-1-1-1s-1 .45-1 1v5.67l-1.88-1.88a1 1 0 0 0-1.41 1.41l3.59 3.59c.39.39 1.02.39 1.41 0l3.59-3.59a1 1 0 0 0-1.41-1.41Zm4.79-9.09L14.3 2.29a.99.99 0 0 0-.71-.29H6c-1.1 0-2 .9-2 2v11c0 .55.45 1 1 1s1-.45 1-1V4h6v5c0 .55.45 1 1 1h5v5c0 .55.45 1 1 1s1-.45 1-1V8.41c0-.27-.11-.52-.29-.71ZM14 7.99v-3l3 3h-3Z" />
  </svg>
);

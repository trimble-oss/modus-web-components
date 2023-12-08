// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconFileBarGraph: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-file-bar-graph ${props.pressed ? 'pressed' : ''}`}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill={props.color ?? '#6A6976'}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M13.59 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8.41c0-.27-.11-.52-.29-.71L14.3 2.29a.99.99 0 0 0-.71-.29ZM18 20H6V4h6v5c0 .55.45 1 1 1h5v10Zm-9-1c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1s1 .45 1 1v3c0 .55-.45 1-1 1Zm3 0c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1Zm3 0c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1Z" />
  </svg>
);

// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconWarning: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-warning ${props.pressed ? 'pressed' : ''}`}
    height={props.size ?? 16}
    width={props.size ?? 16}
    viewBox="0 0 24 24"
    fill={props.color ?? 'currentColor'}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-1.06 5.63c0-.63.45-1.15 1.06-1.15s1.06.51 1.06 1.15c0 .04-.01.12-.01.14l-.39 5.04c-.04.44-.3.7-.66.7s-.62-.26-.66-.7l-.4-5.04zM12 17.52c-.67 0-1.21-.54-1.21-1.21s.54-1.19 1.21-1.19 1.21.54 1.21 1.19-.54 1.21-1.21 1.21"></path>
  </svg>
);

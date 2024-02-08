// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconSmileyNeutralOutline: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-smiley-neutral-outline ${props.pressed ? 'pressed' : ''}`}
    width={props.size ?? '16'}
    height={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm.5 7.5c0-.28-.22-.5-.5-.5h-7c-.28 0-.5.22-.5.5s.22.5.5.5h7c.28 0 .5-.22.5-.5Z"
      fill={props.color ?? 'currentColor'}
    />
  </svg>
);

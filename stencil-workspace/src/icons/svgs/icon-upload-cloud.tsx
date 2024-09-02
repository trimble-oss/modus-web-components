// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconUploadCloud: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`upload-cloud ${props.pressed ? 'pressed' : ''}`}
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    width={props.size ?? 16}>
    <path d="M19.93 11.12c.04-.29.07-.57.07-.87C20 6.8 17.2 4 13.75 4c-2.53 0-4.7 1.5-5.68 3.66-.42-.1-.86-.16-1.32-.16C3.57 7.5 1 10.07 1 13.25S3.57 19 6.75 19H19c2.21 0 4-1.79 4-4a3.99 3.99 0 0 0-3.07-3.88Zm-4.41 1.31h-1.96V17c0 .27-.22.5-.5.5h-2.11c-.27 0-.5-.23-.5-.5v-4.57H8.48c-.23 0-.35-.28-.18-.44l3.35-3.35c.2-.2.51-.2.71 0l3.35 3.35c.16.16.05.44-.18.44Z" />
  </svg>
);

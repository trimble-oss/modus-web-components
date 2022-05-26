// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronDownThick: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg class="icon-chevron-down-thick" xmlns="http://www.w3.org/2000/svg" fill={props.color ?? 'currentColor'} height={props.size ?? 16} width={props.size ?? 16} onClick={props.onClick} viewBox="0 0 32 32">
    <g>
      <path d="M28.06 11.383A2.483 2.483 0 0 0 26 10.27c-.523 0-1.024.165-1.45.477l-.035.025-.032.028L16 18.194l-8.483-7.393-.032-.028-.035-.025A2.444 2.444 0 0 0 6 10.27c-.823 0-1.593.416-2.06 1.112-.76 1.135-.501 2.704.574 3.52l9.974 8.572.03.026.032.023a2.445 2.445 0 0 0 2.9 0l.032-.023.03-.026 9.974-8.573c1.075-.815 1.335-2.384.574-3.52z" fill={props.color ?? '#6A6976'} />
    </g>
  </svg>
);

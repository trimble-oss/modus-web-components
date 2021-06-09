// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconSearch: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg width={props.size ?? '14'} height={props.size ?? 14} viewBox="0 0 14 14" onClick={props.onClick ? () => props.onClick() : null} fill = "none" >
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.37336 8.80503H10.0057L14 12.8073L12.8073 14L8.80503 10.0057V9.37336L8.58891 9.14923C7.67639 9.93368 6.49171 10.4059 5.20297 10.4059C2.32933 10.4059 0 8.07662 0 5.20297C0 2.32933 2.32933 0 5.20297 0C8.07662 0 10.4059 2.32933 10.4059 5.20297C10.4059 6.49171 9.93368 7.67639 9.14923 8.58891L9.37336 8.80503ZM1.60092 5.20298C1.60092 7.19612 3.20984 8.80504 5.20298 8.80504C7.19612 8.80504 8.80504 7.19612 8.80504 5.20298C8.80504 3.20984 7.19612 1.60092 5.20298 1.60092C3.20984 1.60092 1.60092 3.20984 1.60092 5.20298Z" fill={props.color ?? '#6A6976'}/>
  </svg>
);

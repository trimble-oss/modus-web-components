import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header } from '@tanstack/table-core';

interface ModusDataTableHeaderProps {
  header: Header<unknown, unknown>;
  index: number;
  lengthOfHeaderGroups: number;
}

export const ModusDataTableHeader: FunctionalComponent<
  ModusDataTableHeaderProps
> = (props: ModusDataTableHeaderProps) => {
  return (
    <th
      key={props.header.id}
      colSpan={props.header.colSpan}
      class={
        props.index < props.lengthOfHeaderGroups - 1 ? 'text-align-center' : ''
      }>
      {props.header.isPlaceholder ? null : props.header.column.columnDef.header}
    </th>
  );
};

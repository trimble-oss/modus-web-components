import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { TableContext } from '../../../models/table-context.models';

interface ModusTableHeaderCheckboxProps {
  context: TableContext;
}

export const ModusTableHeaderCheckbox: FunctionalComponent<ModusTableHeaderCheckboxProps> = ({ context }) => {
  const {
    tableInstance: { getIsAllRowsSelected, getIsSomeRowsSelected, getToggleAllRowsSelectedHandler },
    rowSelectionOptions,
    density,
  } = context;
  const densityWidths = new Map<string, string>([
    ['compact', '38px'],
    ['comfortable', '46px'],
    ['relaxed', '46px'],
  ]);

  let checkboxSize: 'medium' | 'small' = 'medium';
  if (density === 'compact') {
    checkboxSize = 'small';
  }

  const width = densityWidths.get(density) || '46px';
  return (
    <th class={'row-checkbox sticky-left ' + checkboxSize} style={{ width: width }}>
      {rowSelectionOptions?.multiple && (
        <modus-checkbox
          ariaLabel="Select all rows"
          checked={getIsAllRowsSelected()}
          indeterminate={getIsSomeRowsSelected()}
          size={checkboxSize}
          onCheckboxClick={getToggleAllRowsSelectedHandler()}></modus-checkbox>
      )}
    </th>
  );
};

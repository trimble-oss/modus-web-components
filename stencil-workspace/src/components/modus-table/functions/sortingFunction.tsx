import { Row } from '@tanstack/table-core';

export function sortHyperlink(rowA: Row<unknown>, rowB: Row<unknown>, columnId: string): number {
  const valA = rowA.getValue(columnId)?.['display'] ?? rowA.getValue(columnId);
  const valB = rowB.getValue(columnId)?.['display'] ?? rowB.getValue(columnId);

  // If valA is null, undefined or empty
  if (!valA) {
    return 1;
  }

  // If valB is null, undefined or empty
  if (!valB) {
    return -1;
  }

  return valA < valB ? -1 : 1;
}

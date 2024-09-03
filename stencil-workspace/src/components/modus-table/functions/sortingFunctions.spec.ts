import { Row } from '@tanstack/table-core';
import { sortBadge as sortForBadge, sortHyperlink as sortForHyperlink } from './sortingFunction';

interface RowValue {
  display: string;
  text: string;
}
describe('Sorting Functions', () => {
  const mockRows: Row<unknown>[] = [
    { getValue: (columnId: string) => (columnId === 'testColumn' ? { display: 'C', text: '2' } : null) } as Row<unknown>,
    { getValue: (columnId: string) => (columnId === 'testColumn' ? { display: 'A', text: '1' } : null) } as Row<unknown>,
    { getValue: (columnId: string) => (columnId === 'testColumn' ? { display: 'B', text: '3' } : null) } as Row<unknown>,
  ];

  describe('sortForHyperlink', () => {
    it('should sort rows based on display value', () => {
      const sorted = [...mockRows].sort((a, b) => sortForHyperlink(a, b, 'testColumn'));
      expect((sorted[0].getValue('testColumn') as RowValue).display).toBe('A');
      expect((sorted[1].getValue('testColumn') as RowValue).display).toBe('B');
      expect((sorted[2].getValue('testColumn') as RowValue).display).toBe('C');
    });
  });

  describe('sortForBadge', () => {
    it('should sort rows based on text value', () => {
      const sorted = [...mockRows].sort((a, b) => sortForBadge(a, b, 'testColumn'));
      expect((sorted[0].getValue('testColumn') as RowValue).text).toBe('1');
      expect((sorted[1].getValue('testColumn') as RowValue).text).toBe('2');
      expect((sorted[2].getValue('testColumn') as RowValue).text).toBe('3');
    });
  });
});

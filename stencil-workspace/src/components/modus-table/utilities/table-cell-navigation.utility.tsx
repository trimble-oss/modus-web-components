import {
  KEYBOARD_DOWN,
  KEYBOARD_ENTER,
  KEYBOARD_ESCAPE,
  KEYBOARD_LEFT,
  KEYBOARD_RIGHT,
  KEYBOARD_TAB,
  KEYBOARD_UP,
} from '../modus-table.constants';

interface NavigateTableCellsProps {
  eventKey: string;
  cellElement: HTMLElement;
  onNavigateComplete?: (cell: HTMLElement) => void;
}
export default function NavigateTableCells(props: NavigateTableCellsProps) {
  const { eventKey: key, cellElement: cell, onNavigateComplete } = props;
  let nextCell, prevCell: HTMLElement;
  const row = cell.closest('tr') as HTMLTableRowElement;
  const index = Array.prototype.indexOf.call(row.children, cell);

  switch (key?.toLowerCase()) {
    case KEYBOARD_ENTER:
    case KEYBOARD_DOWN: // Moves to down cell
      nextCell = (cell.parentElement.nextSibling as HTMLElement)?.children[index] as HTMLElement;
      if (nextCell) nextCell.focus();
      else cell.focus();
      break;
    case KEYBOARD_ESCAPE: // Pressing Escape does nothing but to retain the focus
      cell.focus();
      break;
    case 'shift+tab':
      prevCell =
        ((cell.previousSibling as HTMLElement)?.querySelector('modus-table-cell-main') as HTMLElement) ||
        ((row.previousSibling?.lastChild as HTMLElement)?.querySelector('modus-table-cell-main') as HTMLElement);

      if (prevCell) onNavigateComplete(prevCell);
      break;
    case KEYBOARD_TAB:
      nextCell =
        ((cell.nextSibling as HTMLElement)?.querySelector('modus-table-cell-main') as HTMLElement) ||
        ((row.nextSibling as HTMLElement)?.querySelector('modus-table-cell-main') as HTMLElement);

      if (nextCell) onNavigateComplete(nextCell);
      break;
    case KEYBOARD_RIGHT: // Moves to right cell
      nextCell = cell.nextSibling as HTMLElement;
      nextCell?.focus();
      break;
    case KEYBOARD_LEFT: // Moves to left cell
      nextCell = cell.previousSibling as HTMLElement;
      nextCell?.focus();
      break;
    case KEYBOARD_UP: // Moves to up cell
      nextCell = (cell.parentElement.previousSibling as HTMLElement)?.children[index] as HTMLElement;
      nextCell?.focus();
      break;
  }
}

import {
  KEYBOARD_DOWN,
  KEYBOARD_ENTER,
  KEYBOARD_ESCAPE,
  KEYBOARD_LEFT,
  KEYBOARD_RIGHT,
  KEYBOARD_UP,
} from '../modus-table.constants';

interface NavigateTableCellsProps {
  eventKey: string;
  cellElement: HTMLElement;
}
export default function NavigateTableCells(props: NavigateTableCellsProps) {
  const { eventKey: key, cellElement: cell } = props;
  let nextCell: HTMLElement;

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

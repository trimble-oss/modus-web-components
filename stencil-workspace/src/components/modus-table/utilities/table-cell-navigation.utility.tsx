import {
  KEYBOARD_DOWN,
  KEYBOARD_ENTER,
  KEYBOARD_ESCAPE,
  KEYBOARD_LEFT,
  KEYBOARD_RIGHT,
  KEYBOARD_UP,
} from '../modus-table.constants';

interface NavigateTableCellsProps {
  key: string;
  cellElement: HTMLElement;
  cellIndex: number;
}
export default function NavigateTableCells(props: NavigateTableCellsProps) {
  const { key, cellElement: cell, cellIndex: index } = props;
  let nextCell: HTMLElement;

  switch (key?.toLowerCase()) {
    case KEYBOARD_ENTER:
    case KEYBOARD_DOWN: // Moves to down cell
      nextCell = (cell.parentElement.nextSibling as HTMLElement)?.children[index + 1] as HTMLElement;

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
      nextCell = (cell.parentElement.previousSibling as HTMLElement)?.children[index + 1] as HTMLElement;
      nextCell?.focus();
      break;
  }
}

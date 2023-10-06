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
  const { key, cellElement, cellIndex } = props;
  let newSelectCell: HTMLElement;
  switch (key?.toLowerCase()) {
    case KEYBOARD_ENTER: // Pressing Enter key makes cell editable.
      newSelectCell = (cellElement.parentElement.nextSibling as HTMLElement)?.children[cellIndex + 1] as HTMLElement;

      if (newSelectCell) newSelectCell.focus();
      else cellElement.focus();

      break;
    case KEYBOARD_ESCAPE: // Pressing Escape key makes cell non-editable.
      cellElement.focus();
      break;
    case KEYBOARD_RIGHT: // Moves to right cell
      newSelectCell = cellElement.nextSibling as HTMLElement;
      newSelectCell?.focus();
      break;
    case KEYBOARD_LEFT: // Moves to left cell
      newSelectCell = cellElement.previousSibling as HTMLElement;
      newSelectCell?.focus();
      break;
    case KEYBOARD_DOWN: // Moves to down cell
      newSelectCell = (cellElement.parentElement.nextSibling as HTMLElement)?.children[cellIndex + 1] as HTMLElement;
      newSelectCell?.focus();
      break;
    case KEYBOARD_UP: // Moves to up cell
      newSelectCell = (cellElement.parentElement.previousSibling as HTMLElement)?.children[cellIndex + 1] as HTMLElement;
      newSelectCell?.focus();
      break;
  }
}

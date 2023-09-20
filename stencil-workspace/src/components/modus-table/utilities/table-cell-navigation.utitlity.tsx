import { KEYBOARD_DOWN, KEYBOARD_ENTER, KEYBOARD_LEFT, KEYBOARD_RIGHT, KEYBOARD_UP } from '../modus-table.constants';

export default function NavigateCell(event: KeyboardEvent, isEditable, cellElement, cellIndex) {
  let newSelectCell: HTMLElement;
  switch (event.key.toLowerCase()) {
    case KEYBOARD_ENTER: // Pressing Enter key makes cell editable.
      if (isEditable) cellElement.click();
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

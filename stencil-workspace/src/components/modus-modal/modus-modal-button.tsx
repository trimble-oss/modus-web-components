
export interface ModusModalButtons {
  primary?: ModusModalButton;
  secondary?: ModusModalButton;
  outline?: ModusModalButton;
}
interface ModusModalButton {
  /** (optional) The modal's  button text. */
  text?: string;
  /** (optional) The modal's  button aria-label. */
  ariaLabel?: string;
  /** (optional) Disable  button. */
  disabled?: boolean;
}

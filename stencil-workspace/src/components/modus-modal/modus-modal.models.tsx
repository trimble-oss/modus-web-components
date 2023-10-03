export interface ModusModalModels {
  /** (optional) The modal's  button text. */
  text?: string;
  /** (optional) The modal's  button aria-label. */
  ariaLabel?: string;
  /** (optional) Disable  button. */
  disabled?: boolean;
}

export interface ModusModalButtons {
  primary?: ModusModalModels;
  secondary?: ModusModalModels;
  outline?: ModusModalModels;
}

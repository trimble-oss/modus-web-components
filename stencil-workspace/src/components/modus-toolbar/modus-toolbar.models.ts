export interface ModusToolbarButton {
  onClick: () => void;
  tooltip: ModusToolbarTooltip;
  iconSrc?: string;
  textButton?: string;
  disabled?: boolean;
  active?: boolean;
  divader?: boolean;
}

export interface ModusToolbarTooltip {
  text: string;
  position: 'bottom' | 'left' | 'right' | 'top' | 'auto';
}
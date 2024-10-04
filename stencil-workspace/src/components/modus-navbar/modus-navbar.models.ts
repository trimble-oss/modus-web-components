export interface ModusNavbarProfileMenuLink {
  display: string;
  id: string;
  icon?: string;
}
export interface ModusNavbarTooltip {
  text: string;
  ariaLabel?: string;
}
export interface ModusProfileMenuOptions {
  avatarUrl?: string;
  email?: string;
  initials?: string;
  links?: ModusNavbarProfileMenuLink[];
  signOutText?: string;
  username: string;
  tooltip?: ModusNavbarTooltip;
}
export interface ModusNavbarLogo {
  url: string;
  height?: string;
  alt?: string;
}

export interface ModusNavbarLogoOptions {
  primary?: ModusNavbarLogo;
  secondary?: ModusNavbarLogo;
}

export interface ModusNavbarButton {
  id: string;
  icon: string;
  orderIndex: number;
  hideMenu?: boolean;
  tooltip?: ModusNavbarTooltip;
}

export interface ModusNavbarDropdownItem {
  text: string;
  value: string;
}

export interface ModusNavbarDropdownOptions {
  ariaLabel: string;
  items: ModusNavbarDropdownItem[];
}

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
  profileMenuText?: string;
  username: string;
  tooltip?: ModusNavbarTooltip;
}
export interface ModusNavbarLogo {
  url: string;
  height?: string;
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

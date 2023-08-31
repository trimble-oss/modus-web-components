export interface ModusFloatingNavbarProfileMenuLink {
  display: string;
  id: string;
}
export interface ModusFloatingNavbarTooltip {
  text: string;
  ariaLabel?: string;
}
export interface ModusFloatingProfileMenuOptions {
  avatarUrl?: string;
  email?: string;
  initials?: string;
  links?: ModusFloatingNavbarProfileMenuLink[];
  username: string;
  tooltip?: ModusFloatingNavbarTooltip;
}
export interface ModusFloatingNavbarLogo {
  url: string;
  height?: string;
}

export interface ModusFloatingNavbarLogoOptions {
  primary?: ModusFloatingNavbarLogo;
  secondary?: ModusFloatingNavbarLogo;
}

export interface ModusFloatingNavbarButton {
  id: string;
  icon: string;
  orderIndex: number;
  hideMenu?: boolean;
  tooltip?: ModusFloatingNavbarTooltip;
}

export interface ModusNavbarProfileMenuLink {
  display: string;
  id: string;
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
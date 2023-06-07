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

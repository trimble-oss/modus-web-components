import { Component, OnInit } from '@angular/core';
import {
  ModusSideNavigationItemInfo,
  ModusNavbarLogoOptions,
  ModusProfileMenuOptions,
} from '@trimble-oss/modus-web-components';

const SideNavIcons = {
  home: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cstyle%3E .st1 %7B stroke: %23000; stroke-miterlimit: 10; %7D %3C/style%3E%3Cpath d='M30.707 15.293 26 10.586V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.586l-4.293-4.293a1 1 0 0 0-1.414 0l-13 13A1 1 0 0 0 4 17h3v12a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-7h6v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V17h3a1 1 0 0 0 .707-1.707z' /%3E%3C/svg%3E",

  usage:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cg%3E%3Cpath d='M30 23v6c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-5h-8v5h2c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-5H7v5h2c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-6c0-.55.45-1 1-1h9v-5h-2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-2v5h9c.55 0 1 .45 1 1v6h2c.55 0 1 .45 1 1z' /%3E%3C/g%3E%3C/svg%3E",

  styles:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cpath d='M30 25h-1v-9a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v9h-2V5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v20h-2V12a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13H3a1 1 0 1 0 0 2h27a1 1 0 1 0 0-2zM6 25V13h3v12H6zm9 0V6h3v19h-3zm9 0v-8h3v8h-3z' /%3E%3C/svg%3E",

  accessibility:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cg%3E%3Cpath d='M29 4H3c-.55 0-1 .45-1 1v17c0 .55.45 1 1 1h12v3h-4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1h-4v-3h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 17H4v-2h24v2z' /%3E%3C/g%3E%3C/svg%3E",
};

@Component({
  selector: 'modus-side-navigation-examples',
  templateUrl: './modus-side-navigation-examples.component.html',
  styleUrls: ['./modus-side-navigation-examples.component.scss'],
})
export class ModusSideNavigationExamplesComponent {
  handleSideNavItemClick = (e: any) => {
    if (e.detail) {
      const panel = document.querySelector('#panelcontent');
      document.querySelector('#sidenav-content-title')?.remove();
      const el = document.createElement('h3');
      el.id = 'sidenav-content-title';
      el.innerHTML = e.target?.label || 'Home page';
      panel?.insertBefore(el, document.querySelector('#overview'));
    }
  };
  handleSwitch = (e: any) => {
    const sidenav = document.querySelector('modus-side-navigation');
    if (sidenav) sidenav.mode = sidenav.mode === 'push' ? 'overlay' : 'push';
  };
  handleNavBarMainMenu = (e: any) => {
    const panel = document.querySelector('modus-side-navigation');
    if (panel) panel.expanded = !panel.expanded;
  };
  navbarOptions = {
    apps: [
      {
        description: 'The One Trimble Design System',
        logoUrl: 'https://modus.trimble.com/favicon.svg',
        name: 'Trimble Modus',
        url: 'https://modus.trimble.com/',
        category: '',
        showCategory: false,
      },
    ],
    logoOptions: {
      primary: {
        url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
        height: '24',
      },
      secondary: { url: 'https://modus.trimble.com/favicon.svg', height: '24' },
    } as ModusNavbarLogoOptions,
    profileMenuOptions: {
      email: 'modus_user@trimble.com',
      initials: 'MU',
      username: 'Modus User',
    } as ModusProfileMenuOptions,
  };
  sideNavData: ModusSideNavigationItemInfo[] = [
    {
      id: 'home-menu',
      menuIcon: SideNavIcons.home,
      label: 'Home page 1',
      children: [
        {
          id: 'home-menu-2',
          menuIcon: SideNavIcons.home,
          label: 'Home page 2',
          onSideNavItemClicked: this.handleSideNavItemClick,
        },
        {
          id: 'usage-menu-2',
          children: [
            {
              id: 'home-menu-3',
              menuIcon: SideNavIcons.home,
              label: 'Home page 3',
              onSideNavItemClicked: this.handleSideNavItemClick,
            },
          ],
          menuIcon: SideNavIcons.usage,
          label: 'Usage page 2',
        },
      ],
    },
    {
      id: 'usage-menu',
      menuIcon: SideNavIcons.usage,
      label: 'Usage page 1',
      onSideNavItemClicked: this.handleSideNavItemClick,
    },
    {
      id: 'styles-menu',
      menuIcon: SideNavIcons.styles,
      label: 'Styles page 1',
      onSideNavItemClicked: this.handleSideNavItemClick,
    },
    {
      id: 'accessibility-menu',
      menuIcon: SideNavIcons.accessibility,
      label: 'Accessibility page 1',
      onSideNavItemClicked: this.handleSideNavItemClick,
    },
  ];
}

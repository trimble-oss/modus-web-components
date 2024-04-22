// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-navbar-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Navbar',
  argTypes: {
    enableSearchOverlay: {
      name: 'enable-search-overlay',
      description: 'Whether to show search overlay or not.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    showHelp: {
      name: 'show-help',
      description: 'Toggle the help button',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' }
      }
    },
    showProfile: {
      name: 'show-profile',
      description: 'Toggle the profile',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      }
    },
    showSearch: {
      name: 'show-search',
      description: 'Toggle the search button',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    profileMenuOptions: {
      name: 'profile-menu-options',
      description: 'Set the options for profile menu',
      table: {
        type: { summary: 'ModusProfileMenuOptions' },
      },
    },
    buttons: {
      name: 'buttons',
      description: 'To add icon buttons dynamically to the Navbar, create an array of ModusNavbarButton.',
      table: {
        type: { summary: 'ModusNavbarButton[]' },
      },
    },
    searchTooltip: {
      name: 'search-tooltip ',
      description: 'To add the search tooltip text and ariaLabel',
      table: {
        type: { summary: 'ModusNavbarTooltip' },
      },
    },
    helpTooltip: {
      name: 'help-tooltip ',
      description: 'To add the help icon tooltip text and ariaLabel',
      table: {
        type: { summary: 'ModusNavbarTooltip' },
      },
    },
    notificationCount:{
      name: 'notification-count',
      description: 'To add the counter value to the notification icon',
      table: {
        type: { summary: 'number' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['searchMenuClick', 'buttonClick', 'productLogoClick', 'helpOpen'],
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      page: docs,
      inlineStories: true,
    },
    options: {
      isToolshown: true,
    },
    viewMode: 'docs',
  },
};

const workingAvatarUrl = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e738c17-7f3c-422e-8225-f8c782b08626/d9pordj-43d4aa59-54b0-46a1-a568-e36dd691cf27.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBlNzM4YzE3LTdmM2MtNDIyZS04MjI1LWY4Yzc4MmIwODYyNlwvZDlwb3Jkai00M2Q0YWE1OS01NGIwLTQ2YTEtYTU2OC1lMzZkZDY5MWNmMjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xvDk9KFIUAx0yAG3BPamDfRqmWUX6zwR4WVW40GjsoY';
const failingAvatarUrl = 'https://avatar.example.com/broken-image-link.png';
const defaultPrimaryLogo = 'https://modus.trimble.com/img/trimble-logo.svg';
const defaultSecondaryLogo = 'https://modus.trimble.com/favicon.svg';
const defaultLogo = {
  primary: {
    url: defaultPrimaryLogo,
  },
  secondary: {
    url: defaultSecondaryLogo,
  }
};
const blueLogo = {
  primary: {
    url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
  },
  secondary: {
    url: 'https://modus-bootstrap.trimble.com/img/trimble-icon-rev.svg',
  }
};
const defaultApps = [{
  description: 'The One Trimble Design System',
  logoUrl: 'https://modus.trimble.com/favicon.svg',
  name: 'Trimble Modus',
  url: 'https://modus.trimble.com/',
}];

const Template = ({ buttons, notificationCount, enableSearchOverlay, helpTooltip, profileMenuOptions, searchTooltip, showHelp, showProfile, showSearch }) => html`
  <modus-navbar
    enable-search-overlay=${enableSearchOverlay}
    show-apps-menu
    show-help=${showHelp}
    show-main-menu
    show-profile=${showProfile}
    show-search=${showSearch}
    notification-count=${notificationCount}
    show-notifications
    .apps=${defaultApps}
    .buttons=${buttons}
    .helpTooltip=${helpTooltip}
    .logoOptions=${defaultLogo}
    .profileMenuOptions=${profileMenuOptions}
    .searchTooltip=${searchTooltip}>
    <div slot="main" style="height:300px;">Render your own main menu.</div>

      <modus-list slot="addMenu">
        <modus-list-item>Menu Item 1</modus-list-item>
        <modus-list-item>Menu Item 2</modus-list-item>
      </modus-list>

    <div slot="notificationMenu">Render your own notification menu.</div>
    <div slot="profileMenu">Render your own profile menu content.</div>
  </modus-navbar>
`;

export const Default = Template.bind({});
Default.args = {
  enableSearchOverlay: false,
  buttons: [
    {
      id: 'addMenu', icon: 'add',
      tooltip: {
        text: 'Add',
      }
    },
    { id: 'notificationMenu', icon: 'notifications' },
  ],
  helpTooltip: undefined,
  profileMenuOptions: {
    avatarUrl: workingAvatarUrl,
    email: 'modus_user@trimble.com',
    initials: 'MU',
    signOutText: 'Sign out',
    username: 'Modus User',
    links: [
      {
        id: "link1",
        display: "Link 1",
        icon: "moon"
      },
      {
        id: "link2",
        display: "Link 2",
        icon: "sun"
      }
    ],
    tooltip: {
      text: 'User Profile Menu',
    }
  },
  searchTooltip: undefined,
  showHelp: false,
  showProfile: true,
  showSearch: false,
  notificationCount: 0
};

const FailedToLoadAvatarTemplate = ({ buttons, notificationCount, enableSearchOverlay, helpTooltip, profileMenuOptions, searchTooltip, showHelp, showProfile, showSearch }) => html`
  <modus-navbar
    enable-search-overlay=${enableSearchOverlay}
    show-apps-menu
    show-help=${showHelp}
    show-help
    show-main-menu
    show-notifications
    notification-count=${notificationCount}
    show-profile=${showProfile}
    show-search=${showSearch}
    .apps=${defaultApps}
    .buttons=${buttons}
    .helpTooltip=${helpTooltip}
    .logoOptions=${defaultLogo}
    .profileMenuOptions=${profileMenuOptions}
    .searchTooltip=${searchTooltip}>
    <div slot="main" style="height:300px;">Render your own main menu.</div>
    <div slot="notifications">Render your own notifications.</div>
  </modus-navbar>
`;

export const FailedAvatar = FailedToLoadAvatarTemplate.bind({});
FailedAvatar.args = {
  buttons: [],
  enableSearchOverlay: false,
  helpTooltip: undefined,
  profileMenuOptions: {
    avatarUrl: failingAvatarUrl,
    email: 'modus_user@trimble.com',
    initials: 'MU',
    signOutText: 'Sign out',
    username: 'Modus User',
  },
  searchTooltip: undefined,
  showHelp: false,
  showProfile: true,
  showSearch: false,
  notificationCount: 0
};

const BlueTemplate = ({ buttons, notificationCount, enableSearchOverlay, helpTooltip, profileMenuOptions, searchTooltip, showHelp, showProfile, showSearch }) => html`
  <modus-navbar
    enable-search-overlay=${enableSearchOverlay}
    show-apps-menu
    show-help=${showHelp}
    show-help
    show-main-menu
    show-notifications
    notification-count=${notificationCount}
    show-profile=${showProfile}
    show-search=${showSearch}
    variant="blue"
    .apps=${defaultApps}
    .buttons=${buttons}
    .helpTooltip=${helpTooltip}
    .logoOptions=${blueLogo}
    .profileMenuOptions=${profileMenuOptions}
    .searchTooltip=${searchTooltip}>
    <div slot="main" style="height:300px;">Render your own main menu.</div>
    <div slot="notifications">Render your own notifications.</div>
  </modus-navbar>
`;

export const BlueNavbar = BlueTemplate.bind({});
BlueNavbar.args = {
  buttons: [],
  enableSearchOverlay: false,
  helpTooltip: undefined,
  profileMenuOptions: {
    avatarUrl: workingAvatarUrl,
    email: 'modus_user@trimble.com',
    initials: 'MU',
    signOutText: 'Sign out',
    username: 'Modus User',
  },
  searchTooltip: undefined,
  showHelp: false,
  showProfile: true,
  showSearch: false,
  notificationCount: 0
};

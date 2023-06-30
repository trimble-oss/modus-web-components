// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-navbar-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Navbar',
  argTypes: {
    profileMenuOptions: {
      name: 'profileMenuOptions',
      description: 'Set the options for profile menu',
      table: {
        type: { summary: 'object' }
      },
    },
    buttons: {
      name: 'buttons',
      description: 'To add icon buttons dynamically to the Navbar, create an array of ModusNavbarButton.',
      table: {
        type: { summary: 'object' }
      },
    }
  },
  parameters: {
    docs: {
      page: docs,
      inlineStories: true,
    },
    options: {
      isToolshown: true,
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    viewMode: 'docs',
  },
};

const Template = ({ profileMenuOptions, buttons }) => html`
  <modus-navbar
    id="working"
    show-apps-menu
    show-help
    show-main-menu>
    <div slot="main" style="height:300px;">Render your own main menu.</div>
    <div slot="addMenu">Render your own add menu.</div>
    <div slot="notificationMenu">Render your own notification menu.</div>
  </modus-navbar>
  ${setNavbar(true, '#working', profileMenuOptions, '', '', buttons)}
`;
export const Default = Template.bind({});
Default.args = {
  profileMenuOptions: {
    email: 'modus_user@trimble.com',
    initials: 'MU',
    username: 'Modus User',
  },
  buttons: [
    { id: 'addMenu', icon: 'add' },
    { id: 'notificationMenu', icon: 'notifications' }
  ]
};

const FailedToLoadAvatarTemplate = ({ profileMenuOptions, buttons }) => html`
  <modus-navbar
    id="broken"
    show-apps-menu
    show-help
    show-main-menu
    show-notifications>
    <div slot="main" style="height:300px;">Render your own main menu.</div>
    <div slot="notifications">Render your own notifications.</div>
  </modus-navbar>
  ${setNavbar(false, '#broken', profileMenuOptions, '', '', buttons)}
`;
export const FailedAvatar = FailedToLoadAvatarTemplate.bind({});
FailedAvatar.args = {
  profileMenuOptions: {
    email: 'modus_user@trimble.com',
    initials: 'MU',
    username: 'Modus User',
  },
  buttons: []
};
const BlueTemplate = ({ profileMenuOptions, buttons }) => html`
  <modus-navbar
    id="blue-theme"
    show-apps-menu
    show-help
    show-main-menu
    show-notifications
    variant="blue">
    <div slot="main" style="height:300px;">Render your own main menu.</div>
    <div slot="notifications">Render your own notifications.</div>
  </modus-navbar>
  ${setNavbar(
  false,
  '#blue-theme',
  profileMenuOptions,
  'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
  'https://modus-bootstrap.trimble.com/img/trimble-icon-rev.svg',
  buttons
)}
`;
export const BlueNavbar = BlueTemplate.bind({});
BlueNavbar.args = {
  profileMenuOptions: {
    email: 'modus_user@trimble.com',
    initials: 'MU',
    username: 'Modus User',
  },
  buttons: []
};

const setNavbar = (
  workingAvatar: boolean,
  id: string,
  profileMenuOptions,
  logoUrl = '',
  iconUrl = '',
  buttons
) => {
  const tag = document.createElement('script');
  profileMenuOptions.avatarUrl = workingAvatar
    ? 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e738c17-7f3c-422e-8225-f8c782b08626/d9pordj-43d4aa59-54b0-46a1-a568-e36dd691cf27.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBlNzM4YzE3LTdmM2MtNDIyZS04MjI1LWY4Yzc4MmIwODYyNlwvZDlwb3Jkai00M2Q0YWE1OS01NGIwLTQ2YTEtYTU2OC1lMzZkZDY5MWNmMjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xvDk9KFIUAx0yAG3BPamDfRqmWUX6zwR4WVW40GjsoY'
    : 'broken-link';

  tag.innerHTML = `
        document.querySelector('${id}').apps = [
          { description: 'The One Trimble Design System', logoUrl: 'https://modus.trimble.com/favicon.svg', name: 'Trimble Modus', url: 'https://modus.trimble.com/' }
        ];
        document.querySelector('${id}').logoOptions = { 
          primary:{url: '${logoUrl || 'https://modus.trimble.com/img/trimble-logo.svg'
    }'}, 
          secondary:{url: '${iconUrl || 'https://modus.trimble.com/favicon.svg'
    }'} 
        };
        document.querySelector('${id}').profileMenuOptions = ${JSON.stringify(profileMenuOptions)};
        document.querySelector('${id}').profileMenuTooltip = {
          text: '${profileMenuOptions?.tooltip?.text || ''}',
          ariaLabel: '${profileMenuOptions?.tooltip?.ariaLabel}',
        };
        document.querySelector('${id}').buttons = ${JSON.stringify(buttons)};
  `;

  return tag;
};

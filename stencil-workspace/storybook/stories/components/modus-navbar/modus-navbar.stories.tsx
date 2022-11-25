// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-navbar-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Navbar',
  parameters: {
    docs: {
      inlineStories: true,
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    controls: {
      disabled: true,
    },
    viewMode: 'docs',
  },
};

const Template = () => html`
  <modus-navbar
    id="working"
    show-apps-menu
    show-help-menu
    show-main-menu
    show-notifications>
    <div slot="main">Render your own main menu.</div>
    <div slot="notifications">Render your own notifications.</div>
  </modus-navbar>
  ${setNavbar(true, '#working')}
`;
export const Default = Template.bind({});

const FailedToLoadAvatarTemplate = () => html`
  <modus-navbar
    id="broken"
    show-apps-menu
    show-help-menu
    show-main-menu
    show-notifications>
    <div slot="main">Render your own main menu.</div>
    <div slot="notifications">Render your own notifications.</div>
  </modus-navbar>
  ${setNavbar(false, '#broken')}
`;
export const FailedAvatar = FailedToLoadAvatarTemplate.bind({});

const setNavbar = (workingAvatar: boolean, id: string) => {
  const tag = document.createElement('script');
  const avatarUrl = workingAvatar
    ? 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0e738c17-7f3c-422e-8225-f8c782b08626/d9pordj-43d4aa59-54b0-46a1-a568-e36dd691cf27.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBlNzM4YzE3LTdmM2MtNDIyZS04MjI1LWY4Yzc4MmIwODYyNlwvZDlwb3Jkai00M2Q0YWE1OS01NGIwLTQ2YTEtYTU2OC1lMzZkZDY5MWNmMjcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xvDk9KFIUAx0yAG3BPamDfRqmWUX6zwR4WVW40GjsoY'
    : 'broken-link';

  tag.innerHTML = `
        document.querySelector('${id}').apps = [
          { description: 'The One Trimble Design System', logoUrl: 'https://modus.trimble.com/favicon.svg', name: 'Trimble Modus', url: 'https://modus.trimble.com/' }
        ];
        document.querySelector('${id}').productLogoOptions = { url: 'https://modus.trimble.com/img/trimble-logo.svg' };
        document.querySelector('${id}').profileMenuOptions = {
          avatarUrl: '${avatarUrl}',
          email: 'modus_user@trimble.com',
          initials: 'MU',
          username: 'Modus User',
        };
  `;

  return tag;
};

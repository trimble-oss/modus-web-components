// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-navbar-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Navbar',
  parameters: {
    docs: {
      inlineStories: false,
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
  <modus-navbar show-apps-menu show-help-menu show-main-menu show-notifications>
    <div slot="main">Render your own main menu.</div>
    <div slot="notifications">Render your own notifications.</div>
  </modus-navbar>
  ${setNavbar()}
`;
export const Default = Template.bind({});

const setNavbar = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
        document.body.setAttribute('data-mwc-theme', localStorage.getItem("data-mwc-theme") || 'light');
        window.addEventListener('storage', () => {
          document.body.setAttribute('data-mwc-theme', localStorage.getItem("data-mwc-theme") || 'light');
        });
        document.querySelector('modus-navbar').apps = [
          { description: 'The One Trimble Design System', logoUrl: 'https://modus.trimble.com/favicon.svg', name: 'Trimble Modus', url: 'https://modus.trimble.com/' }
        ];
        document.querySelector('modus-navbar').productLogoOptions = { url: 'https://modus.trimble.com/img/trimble-logo.svg' };
        document.querySelector('modus-navbar').profileMenuOptions = {
          avatarUrl: '/023-student.svg',
          email: 'modus_user@trimble.com',
          initials: 'MU',
          username: 'Modus User',
        };
  `;

  return tag;
};

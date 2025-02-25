import { ModusNavbar } from '@trimble-oss/modus-react-components';

export default function ModusNavbarExamples() {
  const appMenuOptions = [
    {
      description: 'The One Trimble Design System',
      logoUrl: 'https://modus.trimble.com/favicon.svg',
      name: 'Trimble Modus',
      url: 'https://modus.trimble.com/',
      category: '',
      showCategory: false,
    },
  ];

  const logoOptions = {
    primary: {
      url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
      height: '24',
    },
    secondary: { url: 'https://modus.trimble.com/favicon.svg', height: '24' },
  };
  const profileMenuOptions = {
    email: 'modus_user@trimble.com',
    initials: 'MU',
    username: 'Modus User',
  };

  const buttons = [
    { id: 'addMenu', icon: 'add', tooltip: { text: '' }, orderIndex: 1 },
    { id: 'notificationMenu', icon: 'notifications', tooltip: { text: '' }, orderIndex: 1 },
  ];

  return (
    <>
      <h3>Navbar</h3>
      <ModusNavbar
        onMainMenuClick={(e) => {
          const panel = document.querySelector('modus-side-navigation');
          if (panel) panel.expanded = !panel.expanded;
        }}
        id="navbar"
        show-apps-menu
        show-help
        show-main-menu
        apps={appMenuOptions}
        logoOptions={logoOptions}
        profileMenuOptions={profileMenuOptions}
        buttons={buttons}>
        <div slot="main" style={{ height: '300px' }}>
          Render your own main menu.
        </div>
        <div slot="notificationMenu">Render your own notification menu.</div>
        <div slot="addMenu">Render your own add menu.</div>
      </ModusNavbar>
    </>
  );
}

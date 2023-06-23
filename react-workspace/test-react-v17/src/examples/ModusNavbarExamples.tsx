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
  const productLogoOptions = { url: 'https://modus.trimble.com/img/trimble-logo.svg' };
  const profileMenuOptions = {
    email: 'modus_user@trimble.com',
    initials: 'MU',
    username: 'Modus User',
  };

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
        show-notifications
        apps={appMenuOptions}
        productLogoOptions={productLogoOptions}
        profileMenuOptions={profileMenuOptions}>
        <div slot="main" style={{ height: '300px' }}>
          Render your own main menu.
        </div>
        <div slot="notifications">Render your own notifications.</div>
      </ModusNavbar>
    </>
  );
}

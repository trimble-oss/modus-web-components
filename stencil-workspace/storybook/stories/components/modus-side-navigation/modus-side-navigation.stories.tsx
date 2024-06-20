// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-side-navigation-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Side Navigation',
  argTypes: {
    collapseOnClickOutside: {
      name: 'collapse-on-click-outside',
      description: ' To choose whether to collapse the panel when clicked outside',
      table: {
        type: { summary: 'boolean' },
      },
    },
    data: {
      description: 'Data property to create the side navigation items',
      table: {
        type: { summary: 'ModusSideNavigationItemInfo' },
      },
    },
    maxWidth: {
      name: 'max-width',
      description: 'Maximum width of the side navigation panel in an expanded state',
      table: {
        defaultValue: { summary: '256px' },
        type: { summary: 'string' },
      },
    },
    mode: {
      control: {
        options: ['overlay', 'push'],
        type: 'select',
      },
      description:
        'Mode to make side navigation either overlay or push the content for the selector specified in `targetContent`',
      table: {
        defaultValue: { summary: `'overlay'` },
        type: {
          summary: `'overlay' | 'push'`,
        },
      },
    },
    expanded: {
      description: 'The expanded state of side navigation panel and items',
      table: {
        type: { summary: 'boolean' },
      },
    },
    targetContent: {
      name: 'target-content',
      description:
        "Specify the selector for the page's content for which paddings and margins will be set by side navigation based on the `mode`",
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    actions: {
      handles: ['sideNavExpand', 'sideNavItemClicked', 'mainMenuClick'],
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    viewMode: 'docs',
  },
};

const DefaultTemplate = ({ collapseOnClickOutside, maxWidth, mode, expanded, targetContent }) => html`
  <div id="defaultTemplate">
    <div
      style="width: 100%;align-items: center;height: 56px;box-shadow: 0 0 2px var(--modus-secondary)!important; margin-top: 50px;">
      <modus-navbar id="navbar" show-apps-menu show-help show-main-menu show-notifications> </modus-navbar>
    </div>

    <div
      id="container"
      style="display:flex; min-height:500px; overflow-y: auto; position: relative;box-shadow: 0 0 2px var(--modus-secondary)!important;">
      <modus-side-navigation
        max-width=${maxWidth}
        id="sideNav"
        collapse-on-click-outside=${collapseOnClickOutside}
        mode=${mode}
        expanded=${expanded}
        target-content=${targetContent}>
        <modus-side-navigation-item id="home-menu" label="Home page">
          <modus-icon name="home" size="24" slot="menu-icon"></modus-icon>
        </modus-side-navigation-item>
        <modus-side-navigation-item id="usage-menu" label="Usage">
          <modus-icon name="flowchart" size="24" slot="menu-icon"></modus-icon>
        </modus-side-navigation-item>
        <modus-side-navigation-item id="styles-menu" label="Styles">
          <modus-icon name="bar_graph_line" size="24" slot="menu-icon"></modus-icon>
        </modus-side-navigation-item>
        <modus-side-navigation-item id="accessibility-menu" label="Accessibility">
          <modus-icon name="screen" size="24" slot="menu-icon"></modus-icon>
        </modus-side-navigation-item>
      </modus-side-navigation>

      <div id="panelcontent" style="padding: 10px;">
        <div id="overview">
          <p>
            The side navigation of an application provides context through accessible menu options and positions a consistent
            component to connect to various pages in the application.
          </p>
          <p>
            The side navigation is a collapsible side content of the site’s pages. It is located alongside the page’s primary
            content. The component is designed to add side content to a fullscreen application. It is activated through the
            “hamburger” menu in the Navbar.
          </p>
        </div>
      </div>
    </div>
  </div>
  ${setJavascriptDefaultTemplate('defaultTemplate')}
`;
export const Default = DefaultTemplate.bind({});
Default.args = {
  collapseOnClickOutside: true,
  maxWidth: '300px',
  mode: 'overlay',
  expanded: false,
  targetContent: '#defaultTemplate #panelcontent',
};

const SideNavigationWithDataTemplate = ({ collapseOnClickOutside, maxWidth, mode, expanded, targetContent }) => html`
  <div id="dataTemplate">
    <modus-switch id="switch-theme" label="Enable blue theme"></modus-switch>
    <br />
    <modus-switch id="switch-mode" label="Enable Push Side Navigation"></modus-switch>
    <div
      style="width: 100%;align-items: center;height: 56px;box-shadow: 0 0 2px var(--modus-secondary)!important; margin-top: 10px;">
      <modus-navbar id="navbar" show-apps-menu show-help show-main-menu show-notifications> </modus-navbar>
    </div>

    <div
      id="container"
      style="display:flex; min-height:500px; overflow-y: auto; position: relative;box-shadow: 0 0 2px var(--modus-secondary)!important;">
      <modus-side-navigation
        max-width=${maxWidth}
        id="sideNav"
        collapse-on-click-outside=${collapseOnClickOutside}
        mode=${mode}
        expanded=${expanded}
        target-content=${targetContent}>
      </modus-side-navigation>

      <div id="panelcontent" style="padding:10px; transition: all 0.25s linear 0s;">
        <div id="overview">
          <p>
            The side navigation of an application provides context through accessible menu options and positions a consistent
            component to connect to various pages in the application.
          </p>
          <p>
            The side navigation is a collapsible side content of the site’s pages. It is located alongside the page’s primary
            content. The component is designed to add side content to a fullscreen application. It is activated through the
            “hamburger” menu in the Navbar.
          </p>
        </div>
      </div>
    </div>
  </div>
  ${setJavascriptDataTemplate('dataTemplate')}
`;
export const SideNavigationWithData = SideNavigationWithDataTemplate.bind({});
SideNavigationWithData.args = {
  collapseOnClickOutside: true,
  maxWidth: '300px',
  mode: 'overlay',
  expanded: true,
  targetContent: '#dataTemplate #panelcontent',
};

const helpers = (containerId) => {
  return `
  // Workaround start
  // Workaround for storybook running event listeners more than once
  function executeListener( e, callback){
    const attr='data-'+'${containerId}'+'-'+e.target.id+'-timestamp';
    if(e.timeStamp.toString() !== document.body.getAttribute(attr)) {
      document.body.setAttribute(attr, e.timeStamp);
      callback();
    }
  }

  //DOM queries 'document.querySelector' will give a wrong result because the story template code each gets duplicated twice, one for canvas tab and another one for docs tab
  // ex: <iframe id="storybook-preview-iframe"> -> <div id='root'> and <div id="docs-root">

  function getRoot(){
    const canvas = document.querySelector('#root');
    const docs = document.querySelector('#docs-root');
    if(docs?.children?.length) root = docs;
    else root = canvas;
    return root.querySelector('#${containerId}');
  }
  // Workaround end


  getRoot().querySelector('#navbar').logoOptions = {
    primary: {
      url: 'https://modus.trimble.com/img/trimble-logo.svg',
    },
  };
  getRoot().querySelector('#navbar').profileMenuOptions = {
    avatarUrl: 'https://avatar.example.com/broken-image-link.png',
    email: 'modus_user@trimble.com',
    initials: 'MU',
    username: 'Modus User',
  };
`;
};

const setJavascriptDefaultTemplate = (containerId) => {
  const tag = document.createElement('script');
  tag.innerHTML = `
  function defaultTemplate(){
    ${helpers(containerId)}

    function addEventHandlers(){
      getRoot().addEventListener('mainMenuClick', (e)=> {
        executeListener(e, ()=>{
          const panel = getRoot().querySelector('modus-side-navigation');
          panel.expanded = !panel.expanded;
        });
      });

      Array.from(getRoot().querySelectorAll('modus-side-navigation-item')).forEach(c => {
        c.addEventListener('sideNavItemClicked', function callbackfn(e){
          executeListener(e, () => {
            if(e.detail){
              const panel =getRoot().querySelector('#panelcontent');
              getRoot().querySelector('#sidenav-content-title')?.remove();
              const el = document.createElement('h3');
              el.id="sidenav-content-title";
              el.innerHTML = getRoot().querySelector("#"+e.detail.id)?.label || "Home page";
              panel.insertBefore(el, getRoot().querySelector('#overview'))
            }
          });
        });
      });
    }

    addEventHandlers();
  }
  defaultTemplate();
  `;

  return tag;
};

const setJavascriptDataTemplate = (containerId) => {
  const homeIcon = 'home';
  const usageIcon = 'flowchart';
  const stylesIcon = 'bar_graph_line';
  const accessibilityIcon = 'screen';

  const selectionHandler = `
    onSideNavItemClicked: (e)=>{
      executeListener(e, () => {
        if(e.detail){
          const panel =getRoot().querySelector('#panelcontent');
          document.querySelector('#sidenav-content-title')?.remove();
          const el = document.createElement('h3');
          el.id="sidenav-content-title";
          el.innerHTML = e.target?.label || "Home page";
          panel.insertBefore(el, getRoot().querySelector('#overview'))
        }
      });
    },
    `;

  const blueTheme = `--modus-side-navigation-link-color:#ffffff;--modus-side-navigation-bg:#0e416c;--modus-side-navigation-item-color:#ffffff;--modus-side-navigation-item-active-bg:#217cbb;--modus-side-navigation-item-hover-bg:#0063a3;--modus-side-navigation-item-icon-color:#ffffff;--modus-side-navigation-item-chevron-color:#ffffff;--modus-side-navigation-item-icon-filter:invert(100%) sepia(0%) saturate(24%) hue-rotate(114deg) brightness(108%) contrast(108%);`;

  const tag = document.createElement('script');
  tag.innerHTML = `
  function dataTemplate(){
    ${helpers(containerId)}

    function initialize(){
      const sidenav = getRoot().querySelector('modus-side-navigation');
      sidenav.data=[
        {
          id:'home-menu',
          menuIcon: "${homeIcon}",
          label: 'Home page 1',
          children: [
            {
              id:'home-menu-2',
              menuIcon: "${homeIcon}",
              label: 'Home page 2',
              ${selectionHandler}
            },
            {
              id:'usage-menu-2',
              children: [
                {
                  id:'home-menu-3',
                  menuIcon: "${homeIcon}",
                  label: 'Home page 3',
                  ${selectionHandler}
                }],
              menuIcon: "${usageIcon}",
              label: 'Usage page 2'
            }],
        },
        {
          id:'usage-menu',
          menuIcon: "${usageIcon}"            ,
          label: 'Usage page 1',
          ${selectionHandler}
        },
        {
          id:'styles-menu',
          menuIcon: "${stylesIcon}",
          label: 'Styles page 1',
          ${selectionHandler}
        },
        {
          id:'accessibility-menu',
          menuIcon: "${accessibilityIcon}",
          label: 'Accessibility page 1',
          ${selectionHandler}
        },
      ];
    }

    function addEventHandlers(){
      getRoot().addEventListener('mainMenuClick', (e)=> {
        executeListener(e, ()=>{
          const panel = getRoot().querySelector('modus-side-navigation');
          panel.expanded = !panel.expanded;
        });
      });

      getRoot().querySelector("#switch-theme").addEventListener('switchClick', (e)=> {
        const sidenav = getRoot().querySelector('modus-side-navigation');
        if(e.detail){
          sidenav.style = "${blueTheme}";
        }
        else sidenav.style = '';
      });

      getRoot().querySelector("#switch-mode").addEventListener('switchClick', (e)=> {

        const sidenav = getRoot().querySelector('modus-side-navigation');
        sidenav.mode = sidenav.mode === 'push' ? 'overlay' : 'push';
      });
    }

    initialize();
    addEventHandlers();

  }

  dataTemplate();
  `;

  return tag;
};

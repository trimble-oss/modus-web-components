// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-side-navigation-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Side Navigation',
  parameters: {
    docs: {
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

const DefaultTemplate = () => html`
  <div id="defaultTemplate">
    <div
      style="width: 100%;align-items: center;height: 56px;box-shadow: 0 0 2px var(--modus-secondary)!important; margin-top: 50px;">
      <modus-navbar
        id="navbar"
        show-apps-menu
        show-help
        show-main-menu
        show-notifications>
      </modus-navbar>
    </div>

    <div
      id="container"
      style="display:flex; min-height:500px; overflow-y: auto; position: relative;box-shadow: 0 0 2px var(--modus-secondary)!important;">
      <modus-side-navigation max-width="300px" id="sideNav">
        <modus-side-navigation-item id="home-menu" label="Home page">
          <svg
            slot="menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="24"
            width="24"
            viewBox="0 0 32 32">
            <style>
              .st1 {
                stroke: #000;
                stroke-miterlimit: 10;
              }
            </style>
            <path
              d="M30.707 15.293 26 10.586V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.586l-4.293-4.293a1 1 0 0 0-1.414 0l-13 13A1 1 0 0 0 4 17h3v12a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-7h6v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V17h3a1 1 0 0 0 .707-1.707z" />
          </svg>
        </modus-side-navigation-item>
        <modus-side-navigation-item id="usage-menu" label="Usage">
          <svg
            slot="menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="24"
            width="24"
            viewBox="0 0 32 32">
            <g>
              <path
                d="M30 23v6c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-5h-8v5h2c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-5H7v5h2c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-6c0-.55.45-1 1-1h9v-5h-2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-2v5h9c.55 0 1 .45 1 1v6h2c.55 0 1 .45 1 1z" />
            </g>
          </svg>
        </modus-side-navigation-item>
        <modus-side-navigation-item id="styles-menu" label="Styles">
          <svg
            slot="menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="24"
            width="24"
            viewBox="0 0 32 32">
            <path
              d="M30 25h-1v-9a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v9h-2V5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v20h-2V12a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13H3a1 1 0 1 0 0 2h27a1 1 0 1 0 0-2zM6 25V13h3v12H6zm9 0V6h3v19h-3zm9 0v-8h3v8h-3z" />
          </svg>
        </modus-side-navigation-item>
        <modus-side-navigation-item
          id="accessibility-menu"
          label="Accessibility">
          <svg
            slot="menu-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="24"
            width="24"
            viewBox="0 0 32 32">
            <g>
              <path
                d="M29 4H3c-.55 0-1 .45-1 1v17c0 .55.45 1 1 1h12v3h-4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1h-4v-3h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 17H4v-2h24v2z" />
            </g>
          </svg>
        </modus-side-navigation-item>
      </modus-side-navigation>

      <div id="panelcontent">
        <div id="overview">
          <p>
            The side navigation of an application provides context through
            accessible menu options and positions a consistent component to
            connect to various pages in the application.
          </p>
          <p>
            The side navigation is a collapsible side content of the site’s
            pages. It is located alongside the page’s primary content. The
            component is designed to add side content to a fullscreen
            application. It is activated through the “hamburger” menu in the
            Navbar.
          </p>
        </div>
      </div>
    </div>
  </div>
  ${setJavascriptDefaultTemplate('defaultTemplate')}
`;
export const Default = DefaultTemplate.bind({});

const SideNavigationWithDataTemplate = () => html`
  <div id="dataTemplate">
    <modus-switch id="switch-theme" label="Enable blue theme"></modus-switch>
    <br />
    <modus-switch
      id="switch-mode"
      label="Enable Push Side Navigation"></modus-switch>
    <div
      style="width: 100%;align-items: center;height: 56px;box-shadow: 0 0 2px var(--modus-secondary)!important; margin-top: 10px;">
      <modus-navbar
        id="navbar"
        show-apps-menu
        show-help
        show-main-menu
        show-notifications>
      </modus-navbar>
    </div>

    <div
      id="container"
      style="display:flex; min-height:500px; overflow-y: auto; position: relative;box-shadow: 0 0 2px var(--modus-secondary)!important;">
      <modus-side-navigation
        max-width="300px"
        id="sideNav"
        target-content="#dataTemplate #panelcontent"
        mode="overlay">
      </modus-side-navigation>

      <div id="panelcontent" style="padding:10px;">
        <div id="overview">
          <p>
            The side navigation of an application provides context through
            accessible menu options and positions a consistent component to
            connect to various pages in the application.
          </p>
          <p>
            The side navigation is a collapsible side content of the site’s
            pages. It is located alongside the page’s primary content. The
            component is designed to add side content to a fullscreen
            application. It is activated through the “hamburger” menu in the
            Navbar.
          </p>
        </div>
      </div>
    </div>
  </div>
  ${setJavascriptDataTemplate('dataTemplate')}
`;
export const SideNavigationWithData = SideNavigationWithDataTemplate.bind({});

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


  getRoot().querySelector('#navbar').productLogoOptions = { url: 'https://modus.trimble.com/img/trimble-logo.svg' };
  getRoot().querySelector('#navbar').profileMenuOptions = {
    avatarUrl: 'broken-link',
    email: 'modus_user@trimble.com',
    initials: 'MU',
    username: 'Modus User',
  };
`;
};

const setJavascriptDefaultTemplate = (containerId) => {
  const tag = document.createElement('script');
  tag.innerHTML = `
  function defaultTempalte(){
    ${helpers(containerId)}

    function addEventHandlers(){
      document.addEventListener('mainMenuClick', (e)=> {
        executeListener(e, ()=>{
          const panel = getRoot().querySelector('modus-side-navigation');
          panel.expanded = !panel.expanded;
        });
      });

      getRoot().querySelector('modus-side-navigation').addEventListener('sideNavExpand', (e)=>{
        executeListener(e, ()=>{
          const content =getRoot().querySelector('#panelcontent');
          const expanded = e.detail;
          if(expanded) {
            content.style.marginLeft="310px";
          }
          else{
            content.style.marginLeft="70px";
          }
        });
      });

      Array.from(getRoot().querySelectorAll('modus-side-navigation-item')).forEach(c => {
        c.addEventListener('sideNavItemSelected', function callbackfn(e){
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
  defaultTempalte();
  `;

  return tag;
};

const setJavascriptDataTemplate = (containerId) => {
  const homeIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cstyle%3E .st1 %7B stroke: %23000; stroke-miterlimit: 10; %7D %3C/style%3E%3Cpath d='M30.707 15.293 26 10.586V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.586l-4.293-4.293a1 1 0 0 0-1.414 0l-13 13A1 1 0 0 0 4 17h3v12a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-7h6v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V17h3a1 1 0 0 0 .707-1.707z' /%3E%3C/svg%3E";

  const usageIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cg%3E%3Cpath d='M30 23v6c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-5h-8v5h2c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-5H7v5h2c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1h2v-6c0-.55.45-1 1-1h9v-5h-2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1h-2v5h9c.55 0 1 .45 1 1v6h2c.55 0 1 .45 1 1z' /%3E%3C/g%3E%3C/svg%3E";

  const stylesIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cpath d='M30 25h-1v-9a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v9h-2V5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v20h-2V12a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13H3a1 1 0 1 0 0 2h27a1 1 0 1 0 0-2zM6 25V13h3v12H6zm9 0V6h3v19h-3zm9 0v-8h3v8h-3z' /%3E%3C/svg%3E";

  const accessibilityIcon =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='24' width='24' viewBox='0 0 32 32'%3E%3Cg%3E%3Cpath d='M29 4H3c-.55 0-1 .45-1 1v17c0 .55.45 1 1 1h12v3h-4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1h-4v-3h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 17H4v-2h24v2z' /%3E%3C/g%3E%3C/svg%3E";

  const selectionHandler = `
    onSideNavItemSelected: (e)=>{
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

  const blueTheme = `--modus-side-navigation-bg:#0e416c;--modus-side-navigation-item-color:#ffffff;--modus-side-navigation-item-active-bg:#217cbb;--modus-side-navigation-item-hover-bg:#0063a3;--modus-side-navigation-item-icon-color:#ffffff;--modus-side-navigation-item-chevron-color:#ffffff;--modus-side-navigation-item-icon-filter:invert(100%) sepia(0%) saturate(24%) hue-rotate(114deg) brightness(108%) contrast(108%);`;

  const tag = document.createElement('script');
  tag.innerHTML = `
  function dataTemplate(){
    ${helpers(containerId)}

    function initialize(){
      const sidenav = getRoot().querySelector('modus-side-navigation');
      sidenav.data=[
        {
          id:'home-menu',
          menuIconUrl: "${homeIcon}",
          label: 'Home page 1',
          children: [
            {
              id:'home-menu-2',
              menuIconUrl: "${homeIcon}",
              label: 'Home page 2',
              ${selectionHandler}
            },
            {
              id:'usage-menu-2',
              children: [
                {
                  id:'home-menu-3',
                  menuIconUrl: "${homeIcon}",
                  label: 'Home page 3',
                  ${selectionHandler}
                }],
              menuIconUrl: "${usageIcon}"            ,
              label: 'Usage page 2',
              ${selectionHandler}
            }],
        },
        {
          id:'usage-menu',
          menuIconUrl: "${usageIcon}"            ,
          label: 'Usage page 1',
          ${selectionHandler}
        },
        {
          id:'styles-menu',
          menuIconUrl: "${stylesIcon}",
          label: 'Styles page 1',
          ${selectionHandler}
        },
        {
          id:'accessibility-menu',
          menuIconUrl: "${accessibilityIcon}",
          label: 'Accessibility page 1',
          ${selectionHandler}
        },
      ];
    }

    function addEventHandlers(){
      document.addEventListener('mainMenuClick', (e)=> {
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
        debugger;
        const sidenav = getRoot().querySelector('modus-side-navigation');
        sidenav.mode = sidenav.mode === 'push' ? 'overlay' : 'push';
      });

      Array.from(getRoot().querySelectorAll('modus-side-navigation-item')).forEach(c => {
        c.addEventListener('sideNavItemSelected', function callbackfn(e){
          executeListener(e, () => {
            if(e.detail){
              const panel =getRoot().querySelector('#panelcontent');
              document.querySelector('#dummy-text')?.remove();
              const el = document.createElement('h3');
              el.id="dummy-text";
              el.innerHTML = getRoot().querySelector("#"+e.detail.id)?.label || "Home page";
              panel.insertBefore(el, getRoot().querySelector('#overview'))
            }
          });
        });
      });
    }

    initialize();
    addEventHandlers();

  }

  dataTemplate();
  `;

  return tag;
};

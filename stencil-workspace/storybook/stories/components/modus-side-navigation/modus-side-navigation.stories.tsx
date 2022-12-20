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

const Template = () => html`
<nav style="display:flex; width: 100%;align-items: center;height: 56px;box-shadow: 0 0 2px var(--modus-border-color)!important;">
  <modus-button
  button-style="borderless" color="primary"
  id="collapseExpand" style="padding: 10px;
  --modus-btn-text-primary-hover-bg: var(--modus-navbar-icon-hover-bg, #e0e1e9);
  --modus-btn-text-primary-hover-color: var(--modus-navbar-icon-hover-color, #3c444a);
  --modus-btn-text-primary-active-bg: var(--modus-navbar-icon-active-bg, #cbcdd6);">
    <svg  height="32" width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill='#6A6976' />
    </svg>
  </modus-button>
  <img  height='24' src="https://modus.trimble.com/img/trimble-logo.svg" alt="Modus navbar product logo" />
</nav>

<div
id="container"
style="display:flex; min-height:500px; overflow-y: auto; position: relative;box-shadow: 0 0 2px var(--modus-border-color)!important;">
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
      xmlns="http://www.w3.org/2000/svg"
      slot="menu-icon"
      fill="currentColor"
      height="24"
      width="24"
      viewBox="0 0 32 32">
      <path
        d="M16 3C11.184 3 6 4.252 6 7v18c0 2.748 5.184 4 10 4s10-1.252 10-4V7c0-2.748-5.184-4-10-4zm0 2c5.249 0 8 1.486 8 2s-2.751 2-8 2c-5.25 0-8-1.486-8-2s2.75-2 8-2zm0 22c-5.25 0-8-1.486-8-2v-3.476C9.95 22.525 13.041 23 16 23s6.05-.475 8-1.476V25c0 .514-2.751 2-8 2zm0-6c-5.25 0-8-1.486-8-2v-3.476C9.95 16.525 13.041 17 16 17s6.05-.475 8-1.476V19c0 .514-2.751 2-8 2zm0-6c-5.25 0-8-1.486-8-2V9.524C9.95 10.525 13.041 11 16 11s6.05-.475 8-1.476V13c0 .514-2.751 2-8 2z" />
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
  <modus-side-navigation-item id="accessibility-menu" label="Accessibility and the text is really longggggggggg..">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      slot="menu-icon"
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
        d="M25.659 17.274c.056-.422.085-.848.087-1.274a10.145 10.145 0 0 0-.087-1.274l2.743-2.145a.656.656 0 0 0 .156-.832l-2.6-4.498a.653.653 0 0 0-.793-.286l-3.237 1.3a9.497 9.497 0 0 0-2.197-1.274l-.494-3.445A.633.633 0 0 0 18.6 3h-5.2a.634.634 0 0 0-.637.546l-.49 3.445a9.989 9.989 0 0 0-2.197 1.274l-3.237-1.3a.634.634 0 0 0-.793.286l-2.6 4.498a.641.641 0 0 0 .156.832l2.739 2.145c-.057.422-.087.848-.091 1.274.004.426.034.852.091 1.274l-2.743 2.145a.656.656 0 0 0-.156.832l2.6 4.498c.16.276.494.397.793.286l3.237-1.3c.672.521 1.41.95 2.197 1.274l.494 3.445c.044.317.317.55.637.546h5.2c.32.005.593-.23.637-.546l.494-3.445a9.985 9.985 0 0 0 2.197-1.274l3.237 1.3c.299.12.64-.003.793-.286l2.6-4.498a.656.656 0 0 0-.156-.832l-2.743-2.145zM16 20c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" />
    </svg>
  </modus-side-navigation-item>
</modus-side-navigation>
<div id="panelcontent" style="margin-left:70px; padding:10px;transition: all 0.25s linear 0s;">
  <div id="home">
  <h4>Overview</h4>
    The side navigation of an
    application provides context through accessible menu options and
    positions a consistent component to connect to various pages in the
    application.
  </div>
  <div id="usage" style="display:none;">
    <h4>Don't use when:</h4>
    <ul>
      <li>Your application only has one page of content.</li>
      <li>
        You need to provide page-specific actions (such as Save, Edit,
        etc.). Use a Toolbar instead – Coming soon!
      </li>
      <li>Navigational items need to be loaded.</li>
      <li>
        You need to show a content tree. Use a
        <a href="/components/web/content-tree/">Content Tree</a> instead.
      </li>
      <li>Items in the side nav need to open dialogs.</li>
      <li>
        You’re designing for a mobile application - use the mobile specific
        side navigation – Coming soon!
      </li>
    </ul>
  </div>
  <div id="styles" style="display:none;">
    <h4>Animation</h4>
      <ul>
        <li>Ease in: 250mm; Ease out: 200mm</li><li>The side nav slides in from the left to the right, when the menu is expanded or opened.</li><li>The side nav slides in from the left to the right, when the user navigates to the next menu level.</li><li>The side nav slides in right to left, when the user clicks a back button.</li></ul>
    </div>
  <div id="accessibility" style="display:none;">
    <h4>Accessibility</h4>
      <ul>
        <li>Use unordered list <code>&lt;ul&gt;</code> groups for side navigation.</li><li>Place side navigation (the list group) in a <code>nav</code> element. The <code>nav</code> element should also be marked with <code>aria-label="side navigation"</code> to clearly describe the type of navigation.</li><li>Use the <code>aria-current="true"</code> attribute to indicate the item that is currently selected, or—in a navigational context—use <code>aria-current="page"</code> to indicate the page that is currently selected. The <code>aria-current</code> attribute should be updated when the user makes a selection.</li><li>Make sure the tab order matches the hierarchy and that the user can navigate through all levels and items with a keyboard.</li></ul>
    </span>
</div>
</div>
  ${setJavascript()}
`;
export const Default = Template.bind({});

const setJavascript = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
  // Workaround start
  // Workaround for storybook running event listeners more than once
  function executeListener( e, callback){
    const attr='data-'+e.target.id+'-timestamp';
    if(e.timeStamp.toString() !== document.body.getAttribute(attr)) {
      document.body.setAttribute(attr, e.timeStamp);
      callback();
    }
  }

  // docs tab using queries like 'document.querySelector' will give a wrong result because the template code is duplicated in multiple places, ex: <iframe id="storybook-preview-iframe"> -> <div id='root'> and <div id="docs-root">
  function getRoot(){
    const canvas = document.querySelector('#root');
    const docs = document.querySelector('#docs-root');
    if(docs?.children?.length) return docs;
    else return canvas;
  }
  // Workaround end

  function displayContent(menuId){
    Array.from(getRoot().querySelector('#panelcontent').children).forEach(c => c.style="display:none");
    if(menuId){
      const contentId = menuId.split("-")[0];
      getRoot().querySelector('#'+contentId).style="display:block";
    }
  }


  function addEventHandlers(){
    const toggle = getRoot().querySelector('#collapseExpand');
    toggle.addEventListener('buttonClick', (e)=> {
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
        executeListener(e, () => displayContent(e.detail ? c.id : null));
      });
    });
  }

  addEventHandlers();
  `;

  return tag;
};

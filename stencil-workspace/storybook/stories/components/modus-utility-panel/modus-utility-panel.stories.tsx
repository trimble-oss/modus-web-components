import docs from './modus-utility-panel-storybook-docs.mdx';
import { html } from 'lit-html';
import { useEffect } from '@storybook/client-api';

export default {
  title: 'Components/Utility Panel',
  argTypes: {
    ariaLabel: {
      description: "The aria label for the panel",
      table: {
        type: { summary: 'string' },
      },
    },
    expanded: {
      description: "The expanded state of side navigation panel and items",
      table: {
        type: { summary: 'boolean' },
      },
    },
    pushContent: {
      description: "Specify if the side navigation should push the content to the right or overlay the content",
      table: {
        type: { summary: 'boolean' },
      },
    },
    targetContent: {
      name: "target-content",
      description: "Specify the selector for the page's content for which paddings and margins will be set by side navigation based on the `mode`",
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['helpOpen'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    viewMode: 'docs',
  },
};

const DefaultTemplate = ({
  ariaLabel,
  expanded,
  targetContent,
  pushContent,
}) => {
  return html`
    <div id="defaultTemplate">
      <div
        style="width: 100%; align-items: center; height: 56px; box-shadow: 0 0 2px var(--modus-secondary)!important; margin-top: 50px;">
        <modus-navbar
          id="navbar"
          show-main-menu
          show-help>
        </modus-navbar>
      </div>

      <div
        id="container"
        style="display:flex; min-height:500px; overflow:hidden; position: relative; box-shadow: 0 0 2px var(--modus-secondary)!important;">

        <modus-utility-panel aria-label=${ariaLabel} target-content="#panelcontent" expanded=${expanded} push-content=${pushContent} target-content=${targetContent}>
          <span slot="header">Utility Panel Header</span>
          <div slot="body">Content of the utility panel goes here.</div>
          <span slot="footer">Utility Panel Footer</span>
        </modus-utility-panel>

        <div id="panelcontent" style="padding: 10px;">
          <div id="overview">
            <p>
              The side navigation of an application provides context through
              accessible menu options and positions a consistent component to
              connect to various pages in the application.
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
  `;
};

export const Default = DefaultTemplate.bind({});

Default.args={
  ariaLabel: 'Utility Panel',
  expanded: false,
  pushContent: true,
  targetContent: '#panelcontent',
};

Default.decorators = [
  (Story) => {
    useEffect(() => {
      const handleHelpOpen = () => {
        const panel = document.querySelector('modus-utility-panel');
        if (panel) {
          const isExpanded = panel.getAttribute('expanded') === 'true';
          panel.setAttribute('expanded', (!isExpanded).toString());
        }
      };
      document.addEventListener('helpOpen', handleHelpOpen);

      return () => {
        document.removeEventListener('helpOpen', handleHelpOpen);
      };
    }, []);

    return Story();
  },
];

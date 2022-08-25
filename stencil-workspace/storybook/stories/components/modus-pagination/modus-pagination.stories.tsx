// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-pagination-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Pagination',
  argTypes: {
    activePage: {
      name: 'active-page',
      description: "The pagination's active page",
      table: {
        type: { summary: 'number' },
      },
      type: { required: true },
    },
    ariaLabel: {
      name: 'aria-label',
      description: "The pagination's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    maxPage: {
      name: 'max-page',
      description: "The pagination's maximum page",
      table: {
        type: { summary: 'number' },
      },
      type: { required: true },
    },
    minPage: {
      name: 'min-page',
      description: "The pagination's minimum page",
      table: {
        type: { summary: 'number' },
      },
      type: { required: true },
    },
    size: {
      control: {
        options: ['small', 'medium', 'large'],
        type: 'select',
      },
      description: 'The size of the pagination',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'small' | 'medium' | 'large'` },
      },
    },
  },
  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
    actions: {
      handles: ['pageChange'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

export const Default = ({
  activePage,
  ariaLabel,
  maxPage,
  minPage,
  size,
}) => html`
  <modus-pagination
    active-page=${activePage}
    aria-label=${ariaLabel}
    max-page=${maxPage}
    min-page=${minPage}
    size=${size}>
    Default
  </modus-pagination>
`;
Default.args = {
  activePage: '4',
  ariaLabel: '',
  maxPage: '100',
  minPage: '1',
  size: 'medium',
};

export const Large = ({
  activePage,
  ariaLabel,
  maxPage,
  minPage,
  size,
}) => html`
  <modus-pagination
    active-page=${activePage}
    aria-label=${ariaLabel}
    max-page=${maxPage}
    min-page=${minPage}
    size=${size}>
    Large
  </modus-pagination>
`;
Large.args = {
  activePage: '4',
  ariaLabel: '',
  maxPage: '100',
  minPage: '1',
  size: 'large',
};

export const Small = ({
  activePage,
  ariaLabel,
  maxPage,
  minPage,
  size,
}) => html`
  <modus-pagination
    active-page=${activePage}
    aria-label=${ariaLabel}
    max-page=${maxPage}
    min-page=${minPage}
    size=${size}>
    Small
  </modus-pagination>
`;
Small.args = {
  activePage: '4',
  ariaLabel: '',
  maxPage: '100',
  minPage: '1',
  size: 'small',
};

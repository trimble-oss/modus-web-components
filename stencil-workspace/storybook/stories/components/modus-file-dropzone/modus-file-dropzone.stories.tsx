import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-file-dropzone-storybook-docs.mdx';

export default {
  title: 'Components/File Dropzone',
  argTypes: {
    acceptFileTypes: {
      name:'accept-file-types',
      description:"The dropzone's accepted file types",
      table: {
        type: { summary: 'string' },
      },
    },
    ariaLabel: {
      name: 'aria-label',
      description: "The dropzone's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      name: 'description',
      description: "The dropzone's description",
      table: {
        type: { summary: 'string' },
      },
    },
    dropzoneHeight: {
      name: 'dropzone-height',
      description: "The dropzone's height",
      table: {
        type: { summary: 'string' },
      },
    },
    dropzoneWidth: {
      name: 'dropzone-width',
      description: "The dropzone's width",
      table: {
        type: { summary: 'string' },
      },
    },
    includeStateIcon: {
      name: 'include-state-icon',
      description: 'Whether to include the state icon',
      table: {
        type: { summary: 'boolean' },
      },
    },
    label: {
      name: 'label',
      description: "The dropzone's label",
      table: {
        type: { summary: 'string' },
      },
    },
    maxFileCount: {
      name: 'max-file-count',
      description: "The dropzone's max file count",
      table: {
        type: { summary: 'number' },
      },
    },
    maxFileNameLength: {
      name: 'max-file-name-length',
      description: "The dropzone's max file name length",
      table: {
        type: { summary: 'number' },
      },
    },
    maxTotalFileSizeBytes: {
      name: 'max-total-file-size-bytes',
      description: "The dropzone's max total file size bytes",
      table: {
        type: { summary: 'number' },
      },
    },
    multiple: {
      name: 'multiple',
      description: 'Whether multiple files are allowed',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    actions: {
      handles: ['buttonClick'],
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
  acceptFileTypes,
  ariaLabel,
  description,
  dropzoneHeight,
  dropzoneWidth,
  includeStateIcon,
  label,
  maxFileCount,
  maxFileNameLength,
  maxTotalFileSizeBytes,
  multiple,
}) => html`
  <modus-file-dropzone
  accept-file-types=${acceptFileTypes}
    aria-label=${ariaLabel}
    description=${description}
    dropzone-height=${dropzoneHeight}
    dropzone-width=${dropzoneWidth}
    include-state-icon=${includeStateIcon}
    label=${label}
    max-file-count=${maxFileCount}
    max-file-name-length=${maxFileNameLength}
    max-total-file-size-bytes=${maxTotalFileSizeBytes}
    multiple=${multiple}>
  </modus-file-dropzone>
`;
Default.args = {
  acceptFileTypes:'.doc,.docx',
  ariaLabel: 'dropzone',
  description: 'File dropzone description',
  dropzoneHeight: '200px',
  dropzoneWidth: '500px',
  includeStateIcon: true,
  label: 'Dropzone Label',
  maxFileCount: '4',
  maxFileNameLength: '20',
  maxTotalFileSizeBytes: '1000000',
  multiple: true,
};

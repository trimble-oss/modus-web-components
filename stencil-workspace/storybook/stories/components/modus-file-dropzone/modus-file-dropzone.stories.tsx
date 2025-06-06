import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-file-dropzone-storybook-docs.mdx';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Components/File Dropzone',
  argTypes: {
    acceptFileTypes: {
      name: 'accept-file-types',
      description: "The dropzone's accepted file types",
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
    disabled: {
      name: 'disabled',
      description: 'Whether the dropzone is disabled',
      table: {
        type: { summary: 'boolean' },
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
    fileDraggedOverInstructions: {
      name: 'file-dragged-over-instructions',
      description: "The dropzone's instruction text when a file is being dragged over.'",
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
    instructions: {
      name: 'instructions',
      description: "The dropzone's instruction text",
      table: {
        type: { summary: 'string' },
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=5762-22364&m=dev',
    },
  },
  decorators: [withActions],
};

export const Default = ({
  acceptFileTypes,
  ariaLabel,
  disabled,
  description,
  dropzoneHeight,
  dropzoneWidth,
  fileDraggedOverInstructions,
  includeStateIcon,
  instructions,
  label,
  maxFileCount,
  maxFileNameLength,
  maxTotalFileSizeBytes,
  multiple,
}) => html`
  <modus-file-dropzone
    accept-file-types=${acceptFileTypes}
    aria-label=${ariaLabel}
    ?disabled=${disabled}
    description=${description}
    dropzone-height=${dropzoneHeight}
    dropzone-width=${dropzoneWidth}
    file-dragged-over-instructions=${fileDraggedOverInstructions}
    include-state-icon=${includeStateIcon}
    instructions=${instructions}
    label=${label}
    max-file-count=${maxFileCount}
    max-file-name-length=${maxFileNameLength}
    max-total-file-size-bytes=${maxTotalFileSizeBytes}
    multiple=${multiple}>
  </modus-file-dropzone>
`;
Default.args = {
  acceptFileTypes: '.doc,.docx',
  ariaLabel: 'dropzone',
  disabled: false,
  description: 'File dropzone description',
  dropzoneHeight: '200px',
  dropzoneWidth: '500px',
  fileDraggedOverInstructions: 'Drag files here.',
  includeStateIcon: true,
  instructions: 'Drag files here or browse to upload.',
  label: 'Dropzone Label',
  maxFileCount: '4',
  maxFileNameLength: '20',
  maxTotalFileSizeBytes: '1000000',
  multiple: true,
};

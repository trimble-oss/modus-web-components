import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-chip-storybook-docs.mdx';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Components/Chip',
  argTypes: {
    active: {
      name: 'active',
      description: 'Whether the chip is active',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    ariaLabel: {
      name: 'aria-label',
      description: "The chip's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    advancedChip: {
      name: 'advanced-chip',
      description: 'Whether the chip is advanced',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    chipStyle: {
      name: 'chip-style',
      options: ['solid', 'outline'],
      type: 'select',
      description: 'The style of the chip',
      table: {
        defaultValue: { summary: `'solid'` },
        type: { summary: `'solid' | 'outline'` },
      },
    },
    disabled: {
      description: 'Whether the chip is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    hasError: {
      name: 'has-error',
      description: 'Whether the chip has an error',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    imageUrl: {
      name: 'image-url',
      description: "The chip's image URL",
      table: {
        type: { summary: 'string' },
      },
    },
    showCheckmark: {
      name: 'show-checkmark',
      description: 'Whether to show the checkmark',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    showClose: {
      name: 'show-close',
      description: 'Whether to show the close icon',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    size: {
      options: ['medium', 'small'],
      type: 'select',
      description: 'The size of the chip',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `medium' | 'small'` },
      },
    },
    value: {
      description: "The chip's value",
      table: {
        type: { summary: 'string' },
      },
    },
    maxWidth: {
      description: "Chip text's maximum width",
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '100px' },
      },
    },
    chipId: {
      description: "This chip's id will create much more visibility for testing",
      table: {
        type: { summary: `string` },
      },
    },
  },
  parameters: {
    controls: { expanded: true },
    actions: {
      handles: ['chipClick', 'closeClick'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
  decorators: [withActions],
};

export const Default = ({
  active,
  ariaLabel,
  advancedChip,
  chipStyle,
  disabled,
  hasError,
  imageUrl,
  maxWidth,
  showCheckmark,
  showClose,
  size,
  value,
  chipId,
}) => html`
  <modus-chip
    active=${active}
    aria-label=${ariaLabel}
    ?advanced-chip=${advancedChip}
    chip-style=${chipStyle}
    ?disabled=${disabled}
    has-error=${hasError}
    image-url=${imageUrl}
    max-width=${maxWidth}
    show-checkmark=${showCheckmark}
    show-close=${showClose}
    size=${size}
    value=${value}
    chip-id=${chipId}>
  </modus-chip>
`;
Default.args = {
  active: false,
  ariaLabel: '',
  advancedChip: false,
  chipStyle: 'solid',
  disabled: false,
  hasError: false,
  imageUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
  maxWidth: '100px',
  showCheckmark: false,
  showClose: false,
  size: 'medium',
  value: 'Bryan',
  chipId: '',
};

export const Outline = ({
  active,
  ariaLabel,
  advancedChip,
  chipStyle,
  disabled,
  hasError,
  imageUrl,
  maxWidth,
  showCheckmark,
  showClose,
  size,
  value,
}) => html`
  <modus-chip
    active=${active}
    aria-label=${ariaLabel}
    ?advanced-chip=${advancedChip}
    chip-style=${chipStyle}
    ?disabled=${disabled}
    has-error=${hasError}
    image-url=${imageUrl}
    max-width=${maxWidth}
    show-checkmark=${showCheckmark}
    show-close=${showClose}
    size=${size}
    value=${value}>
  </modus-chip>
`;
Outline.args = {
  active: false,
  ariaLabel: '',
  advancedChip: false,
  chipStyle: 'outline',
  disabled: false,
  hasError: false,
  imageUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
  maxWidth: '100px',
  showCheckmark: false,
  showClose: false,
  size: 'medium',
  value: 'Bryan',
};

export const AdvancedChip = ({
  active,
  ariaLabel,
  advancedChip,
  chipStyle,
  disabled,
  hasError,
  imageUrl,
  maxWidth,
  showCheckmark,
  showClose,
  size,
  value,
}) => html`
  <modus-dropdown label="Dropdown" id="dropdown" toggle-element-id="toggleElement" animate-list>
    <modus-chip
      id="toggleElement"
      slot="dropdownToggle"
      active=${active}
      aria-label=${ariaLabel}
      ?advanced-chip=${advancedChip}
      chip-style=${chipStyle}
      ?disabled=${disabled}
      has-error=${hasError}
      image-url=${imageUrl}
      max-width=${maxWidth}
      show-checkmark=${showCheckmark}
      show-close=${showClose}
      size=${size}
      value=${value}>
    </modus-chip>
    <modus-list slot="dropdownList">
      <modus-list-item value="1" disabled borderless>Select Process</modus-list-item>
      <modus-list-item value="2" borderless>First Option (FO)</modus-list-item>
      <modus-list-item value="3" borderless>Second Option (SO)</modus-list-item>
      <modus-list-item value="4" borderless>Next Option (NO)</modus-list-item>
      <modus-list-item value="4" borderless>Another Option (AO)</modus-list-item>
    </modus-list>
  </modus-dropdown>

  ${setAdvancedChip()}
`;
AdvancedChip.args = {
  active: false,
  ariaLabel: '',
  advancedChip: true,
  chipStyle: 'outline',
  disabled: false,
  hasError: false,
  imageUrl: '',
  maxWidth: '',
  showCheckmark: false,
  showClose: false,
  size: 'medium',
  value: 'Processes Type',
};

const setAdvancedChip = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
      const chip = document.querySelector('modus-chip');
      const dropdown = document.querySelector('modus-dropdown');
      const list = document.querySelector('modus-list');
      let itemSelected = false;
      dropdown.addEventListener('dropdownClose', (e) => {
        console.log('dropdownClose');
        if(!itemSelected) {
          chip.active = false;
        }
      });
      chip.addEventListener('chipClick', (e) => {
        console.log('chipClick');
        chip.active = true;
        dropdown.toggleDropdown = true;
      });
      chip.addEventListener('closeClick', (e) => {
        console.log('chipClose');
        chip.value = 'Processes Type';
        chip.active = false;
        chip.showClose = false;
        dropdown.toggleDropdown = false;

      });
      list.addEventListener('itemClick', (e) => {
        console.log('listItem', e.srcElement.innerText);
        chip.value = 'Processes Type: ' + e.srcElement.innerText;
        chip.showClose = true;
        chip.active = true;
        itemSelected = true;
      });
  `;
  return tag;
};

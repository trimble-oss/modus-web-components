import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-button-storybook-docs.mdx';

export default {
  title: 'Components/Button',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The button's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    buttonStyle: {
      name: 'button-style',
      control: {
        options: ['borderless', 'fill', 'outline'],
        type: 'select',
      },
      description: 'The style of the button',
      table: {
        defaultValue: { summary: `'fill'` },
        type: { summary: `'borderless' | 'fill' | 'outline'` },
      },
    },
    color: {
      control: {
        options: ['danger', 'primary', 'secondary', 'tertiary'],
        type: 'select',
      },
      description: 'The color of the button',
      table: {
        defaultValue: { summary: `'primary'` },
        type: { summary: `'danger' | 'primary' | 'secondary' | 'tertiary'` },
      },
    },
    disabled: {
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: {
        options: ['small', 'medium', 'large'],
        type: 'select',
      },
      description: 'The size of the button',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'small' | 'medium' | 'large'` },
      },
    },
    iconOnly: {
      name: 'icon-only',
      description: "Takes the icon name and renders an icon-only button",
      table: {
        type: { summary: 'string' },
      },
    },
    leftIcon: {
      name: 'left-icon',
      description: "Takes the icon name and shows the icon aligned to the left of the button text",
      table: {
        type: { summary: 'string' },
      },
    },
    rightIcon: {
      name: 'right-icon',
      description: "Takes the icon name and shows the icon aligned to the right of the button text",
      table: {
        type: { summary: 'string' },
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
  ariaLabel,
  buttonStyle,
  color,
  disabled,
  size,
  leftIcon,
  rightIcon,
  iconOnly
}) => html`
  <modus-button
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    disabled=${disabled}
    size=${size} left-icon=${leftIcon} right-icon=${rightIcon} iconOnly=${iconOnly}>
    Default
  </modus-button>
`;
Default.args = {
  ariaLabel: '',
  buttonStyle: 'fill',
  color: 'primary',
  disabled: false,
  size: 'medium',
};

export const Borderless = ({
  ariaLabel,
  buttonStyle,
  color,
  disabled,
  size,
  leftIcon,
  rightIcon,
  iconOnly
}) => html`
  <modus-button
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    disabled=${disabled}
    size=${size} left-icon=${leftIcon} right-icon=${rightIcon} iconOnly=${iconOnly}>
    Borderless
  </modus-button>
`;
Borderless.args = {
  ariaLabel: '',
  buttonStyle: 'borderless',
  color: 'default',
  disabled: false,
  size: 'medium',
};

export const Outline = ({
  ariaLabel,
  buttonStyle,
  color,
  disabled,
  size,
  leftIcon,
  rightIcon,
  iconOnly
}) => html`
  <modus-button
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    disabled=${disabled}
    size=${size} left-icon=${leftIcon} right-icon=${rightIcon} iconOnly=${iconOnly}>
    Outline
  </modus-button>
`;
Outline.args = {
  ariaLabel: '',
  buttonStyle: 'outline',
  color: 'default',
  disabled: false,
  size: 'medium',
};

export const IconWithText = ({
  ariaLabel,
  buttonStyle,
  color,
  disabled,
  size,
  leftIcon,
  rightIcon,
  iconOnly
}) => html`
  <modus-button
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    disabled=${disabled}
    size=${size} left-icon=${leftIcon} right-icon=${rightIcon} iconOnly=${iconOnly}>
    Default
  </modus-button>
`;
IconWithText.args = {
  ariaLabel: '',
  buttonStyle: 'fill',
  color: 'primary',
  disabled: false,
  size: 'medium',
  leftIcon: 'notifications'
};

export const IconOnly = ({
  ariaLabel,
  buttonStyle,
  color,
  disabled,
  size,
  leftIcon,
  rightIcon,
  iconOnly
}) => html`
  <modus-button
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    disabled=${disabled}
    size=${size} left-icon=${leftIcon} right-icon=${rightIcon} icon-only=${iconOnly}>
  </modus-button>
`;
IconOnly.args = {
  ariaLabel: '',
  buttonStyle: 'borderless',
  color: 'secondary',
  disabled: false,
  size: 'large',
  iconOnly: 'notifications'
};

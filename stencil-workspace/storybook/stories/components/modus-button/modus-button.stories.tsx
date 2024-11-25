import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-button-storybook-docs.mdx';

import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Components/Button',
  argTypes: {
    ariaDisabled: {
      name: 'aria-disabled',
      description: "The button's aria-disabled state",
      table: {
        type: { summary: 'string' },
      },
    },
    ariaLabel: {
      name: 'aria-label',
      description: "The button's aria-label",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'string' },
      },
    },
    buttonStyle: {
      name: 'button-style',
      options: ['borderless', 'fill', 'outline'],
      type: 'select',
      description: 'The style of the button',
      table: {
        defaultValue: { summary: `'fill'` },
        type: { summary: `'borderless' | 'fill' | 'outline'` },
      },
    },
    color: {
      options: ['danger', 'primary', 'secondary', 'tertiary', 'special'],
      type: 'select',
      description: 'The color of the button',
      table: {
        defaultValue: { summary: `'primary'` },
        type: { summary: `'danger' | 'primary' | 'secondary' | 'tertiary' | 'special'` },
      },
    },
    criticalAction: {
      name: 'critical-action',
      description: 'Enable the progress animation for danger button',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
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
      options: ['small', 'medium', 'large'],
      type: 'select',
      description: 'The size of the button',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'small' | 'medium' | 'large'` },
      },
    },
    showCaret: {
      description: 'Shows a caret icon right side of the button',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    iconOnly: {
      name: 'icon-only',
      description: 'Takes the icon name and renders an icon-only button',
      table: {
        type: { summary: 'string' },
      },
    },
    leftIcon: {
      name: 'left-icon',
      description: 'Takes the icon name and shows the icon aligned to the left of the button text',
      table: {
        type: { summary: 'string' },
      },
    },
    rightIcon: {
      name: 'right-icon',
      description: 'Takes the icon name and shows the icon aligned to the right of the button text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    actions: {
      handles: ['buttonClick modus-button'],
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

const DefaultTemplate = ({
  ariaDisabled,
  ariaLabel,
  buttonStyle,
  color,
  criticalAction,
  disabled,
  size,
  leftIcon,
  rightIcon,
  iconOnly,
  showCaret,
  label,
}) => html`
  <modus-button
    aria-disabled=${ariaDisabled}
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    ?disabled=${disabled}
    critical-action=${criticalAction}
    size=${size}
    left-icon=${leftIcon}
    right-icon=${rightIcon}
    icon-only=${iconOnly}
    show-caret=${showCaret}>
    ${label}
  </modus-button>
`;

const DefaultTemplateArgs = {
  ariaDisabled: 'false',
  ariaLabel: '',
  buttonStyle: 'fill',
  color: 'primary',
  disabled: false,
  size: 'medium',
  leftIcon: '',
  rightIcon: '',
  iconOnly: '',
  showCaret: false,
  label: 'Default',
  criticalAction: false,
};

export const Default = DefaultTemplate.bind({});
Default.args = { ...DefaultTemplateArgs };

export const Borderless = DefaultTemplate.bind({});
Borderless.args = { ...DefaultTemplateArgs, buttonStyle: 'borderless', label: 'Borderless' };

export const Outline = DefaultTemplate.bind({});
Outline.args = { ...DefaultTemplateArgs, buttonStyle: 'outline', label: 'Outline' };

export const IconWithText = DefaultTemplate.bind({});
IconWithText.args = { ...DefaultTemplateArgs, label: 'Default', leftIcon: 'notifications' };

export const IconOnly = DefaultTemplate.bind({});
IconOnly.args = {
  ...DefaultTemplateArgs,
  ariaLabel: 'Notifications',
  ariaDisabled: false,
  label: '',
  buttonStyle: 'borderless',
  color: 'secondary',
  size: 'large',
  iconOnly: 'notifications',
  showCaret: false,
};

export const WithCaret = DefaultTemplate.bind({});
WithCaret.args = { ...DefaultTemplateArgs, label: 'Primary', color: 'primary', disabled: false, showCaret: true };

export const SpecialButton = DefaultTemplate.bind({});
SpecialButton.args = { ...DefaultTemplateArgs, label: 'Button', color: 'special' };

export const DangerButton = DefaultTemplate.bind({});
DangerButton.args = { ...DefaultTemplateArgs, label: 'Danger', color: 'danger' };

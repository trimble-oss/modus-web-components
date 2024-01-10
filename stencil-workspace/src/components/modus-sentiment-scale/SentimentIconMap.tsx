// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconSmileySatisfiedOutline } from '../../icons/svgs/icon-smiley-satisfied-outline';
import { IconSmileySatisfied } from '../../icons/svgs/icon-smiley-satisfied';
import { IconSmileySomewhatSatisfiedOutline } from '../../icons/svgs/icon-smiley-somewhat-satisfied-outline';
import { IconSmileySomewhatSatisfied } from '../../icons/svgs/icon-smiley-somewhat-satisfied';
import { IconSmileyNeutralOutline } from '../../icons/svgs/icon-smiley-neutral-outline';
import { IconSmileyNeutral } from '../../icons/svgs/icon-smiley-neutral';
import { IconSmileySomewhatDissatisfiedOutline } from '../../icons/svgs/icon-smiley-somewhat-dissatisfied-outline';
import { IconSmileySomewhatDissatisfied } from '../../icons/svgs/icon-smiley-somewhat-dissatisfied';
import { IconSmileyDissatisfiedOutline } from '../../icons/svgs/icon-smiley-dissatisfied-outline';
import { IconSmileyDissatisfied } from '../../icons/svgs/icon-smiley-dissatisfied';
import { IconThumbsUpOutlined } from '../../icons/svgs/icon-thumbs-up-outline';
import { IconThumbsUp } from '../../icons/svgs/icon-thumbs-up';
import { IconThumbsDownOutlined } from '../../icons/svgs/icon-thumbs-down-outlined';
import { IconThumbsDown } from '../../icons/svgs/icon-thumbs-down';

export interface IconProps {
  color?: string;
  onClick?: (event?) => void;
  size?: string;
  pressed?: boolean;
}

interface SentimentIconMapProps extends IconProps {
  icon: string;
}

export const SentimentIconMap: FunctionalComponent<SentimentIconMapProps> = (props: SentimentIconMapProps) => {
  switch (props.icon) {
    case 'smiley-satisfied-outlined':
      return <IconSmileySatisfiedOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'smiley-satisfied':
      return <IconSmileySatisfied color={props.color} onClick={props.onClick} size={props.size} />;
    case 'smiley-somewhat-satisfied-outlined':
      return <IconSmileySomewhatSatisfiedOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'smiley-somewhat-satisfied':
      return <IconSmileySomewhatSatisfied color={props.color} onClick={props.onClick} size={props.size} />;
    case 'smiley-neutral-outlined':
      return <IconSmileyNeutralOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'smiley-neutral':
      return <IconSmileyNeutral color={props.color} onClick={props.onClick} size={props.size} />;
    case 'smiley-somewhat-dissatisfied-outlined':
      return <IconSmileySomewhatDissatisfiedOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'smiley-somewhat-dissatisfied':
      return <IconSmileySomewhatDissatisfied color={props.color} onClick={props.onClick} size={props.size} />;
    case 'smiley-dissatisfied-outlined':
      return <IconSmileyDissatisfiedOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'smiley-dissatisfied':
      return <IconSmileyDissatisfied color={props.color} onClick={props.onClick} size={props.size} />;
    case 'thumbs-up-outlined':
      return <IconThumbsUpOutlined color={props.color} onClick={props.onClick} size={props.size} />;
    case 'thumbs-up':
      return <IconThumbsUp color={props.color} onClick={props.onClick} size={props.size} />;
    case 'thumbs-down-outlined':
      return <IconThumbsDownOutlined color={props.color} onClick={props.onClick} size={props.size} />;
    case 'thumbs-down':
      return <IconThumbsDown color={props.color} onClick={props.onClick} size={props.size} />;
  }
};

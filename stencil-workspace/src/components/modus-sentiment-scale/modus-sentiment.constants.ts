export const MODUS_SENTIMENT_CONSTANTS = {
  SENTIMENT_VALUES: {
    DISSATISFIED: 1,
    SOME_WHAT_DISSATISFIED: 2,
    NEUTRAL: 3,
    SOME_WHAT_SATISFIED: 4,
    SATISFIED: 5,
  },
  THUMBS_VALUES: {
    THUMBS_UP: 1,
    THUMBS_DOWN: 2,
  },
  ICON_TYPES: {
    THUMBS: 'thumbs',
    SMILEYS: 'smileys',
  },
  ICON_KEY: {
    THUMBS: {
      OUTLINED: ['thumbs-up-outlined', 'thumbs-down-outlined'],
      SOLID: ['thumbs-up-solid', 'thumbs-down-solid'],
    },
    SMILEYS: {
      OUTLINED: [
        'smiley-dissatisfied-outlined',
        'smiley-somewhat-dissatisfied-outlined',
        'smiley-neutral-outlined',
        'smiley-somewhat-satisfied-outlined',
        'smiley-satisfied-outlined',
      ],
      SOLID: [
        'smiley-dissatisfied-solid',
        'smiley-somewhat-dissatisfied-solid',
        'smiley-neutral-solid',
        'smiley-somewhat-satisfied-solid',
        'smiley-satisfied-solid',
      ],
    },
  },
  ICON_KEYS: {
    THUMBS: {
      OUTLINED: {
        UP: 'thumbs-up-outlined',
        DOWN: 'thumbs-down-outlined',
      },
      SOLID: {
        UP: 'thumbs-up-solid',
        DOWN: 'thumbs-down-solid',
      },
    },
    SMILEYS: {
      OUTLINED: {
        DISSATISFIED: 'smiley-dissatisfied-outlined',
        SOMEWHAT_DISSATISFIES: 'smiley-somewhat-dissatisfied-outlined',
        NEUTRAL: 'smiley-neutral-outlined',
        SOMEWHAT_SATISFIED: 'smiley-somewhat-satisfied-outlined',
        SATISFIED: 'smiley-satisfied-outlined',
      },
      SOLID: {
        DISSATISFIED: 'smiley-dissatisfied-solid',
        SOMEWHAT_DISSATISFIES: 'smiley-somewhat-dissatisfied-solid',
        NEUTRAL: 'smiley-neutral-solid',
        SOMEWHAT_SATISFIED: 'smiley-somewhat-satisfied-solid',
        SATISFIED: 'smiley-satisfied-solid',
      },
    },
  },
};

export type KeyBoardEventIcon = {
  event: KeyboardEvent;
  buttonIcon: string;
};

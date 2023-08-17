import styling from './styling-panel-def';

export default {
  presentation: {
    grouped: true,
    type: 'items',
    translation: 'properties.presentation',
    items: {
      ...styling,
    },
  },
};

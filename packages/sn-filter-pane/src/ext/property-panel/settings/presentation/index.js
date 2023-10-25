import getStyling from './styling-panel-def';

export default function getPresentation(env) {
  return {
    presentation: {
      grouped: true,
      type: 'items',
      translation: 'properties.presentation',
      items: {
        ...getStyling(env),
      },
    },
  };
}

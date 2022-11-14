const settings = {
  uses: 'settings',
  items: {
    general: {
      items: {
        showTitles: {
          defaultValue: false,
        },
      },
    },
    presentation: {
      type: 'items',
      grouped: false,
      translation: 'properties.presentation',
      items: {
        denseMode: {
          ref: 'layoutOptions.compactData',
          component: 'checkbox',
          translation: 'properties.filterpane.dense',
          defaultValue: false,
        },
      },
    },
  },
};

export default settings;

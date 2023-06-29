import stylingPanelDef from "./data/data-panel/presentation/styling-definitions/styling-panel-def";

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
      grouped: true,
      type: 'items',
      translation: 'properties.presentation',
      items: [stylingPanelDef]
    },
    simpleLabels: null,
  },
};

export default settings;

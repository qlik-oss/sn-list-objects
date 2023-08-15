export default {
  showSearch: {
    ref: 'collapseMode',
    type: 'string',
    component: 'dropdown',
    translation: 'properties.filterpane.collapseMode',
    defaultValue: 'auto',
    options: [
      {
        value: 'auto',
        translation: 'Common.Auto',
      },
      {
        value: 'always',
        translation: 'Common.Always',
      },
      {
        value: 'never',
        translation: 'Common.Never',
      },
    ],
  },
};

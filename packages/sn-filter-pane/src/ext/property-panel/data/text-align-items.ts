const textAlignItems = {
  textAlignAuto: {
    ref: 'qListObjectDef.qDef.textAlign.auto',
    type: 'boolean',
    component: 'switch',
    translation: 'Common.Text.TextAlignment',
    change: (data) => data?.qDef?.textAlign?.align || 'left',
    options: [
      {
        value: true,
        translation: 'Common.Auto',
      },
      {
        value: false,
        translation: 'Common.Custom',
      },
    ],
    defaultValue: true,
  },
  textAlign: {
    ref: 'qListObjectDef.qDef.textAlign.align',
    type: 'string',
    component: 'item-selection-list',
    horizontal: true,
    items: [
      {
        component: 'icon-item',
        icon: 'align_left',
        labelPlacement: 'bottom',
        value: 'left',
        translation: 'properties.dock.left',
      },
      {
        component: 'icon-item',
        icon: 'align_center',
        labelPlacement: 'bottom',
        value: 'center',
        translation: 'Common.Center',
      },
      {
        component: 'icon-item',
        icon: 'align_right',
        labelPlacement: 'bottom',
        value: 'right',
        translation: 'properties.dock.right',
      },
    ],
    defaultValue: 'left',
    show(data) {
      return data?.qListObjectDef?.qDef?.textAlign?.auto !== false;
    },
  },
};

export default textAlignItems;

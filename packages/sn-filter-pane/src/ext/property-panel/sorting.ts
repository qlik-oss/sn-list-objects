const autoSortCriterias = {
  qSortByState: 1,
  qSortByAscii: 1,
  qSortByNumeric: 1,
  qSortByLoadOrder: 1,
};

const sorting = {
  type: 'items',
  component: 'filterpane-sorting',
  translation: 'properties.sorting',
  allowMove: true,
  schemaIgnore: true,
  // grouped: true,
  items: {
    autoSort: {
      ref: 'qListObjectDef.qDef.autoSort',
      type: 'boolean',
      translation: 'properties.sorting',
      component: 'switch',
      defaultValue: true,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      change(itemData: EngineAPI.IGenericListProperties & any /* , handler */) {
        if (itemData.qListObjectDef.qDef.autoSort) {
          const dimension = itemData.qListObjectDef;
          for (let i = 0; i < dimension.qDef.qSortCriterias.length; i++) {
            dimension.qDef.qSortCriterias[i] = autoSortCriterias;
          }
        }
      },
    },
    dimension: {
      component: 'sorting-dimension',
      ref: 'qListObjectDef',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      show(itemData: EngineAPI.IGenericListProperties & any) {
        return !itemData.qListObjectDef.qDef.autoSort;
      },
      sortingItems: {
        state: true,
        expression: true,
        frequency: true,
        numeric: true,
        ascii: true,
      },
    },
  },
};

export default sorting;

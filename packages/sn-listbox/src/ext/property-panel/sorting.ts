import { IGenericListPropertiesMissing } from '../../../../../types/global';

const autoSortCriterias: EngineAPI.ISortCriteria = {
  qSortByState: '1' as EngineAPI.TypeSortDirection,
  qSortByAscii: '1' as EngineAPI.TypeSortDirection,
  qSortByNumeric: '1' as EngineAPI.TypeSortDirection,
  qSortByLoadOrder: '1' as EngineAPI.TypeSortDirection,
};

const sorting = {
  type: 'items',
  // component: 'filterpane-sorting',
  translation: 'properties.sorting',
  // allowMove: true,
  // schemaIgnore: true,
  // grouped: true,
  items: {
    autoSort: {
      ref: 'qListObjectDef.qDef.autoSort',
      type: 'boolean',
      translation: 'properties.sorting',
      component: 'switch',
      // defaultValue: true,
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
      change(itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing /* , handler */) {
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
      show(itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
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

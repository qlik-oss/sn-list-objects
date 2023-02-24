import { IEnv } from '../../../../types/types';
import { IGenericListPropertiesMissing } from '../../../../hooks/types';
import getPresentation from './presentation';

const autoSortCriterias: EngineAPI.ISortCriteria = {
  qSortByState: '1' as EngineAPI.TypeSortDirection,
  qSortByAscii: '1' as EngineAPI.TypeSortDirection,
  qSortByNumeric: '1' as EngineAPI.TypeSortDirection,
  qSortByLoadOrder: '1' as EngineAPI.TypeSortDirection,
};

export default function getDataPanelItems(env: IEnv) {
  const items = {
    cId: {
      ref: 'qListObjectDef.qDef.cId',
      type: 'string',
      show: false,
    },
    libraryId: {
      type: 'string',
      component: 'library-item',
      libraryItemType: 'dimension',
      ref: 'qListObjectDef.qLibraryId',
      translation: 'Common.Fields',
      show(itemData: EngineAPI.IGenericListProperties) {
        return itemData.qListObjectDef.qLibraryId;
      },
    },
    field: {
      type: 'string',
      component: 'expression',
      expressionType: 'dimension',
      ref: 'qListObjectDef.qDef.qFieldDefs.0',
      translation: 'Common.Fields',
      show(itemData: EngineAPI.IGenericListProperties) {
        return !itemData.qListObjectDef.qLibraryId;
      },
      change(itemData: EngineAPI.IGenericListProperties) {
        const def = itemData.qListObjectDef.qDef;
        if (!def.qFieldLabels) {
          def.qFieldLabels = [];
        }
        [def.qFieldLabels[0]] = def.qFieldDefs ?? [];
      },
    },
    title: {
      ref: 'title',
      type: 'string',
      expression: 'optional',
      translation: 'Common.Title',
    },
    dimGroup: {
      type: 'items',
      grouped: true,
      translation: 'Common.Fields',
      items: {
        masterItemGroup: {
          ref: 'qListObjectDef.qLibraryId',
          component: 'data-master-item',
          fieldType: 'dimension',
          libraryItemType: 'dimension',
          translation: 'Common.Fields',
        },
      },
    },
    searchMode: {
      type: 'items',
      translation: 'properties.filterpane.searchMode',
      grouped: false,
      items: {
        wildCardSearch: {
          translation: 'properties.filterpane.searchMode',
          ref: 'wildCardSearch',
          component: 'dropdown',
          defaultValue: true,
          options: [
            {
              value: true,
              translation: 'properties.filterpane.wildCardSearch',
            },
            {
              value: false,
              translation: 'properties.filterpane.simpleSearch',
            },
          ],
        },
      },
    },
    // wildCardSearch: {
    //   ref: 'wildCardSearch',
    //   component: 'checkbox',
    //   translation: 'properties.filterpane.wildCardSearch',
    //   defaultValue: true,
    // },
    otherSettings: {
      translation: 'Accordion',
      component: 'expandable-items',
      type: 'items',
      items: {
        presentation: getPresentation(env),
        sorting: {
          type: 'items',
          translation: 'properties.sorting',
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
        },
      },
    },
  };

  return items;
}

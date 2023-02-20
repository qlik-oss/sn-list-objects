import { IGenericListPropertiesMissing } from '../../../hooks/types';
import { IEnv } from '../../../types/types';
import getPresentation from './presentation';
import textAlignItems from './text-align-items';

export default function getDataPanelItems(env: IEnv) {
  const items = {
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
    masterItem: {
      ref: 'qListObjectDef.qLibraryId',
      component: 'data-master-item',
      type: 'dimension',
      libraryItemType: 'dimension',
      translation: 'Common.Fields',
    },
    searchMode: {
      ref: 'wildCardSearch',
      component: 'dropdown',
      translation: 'properties.frequencyCountMode',
      defaultValue: 'wildCardSearch',
      options: [
        {
          value: true,
          translation: 'todo.wildCardSearch',
        },
        {
          value: false,
          translation: 'todo.simpleSearch',
        },
      ],
    },
    presentation: getPresentation(env),
    sorting: {
      items: {
        autoSort: {
          ref: 'qListObjectDef.qDef.autoSort',
          type: 'boolean',
          defaultValue: true,
          show: false,
        },
      },

    },

    cId: {
      ref: 'qListObjectDef.qDef.cId',
      type: 'string',
      show: false,
    },
    ...textAlignItems,
    denseMode: {
      ref: 'layoutOptions.dense',
      component: 'checkbox',
      translation: 'properties.filterpane.dense',
      defaultValue: false,
    },
    checkboxes: {
      ref: 'checkboxes',
      component: 'checkbox',
      translation: 'properties.filterpane.checkboxes',
      defaultValue: false,
    },
    wildCardSearch: {
      ref: 'wildCardSearch',
      component: 'checkbox',
      translation: 'properties.filterpane.wildCardSearch',
      defaultValue: true,
    },
    histogram: {
      ref: 'histogram',
      component: 'checkbox',
      translation: 'properties.filterpane.histogram',
      defaultValue: false,
      change(itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
        if (itemData.histogram && itemData.qListObjectDef.qFrequencyMode === frequencies.FREQUENCY_NONE) {
          itemData.qListObjectDef.qFrequencyMode = frequencies.FREQUENCY_VALUE;
        }
        const [qDef] = itemData.qListObjectDef.qDef.qFieldDefs ?? [];
        itemData.frequencyMax = itemData.histogram ? { qValueExpression: `Max(AGGR(Count([${qDef}]), [${qDef}]))` } : null;
      },
    },
  };

  return items;
}

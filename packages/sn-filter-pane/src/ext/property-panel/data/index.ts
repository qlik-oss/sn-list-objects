/* eslint-disable no-param-reassign */
import { IGenericListPropertiesMissing } from '../../../hooks/types';
import { IEnv } from '../../../types/types';
import frequencies from '../constants';
import textAlignItems from './text-align-items';

export default function data(env: IEnv) {
  const { isEnabled } = env?.flags || {};

  const dataProperties = {
    classification: {
      section: 'data',
      tags: ['simple'],
    },
    type: 'array',
    component: 'filterpane-data',
    translation: 'Common.Data',
    allowAdd: true,
    allowRemove: true,
    allowMove: true,
    addTranslation: 'properties.dimensions.add',
    grouped: false,
    ref: 'qChildListDef.qDef.qListObjectDef',
    items: {
      libraryId: {
        type: 'string',
        component: 'library-item',
        libraryItemType: 'dimension',
        ref: 'qListObjectDef.qLibraryId',
        translation: 'Common.Dimension',
        show(itemData: EngineAPI.IGenericListProperties) {
          return itemData.qListObjectDef.qLibraryId;
        },
      },
      field: {
        type: 'string',
        component: 'expression',
        expressionType: 'dimension',
        ref: 'qListObjectDef.qDef.qFieldDefs.0',
        translation: 'Common.Field',
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
      showTitle: {
        ref: 'toolbar',
        component: 'checkbox',
        type: 'boolean',
        translation: 'properties.filterpane.showTitle',
        defaultValue: true,
      },
      frequencyCountMode: {
        ref: 'qListObjectDef.qFrequencyMode',
        convertFunctions: {
          get(
            getter: () => EngineAPI.FrequencyModeType,
            definition: unknown,
            args: unknown,
            itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing,
          ) {
            if (itemData.qListObjectDef.frequencyEnabled) {
              return getter();
            }
            return frequencies.FREQUENCY_NONE;
          },
          set(
            value: EngineAPI.FrequencyModeType,
            setter: (type: string, newValue: EngineAPI.FrequencyModeType) => void,
            definition: unknown,
            args: unknown,
            itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing,
          ) {
            if (value !== frequencies.FREQUENCY_NONE) {
              setter('string', value);
              itemData.qListObjectDef.frequencyEnabled = true;
            } else if (itemData.histogram) {
              itemData.qListObjectDef.frequencyEnabled = false;
              setter('string', frequencies.FREQUENCY_VALUE);
            } else {
              itemData.qListObjectDef.frequencyEnabled = false;
              setter('string', frequencies.FREQUENCY_NONE);
            }
          },
        },
        type: 'string',
        component: 'dropdown',
        defaultValue: frequencies.FREQUENCY_NONE,
        show() {
          return isEnabled('LIST_BOX_FREQUENCY_COUNT');
        },
        translation: 'properties.frequencyCountMode',
        options: [
          {
            value: frequencies.FREQUENCY_NONE,
            translation: 'properties.frequencyCountNone',
          },
          {
            value: frequencies.FREQUENCY_VALUE,
            translation: 'properties.frequencyCountAsValue',
          },
          {
            value: frequencies.FREQUENCY_PERCENT,
            translation: 'properties.frequencyCountAsPercent',
          },
        ],
      },
      autoSort: {
        ref: 'qListObjectDef.qDef.autoSort',
        type: 'boolean',
        defaultValue: true,
        show: false,
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
    },
  };

  return dataProperties;
}

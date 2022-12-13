/* eslint-disable no-param-reassign */
import { IGenericListPropertiesMissing } from '../../../hooks/types';
import { IEnv } from '../../../types/types';
import frequencies from '../constants';
import textAlignItems from './text-align-items';

const getFreqMode = (props: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing): EngineAPI.FrequencyModeType => {
  if (props.qListObjectDef.frequencyEnabled) {
    return props.showFrequencyCount;
  }
  if (props.histogram) {
    return frequencies.FREQUENCY_VALUE;
  }
  return frequencies.FREQUENCY_NONE;
};

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
      // 'showFrequencyCount' is only used in the propery panel to not conflict with 'qFrequencyMode' as
      // 'qFrequencyMode' is also used in 'histogram'
      showFrequencyCount: {
        ref: 'showFrequencyCount',
        type: 'string',
        component: 'dropdown',
        defaultValue: frequencies.FREQUENCY_NONE,
        show() {
          return isEnabled('LIST_BOX_FREQUENCY_COUNT');
        },
        translation: 'properties.frequencyCountMode',
        change(props: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
          props.qListObjectDef.frequencyEnabled = props.showFrequencyCount !== frequencies.FREQUENCY_NONE;
          props.qListObjectDef.qFrequencyMode = getFreqMode(props);
        },
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
      histogram: {
        ref: 'histogram',
        component: 'checkbox',
        translation: 'properties.filterpane.histogram',
        defaultValue: false,
        change(props: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
          props.qListObjectDef.qFrequencyMode = getFreqMode(props);
          const [qDef] = props.qListObjectDef.qDef.qFieldDefs ?? [];
          props.frequencyMax = props.histogram ? { qValueExpression: `Max(AGGR(Count([${qDef}]), [${qDef}]))` } : null;
        },
      },
    },
  };

  return dataProperties;
}

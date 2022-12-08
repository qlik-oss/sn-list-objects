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
      // label: {
      //  type: "string",
      //  ref: "qDef.qFieldLabels.0",
      //  translation: "Common.Label",
      //  show: function ( itemData ) {
      //   return !itemData.qLibraryId;
      //  }
      // },
      title: {
        ref: 'title',
        type: 'string',
        expression: 'optional',
        translation: 'Common.Title',
      },
      frequencyCountMode: {
        ref: 'qListObjectDef.qFrequencyMode',
        type: 'string',
        component: 'dropdown',
        show() {
          return isEnabled('LIST_BOX_FREQUENCY_COUNT');
        },
        translation: 'properties.frequencyCountMode',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        change(props: EngineAPI.IGenericListProperties & any) {
          // eslint-disable-next-line no-param-reassign
          props.qListObjectDef.frequencyEnabled = props.qListObjectDef.qFrequencyMode !== frequencies.FREQUENCY_NONE;
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
    },
  };

  return dataProperties;
}

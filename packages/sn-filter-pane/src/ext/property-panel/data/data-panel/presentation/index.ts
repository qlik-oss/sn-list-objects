/* eslint-disable no-param-reassign */
import { IGenericListPropertiesMissing } from '../../../../../../../../types/global';
import textAlignItems from '../../text-align-items';
import { IEnv } from '../../../../../types/types';
import frequencies from '../../../constants';

export default function getPresentation(env: IEnv) {
  const { translator } = env;
  const { isEnabled } = env?.flags || {};
  return {
    type: 'items',
    translation: 'properties.presentation',
    items: {
      ...textAlignItems,
      denseModeGroup: {
        type: 'items',
        grouped: true,
        items: {
          denseMode: {
            ref: 'layoutOptions.dense',
            component: 'checkbox',
            translation: 'properties.filterpane.showDense',
            defaultValue: false,
          },
        },
      },
      checkboxesGroup: {
        type: 'items',
        grouped: true,
        items: {
          checkboxes: {
            ref: 'checkboxes',
            translation: 'properties.filterpane.showCheckboxes',
            component: 'checkbox',
            defaultValue: false,
          },
        },
      },
      histogram: {
        ref: 'histogram',
        grouped: true,
        component: 'checkbox',
        translation: 'properties.filterpane.showHistogram',
        defaultValue: false,
        change(itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
          if (itemData.histogram && itemData.qListObjectDef.qFrequencyMode === frequencies.FREQUENCY_NONE) {
            itemData.qListObjectDef.qFrequencyMode = frequencies.FREQUENCY_VALUE;
          }
          const [qDef] = itemData.qListObjectDef.qDef.qFieldDefs ?? [];
          itemData.frequencyMax = itemData.histogram ? { qValueExpression: `Max(AGGR(Count([${qDef}]), [${qDef}]))` } : null;
        },
      },
      frequencyCountModeGroup: {
        translation: 'properties.frequencyCountMode',
        type: 'items',
        grouped: true,
        items: {
          frequencyCountMode: {
            ref: 'qListObjectDef.qFrequencyMode',
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
          },
        },
      },
      gridModeGroup: {
        grouped: true,
        type: 'items',
        items: {
          gridMode: {
            type: 'string',
            ref: 'layoutOptions.dataLayout',
            translation: 'properties.filterpane.layoutModeLabel',
            component: 'buttongroup',
            defaultValue: 'singleColumn',
            options: [
              {
                value: 'singleColumn',
                label: translator.get('properties.filterpane.singleColumn'),
                tooltipTranslation: 'properties.filterpane.singleColumn',
              },
              {
                value: 'grid',
                label: translator.get('properties.filterpane.grid'),
                tooltipTranslation: 'properties.filterpane.grid',
              },
            ],
          },
          layoutOrder: {
            type: 'string',
            component: 'buttongroup',
            ref: 'layoutOptions.layoutOrder',
            translation: 'properties.filterpane.layoutOrder',
            defaultValue: 'column',
            options: [
              {
                value: 'row',
                label: translator.get('properties.filterpane.layoutOrderRow'),
                tooltipTranslation: 'properties.filterpane.layoutOrderRow',
              },
              {
                value: 'column',
                label: translator.get('properties.filterpane.layoutOrderColumn'),
                tooltipTranslation: 'properties.filterpane.layoutOrderColumn',
              },
            ],
            show(data: EngineAPI.IGenericListProperties) {
              const { dataLayout } = data.layoutOptions || {};
              return dataLayout === 'grid';
            },
          },
          maxVisibleRowsAuto: {
            type: 'boolean',
            component: 'switch',
            ref: 'layoutOptions.maxVisibleRows.auto',
            translation: 'properties.filterpane.maxVisibleRowsAuto',
            defaultValue: true,
            options: [
              {
                value: true,
                label: translator.get('Common.Auto'),
                tooltipTranslation: 'Common.Auto',
              },
              {
                value: false,
                label: translator.get('Common.Custom'),
                tooltipTranslation: 'Common.Custom',
              },
            ],
            show(data: EngineAPI.IGenericListProperties) {
              const { dataLayout, layoutOrder } = data.layoutOptions || {};
              return dataLayout === 'grid' && layoutOrder === 'column';
            },
          },
          maxVisibleRows: {
            type: 'number',
            ref: 'layoutOptions.maxVisibleRows.maxRows',
            translation: 'properties.filterpane.gridModeMaxRows',
            defaultValue: 3,
            show(data: EngineAPI.IGenericListProperties) {
              const { dataLayout, layoutOrder, maxVisibleRows } = data.layoutOptions || {};
              const { auto } = maxVisibleRows || {};
              return dataLayout === 'grid' && layoutOrder === 'column' && !auto;
            },
          },
          maxVisibleColumnsAuto: {
            type: 'boolean',
            component: 'switch',
            ref: 'layoutOptions.maxVisibleColumns.auto',
            translation: 'properties.filterpane.maxVisibleColumnsAuto',
            defaultValue: true,
            options: [
              {
                value: true,
                label: translator.get('Common.Auto'),
                tooltipTranslation: 'Common.Auto',
              },
              {
                value: false,
                label: translator.get('Common.Custom'),
                tooltipTranslation: 'Common.Custom',
              },
            ],
            show(data: EngineAPI.IGenericListProperties) {
              const { dataLayout, layoutOrder } = data.layoutOptions || {};
              return dataLayout === 'grid' && layoutOrder === 'row';
            },
          },
          maxVisibleColumns: {
            type: 'number',
            ref: 'layoutOptions.maxVisibleColumns.maxColumns',
            translation: 'properties.filterpane.gridModeMaxColumns',
            defaultValue: 3,
            show(data: EngineAPI.IGenericListProperties) {
              const { dataLayout, layoutOrder, maxVisibleColumns } = data.layoutOptions || {};
              const { auto } = maxVisibleColumns || {};
              return dataLayout === 'grid' && layoutOrder === 'row' && !auto;
            },
          },
        },
      },

    },
  };
}

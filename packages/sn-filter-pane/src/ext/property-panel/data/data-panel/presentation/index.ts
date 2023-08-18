/* eslint-disable no-param-reassign */
import { IGenericListPropertiesMissing } from '../../../../../../../../types/global';
import textAlignItems from '../../text-align-items';
import { IEnv } from '../../../../../types/types';
import frequencies from '../../../constants';
import updateForFrequencyMax from '../update-frequency-max';
import { INxAppLayout } from '../../../../../hooks/types/index.d';
import isDirectQueryEnabled from '../../../../../hooks/direct-query/is-direct-query-enabled';

const DEFAULT_LAYOUT_ORDER = 'column';

const change = updateForFrequencyMax;

export default function getPresentation(env: IEnv) {
  const { translator } = env;
  const { isEnabled } = env?.flags || {};
  const readOnly = (_properties: unknown, _handler: unknown, args: { app: { layout: INxAppLayout } }) => isDirectQueryEnabled({ env, appLayout: args?.app?.layout });
  return {
    type: 'items',
    translation: 'properties.presentation',
    items: {
      ...textAlignItems,
      denseMode: {
        ref: 'layoutOptions.dense',
        component: 'checkbox',
        translation: 'properties.filterpane.showDense',
        defaultValue: false,
      },
      checkboxes: {
        ref: 'checkboxes',
        translation: 'properties.filterpane.showCheckboxes',
        component: 'checkbox',
        defaultValue: false,
        readOnly,
      },
      histogram: {
        ref: 'histogram',
        grouped: true,
        component: 'checkbox',
        translation: 'properties.filterpane.showHistogram',
        defaultValue: false,
        change,
        readOnly,
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
            show(_properties: unknown, _handler: unknown, args: { app: { layout: INxAppLayout } }) {
              const isDQ = isDirectQueryEnabled({ env, appLayout: args?.app?.layout });
              return !isDQ && isEnabled?.('LIST_BOX_FREQUENCY_COUNT');
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
            change,
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
      collapseModeGroup: {
        type: 'items',
        grouped: true,
        show() {
          return env?.flags?.isEnabled('IM_4072_FILTERPANE_SETTINGS');
        },
        items: {
          collapseMode: {
            ref: 'layoutOptions.collapseMode',
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
            change(itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
              // Make sure layoutOrder is not undefined when we are in grid mode.
              if (itemData.layoutOptions.dataLayout === 'grid') {
                itemData.layoutOptions.layoutOrder = itemData.layoutOptions.layoutOrder ?? DEFAULT_LAYOUT_ORDER;
              }
            },
          },
          layoutOrder: {
            type: 'string',
            component: 'buttongroup',
            ref: 'layoutOptions.layoutOrder',
            translation: 'properties.filterpane.layoutOrder',
            defaultValue: DEFAULT_LAYOUT_ORDER,
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
              const { dataLayout, layoutOrder = DEFAULT_LAYOUT_ORDER } = data.layoutOptions || {};
              return dataLayout === 'grid' && layoutOrder === 'column';
            },
          },
          maxVisibleRows: {
            type: 'number',
            ref: 'layoutOptions.maxVisibleRows.maxRows',
            translation: 'properties.filterpane.gridModeMaxRows',
            defaultValue: 3,
            show(data: EngineAPI.IGenericListProperties) {
              const { dataLayout, layoutOrder = DEFAULT_LAYOUT_ORDER, maxVisibleRows } = data.layoutOptions || {};
              const { auto = true } = maxVisibleRows || {};
              return dataLayout === 'grid' && layoutOrder === 'column' && auto !== true;
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
              const { auto = true } = maxVisibleColumns || {};
              return dataLayout === 'grid' && layoutOrder === 'row' && auto !== true;
            },
          },
        },
      },

    },
  };
}

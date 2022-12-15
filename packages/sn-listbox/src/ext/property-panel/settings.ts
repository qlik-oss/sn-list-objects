import { IGenericListPropertiesMissing } from '../../../../../types/global';
import frequencies from './constants';

const settings = {
  uses: 'settings',
  items: {
    general: {
      items: {
        showTitles: {
          defaultValue: false,
        },
      },
    },
    presentation: {
      type: 'items',
      translation: 'properties.presentation',
      items: {
        frequencyCountMode: {
          ref: 'qListObjectDef.qFrequencyMode',
          type: 'string',
          component: 'dropdown',
          translation: 'properties.frequencyCountMode',
          change(props: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
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
        dataLayout: {
          type: 'string',
          component: 'buttongroup',
          ref: 'qListObjectDef.layouting.dataLayout',
          translation: 'Show data in',
          defaultValue: 'singleColumn',
          options: [
            {
              value: 'singleColumn',
              label: 'Single column',
              tooltipTranslation: 'Single column',
            },
            {
              value: 'grid',
              label: 'Grid',
              tooltipTranslation: 'Grid',
            },
          ],
        },
        layoutOrder: {
          type: 'string',
          component: 'buttongroup',
          ref: 'qListObjectDef.layouting.layoutOrder',
          translation: 'Order by',
          defaultValue: 'column',
          options: [
            {
              value: 'row',
              label: 'Row',
              tooltipTranslation: 'Row',
            },
            {
              value: 'column',
              label: 'Column',
              tooltipTranslation: 'Column',
            },
          ],
          show(data: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
            const { dataLayout } = data.qListObjectDef.layouting || {};
            return dataLayout === 'grid';
          },
        },
        maxVisibleRowsAuto: {
          type: 'boolean',
          component: 'switch',
          ref: 'qListObjectDef.layouting.maxVisibleRows.auto',
          translation: 'Max visible rows',
          defaultValue: true,
          options: [
            {
              value: true,
              label: 'Auto',
              tooltipTranslation: 'Auto',
            },
            {
              value: false,
              label: 'Custom',
              tooltipTranslation: 'Custom',
            },
          ],
          show(data: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
            const { dataLayout, layoutOrder } = data.qListObjectDef.layouting || {};
            return dataLayout === 'grid' && layoutOrder === 'column';
          },
        },
        maxVisibleRows: {
          type: 'number',
          ref: 'qListObjectDef.layouting.maxVisibleRows.maxRows',
          defaultValue: 3,
          show(data: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
            const { dataLayout, layoutOrder, maxVisibleRows } = data.qListObjectDef.layouting || {};
            const { auto } = maxVisibleRows || {};
            return dataLayout === 'grid' && layoutOrder === 'column' && !auto;
          },
        },
        maxVisibleColumnsAuto: {
          type: 'boolean',
          component: 'switch',
          ref: 'qListObjectDef.layouting.maxVisibleColumns.auto',
          translation: 'Max visible columns',
          defaultValue: true,
          options: [
            {
              value: true,
              label: 'Auto',
              tooltipTranslation: 'Auto',
            },
            {
              value: false,
              label: 'Custom',
              tooltipTranslation: 'Custom',
            },
          ],
          show(data: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
            const { dataLayout, layoutOrder } = data.qListObjectDef.layouting || {};
            return dataLayout === 'grid' && layoutOrder === 'row';
          },
        },
        maxVisibleColumns: {
          type: 'number',
          ref: 'qListObjectDef.layouting.maxVisibleColumns.maxColumns',
          defaultValue: 3,
          show(data: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) {
            const { dataLayout, layoutOrder, maxVisibleColumns } = data.qListObjectDef.layouting || {};
            const { auto } = maxVisibleColumns || {};
            return dataLayout === 'grid' && layoutOrder === 'row' && !auto;
          },
        },
      },
    },
  },
};

export default settings;

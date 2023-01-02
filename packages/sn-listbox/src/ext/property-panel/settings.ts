import { frequencies } from './constants';

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
          change(props) {
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
          ref: 'layoutOptions.dataLayout',
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
          ref: 'layoutOptions.layoutOrder',
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
          show(data) {
            const { dataLayout } = data.layoutOptions || {};
            return dataLayout === 'grid';
          },
        },
        maxVisibleRowsAuto: {
          type: 'boolean',
          component: 'switch',
          ref: 'layoutOptions.maxVisibleRows.auto',
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
          show(data) {
            const { dataLayout, layoutOrder } = data.layoutOptions || {};
            return dataLayout === 'grid' && layoutOrder === 'column';
          },
        },
        maxVisibleRows: {
          type: 'number',
          ref: 'layoutOptions.maxVisibleRows.maxRows',
          defaultValue: 3,
          show(data) {
            const { dataLayout, layoutOrder, maxVisibleRows } = data.layoutOptions || {};
            const { auto } = maxVisibleRows || {};
            return dataLayout === 'grid' && layoutOrder === 'column' && !auto;
          },
        },
        maxVisibleColumnsAuto: {
          type: 'boolean',
          component: 'switch',
          ref: 'layoutOptions.maxVisibleColumns.auto',
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
          show(data) {
            const { dataLayout, layoutOrder } = data.layoutOptions || {};
            return dataLayout === 'grid' && layoutOrder === 'row';
          },
        },
        maxVisibleColumns: {
          type: 'number',
          ref: 'layoutOptions.maxVisibleColumns.maxColumns',
          defaultValue: 3,
          show(data) {
            const { dataLayout, layoutOrder, maxVisibleColumns } = data.layoutOptions || {};
            const { auto } = maxVisibleColumns || {};
            return dataLayout === 'grid' && layoutOrder === 'row' && !auto;
          },
        },
      },
    },
  },
};

export default settings;

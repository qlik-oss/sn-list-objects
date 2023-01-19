import { ExportFormat, PropTree } from './types';

export function createImportProperties(exportFormat: ExportFormat, initialProperties: PropTree) {
  // TODO: add properties for unquarantine

  const propTree: PropTree = {
    qChildren: [
      {
        qProperty: {
          qInfo: { qType: 'listbox' },
        },
      },
    ],
    qProperty: {
      qInfo: {
        qType: 'filterpane',
      },
    },
  };
  return propTree;
}

export function exportProperties(expFormat: ExportFormat) {
  expFormat.data = [
    {
      dimensions: [
        {
          qDef: {},
        },
      ],
      measures: [],
      excludedDimensions: [],
      excludedMeasures: [],
      interColumnSortOrder: [],
    },
  ];
  expFormat.properties = {
    qInfo: {
      qType: 'filterpane',
    },
  };

  return expFormat;
}

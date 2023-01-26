import extend from 'extend';
import { ExportFormat, PropTree } from './types';
import objectConversion from './object-conversion';
import listObjectUtil from './list-object-util';

const MAX_DIMENSIONS = 1000;
const MIN_DIMENSIONS = 1;

export function createImportProperties(exportedFmt: ExportFormat, initialProperties: EngineAPI.IGenericHyperCubeProperties) {
  const newPropertyTree: PropTree = { qChildren: [], qProperty: {} as EngineAPI.IGenericHyperCubeProperties };
  let newProperties = {} as EngineAPI.IGenericHyperCubeProperties;
  const dataGroup = exportedFmt.data[0] as EngineAPI.IGenericHyperCubeProperties;
  newProperties.qLayoutExclude = { disabled: {} };
  let i;
  // for (key in exportedFmt.properties)
  Object.keys(exportedFmt.properties).forEach((key) => {
    if (key === 'qLayoutExclude') {
      if (exportedFmt.properties[key].quarantine) {
        newProperties.qLayoutExclude.quarantine = extend(true, {}, exportedFmt.properties[key].quarantine);
      }
    } else if (initialProperties.hasOwnProperty(key) || objectConversion.isMasterItemProp(key)) {
      newProperties[key] = exportedFmt.properties[key];
    } else {
      newProperties.qLayoutExclude.disabled[key] = exportedFmt.properties[key];
    }
  });

  newProperties = extend(true, {}, initialProperties, newProperties);

  for (i = 0; i < dataGroup.dimensions.length; ++i) {
    if (newPropertyTree.qChildren.length < MAX_DIMENSIONS) {
      newPropertyTree.qChildren.push({
        qProperty: listObjectUtil.createDefaultListBox(dataGroup.dimensions[i], dataGroup.dimensions[i].title),
        qChildren: [],
      });
    } else {
      if (!newProperties.qLayoutExclude) {
        newProperties.qLayoutExclude = {};
      }
      if (!newProperties.qLayoutExclude.qHyperCubeDef) {
        newProperties.qLayoutExclude.qHyperCubeDef = {};
      }
      if (!newProperties.qLayoutExclude.qHyperCubeDef.qDimensions) {
        newProperties.qLayoutExclude.qHyperCubeDef.qDimensions = [];
      }
      newProperties.qLayoutExclude.qHyperCubeDef.qDimensions.push(dataGroup.dimensions[i]);
    }
  }

  // filterpane does not support measures, import them as excluded measures
  if (dataGroup.measures.length) {
    if (!newProperties.qLayoutExclude.qHyperCubeDef) {
      newProperties.qLayoutExclude.qHyperCubeDef = {};
    }
    if (!newProperties.qLayoutExclude.qHyperCubeDef.qMeasures) {
      newProperties.qLayoutExclude.qHyperCubeDef.qMeasures = [];
    }
    for (i = 0; i < dataGroup.measures.length; ++i) {
      newProperties.qLayoutExclude.qHyperCubeDef.qMeasures.push(dataGroup.measures[i]);
    }
  }

  for (i = 0; i < dataGroup.excludedDimensions.length; ++i) {
    if (newPropertyTree.qChildren.length < MIN_DIMENSIONS) {
      newPropertyTree.qChildren.push({
        qProperty: listObjectUtil.createDefaultListBox(
          dataGroup.excludedDimensions[i],
          dataGroup.excludedDimensions[i].title,
        ),
        qChildren: [],
      });
    } else {
      if (!newProperties.qLayoutExclude.qHyperCubeDef) {
        newProperties.qLayoutExclude.qHyperCubeDef = {};
      }
      if (!newProperties.qLayoutExclude.qHyperCubeDef.qDimensions) {
        newProperties.qLayoutExclude.qHyperCubeDef.qDimensions = [];
      }
      newProperties.qLayoutExclude.qHyperCubeDef.qDimensions.push(dataGroup.excludedDimensions[i]);
    }
  }

  for (i = 0; i < dataGroup.excludedMeasures.length; ++i) {
    if (!newProperties.qLayoutExclude.qHyperCubeDef) {
      newProperties.qLayoutExclude.qHyperCubeDef = {};
    }
    if (!newProperties.qLayoutExclude.qHyperCubeDef.qMeasures) {
      newProperties.qLayoutExclude.qHyperCubeDef.qMeasures = [];
    }
    newProperties.qLayoutExclude.qHyperCubeDef.qMeasures.push(dataGroup.excludedMeasures[i]);
  }
  for (i = 0; i < dataGroup.interColumnSortOrder.length; ++i) {
    if (newProperties.qLayoutExclude.qHyperCubeDef) {
      if (!newProperties.qLayoutExclude.qHyperCubeDef.qInterColumnSortOrder) {
        newProperties.qLayoutExclude.qHyperCubeDef.qInterColumnSortOrder = [];
      }
      newProperties.qLayoutExclude.qHyperCubeDef.qInterColumnSortOrder.push(dataGroup.interColumnSortOrder[i]);
    }
  }

  // special case for qType and visualization should be copied from the new visualization's default properties.
  objectConversion.importCommonProperties(newProperties, exportedFmt, initialProperties);

  // special properties for filterpane
  if (newProperties.showTitles) {
    newProperties.qLayoutExclude.disabled.previousShowTitles = true;
    newProperties.showTitles = false;
  }

  newPropertyTree.qProperty = newProperties;
  return newPropertyTree;
}

export function exportProperties(expFormat: ExportFormat) {
  const out = { ...expFormat };
  out.data = [
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
  out.properties = {
    qInfo: {
      qType: 'filterpane',
    },
  };

  return out;
}

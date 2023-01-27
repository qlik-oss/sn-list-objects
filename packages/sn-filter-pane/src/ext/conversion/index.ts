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

function createExportFormatObj() {
  const expFmt: ExportFormat = { data: [], properties: {} as EngineAPI.IGenericHyperCubeProperties };
  expFmt.data.push({
    dimensions: [],
    measures: [],
    excludedDimensions: [],
    excludedMeasures: [],
    interColumnSortOrder: [],
  });

  return expFmt;
}

export function exportProperties(propertyTree: PropTree) {
  const exportFmt = createExportFormatObj();
  const properties: EngineAPI.IGenericHyperCubeProperties = propertyTree.qProperty;
  const dataGroup = exportFmt.data[0] as EngineAPI.IGenericHyperCubeProperties;
  let childProp;
  let i;
  let j;
  let propName;

  // export dimensions, a filterpane's children are qListObjectDefs
  if (propertyTree.qChildren) {
    for (i = 0; i < propertyTree.qChildren.length; ++i) {
      childProp = propertyTree.qChildren[i].qProperty;
      dataGroup.dimensions.push({
        qDef: childProp.qListObjectDef.qDef,
        qLibraryId: childProp.qListObjectDef.qLibraryId,
        qOtherTotalSpec: childProp.qListObjectDef.qOtherTotalSpec || {
          qOtherMode: 'OTHER_OFF',
          qOtherCounted: {
            // We need to default to 10 since PP can't handle this
            qv: '10',
          },
        },
        title: childProp.title,
      });
    }
  }
  if (properties.qLayoutExclude && properties.qLayoutExclude.qHyperCubeDef) {
    if (properties.qLayoutExclude.qHyperCubeDef.qDimensions) {
      for (i = 0; i < properties.qLayoutExclude.qHyperCubeDef.qDimensions.length; ++i) {
        dataGroup.excludedDimensions.push(properties.qLayoutExclude.qHyperCubeDef.qDimensions[i]);
      }
    }
    if (properties.qLayoutExclude.qHyperCubeDef.qMeasures) {
      for (i = 0; i < properties.qLayoutExclude.qHyperCubeDef.qMeasures.length; ++i) {
        dataGroup.excludedMeasures.push(properties.qLayoutExclude.qHyperCubeDef.qMeasures[i]);
      }
    }
    if (properties.qLayoutExclude.qHyperCubeDef.qInterColumnSortOrder) {
      for (i = 0; i < properties.qLayoutExclude.qHyperCubeDef.qInterColumnSortOrder.length; ++i) {
        dataGroup.interColumnSortOrder.push(properties.qLayoutExclude.qHyperCubeDef.qInterColumnSortOrder[i]);
      }
    }
  }

  Object.keys(properties).forEach((key) => {
    if (key !== 'qChildListDef') {
      // don't export qChildListDef property
      exportFmt.properties[key] = properties[key];
    }
  });

  if (!properties.qLayoutExclude) {
    properties.qLayoutExclude = {};
  }

  if (properties.qLayoutExclude.disabled) {
    Object.keys(properties.qLayoutExclude.disabled).forEach((key) => {
      propName = key;
      if (!exportFmt.properties.hasOwnProperty(propName)) {
        exportFmt.properties[propName] = properties.qLayoutExclude.disabled[key];
      }
    });
    if (properties.qLayoutExclude.disabled.previousShowTitles) {
      exportFmt.properties.showTitles = true;
    }
  }

  delete properties.qLayoutExclude;

  // fix sort by frequency. simply turn it off
  for (i = 0; i < dataGroup.dimensions.length; ++i) {
    for (j = 0; j < dataGroup.dimensions[i].qDef.qSortCriterias.length; ++j) {
      dataGroup.dimensions[0].qDef.qSortCriterias[j].qSortByFrequency = 0;
      dataGroup.dimensions[0].qDef.qSortCriterias[j].qSortByState = 0;
    }
  }

  return exportFmt;
}

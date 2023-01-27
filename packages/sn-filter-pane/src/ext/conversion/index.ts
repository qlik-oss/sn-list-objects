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

function createExportFormatObj() {
  let expFmt: ExportFormat = { data: [], properties: {}};
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
    const dataGroup = exportFmt.data[0];
    let childProp;
    let i;
    let j;
    let key;
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

    for (key in properties) {
      if (key !== 'qChildListDef') {
        // don't export qChildListDef property
        exportFmt.properties[key] = properties[key];
      }
    }

    if (!properties.qLayoutExclude) {
      properties.qLayoutExclude = {};
    }

    if (properties.qLayoutExclude.disabled) {
      for (key in properties.qLayoutExclude.disabled) {
        propName = key;
        if (!exportFmt.properties.hasOwnProperty(propName)) {
          exportFmt.properties[propName] = properties.qLayoutExclude.disabled[key];
        }
      }
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

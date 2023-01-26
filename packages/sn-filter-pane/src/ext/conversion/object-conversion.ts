import { ExportFormat } from './types';

function importCommonProperties(newProperties: EngineAPI.IGenericHyperCubeProperties, exportedFmt: ExportFormat, initialProperties: EngineAPI.IGenericHyperCubeProperties) {
  if (exportedFmt.properties.qInfo.qType === 'masterobject') {
    newProperties.qInfo.qType = 'masterobject';
  } else {
    newProperties.qInfo.qType = initialProperties.qInfo.qType;
  }
  newProperties.visualization = initialProperties.visualization;
}

/**
 * Used to check if a property key is part of the master item information
 * @param propertyName Name of the key in the properties object
 * @returns {boolean}
 */
function isMasterItemProp(propertyName: string) {
  return ['qMetaDef', 'descriptionExpression', 'labelExpression'].indexOf(propertyName) !== -1;
}

export default {
  importCommonProperties,
  isMasterItemProp,
};

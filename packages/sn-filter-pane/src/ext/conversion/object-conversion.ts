import { ExportFormat } from './types';

function importCommonProperties(newProperties: EngineAPI.IGenericObjectProperties, exportedFmt: ExportFormat, initialProperties: EngineAPI.IGenericObjectProperties) {
  const newProps = newProperties;
  if (exportedFmt.properties.qInfo.qType === 'masterobject') {
    newProps.qInfo.qType = 'masterobject';
  } else {
    newProps.qInfo.qType = initialProperties.qInfo.qType;
  }
  newProps.visualization = initialProperties.visualization;
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

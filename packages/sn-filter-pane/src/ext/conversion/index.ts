import conversion from 'qlik-object-conversion';
import getData from '../../qae/data';
import { IEnv } from '../../types/types';

interface ExportFormat {
    data: unknown[];
    properties: EngineAPI.IGenericHyperCubeProperties;
  }

  interface PropTree {
    qChildren: unknown[];
    qProperty: EngineAPI.IGenericHyperCubeProperties;
  }

export function createImportProperties(env: IEnv) {
  const dataDefinition = getData(env);

  return (
    exportFormat: ExportFormat,
    initialProperties: EngineAPI.IGenericHyperCubeProperties,
  ): PropTree => {
    const propTree = conversion.hypercube.importProperties({
      exportFormat,
      initialProperties,
      dataDefinition: dataDefinition.targets[0],
    });

    return propTree;
  };
}

export function exportProperties(propertyTree: PropTree, hyperCubePath: string): ExportFormat {
  const expFormat = conversion.hypercube.exportProperties({
    propertyTree,
  });

  conversion.conditionalShow.quarantine(expFormat.properties);

  return expFormat;
}

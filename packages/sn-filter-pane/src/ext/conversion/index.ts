import conversion from 'qlik-object-conversion';
import getData from '../../qae/data';
import { IEnv } from '../../types/types';

interface ExportFormat {
    data: unknown[];
    properties: EngineAPI.IGenericHyperCubeProperties;
  }

  interface PropTree {
    qChildren: unknown[];
  }

export function createImportProperties(env: IEnv) {
  // TODO: add properties for unquarantine
}

export function exportProperties(propertyTree: PropTree): ExportFormat {
  const expFormat = conversion.hypercube.exportProperties({
    propertyTree,
  });

  conversion.conditionalShow.quarantine(expFormat.properties);

  return expFormat;
}

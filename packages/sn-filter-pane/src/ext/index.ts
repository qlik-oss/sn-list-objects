import pp from './property-panel';
import { IEnv } from '../types/types';
import { createImportProperties, exportProperties } from './conversion';
import { ExportFormat, PropTree } from './conversion/types';

export default function ext(env: IEnv) {
  return {
    usePropertyHandler: 'filterpane-data',
    definition: <object>pp(env),
    support: {
      snapshot: true,
      export: true,
      exportData: true,
      sharing: false,
      viewData: true,
    },
    importProperties: (exportFormat:ExportFormat, initialProperties: PropTree) => createImportProperties(exportFormat, initialProperties),
    exportProperties,
  };
}

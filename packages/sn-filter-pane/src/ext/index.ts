import pp from './property-panel';
import { IEnv } from '../types/types';
import { createImportProperties, exportProperties } from './conversion';

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
    importProperties: createImportProperties(env),
    exportProperties,
  };
}

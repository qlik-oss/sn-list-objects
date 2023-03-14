import pp from './property-panel';
import { IEnv } from '../types/types';
import { createImportProperties, exportProperties } from './conversion';
import { ExportFormat } from './conversion/types';

export default function ext(env: IEnv) {
  return {
    usePropertyHandler: 'filterpane-data',
    definition: <object>pp(env),
    support: {
      snapshot: false,
      export: false,
      exportData: true,
      sharing: false,
      viewData: false,
    },
    importProperties: (exportFormat:ExportFormat, initialProperties: EngineAPI.IGenericHyperCubeProperties) => createImportProperties(exportFormat, initialProperties),
    exportProperties,
    getDropFieldOptions(builder, propertyHandler, model: EngineAPI.IGenericObject/* , showMenu, object */) {
      if (propertyHandler.getDimensions().length < propertyHandler.maxDimensions()) {
        propertyHandler.setModel(model);
        builder.Add(model, propertyHandler);
        builder.menu?.items?.[0]?.select();
      }
    },
    getDropMeasureOptions(builder, propertyHandler, model: EngineAPI.IGenericObject, showMenu: () => void) {
      showMenu();
    },
  };
}

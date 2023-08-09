import { IEnv } from '../../types/types';
import stylingPanelDef from './data/data-panel/presentation/styling-definitions/styling-panel-def';

function getSettings(env: IEnv) {
  const { flags } = env || {};

  const settings = {
    uses: 'settings',
    items: {
      general: {
        items: {
          showTitles: {
            defaultValue: false,
          },
        },
      },
      simpleLabels: null,
    },
  };
  if (flags.isEnabled('IM_4073_FILTERPANE_STYLING')) {
    Object.assign(settings.items, {
      presentation: {
        grouped: true,
        type: 'items',
        translation: 'properties.presentation',
        items: [stylingPanelDef],
      },
    });
  }

  return settings;
}

export default getSettings;

import { IEnv } from '../../../types/types';
import stylingPanelDef from '../data/data-panel/presentation/styling-definitions/styling-panel-def';
import collapseModeDef from './collapse-mode';

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
  if (flags.isEnabled('IM_4073_FILTERPANE_STYLING') || flags.isEnabled('IM_4072_FILTERPANE_SETTINGS')) {
    const stylingPanel = flags.isEnabled('IM_4073_FILTERPANE_STYLING') ? stylingPanelDef : {};
    const collapseMode = flags.isEnabled('IM_4072_FILTERPANE_SETTINGS') ? collapseModeDef : {};

    Object.assign(settings.items, {
      presentation: {
        grouped: true,
        type: 'items',
        translation: 'properties.presentation',
        items: {
          ...stylingPanel,
          ...collapseMode,
        },
      },
    });
  }

  return settings;
}

export default getSettings;

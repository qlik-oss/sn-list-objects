import { IEnv } from "../../types/types";
import stylingPanelDef from "./data/data-panel/presentation/styling-definitions/styling-panel-def";

function getSettings(env: IEnv) {
  const { flags } = env || {};
  const stylingPanelEnabled = flags.isEnabled('IM_4073_FILTERPANE_STYLING')
  const stylingPanel = stylingPanelEnabled && stylingPanelDef;
  return {
    uses: 'settings',
    items: {
      general: {
        items: {
          showTitles: {
            defaultValue: false,
          },
        },
      },
      presentation: {
        grouped: true,
        type: 'items',
        translation: 'properties.presentation',
        items: [stylingPanel]
      },
      simpleLabels: null,
    },
  }
};

export default getSettings;

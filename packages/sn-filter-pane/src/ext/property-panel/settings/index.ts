import { IEnv } from '../../../types/types';
import getPresentation from './presentation';

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

  if (flags?.isEnabled('IM_4073_FILTERPANE_STYLING')) {
    Object.assign(settings.items, getPresentation(env));
  }

  return settings;
}

export default getSettings;

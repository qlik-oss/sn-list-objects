import { IGenericListPropertiesMissing } from '../../../../../../../types/global';
import { IEnv } from '../../../../types/types';
import frequencies from '../../constants';

export default function getPresentation(env: IEnv) {
  const { isEnabled } = env?.flags || {};

  return {
    frequencyCountMode: {
      ref: 'qListObjectDef.qFrequencyMode',
      convertFunctions: {
        get(
          getter: () => EngineAPI.FrequencyModeType,
          definition: unknown,
          args: unknown,
          itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing,
        ) {
          if (itemData.qListObjectDef.frequencyEnabled) {
            return getter();
          }
          return frequencies.FREQUENCY_NONE;
        },
        set(
          value: EngineAPI.FrequencyModeType,
          setter: (type: string, newValue: EngineAPI.FrequencyModeType) => void,
          definition: unknown,
          args: unknown,
          itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing,
        ) {
          if (value !== frequencies.FREQUENCY_NONE) {
            setter('string', value);
            itemData.qListObjectDef.frequencyEnabled = true;
          } else if (itemData.histogram) {
            itemData.qListObjectDef.frequencyEnabled = false;
            setter('string', frequencies.FREQUENCY_VALUE);
          } else {
            itemData.qListObjectDef.frequencyEnabled = false;
            setter('string', frequencies.FREQUENCY_NONE);
          }
        },
      },
      type: 'string',
      component: 'dropdown',
      defaultValue: frequencies.FREQUENCY_NONE,
      show() {
        return isEnabled('LIST_BOX_FREQUENCY_COUNT');
      },
      translation: 'properties.frequencyCountMode',
      options: [
        {
          value: frequencies.FREQUENCY_NONE,
          translation: 'properties.frequencyCountNone',
        },
        {
          value: frequencies.FREQUENCY_VALUE,
          translation: 'properties.frequencyCountAsValue',
        },
        {
          value: frequencies.FREQUENCY_PERCENT,
          translation: 'properties.frequencyCountAsPercent',
        },
      ],
    },
  };
}

/* eslint-disable no-param-reassign */
import { IGenericListPropertiesMissing } from '../../../../../../../types/global';
import frequencies from '../../constants';

const escapeField = (field: string) => {
  if (!field || field === ']') {
    return field;
  }
  return `${field.replace(/\]/g, ']]')}`;
};

const updateForFrequencyMax = (itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) => {
  if (itemData.histogram && itemData.qListObjectDef.qFrequencyMode === frequencies.FREQUENCY_NONE) {
    itemData.qListObjectDef.qFrequencyMode = frequencies.FREQUENCY_VALUE;
  }
  if (!itemData.histogram || itemData.qListObjectDef.qFrequencyMode !== frequencies.FREQUENCY_VALUE) {
    itemData.frequencyMax = null;
  } else {
    const [qDef] = itemData.qListObjectDef.qDef.qFieldDefs ?? [];
    const exp = escapeField(qDef as string);
    itemData.frequencyMax = { qValueExpression: `Max(AGGR(Count([${exp}]), [${exp}]))` };
  }
};

export default updateForFrequencyMax;

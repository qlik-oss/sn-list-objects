/* eslint-disable no-param-reassign */
import { IGenericListPropertiesMissing } from '../../../../../../../types/global';
import frequencies from '../../constants';

const escapeField = (field: string) => {
  if (!field || field === ']') {
    return field;
  }
  return `${field.replace(/\]/g, ']]')}`;
};

const change = (itemData: EngineAPI.IGenericListProperties & IGenericListPropertiesMissing) => {
  if (itemData.histogram && itemData.qListObjectDef.qFrequencyMode === frequencies.FREQUENCY_NONE) {
    itemData.qListObjectDef.qFrequencyMode = frequencies.FREQUENCY_VALUE;
  }
  const [qDef] = itemData.qListObjectDef.qDef.qFieldDefs ?? [];
  const exp = escapeField(qDef as string);
  itemData.frequencyMax = itemData.histogram && itemData.qListObjectDef.qFrequencyMode === frequencies.FREQUENCY_VALUE ? { qValueExpression: `Max(AGGR(Count([${exp}]), [${exp}]))` } : null;
};

export default change;

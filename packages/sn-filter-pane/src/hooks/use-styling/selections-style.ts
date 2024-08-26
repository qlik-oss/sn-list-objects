import { stardust } from '@nebula.js/stardust';
import { IComponentOverrides } from './types';
import { IEnv } from '../../types/types';

interface IGetSelectionStyles {
  componentsOverrides: IComponentOverrides;
  stardustTheme: stardust.Theme,
  getListboxStyle: (path: string, prop: string) => string | undefined
  env?: IEnv
}

enum SelectionType {
  Selected = 'selected',
  Alternative = 'alternative',
  Excluded = 'excluded',
  SelectedExcluded = 'selectedExcluded',
  Possible = 'possible'
}

export const DEFAULT_COLORS: Record<SelectionType, string> = {
  selected: '#00873D',
  alternative: '#E4E4E4',
  excluded: '#A9A9A9',
  selectedExcluded: '#A9A9A9',
  possible: '#FFFFFF',
};

export default function getSelectionsStyle({
  componentsOverrides,
  stardustTheme,
  getListboxStyle,
  env,
}: IGetSelectionStyles) {
  const getThemeDataColor = (type: SelectionType) => {
    const isEnabled = env?.flags?.isEnabled('PS_22149_THEME_SELECTION_COLORS');
    return isEnabled ? getListboxStyle('', `dataColors.${type}`) : undefined;
  };

  const getColor = (type: SelectionType) => {
    const componentColor = componentsOverrides?.selections?.colors?.[type];
    const evaluatedColorFromComponents = componentColor && stardustTheme?.getColorPickerColor(componentColor);
    return evaluatedColorFromComponents || getThemeDataColor(type) || DEFAULT_COLORS[type];
  };

  return {
    selected: getColor(SelectionType.Selected),
    alternative: getColor(SelectionType.Alternative),
    excluded: getColor(SelectionType.Excluded),
    selectedExcluded: getColor(SelectionType.SelectedExcluded),
    possible: getColor(SelectionType.Possible),
  };
}

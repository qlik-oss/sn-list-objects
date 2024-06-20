import { stardust } from '@nebula.js/stardust';
import { IComponentOverrides } from './types';

interface IGetSelectionStyles {
  componentsOverrides: IComponentOverrides;
  stardustTheme: stardust.Theme,
  getListboxStyle: (path: string, prop: string) => string | undefined
}

enum SelectionType {
  Selected = 'selected',
  Alternative = 'alternative',
  Excluded = 'excluded',
  SelectedExcluded = 'selectedExcluded',
  Possible = 'possible'
}

export const DEFAULT_COLORS: Record<SelectionType, string> = {
  selected: '#009845',
  alternative: '#E4E4E4',
  excluded: '#A9A9A9',
  selectedExcluded: '#A9A9A9',
  possible: '#FFFFFF',
};

export default function getSelectionsStyle({ componentsOverrides, stardustTheme, getListboxStyle }: IGetSelectionStyles) {
  const getColor = (type: SelectionType) => {
    const componentColor = componentsOverrides?.selections?.colors?.[type];
    const evaluatedColorFromComponents = componentColor && stardustTheme?.getColorPickerColor ? stardustTheme.getColorPickerColor(componentColor, false) : undefined;
    return evaluatedColorFromComponents || getListboxStyle('', `dataColors.${type}`) || DEFAULT_COLORS[type];
  };

  return {
    selected: getColor(SelectionType.Selected),
    alternative: getColor(SelectionType.Alternative),
    excluded: getColor(SelectionType.Excluded),
    selectedExcluded: getColor(SelectionType.SelectedExcluded),
    possible: getColor(SelectionType.Possible),
  };
}

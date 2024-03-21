import { stardust } from '@nebula.js/stardust';
import { IComponentOverrides } from './types';
import { ISelectionsComponent } from '../types/components';

interface IGetSelectionStyles {
  componentsOverrides: IComponentOverrides;
  stardustTheme: stardust.Theme,
}

export default function getSelectionsStyle({ componentsOverrides, stardustTheme }: IGetSelectionStyles) {
  const selectionColors = componentsOverrides?.selections?.colors || {} as ISelectionsComponent['colors'];

  const getColor = stardustTheme?.getColorPickerColor || (() => false);

  const selected = getColor(selectionColors.selected || {}, false) || '#009845';
  const alternative = getColor(selectionColors.alternative || {}, false) || '#E4E4E4';
  const excluded = getColor(selectionColors.excluded || {}, false) || '#A9A9A9';
  const selectedExcluded = getColor(selectionColors.selectedExcluded || {}, false) || '#A9A9A9';
  const possible = getColor(selectionColors.possible || {}, false) || '#FFFFFF';

  return {
    selected,
    alternative,
    excluded,
    selectedExcluded,
    possible,
  };
}

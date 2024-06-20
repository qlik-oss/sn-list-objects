import { stardust } from '@nebula.js/stardust';
import { IComponentOverrides } from '../types';
import getSelectionsStyle, { DEFAULT_COLORS } from '../selections-style';
import { ISelectionsComponent } from '../../types/components';

// jest.mock('@nebula.js/stardust');

describe('getSelectionsStyle', () => {
  let componentsOverrides: IComponentOverrides;
  let stardustTheme: stardust.Theme;
  let getListboxStyle: (path: string, prop: string) => string | undefined;

  beforeEach(() => {
    componentsOverrides = {};
    stardustTheme = {} as stardust.Theme;
    getListboxStyle = () => undefined;
  });

  it('should return default selection colors', () => {
    const selectionStyle = getSelectionsStyle({ componentsOverrides, stardustTheme, getListboxStyle });
    expect(selectionStyle).toEqual(DEFAULT_COLORS);
  });

  it('should return colors from theme', () => {
    getListboxStyle = (path: string, prop: string) => prop;

    const selectionStyle = getSelectionsStyle({ componentsOverrides, stardustTheme, getListboxStyle });
    expect(selectionStyle).toEqual({
      selected: 'dataColors.selected',
      alternative: 'dataColors.alternative',
      excluded: 'dataColors.excluded',
      selectedExcluded: 'dataColors.selectedExcluded',
      possible: 'dataColors.possible',
    });
  });

  it('should return colors componentsOverrides', () => {
    componentsOverrides.selections = {
      colors: {
        selected: { color: '#AAAAAA' },
        alternative: { color: '#BBBBBB'},
        excluded: { color: '#CCCCCC'},
        selectedExcluded: { color: '#DDDDDD'},
        possible: { color: '#EEEEEE'},
      },
    } as ISelectionsComponent;
    stardustTheme.getColorPickerColor = (c: {color: string, index: number}): string => c.color;

    const selectionStyle = getSelectionsStyle({ componentsOverrides, stardustTheme, getListboxStyle });
    expect(selectionStyle).toEqual({
      selected: '#AAAAAA',
      alternative: '#BBBBBB',
      excluded: '#CCCCCC',
      selectedExcluded: '#DDDDDD',
      possible: '#EEEEEE',
    });
  });
});

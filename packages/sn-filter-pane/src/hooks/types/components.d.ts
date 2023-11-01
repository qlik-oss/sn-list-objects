import { Theme as StardustTheme } from '@nebula.js/stardust';

export type IThemeComponent = {
  key: 'theme',
  content?: {
    fontSize?: string;
    fontColor?: {
      color?: string;
    },
    useContrastColor?: boolean;
  },
  header?: {
    fontColor?: {
      color?: string;
    };
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
  };
};

type ISelectionColor = { color: string };

export type ISelectionsComponent = {
  key: 'selections',
  colors: {
    selected: ISelectionColor;
    alternative: ISelectionColor;
    excluded: ISelectionColor;
    selectedExcluded: ISelectionColor;
    possible: ISelectionColor;
    selectedContrast: ISelectionColor;
    alternativeContrast: ISelectionColor;
    excludedContrast: ISelectionColor;
    selectedExcludedContrast: ISelectionColor;
    possibleContrast: ISelectionColor;
  }
};

export type IComponent = IThemeComponent | ISelectionsComponent;

export interface IStyles {
  backgroundColor?: string;
  listbox: {
    backgroundColor?: string;
    color?: string;
  };
  popover: {
    backgroundColor?: string;
  };
  header?: {
    color?: string;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
  };
  stardustTheme: StardustTheme;
}

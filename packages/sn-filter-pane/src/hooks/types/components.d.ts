import { Theme as StardustTheme } from '@nebula.js/stardust';

export type ISizing = 'originalSize' | 'alwaysFit' | 'fitWidth' | 'fitHeight' | 'stretchFit' | 'alwaysFill';

export type IThemeComponent = {
  key: 'theme';
  content?: {
    fontSize?: string;
    fontColor?: {
      color?: string;
    };
    useContrastColor?: boolean;
  };
  header?: {
    fontColor?: {
      color?: string;
    };
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
  };
  background?: {
    useColorExpression?: string;
    colorExpression?: string;
    mode?: string;
    color?: {
      color?: string;
      index?: number;
    };
    image?: {
      expressionUrl?: string;
      mode?: 'media' | 'expression';
      mediaUrl?: { qStaticContentUrl?: { qUrl?: string } };
      url?: { qStaticContentUrl?: { qUrl?: string } };
      position?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
      sizing?: ISizing;
      size?: ISizing;
    }
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
  listbox: {
    background: {
      color?: string;
      image?: {
        url?: string;
        position?: string;
        size?: string;
      }
    };
    color?: string;
  }
  header: {
    color?: string;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
  };
  popover: {
    backgroundColor?: string; // TODO: should we allow customisable background image in popover mode
  };
  stardustTheme: StardustTheme;
}

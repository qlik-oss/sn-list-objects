import { Theme as StardustTheme } from '@nebula.js/stardust';

export type ISizing = 'originalSize' | 'alwaysFit' | 'fitWidth' | 'fitHeight' | 'stretchFit' | 'alwaysFill';

export type IColor = {
  color?: string;
  index?: number;
}

type IFontStyle = {
  bold?: boolean;
  normal?: boolean;
  underline?: boolean;
  italic?: boolean;
};

type IFontStyles = {
  fontColor?: {
    color?: string;
  };
  fontSize?: string;
  fontFamily?: string;
  fontStyle?: IFontStyle;
  fontWeight?: string | number;
}

export type IThemeComponent = {
  key: 'theme';
  content?: IFontStyles & {
    useContrastColor?: boolean;
  };
  header?: IFontStyles;
  background?: {
    useExpression?: string;
    colorExpression?: string;
    mode?: string;
    color?: IColor;
    image?: {
      expressionUrl?: string;
      mode?: 'media' | 'expression';
      mediaUrl?: { qStaticContentUrl?: { qUrl?: string } };
      position?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
      sizing?: ISizing;
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

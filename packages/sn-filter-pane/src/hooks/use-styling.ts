import { useTheme as useStardustTheme } from '@nebula.js/stardust';
import muiTheme from '../theme/theme';
import {
  IComponent, ISelectionsComponent, IStyles, IThemeComponent,
} from './types/components';

type IComponentOverrides = {
  theme?: IThemeComponent;
  selections?: ISelectionsComponent;
};

interface ICreateStylingArgs {
  components?: IComponent[];
}

const SUPPORTED_COMPONENTS = ['theme', 'selections'];

function getOverridesAsObject(components: IComponent[] = []): IComponentOverrides {
  // Currently supporting components "theme" and "selections".
  const overrides = {};
  components.forEach((c: IComponent) => {
    const k: IComponent['key'] = c?.key;
    if (SUPPORTED_COMPONENTS.includes(k)) {
      Object.assign(overrides, { [k]: c });
    }
  });

  return overrides;
}

/**
 *
 * The idea of this function is to merge all styles into one styling object
 * and only send around this object. This makes it clearer in which order
 * styles are overriding each other. Styles can currently come from:
 * 1. components
 * 2. stardustTheme
 * 3. muiTheme
 *
 * They are generally overridden in above order.
 */
export default function useStyling({ components = [] }: ICreateStylingArgs): IStyles {
  const stardustTheme = useStardustTheme();
  const componentsOverrides = getOverridesAsObject(components);

  const getListboxStyle = (path: string, prop: string) => stardustTheme?.getStyle('object.listBox', path, prop);

  const backgroundColor = stardustTheme?.getStyle('object', '', 'filterpane.backgroundColor');

  const mergedStyle = {
    backgroundColor,
    listbox: {
      backgroundColor: getListboxStyle('', 'backgroundColor') || muiTheme?.palette.background.default || '#ffffff',
      color: componentsOverrides.theme?.header?.fontColor?.color || getListboxStyle('title.main', 'color') || '#404040',
    },
    popover: {
      // Do not permit transparent or non-colored popovers.
      backgroundColor: !backgroundColor || backgroundColor === 'transparent' ? muiTheme?.palette.background.default : backgroundColor,
    },
    header: {
      // Listbox style included here because it is applied on collapsed headers, which resides in Filter pane code.
      color: componentsOverrides.theme?.header?.fontColor?.color || getListboxStyle('title.main', 'color'),
      fontSize: componentsOverrides.theme?.header?.fontSize || getListboxStyle('title.main', 'fontSize') || '13px',
      fontFamily: getListboxStyle('title.main', 'fontFamily') || '"Source Sans Pro", sans-serif',
      fontWeight: getListboxStyle('title.main', 'fontWeight') || '700',
    },

    // The theme is only exposed here temporarilly. The idea is to not expose any theme directly,
    // but instead let them populate the merged style. Remove when possible.
    stardustTheme,
  };

  return mergedStyle;
}

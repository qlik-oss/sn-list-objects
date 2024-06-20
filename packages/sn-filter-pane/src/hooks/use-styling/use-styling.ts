import { useTheme as useStardustTheme } from '@nebula.js/stardust';
import muiTheme from '../../theme/theme';
import { IComponent, IStyles } from '../types/components';
import { resolveBgColor, resolveBgImage } from '../styling-utils';
import { IComponentOverrides, ICreateStylingArgs } from './types';
import getSelectionsStyle from './selections-style';

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
export default function useStyling({ app, components = [] }: ICreateStylingArgs): IStyles {
  const stardustTheme = useStardustTheme();
  const componentsOverrides = getOverridesAsObject(components);
  const getListboxStyle = (path: string, prop: string) => stardustTheme?.getStyle('object.listBox', path, prop);

  const imgDef = componentsOverrides.theme?.background?.image;
  const bgImage = resolveBgImage({ bgImage: imgDef }, app);
  const listboxBgColor = resolveBgColor({ stardustTheme, themeOverrides: componentsOverrides.theme })
    || getListboxStyle('', 'backgroundColor')
    || muiTheme?.palette.background.default
    || '#ffffff';

  const headerFontStyle = componentsOverrides.theme?.header?.fontStyle || {};

  const selections = getSelectionsStyle({ componentsOverrides, stardustTheme, getListboxStyle });

  const mergedStyle = {
    listbox: {
      background: {
        color: listboxBgColor,
        backgroundColor: listboxBgColor,
        backgroundImage: bgImage?.url ? `url('${bgImage.url}')` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundSize: bgImage?.size,
        backgroundPosition: bgImage?.pos,
        opacity: 1, // to override qlik disabled button style
      },
      color: componentsOverrides.theme?.header?.fontColor?.color || getListboxStyle('title.main', 'color') || '#404040',
      selections,
    },
    popover: {
      // Do not permit transparent or non-colored popovers.
      backgroundColor: !bgImage?.url && (!listboxBgColor || listboxBgColor === 'transparent') ? muiTheme?.palette.background.default : listboxBgColor,
    },
    header: {
      // Listbox style included here because it is applied on collapsed headers, which resides in Filter pane code.
      color: componentsOverrides.theme?.header?.fontColor?.color || getListboxStyle('title.main', 'color'),
      fontSize: componentsOverrides.theme?.header?.fontSize || getListboxStyle('title.main', 'fontSize') || '13px',
      fontFamily: componentsOverrides.theme?.header?.fontFamily || getListboxStyle('title.main', 'fontFamily') || '"Source Sans Pro", sans-serif',
      fontWeight: (headerFontStyle.bold && 'bold') || (headerFontStyle.bold === false && 'normal') || getListboxStyle('title.main', 'fontWeight') || 'bold',
      textDecoration: headerFontStyle.underline ? 'underline' : 'initial',
      fontStyle: (headerFontStyle.italic && 'italic') || (headerFontStyle.italic === false && 'normal') || getListboxStyle('title.main', 'fontStyle') || 'initial',
    },
  };

  return mergedStyle;
}

/* eslint-disable no-param-reassign */
import { getFontSizes } from './styling-utils/font-utils';

export default function getStyling(env) {
  const { theme } = env?.anything?.sense || {};

  const getListBoxStyle = (p = '') => {
    // Utility func to prevent specifying 3 arguments for a simple property retrieval.
    const [property, ...path] = p.split('.').reverse();
    const pathString = path.join('.');
    const s = theme.getStyle('object.listBox', !property ? '' : pathString, property || pathString);
    return s;
  };

  const defaultFontSize = (getListBoxStyle('title.main.fontSize') ?? getListBoxStyle('fontSize'));
  const defaultContentFontSize = getListBoxStyle('content.fontSize') ?? getListBoxStyle('fontSize');
  const defaultColor = getListBoxStyle('content.color') ?? getListBoxStyle('color');

  const stylingPanelDef = {
    stylingPanel: {
      component: 'styling-panel',
      chartType: 'filterpane',
      translation: 'LayerStyleEditor.component.styling',
      chartTitle: 'Object.FilterPane',
      useBackground: true,
      subtitle: 'LayerStyleEditor.component.styling',
      useGeneral: true,
      items: {
        headerSection: {
          component: 'panel-section',
          translation: 'properties.Header',
          items: {
            headerItems: {
              component: 'items',
              ref: 'components',
              key: 'theme',
              items: {
                fontWrapperItem: {
                  component: 'inline-wrapper',
                  items: {
                    fontSizeItem: {
                      component: 'dropdown',
                      ref: 'axis.title.fontSize',
                      options: getFontSizes({
                        min: 10, max: 24, theme, defaultFontSize,
                      }),
                      defaultValue: defaultFontSize,
                    },
                    fontColorItem: {
                      ref: 'header.fontColor',
                      component: 'color-picker',
                      width: false,
                      defaultValue: {
                        color: getListBoxStyle('title.main.color'),
                      },
                    },
                  },
                },
              },
            },
          },
        },
        contentSection: {
          component: 'panel-section',
          translation: 'properties.Content',
          items: {
            contentItems: {
              component: 'items',
              ref: 'components',
              key: 'theme',
              items: {
                contentFontWrapper: {
                  component: 'inline-wrapper',
                  items: {
                    contentFontSizeItem: {
                      component: 'dropdown',
                      ref: 'content.fontSize',
                      options: getFontSizes({
                        min: 5, max: 24, theme, defaultFontSize,
                      }),
                      defaultValue: defaultContentFontSize,
                    },
                    contentFontColor: {
                      ref: 'content.fontColor',
                      type: 'object',
                      component: 'color-picker',
                      width: false,
                      defaultValue: { color: defaultColor },
                    },
                  },
                },
                autoContrast: {
                  component: 'inline-wrapper',
                  items: {
                    useContrastColor: {
                      ref: 'content.useContrastColor',
                      type: 'boolean',
                      grouped: false,
                      component: 'checkbox',
                      translation: 'properties.styling.autoContrastColor',
                      defaultValue: true,
                    },
                  },
                },
              },
            },
          },
        },
        selectionStateSection: {
          component: 'panel-section',
          translation: 'properties.styling.selectionState',
          items: {
            selectionItems: {
              component: 'items',
              ref: 'components',
              key: 'selections',
              items: {
                selectedColor: {
                  ref: 'colors.selected',
                  type: 'object',
                  component: 'color-picker',
                  translation: 'Object.Listbox.Selected',
                  defaultValue: { color: '#009845' },
                },
                alternativeColor: {
                  ref: 'colors.alternative',
                  type: 'object',
                  component: 'color-picker',
                  translation: 'Object.Listbox.Alternative',
                  defaultValue: { color: '#E4E4E4' },
                },
                excludedColor: {
                  ref: 'colors.excluded',
                  type: 'object',
                  component: 'color-picker',
                  translation: 'Object.Listbox.Excluded',
                  defaultValue: { color: '#BEBEBE' },
                },
                selectedExcludedColor: {
                  ref: 'colors.selectedExcluded',
                  type: 'object',
                  component: 'color-picker',
                  translation: 'Object.Listbox.SelectedExcluded',
                  defaultValue: { color: '#A9A9A9' },
                },
                possibleColor: {
                  ref: 'colors.possible',
                  type: 'object',
                  component: 'color-picker',
                  translation: 'Object.Listbox.Possible',
                  defaultValue: { color: '#FFFFFF' },
                },
              },
            },
          },
        },
      },
    },
  };

  return stylingPanelDef;
}

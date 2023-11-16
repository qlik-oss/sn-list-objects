/* eslint-disable no-param-reassign */
import { fontResolver as createFontResolver } from 'qlik-chart-modules';
import { getFontSizes } from './styling-utils/font-utils';
import styleDefaults from './style-defaults';

export default function getStyling(env) {
  const { translator, flags, anything } = env || {};
  const { theme } = anything?.sense || {};

  const fontResolver = createFontResolver({
    theme,
    translator,
    config: {
      id: 'filterpane',
      paths: ['header', 'content'],
    },
    flags,
  });

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
                fontFamilyItem: {
                  component: 'dropdown',
                  ref: 'header.fontFamily',
                  options: () => fontResolver.getOptions('header.fontFamily'),
                  defaultValue: () => fontResolver.getDefaultValue('header.fontFamily'),
                },
                fontWrapperItem: {
                  component: 'inline-wrapper',
                  items: {
                    fontSizeItem: {
                      component: 'dropdown',
                      ref: 'header.fontSize',
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
                    fontFamilyItem: {
                      component: 'dropdown',
                      ref: 'content.fontFamily',
                      options: () => fontResolver.getOptions('content.fontFamily'),
                      defaultValue: () => fontResolver.getDefaultValue('content.fontFamily'),
                    },
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
        backgroundOptions: {
          component: 'panel-section',
          translation: 'properties.background.options',
          items: {
            background: {
              items: {
                backgroundColor: {
                  ref: 'components',
                  key: 'theme',
                  type: 'items',
                  items: {
                    useColorExpression: {
                      type: 'boolean',
                      component: 'dropdown',
                      ref: 'background.useColorExpression',
                      translation: 'properties.color',
                      defaultValue: false,
                      options: [
                        {
                          value: false,
                          translation: 'properties.colorMode.primary',
                        },
                        {
                          value: true,
                          translation: 'properties.colorMode.byExpression',
                        },
                      ],
                    },
                    colorExpression: {
                      type: 'string',
                      component: 'input-field-expression',
                      ref: 'background.colorExpression',
                      translation: 'Common.Expression',
                      expression: 'optional',
                      show: (data) => data?.background?.useColorExpression,
                    },
                    colorPicker: {
                      type: 'object',
                      component: 'color-picker',
                      ref: 'background.color',
                      translation: 'properties.color.used',
                      disableNone: false,
                      defaultValue: styleDefaults.COLOR,
                      dualOutput: true,
                      show: (data) => !data?.background?.useColorExpression,
                    },
                  },
                },
                backgroundImage: {
                  type: 'items',
                  ref: 'components',
                  key: 'theme',
                  items: {
                    backgroundImageMode: {
                      component: 'dropdown',
                      ref: 'background.image.mode',
                      translation: 'properties.backgroundImage',
                      defaultValue: styleDefaults.BGIMAGE_MODE,
                      options: [
                        {
                          value: 'none',
                          translation: 'Background.None',
                        },
                        {
                          value: 'media',
                          translation: 'MediaLibrary.Header',
                        },
                      ],
                      change(data = {}) {
                        data.background = data.background || {};
                        data.background.image = data.background.image || {};
                        data.background.image.qStaticContentUrlDef = data.background.image.qStaticContentUrlDef || {};
                        data.background.image.url = data.background.image.url || {};
                      },
                    },
                    MediaLibrary: {
                      component: 'media-library-button',
                      ref: 'background.image.url',
                      translation: 'MediaLibrary.Header',
                      show(data) {
                        return data?.background?.image?.mode === 'media';
                      },
                    },
                    imageSize: {
                      component: 'dropdown',
                      ref: 'background.image.size',
                      defaultValue: styleDefaults.BACKGROUND_SIZE,
                      options: [
                        {
                          value: 'auto',
                          translation: 'properties.backgroundImage.originalSize',
                        },
                        {
                          value: 'alwaysFit',
                          translation: 'properties.backgroundImage.sizeAlwaysFit',
                        },
                        {
                          value: 'fitWidth',
                          translation: 'properties.backgroundImage.sizeFitWidth',
                        },
                        {
                          value: 'fitHeight',
                          translation: 'properties.backgroundImage.sizeFitHeight',
                        },
                        {
                          value: 'stretchFit',
                          translation: 'properties.backgroundImage.sizeStretch',
                        },
                        {
                          value: 'alwaysFill',
                          translation: 'properties.backgroundImage.sizeAlwaysFill',
                        },
                      ],
                      change: (data) => {
                        if (data?.background?.image?.position) {
                          data.background.image.position = styleDefaults.BGIMAGE_POSITION;
                        }
                      },
                      show: (data) => data?.background?.image?.mode === 'media'
                        && !!data?.background?.image?.url?.qStaticContentUrlDef?.qUrl,
                    },
                    position: {
                      component: 'position-grid',
                      ref: 'background.image.position',
                      translation: 'properties.backgroundImage.position',
                      defaultValue: styleDefaults.BGIMAGE_POSITION,
                      currentSizeRef: 'background.size',
                      show: (data) => data?.background?.image?.mode === 'media'
                        && data?.background?.image?.url?.qStaticContentUrlDef?.qUrl
                        && data?.background?.image?.size !== 'stretchFit',
                    },
                  },
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

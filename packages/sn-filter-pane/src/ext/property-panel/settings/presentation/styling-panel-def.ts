/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { fontResolver as createFontResolver } from 'qlik-chart-modules';
import { getFontSizes, parseFontWeight } from './styling-utils/font-utils';
import styleDefaults from './style-defaults';
import { IEnv } from '../../../../types/types';
import { IComponent } from '../../../../hooks/types/components';

export default function getStyling(env: IEnv) {
  const { translator, flags, sense } = env || {};
  const { theme } = sense || {};

  const stylingPart2 = flags?.isEnabled('IM_5452_FILTERPANE_STYLING');

  const fontResolver = createFontResolver({
    theme,
    translator,
    config: {
      id: 'filterpane',
      paths: ['header', 'content', 'title'],
    },
    flags,
  });

  const getListBoxStyle = (p = '') => {
    // Utility func to prevent specifying 3 arguments for a simple property retrieval.
    const [property, ...path] = p.split('.').reverse();
    const pathString = path.join('.');
    const s = theme?.getStyle('object.listBox', !property ? '' : pathString, property || pathString);
    return s;
  };

  const defaultFontSize = getListBoxStyle('title.main.fontSize') ?? getListBoxStyle('fontSize');
  const defaultContentFontSize = getListBoxStyle('content.fontSize') ?? getListBoxStyle('fontSize');
  const defaultColor = getListBoxStyle('content.color') ?? getListBoxStyle('color');
  const defaultFontWeight = parseFontWeight(getListBoxStyle('title.main.fontWeight')) || 'bold';

  const stylingPanelDef = {
    stylingPanel: {
      component: 'styling-panel',
      chartType: 'filterpane',
      translation: 'LayerStyleEditor.component.styling',
      chartTitle: 'Object.FilterPane',
      generalTabTitle: 'Object.FilterPane',
      tabTitle: 'Object.Listboxes',
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
                ...(stylingPart2
                  ? {
                      fontFamilyItem: {
                        component: 'dropdown',
                        ref: 'header.fontFamily',
                        options: () => fontResolver.getOptions('header.fontFamily'),
                        defaultValue: () => fontResolver.getDefaultValue('header.fontFamily'),
                      },
                    }
                  : {}),
                fontWrapperItem: {
                  component: 'inline-wrapper',
                  items: {
                    ...(stylingPart2
                      ? {
                          fontStyle: {
                            type: 'array',
                            component: 'font-style-buttons',
                            width: false,
                            ref: 'header.fontStyle',
                            defaultValue: [defaultFontWeight],
                          },
                        }
                      : {}),
                    fontSizeItem: {
                      component: 'dropdown',
                      ref: 'header.fontSize',
                      options: getFontSizes({
                        min: 10,
                        max: 24,
                        theme,
                        defaultFontSize,
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
                ...(stylingPart2
                  ? {
                      fontFamilyItem: {
                        component: 'dropdown',
                        ref: 'content.fontFamily',
                        options: () => fontResolver.getOptions('content.fontFamily'),
                        defaultValue: () => fontResolver.getDefaultValue('content.fontFamily'),
                      },
                    }
                  : {}),
                fontWrapperItem: {
                  component: 'inline-wrapper',
                  items: {
                    ...(stylingPart2
                      ? {
                          fontStyle: {
                            type: 'array',
                            component: 'font-style-buttons',
                            width: false,
                            ref: 'content.fontStyle',
                            defaultValue: ['normal'],
                          },
                        }
                      : {}),
                    contentFontSizeItem: {
                      component: 'dropdown',
                      ref: 'content.fontSize',
                      options: getFontSizes({
                        min: 5,
                        max: 18,
                        theme,
                        defaultFontSize,
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

        ...(stylingPart2
          ? {
              backgroundOptions: {
                component: 'panel-section',
                translation: 'properties.background.options',
                reset(data: any, _def: any, args: any) {
                  // Without this reset function, the entire section will be reset.
                  const themeComponent = data?.components?.find((component: IComponent) => component?.key === 'theme');
                  if (themeComponent) {
                    themeComponent.background = {};
                    args?.saveProperties?.(args.properties); // explicit save needed
                  }
                },
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
                            ref: 'background.useExpression',
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
                            show: (data: any) => data?.background?.useExpression,
                          },
                          colorPicker: {
                            type: 'object',
                            component: 'color-picker',
                            ref: 'background.color',
                            translation: 'properties.color.used',
                            disableNone: false,
                            defaultValue: styleDefaults.COLOR,
                            dualOutput: true,
                            show: (data: any) => !data?.background?.useExpression,
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
                            change(data: any = {}) {
                              data.background = data.background || {};
                              data.background.image = data.background.image || {};
                              data.background.image.qStaticContentUrlDef =
                                data.background.image.qStaticContentUrlDef || {};
                              data.background.image.mediaUrl = data.background.image.mediaUrl || {};
                            },
                          },
                          MediaLibrary: {
                            component: 'media-library-button',
                            ref: 'background.image.mediaUrl',
                            translation: 'MediaLibrary.Header',
                            show(data: any) {
                              return data?.background?.image?.mode === 'media';
                            },
                          },
                          imageSize: {
                            component: 'dropdown',
                            ref: 'background.image.sizing',
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
                            change: (data: any) => {
                              if (data?.background?.image?.position) {
                                data.background.image.position = styleDefaults.BGIMAGE_POSITION;
                              }
                            },
                            show: (data: any) =>
                              data?.background?.image?.mode === 'media' &&
                              !!data?.background?.image?.mediaUrl?.qStaticContentUrlDef?.qUrl,
                          },
                          position: {
                            component: 'position-grid',
                            ref: 'background.image.position',
                            translation: 'properties.backgroundImage.position',
                            defaultValue: styleDefaults.BGIMAGE_POSITION,
                            currentSizeRef: 'background.sizing',
                            show: (data: any) =>
                              data?.background?.image?.mode === 'media' &&
                              data?.background?.image?.mediaUrl?.qStaticContentUrlDef?.qUrl &&
                              data?.background?.image?.sizing !== 'stretchFit',
                          },
                        },
                      },
                    },
                  },
                },
              },
            }
          : {}),
      },
    },
  };

  return stylingPanelDef;
}

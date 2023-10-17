const MIN_FONT_SIZE = 5;
const MAX_FONT_SIZE = 24;

function adjustToRange(value, min = MIN_FONT_SIZE, max = MAX_FONT_SIZE) {
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function getDefaultColor({ theme }) {
  const currentTheme = theme.current();
  const defaultColor = currentTheme.object?.listBox?.content?.color ?? currentTheme.color;
  return defaultColor;
}

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
            key: 'header',
            items: {
              fontWrapperItem: {
                component: 'inline-wrapper',
                items: {
                  fontSizeItem: {
                    component: 'integer',
                    ref: 'fontSize',
                    translation: 'properties.fontSize',
                    width: 9,
                    min: MIN_FONT_SIZE,
                    max: MAX_FONT_SIZE,
                    defaultValue(item, data, args) {
                      const currentTheme = args.theme.current();
                      return parseInt(
                        currentTheme.object?.listBox?.title?.main?.fontSize ?? currentTheme.fontSize,
                        10,
                      );
                    },
                    change(data) {
                      const value = !data.fontSize ? data.fontSize : Math.floor(data.fontSize);
                      data.fontSize = adjustToRange(value);
                    },
                  },
                  fontColorItem: {
                    ref: 'fontColor',
                    component: 'color-picker',
                    defaultValue(_item, _data, args) {
                      const currentTheme = args.theme.current();
                      return { color: currentTheme.object?.listBox?.title?.main?.color ?? currentTheme.color };
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
            key: 'content',
            items: {
              contentFontWrapper: {
                component: 'inline-wrapper',
                items: {
                  contentFontSize: {
                    component: 'integer',
                    ref: 'fontSize',
                    translation: 'properties.fontSize',
                    width: 9,
                    min: MIN_FONT_SIZE,
                    max: MAX_FONT_SIZE,
                    defaultValue(_item, _data, args) {
                      const currentTheme = args.theme.current();
                      return parseInt(
                        currentTheme.object?.listBox?.content?.fontSize ?? currentTheme.fontSize,
                        10,
                      );
                    },
                    change(data) {
                      const value = !data.fontSize ? data.fontSize : Math.floor(data.fontSize);
                      data.fontSize = adjustToRange(value);
                    },
                  },
                  contentFontColor: {
                    ref: 'fontColor',
                    type: 'object',
                    component: 'color-picker',
                    defaultValue(_item, _data, args) {
                      const defaultColor = getDefaultColor({ theme: args.theme });
                      return { color: defaultColor };
                    },
                  },
                  useContrastColor: {
                    ref: 'useContrastColor',
                    type: 'boolean',
                    grouped: true,
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
                ref: 'selected',
                type: 'object',
                component: 'color-picker',
                translation: 'Object.Listbox.Selected',
                defaultValue: { color: '#009845' },
              },
              alternativeColor: {
                ref: 'alternative',
                type: 'object',
                component: 'color-picker',
                translation: 'Object.Listbox.Alternative',
                defaultValue: { color: '#E4E4E4' },
              },
              excludedColor: {
                ref: 'excluded',
                type: 'object',
                component: 'color-picker',
                translation: 'Object.Listbox.Excluded',
                defaultValue: { color: '#BEBEBE' },
              },
              selectedExcludedColor: {
                ref: 'selectedExcluded',
                type: 'object',
                component: 'color-picker',
                translation: 'Object.Listbox.SelectedExcluded',
                defaultValue: { color: '#A9A9A9' },
              },
              possibleColor: {
                ref: 'possible',
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

export default stylingPanelDef;

const stylingPanelDef = {
    component: 'styling-panel',
    chartType: 'filterpane',
    translation: 'LayerStyleEditor.component.styling',
    chartTitle: 'Object.FilterPane',
    useBackground: true,
    subtitle: 'LayerStyleEditor.component.styling',
    useGeneral: true,
    items: {
        headerFontSection: {
            component: 'panel-section',
            translation: 'properties.Header',
            items: {
                headerFontItem: {
                    component: 'items',
                    ref: 'components',
                    key: 'theme',
                    items: {
                        headerFontWrapper: {
                            component: 'inline-wrapper',
                            items: {
                                headerFontItem: {
                                    component: 'items',
                                    ref: 'components',
                                    key: 'theme',
                                    items: {
                                        headerFontWrapper: {
                                            component: 'inline-wrapper',
                                            items: {
                                                headerFontSize: {
                                                    component: 'integer',
                                                    ref: 'title.main.fontSize',
                                                    translation: 'properties.fontSize',
                                                    width: 9,
                                                    min: 5,
                                                    max: 300,
                                                    defaultValue(item, data, args) {
                                                        const currentTheme = args.theme.current();
                                                        // should we get the default values from listBox? (filterpane object from theme has just a backgroundColor property?)
                                                        return parseInt(
                                                            currentTheme.object?.listBox?.title?.main?.fontSize ?? currentTheme.fontSize,
                                                            10
                                                        );
                                                    },
                                                    change(data) {
                                                        // TODO: values change not applying
                                                        data.title.main.fontSize = !data.title.main.fontSize
                                                            ? data.title.main.fontSize
                                                            : Math.max(5, Math.min(300, Math.floor(data.title.main.fontSize)));
                                                      },
                                                },
                                                headerFontColor: {
                                                    show: true,
                                                    ref: 'title.main.color',
                                                    type: 'object',
                                                    component: 'color-picker',
                                                    defaultValue(item, data, args) {
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
                    },
                },
            },
        },

    },
};


export default stylingPanelDef;
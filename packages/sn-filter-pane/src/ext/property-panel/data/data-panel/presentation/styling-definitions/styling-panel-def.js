const stylingPanelDef = {
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
                headerFontItem: {
                    component: 'items',
                    ref: 'components',
                    key: 'listBox',
                    items: {
                        headerFontWrapper: {
                            component: 'inline-wrapper',
                            items: {
                                headerFontSize: {
                                    component: 'integer',
                                    ref: 'header.fontSize',
                                    translation: 'properties.fontSize',
                                    width: 9,
                                    min: 5,
                                    max: 300,
                                    defaultValue(item, data, args) {
                                        const currentTheme = args.theme.current();
                                        return parseInt(
                                            currentTheme.object?.listBox?.title?.main?.fontSize ?? currentTheme.fontSize,
                                            10
                                        );
                                    },
                                    change(data) {
                                        // TODO: values change not applying
                                        data.header.fontSize = !data.header.fontSize
                                            ? data.header.fontSize
                                            : Math.max(5, Math.min(300, Math.floor(data.header.fontSize)));
                                        },
                                },
                                headerFontColor: {
                                    show: true,
                                    ref: 'header.fontColor',
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
};


export default stylingPanelDef;
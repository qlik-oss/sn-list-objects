import textAlignItems from './text-align-items';

const data = {
  type: 'items',
  translation: 'Common.Data',
  ref: 'qListObjectDef', // only used for finding purposes
  min: 1,
  max: 1,
  items: {
    field: {
      type: 'string',
      ref: 'qListObjectDef.qDef.qFieldDefs.0',
      component: 'expression-with-dropdown',
      translation: 'Common.Field',
      defaultValue: '',
      expressionType: 'dimension',
      options: (action: unknown, hyperCubeHandler: unknown, args: { app?: { getFieldList: () => Promise<[{qName: string}]> } }) => (!args.app
        ? []
        : args.app.getFieldList().then((fields) => fields.map((field) => ({
          label: field.qName,
          value: field.qName,
        })))),
    },
    label: {
      type: 'string',
      component: 'expression',
      expressionType: 'StringExpr',
      ref: 'qListObjectDef.qDef.qFieldLabels.0',
      translation: 'Common.Label',
      show(itemData: EngineAPI.IGenericListProperties) {
        return itemData?.qListObjectDef?.qDef.qFieldDefs?.length && !itemData.qListObjectDef.qLibraryId;
      },
    },
    ...textAlignItems,
  },
};

export default data;

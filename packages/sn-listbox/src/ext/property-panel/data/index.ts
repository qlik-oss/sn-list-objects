// import { frequencies } from '../constants';
import textAlignItems from './text-align-items';

const data = {
  type: 'items',
  translation: 'Common.Data',
  ref: 'qListObjectDef', // only used for finding purposes
  min: 1,
  max: 1,
  items: {
    // libraryId: {
    //   type: 'string',
    //   component: 'library-item',
    //   libraryItemType: 'dimension',
    //   ref: 'qListObjectDef.qLibraryId',
    //   translation: 'Common.Dimension',
    //   show(data) {
    //     return data.qListObjectDef && data.qListObjectDef.qLibraryId;
    //   },
    // },
    // field: {
    //   type: 'string',
    //   expressionType: 'dimension',
    //   ref: 'qListObjectDef.qDef.qFieldDefs.0',
    //   translation: 'Common.Field',
    //   change(data) {
    //     const def = data.qListObjectDef.qDef;
    //     if (!def.qFieldLabels) {
    //       def.qFieldLabels = [];
    //     }
    //     def.qFieldLabels[0] = def.qFieldDefs[0];
    //   },
    //   show(data) {
    //     return data.qListObjectDef && !data.qListObjectDef.qLibraryId;
    //   },
    // },
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

// const data2 = {
//   classification: {
//     section: 'data',
//     tags: ['simple'],
//   },
//   type: 'array',
//   component: 'filterpane-data',
//   translation: 'Common.Data',
//   allowAdd: true,
//   allowRemove: true,
//   allowMove: true,
//   addTranslation: 'properties.dimensions.add',
//   grouped: false,
//   ref: 'qListObjectDef',
//   items: {
//     libraryId: {
//       type: 'string',
//       component: 'library-item',
//       libraryItemType: 'dimension',
//       ref: 'qLibraryId',
//       translation: 'Common.Dimension',
//       show(itemData: EngineAPI.IGenericListProperties) {
//         return itemData.qListObjectDef.qLibraryId;
//       },
//     },
//     field: {
//       type: 'string',
//       component: 'expression',
//       expressionType: 'dimension',
//       ref: 'qDef.qFieldDefs.0',
//       translation: 'Common.Field',
//       show(itemData: EngineAPI.IGenericListProperties) {
//         return !itemData.qListObjectDef.qLibraryId;
//       },
//       change(itemData: EngineAPI.IGenericListProperties) {
//         const def = itemData.qListObjectDef.qDef;
//         if (!def.qFieldLabels) {
//           def.qFieldLabels = [];
//         }
//         [def.qFieldLabels[0]] = def.qFieldDefs ?? [];
//       },
//     },
//     // label: {
//     //  type: "string",
//     //  ref: "qDef.qFieldLabels.0",
//     //  translation: "Common.Label",
//     //  show: function ( itemData ) {
//     //   return !itemData.qLibraryId;
//     //  }
//     // },
//     title: {
//       ref: 'title',
//       type: 'string',
//       expression: 'optional',
//       translation: 'Common.Title',
//     },
//     autoSort: {
//       ref: 'qListObjectDef.qDef.autoSort',
//       type: 'boolean',
//       defaultValue: true,
//       show: false,
//     },
//     // cId: {
//     //   ref: 'qListObjectDef.qDef.cId',
//     //   type: 'string',
//     //   show: false,
//     // },
//   },
// };

export default data;

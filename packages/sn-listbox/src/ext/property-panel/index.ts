import data from './data';
import sorting from './sorting';
import settings from './settings';

export default function propertyDefinition() {
  // const dimension = {
  //   type: 'items',
  //   translation: 'Common.Dimension',
  //   ref: 'qListObjectDef', // only used for finding purposes
  //   min: 1,
  //   max: 1,
  //   items: {
  //     label: {
  //       type: 'string',
  //       ref: 'qListObjectDef.qDef.qFieldLabels.0',
  //       translation: 'Common.Label',
  //       show: false /* function ( data ) {
  //                 return !data.qListObjectDef.qLibraryId;
  //             } */,
  //     },
  //     libraryId: {
  //       type: 'string',
  //       component: 'library-item',
  //       libraryItemType: 'dimension',
  //       ref: 'qListObjectDef.qLibraryId',
  //       translation: 'Common.Dimension',
  //       show(data) {
  //         return data.qListObjectDef && data.qListObjectDef.qLibraryId;
  //       },
  //     },
  //     field: {
  //       type: 'string',
  //       expressionType: 'dimension',
  //       ref: 'qListObjectDef.qDef.qFieldDefs.0',
  //       translation: 'Common.Field',
  //       change(data) {
  //         const def = data.qListObjectDef.qDef;
  //         if (!def.qFieldLabels) {
  //           def.qFieldLabels = [];
  //         }
  //         def.qFieldLabels[0] = def.qFieldDefs[0];
  //       },
  //       show(data) {
  //         return data.qListObjectDef && !data.qListObjectDef.qLibraryId;
  //       },
  //     },
  //   },
  // };

  return {
    type: 'items',
    component: 'accordion',
    items: {
      data,
      sorting,
      // search... ?,
      settings,
    },
  };
}

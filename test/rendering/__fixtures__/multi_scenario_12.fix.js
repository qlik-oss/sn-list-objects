export default () => ({
  instanceConfig: {
    context: {
      theme: 'senseish',
    },
  },
  genericObjects: [
    // filter pane object
    {
      getLayout() {
        return {
          qInfo: {
            qId: 'Xtnmr',
            qType: 'sn-filter-pane',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qChildList: {
            qItems: [
              {
                qInfo: {
                  qId: '1dcd525a-ec71-4c64-b9bb-293ae8388486',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
            ],
          },
          showTitles: false,
          title: '',
          subtitle: '',
          footnote: '',
          disableNavMenu: false,
          showDetails: true,
          showDetailsExpression: false,
          visualization: 'sn-filter-pane',
        };
      },
    },
    // listbox object
    {
      getLayout() {
        return {
          qInfo: {
            qId: '1dcd525a-ec71-4c64-b9bb-293ae8388486',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 17,
            },
            qDimensionInfo: {
              qFallbackTitle: 'Basket Product Group Desc',
              qApprMaxGlyphCount: 19,
              qCardinal: 17,
              qSortIndicator: 'D',
              qGroupFallbackTitles: ['Basket Product Group Desc'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 17,
                qDeselected: 0,
                qAlternative: 0,
                qExcluded: 0,
                qSelectedExcluded: 0,
                qLockedExcluded: 0,
              },
              qTags: ['$ascii', '$text'],
              qDimensionType: 'D',
              qGrouping: 'N',
              qNumFormat: {
                qType: 'U',
                qnDec: 0,
                qUseThou: 0,
              },
              qIsAutoFormat: true,
              qGroupFieldDefs: ['Basket Product Group Desc'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 17,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              autoSort: false,
              cId: 'zxUs',
              textAlign: {
                auto: false,
                align: 'center',
              },
            },
            qExpressions: [],
            qDataPages: [],
            showTitles: true,
            title: '',
            subtitle: '',
            footnote: '',
            disableNavMenu: false,
            showDetails: true,
            showDetailsExpression: false,
            qOtherTotalSpec: {},
            frequencyEnabled: true,
          },
          showTitles: true,
          title: 'Basket Product Group Desc',
          subtitle: '',
          footnote: '',
          disableNavMenu: false,
          showDetails: true,
          showDetailsExpression: false,
          visualization: 'listbox',
          histogram: false,
          frequencyMax: null,
          checkboxes: true,
          layoutOptions: {
            dense: true,
            dataLayout: 'grid',
            layoutOrder: 'column',
            maxVisibleRows: {
              auto: false,
              maxRows: 5,
            },
          },
          searchEnabled: false,
        };
      },
      // listbox data
      getListObjectData() {
        return [
          {
            qMatrix: [
              [
                {
                  qText: 'Starchy Foods',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                  qFrequency: '46',
                },
              ],
              [
                {
                  qText: 'Snacks',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                  qFrequency: '50',
                },
              ],
              [
                {
                  qText: 'Snack Foods',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                  qFrequency: '220',
                },
              ],
              [
                {
                  qText: 'Seafood',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                  qFrequency: '12',
                },
              ],
              [
                {
                  qText: 'Produce',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                  qFrequency: '274',
                },
              ],
              [
                {
                  qText: 'Meat',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                  qFrequency: '10',
                },
              ],
              [
                {
                  qText: 'Frozen Foods',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                  qFrequency: '190',
                },
              ],
              [
                {
                  qText: 'Eggs',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                  qFrequency: '34',
                },
              ],
              [
                {
                  qText: 'Deli',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                  qFrequency: '120',
                },
              ],
              [
                {
                  qText: 'Dairy',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                  qFrequency: '174',
                },
              ],
              [
                {
                  qText: 'Canned Products',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                  qFrequency: '20',
                },
              ],
              [
                {
                  qText: 'Canned Foods',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                  qFrequency: '186',
                },
              ],
              [
                {
                  qText: 'Breakfast Foods',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                  qFrequency: '34',
                },
              ],
              [
                {
                  qText: 'Beverages',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                  qFrequency: '134',
                },
              ],
              [
                {
                  qText: 'Baking Goods',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                  qFrequency: '146',
                },
              ],
              [
                {
                  qText: 'Baked Goods',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                  qFrequency: '52',
                },
              ],
              [
                {
                  qText: 'Alcoholic Beverages',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                  qFrequency: '52',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 17,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: 'Starchy Foods',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                  qFrequency: '46',
                },
              ],
              [
                {
                  qText: 'Snacks',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                  qFrequency: '50',
                },
              ],
              [
                {
                  qText: 'Snack Foods',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                  qFrequency: '220',
                },
              ],
              [
                {
                  qText: 'Seafood',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                  qFrequency: '12',
                },
              ],
              [
                {
                  qText: 'Produce',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                  qFrequency: '274',
                },
              ],
              [
                {
                  qText: 'Meat',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                  qFrequency: '10',
                },
              ],
              [
                {
                  qText: 'Frozen Foods',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                  qFrequency: '190',
                },
              ],
              [
                {
                  qText: 'Eggs',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                  qFrequency: '34',
                },
              ],
              [
                {
                  qText: 'Deli',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                  qFrequency: '120',
                },
              ],
              [
                {
                  qText: 'Dairy',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                  qFrequency: '174',
                },
              ],
              [
                {
                  qText: 'Canned Products',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                  qFrequency: '20',
                },
              ],
              [
                {
                  qText: 'Canned Foods',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                  qFrequency: '186',
                },
              ],
              [
                {
                  qText: 'Breakfast Foods',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                  qFrequency: '34',
                },
              ],
              [
                {
                  qText: 'Beverages',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                  qFrequency: '134',
                },
              ],
              [
                {
                  qText: 'Baking Goods',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                  qFrequency: '146',
                },
              ],
              [
                {
                  qText: 'Baked Goods',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                  qFrequency: '52',
                },
              ],
              [
                {
                  qText: 'Alcoholic Beverages',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                  qFrequency: '52',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 17,
            },
          },
        ];
      },
    },
  ],
});

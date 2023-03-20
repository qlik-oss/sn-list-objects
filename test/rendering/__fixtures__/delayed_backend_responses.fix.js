export default () => ({
  instanceConfig: {
    context: {
      theme: 'senseish',
    },
  },
  enigmaMockerOptions: {
    delay: 3000, // To test that chart rendering is not considered done too early (important for printing scenarios)
  },
  genericObjects: [
    // filter pane object
    {
      getLayout() {
        return {
          qInfo: {
            qId: 'AFReMd',
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
                  qId: '03fd4aac-91fb-4bc6-8094-87b7739e306e',
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
            qId: '03fd4aac-91fb-4bc6-8094-87b7739e306e',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 12,
            },
            qDimensionInfo: {
              qFallbackTitle: 'Month',
              qApprMaxGlyphCount: 3,
              qCardinal: 12,
              qSortIndicator: 'A',
              qGroupFallbackTitles: ['Month'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 12,
                qDeselected: 0,
                qAlternative: 0,
                qExcluded: 0,
                qSelectedExcluded: 0,
                qLockedExcluded: 0,
              },
              qTags: ['$numeric', '$integer'],
              qDimensionType: 'N',
              qGrouping: 'N',
              qNumFormat: {
                qType: 'U',
                qnDec: 0,
                qUseThou: 0,
              },
              qIsAutoFormat: true,
              qGroupFieldDefs: ['Month'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 12,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              autoSort: true,
              cId: 'jmqbe',
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
          },
          showTitles: true,
          title: 'Month',
          subtitle: '',
          footnote: '',
          disableNavMenu: false,
          showDetails: true,
          showDetailsExpression: false,
          visualization: 'listbox',
        };
      },
      // listbox data
      getListObjectData() {
        return [
          {
            qMatrix: [
              [
                {
                  qText: 'Jan',
                  qNum: 1,
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Feb',
                  qNum: 2,
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Mar',
                  qNum: 3,
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Apr',
                  qNum: 4,
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'May',
                  qNum: 5,
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Jun',
                  qNum: 6,
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Jul',
                  qNum: 7,
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Aug',
                  qNum: 8,
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Sep',
                  qNum: 9,
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Oct',
                  qNum: 10,
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Nov',
                  qNum: 11,
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dec',
                  qNum: 12,
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 12,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: 'Jan',
                  qNum: 1,
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Feb',
                  qNum: 2,
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Mar',
                  qNum: 3,
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Apr',
                  qNum: 4,
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'May',
                  qNum: 5,
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Jun',
                  qNum: 6,
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Jul',
                  qNum: 7,
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Aug',
                  qNum: 8,
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Sep',
                  qNum: 9,
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Oct',
                  qNum: 10,
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Nov',
                  qNum: 11,
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dec',
                  qNum: 12,
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 12,
            },
          },
        ];
      },
    },
  ],
});

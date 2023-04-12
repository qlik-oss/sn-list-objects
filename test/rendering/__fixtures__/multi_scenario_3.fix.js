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
            qId: 'CPBkMhe',
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
                  qId: '2ec83893-d5dc-41b0-b3b5-31517695e082',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
              {
                qInfo: {
                  qId: '6dd91609-77e1-4ecf-8a01-4e8baa08ab8a',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
              {
                qInfo: {
                  qId: 'b077bcbe-9636-456f-9cd4-a9bfde6f2bf0',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
              {
                qInfo: {
                  qId: '75554930-f33a-4624-a1dd-0ae1087fd8ce',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
              {
                qInfo: {
                  qId: '781ac9fd-7e80-4e98-a177-3dd12cab3f7f',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
              {
                qInfo: {
                  qId: '7430973a-2401-4221-9797-97d22cfb7fbf',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
              {
                qInfo: {
                  qId: 'e1393956-bc49-447c-b901-839c26a5a7de',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
              {
                qInfo: {
                  qId: '3792fa55-e93b-470f-abb5-26eff5a82e55',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
              {
                qInfo: {
                  qId: '873dc0a0-8d78-4536-8347-b7b016f01faf',
                  qType: 'listbox',
                },
                qMeta: {
                  privileges: ['read', 'update', 'delete'],
                },
                qData: {},
              },
              {
                qInfo: {
                  qId: '3c005fab-1e1c-4764-a141-4157a1027f5a',
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
    // listbox object region Name
    {
      getLayout() {
        return {
          qInfo: {
            qId: '2ec83893-d5dc-41b0-b3b5-31517695e082',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 4,
            },
            qDimensionInfo: {
              qFallbackTitle: 'Region Name',
              qApprMaxGlyphCount: 9,
              qCardinal: 4,
              qSortIndicator: 'A',
              qGroupFallbackTitles: ['Region Name'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 4,
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
              qGroupFieldDefs: ['Region Name'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 4,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              qLibraryId: 'cf1d8ef8-4020-4f81-b487-514c354875b4',
              title: 'Region Name',
              autoSort: true,
              cId: 'pSsVwZD',
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
          title: '',
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
                  qText: 'Central (no title on list)',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Northeast',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Southern',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Western',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 4,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: 'Central',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Northeast',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Southern',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Western',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 4,
            },
          },
        ];
      },
    },
    // listbox object state name
    {
      getLayout() {
        return {
          qInfo: {
            qId: '6dd91609-77e1-4ecf-8a01-4e8baa08ab8a',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 46,
            },
            qDimensionInfo: {
              qFallbackTitle: 'State Name',
              qApprMaxGlyphCount: 14,
              qCardinal: 46,
              qSortIndicator: 'A',
              qGroupFallbackTitles: ['State Name'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 46,
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
              qGroupFieldDefs: ['state_name'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 46,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              qLibraryId: 'ba3afca6-f5a0-4cc9-baae-15ecacb6275b',
              title: 'State Name',
              autoSort: true,
              cId: 'gyxfqt',
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
          title: 'State Name',
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
                  qText: 'Alabama',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Alaska',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Arizona',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Arkansas',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'California',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Colorado',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Florida',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Georgia',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Idaho',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Illinois',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Indiana',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Iowa',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Kansas',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Kentucky',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Louisiana',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Maine',
                  qNum: 'NaN',
                  qElemNumber: 18,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Manitoba',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Maryland',
                  qNum: 'NaN',
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Massachusetts',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Michigan',
                  qNum: 'NaN',
                  qElemNumber: 19,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Minnesota',
                  qNum: 'NaN',
                  qElemNumber: 20,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Mississippi',
                  qNum: 'NaN',
                  qElemNumber: 22,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Missouri',
                  qNum: 'NaN',
                  qElemNumber: 21,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Montana',
                  qNum: 'NaN',
                  qElemNumber: 23,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Nebraska',
                  qNum: 'NaN',
                  qElemNumber: 25,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Nevada',
                  qNum: 'NaN',
                  qElemNumber: 29,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'New Hampshire',
                  qNum: 'NaN',
                  qElemNumber: 26,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'New Jersey',
                  qNum: 'NaN',
                  qElemNumber: 27,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'New Mexico',
                  qNum: 'NaN',
                  qElemNumber: 28,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'New York',
                  qNum: 'NaN',
                  qElemNumber: 30,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'North Carolina',
                  qNum: 'NaN',
                  qElemNumber: 24,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ohio',
                  qNum: 'NaN',
                  qElemNumber: 31,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Oklahoma',
                  qNum: 'NaN',
                  qElemNumber: 32,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Oregon',
                  qNum: 'NaN',
                  qElemNumber: 33,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Pennsylvania',
                  qNum: 'NaN',
                  qElemNumber: 34,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Rhode Island',
                  qNum: 'NaN',
                  qElemNumber: 35,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'South Carolina',
                  qNum: 'NaN',
                  qElemNumber: 36,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'South Dakota',
                  qNum: 'NaN',
                  qElemNumber: 37,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Tennessee',
                  qNum: 'NaN',
                  qElemNumber: 38,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Texas',
                  qNum: 'NaN',
                  qElemNumber: 39,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Utah',
                  qNum: 'NaN',
                  qElemNumber: 40,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Virginia',
                  qNum: 'NaN',
                  qElemNumber: 41,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Washington',
                  qNum: 'NaN',
                  qElemNumber: 42,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'West Virginia',
                  qNum: 'NaN',
                  qElemNumber: 44,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Wisconsin',
                  qNum: 'NaN',
                  qElemNumber: 43,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Wyoming',
                  qNum: 'NaN',
                  qElemNumber: 45,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 46,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: 'Alabama',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Alaska',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Arizona',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Arkansas',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'California',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Colorado',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Florida',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Georgia',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Idaho',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Illinois',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Indiana',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Iowa',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Kansas',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Kentucky',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Louisiana',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Maine',
                  qNum: 'NaN',
                  qElemNumber: 18,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Manitoba',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Maryland',
                  qNum: 'NaN',
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Massachusetts',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Michigan',
                  qNum: 'NaN',
                  qElemNumber: 19,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Minnesota',
                  qNum: 'NaN',
                  qElemNumber: 20,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Mississippi',
                  qNum: 'NaN',
                  qElemNumber: 22,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Missouri',
                  qNum: 'NaN',
                  qElemNumber: 21,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Montana',
                  qNum: 'NaN',
                  qElemNumber: 23,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Nebraska',
                  qNum: 'NaN',
                  qElemNumber: 25,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Nevada',
                  qNum: 'NaN',
                  qElemNumber: 29,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'New Hampshire',
                  qNum: 'NaN',
                  qElemNumber: 26,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'New Jersey',
                  qNum: 'NaN',
                  qElemNumber: 27,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'New Mexico',
                  qNum: 'NaN',
                  qElemNumber: 28,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'New York',
                  qNum: 'NaN',
                  qElemNumber: 30,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'North Carolina',
                  qNum: 'NaN',
                  qElemNumber: 24,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ohio',
                  qNum: 'NaN',
                  qElemNumber: 31,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Oklahoma',
                  qNum: 'NaN',
                  qElemNumber: 32,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Oregon',
                  qNum: 'NaN',
                  qElemNumber: 33,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Pennsylvania',
                  qNum: 'NaN',
                  qElemNumber: 34,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Rhode Island',
                  qNum: 'NaN',
                  qElemNumber: 35,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'South Carolina',
                  qNum: 'NaN',
                  qElemNumber: 36,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'South Dakota',
                  qNum: 'NaN',
                  qElemNumber: 37,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Tennessee',
                  qNum: 'NaN',
                  qElemNumber: 38,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Texas',
                  qNum: 'NaN',
                  qElemNumber: 39,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Utah',
                  qNum: 'NaN',
                  qElemNumber: 40,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Virginia',
                  qNum: 'NaN',
                  qElemNumber: 41,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Washington',
                  qNum: 'NaN',
                  qElemNumber: 42,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'West Virginia',
                  qNum: 'NaN',
                  qElemNumber: 44,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Wisconsin',
                  qNum: 'NaN',
                  qElemNumber: 43,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Wyoming',
                  qNum: 'NaN',
                  qElemNumber: 45,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 46,
            },
          },
        ];
      },
    },
    // listbox object City
    {
      getLayout() {
        return {
          qInfo: {
            qId: 'b077bcbe-9636-456f-9cd4-a9bfde6f2bf0',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 271,
            },
            qDimensionInfo: {
              qFallbackTitle: 'City',
              qApprMaxGlyphCount: 17,
              qCardinal: 271,
              qSortIndicator: 'A',
              qGroupFallbackTitles: ['City'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 271,
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
              qGroupFieldDefs: ['City'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 271,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              qLibraryId: '5b7dbcd0-1948-42db-b5d5-3d4e6fb36bbf',
              title: 'City',
              autoSort: true,
              cId: 'PhbyjR',
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
          title: 'City',
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
                  qText: 'Akron',
                  qNum: 'NaN',
                  qElemNumber: 265,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Albany',
                  qNum: 'NaN',
                  qElemNumber: 258,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Alexandria',
                  qNum: 'NaN',
                  qElemNumber: 162,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Amarillo',
                  qNum: 'NaN',
                  qElemNumber: 120,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Anchorage',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Andover',
                  qNum: 'NaN',
                  qElemNumber: 111,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Appleton',
                  qNum: 'NaN',
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Atlanta',
                  qNum: 'NaN',
                  qElemNumber: 45,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Attica',
                  qNum: 'NaN',
                  qElemNumber: 173,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Auburn',
                  qNum: 'NaN',
                  qElemNumber: 35,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Augusta',
                  qNum: 'NaN',
                  qElemNumber: 146,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Aurora',
                  qNum: 'NaN',
                  qElemNumber: 194,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Baton Rouge',
                  qNum: 'NaN',
                  qElemNumber: 102,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Beaumont',
                  qNum: 'NaN',
                  qElemNumber: 261,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Beaverton',
                  qNum: 'NaN',
                  qElemNumber: 60,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bedford',
                  qNum: 'NaN',
                  qElemNumber: 109,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bedford Hills',
                  qNum: 'NaN',
                  qElemNumber: 235,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Benicia',
                  qNum: 'NaN',
                  qElemNumber: 89,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bensonville',
                  qNum: 'NaN',
                  qElemNumber: 138,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Billings',
                  qNum: 'NaN',
                  qElemNumber: 42,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Birmingham',
                  qNum: 'NaN',
                  qElemNumber: 110,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Boise',
                  qNum: 'NaN',
                  qElemNumber: 72,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bozeman',
                  qNum: 'NaN',
                  qElemNumber: 181,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brea',
                  qNum: 'NaN',
                  qElemNumber: 82,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Breckenridge',
                  qNum: 'NaN',
                  qElemNumber: 63,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bremorton',
                  qNum: 'NaN',
                  qElemNumber: 267,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brookfield',
                  qNum: 'NaN',
                  qElemNumber: 170,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brookhaven',
                  qNum: 'NaN',
                  qElemNumber: 253,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brownsville',
                  qNum: 'NaN',
                  qElemNumber: 252,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Buda',
                  qNum: 'NaN',
                  qElemNumber: 255,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Buffalo',
                  qNum: 'NaN',
                  qElemNumber: 175,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Buffdale',
                  qNum: 'NaN',
                  qElemNumber: 186,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Burnsville',
                  qNum: 'NaN',
                  qElemNumber: 262,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Calhoun',
                  qNum: 'NaN',
                  qElemNumber: 30,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Canton',
                  qNum: 'NaN',
                  qElemNumber: 119,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cape Girardeau',
                  qNum: 'NaN',
                  qElemNumber: 46,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Casper',
                  qNum: 'NaN',
                  qElemNumber: 140,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cass City',
                  qNum: 'NaN',
                  qElemNumber: 174,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Charlotte',
                  qNum: 'NaN',
                  qElemNumber: 124,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Chattanooga',
                  qNum: 'NaN',
                  qElemNumber: 20,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Chicago',
                  qNum: 'NaN',
                  qElemNumber: 187,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Chippewa Falls',
                  qNum: 'NaN',
                  qElemNumber: 169,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cincinnati',
                  qNum: 'NaN',
                  qElemNumber: 130,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Clackamas',
                  qNum: 'NaN',
                  qElemNumber: 43,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Clemson',
                  qNum: 'NaN',
                  qElemNumber: 23,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cleveland',
                  qNum: 'NaN',
                  qElemNumber: 106,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Coldwater',
                  qNum: 'NaN',
                  qElemNumber: 38,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Colorado Springs',
                  qNum: 'NaN',
                  qElemNumber: 99,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Columbia',
                  qNum: 'NaN',
                  qElemNumber: 87,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Columbiana',
                  qNum: 'NaN',
                  qElemNumber: 66,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Columbus',
                  qNum: 'NaN',
                  qElemNumber: 57,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Compton',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Corona',
                  qNum: 'NaN',
                  qElemNumber: 64,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Costa Mesa',
                  qNum: 'NaN',
                  qElemNumber: 243,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cramerton',
                  qNum: 'NaN',
                  qElemNumber: 67,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Creedmoor',
                  qNum: 'NaN',
                  qElemNumber: 123,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Crestwood',
                  qNum: 'NaN',
                  qElemNumber: 220,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cypress',
                  qNum: 'NaN',
                  qElemNumber: 93,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dallas',
                  qNum: 'NaN',
                  qElemNumber: 34,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dearborn',
                  qNum: 'NaN',
                  qElemNumber: 48,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Depere',
                  qNum: 'NaN',
                  qElemNumber: 76,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Des Moines',
                  qNum: 'NaN',
                  qElemNumber: 236,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dover',
                  qNum: 'NaN',
                  qElemNumber: 152,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Duluth',
                  qNum: 'NaN',
                  qElemNumber: 85,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Eagan',
                  qNum: 'NaN',
                  qElemNumber: 81,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'East Providence',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Eau Claire',
                  qNum: 'NaN',
                  qElemNumber: 208,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'El Cajon',
                  qNum: 'NaN',
                  qElemNumber: 256,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'El Paso',
                  qNum: 'NaN',
                  qElemNumber: 101,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Elizabethtown',
                  qNum: 'NaN',
                  qElemNumber: 84,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Elkhart',
                  qNum: 'NaN',
                  qElemNumber: 73,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Elma',
                  qNum: 'NaN',
                  qElemNumber: 241,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Enumclaw',
                  qNum: 'NaN',
                  qElemNumber: 219,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Eugene',
                  qNum: 'NaN',
                  qElemNumber: 49,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Evansville',
                  qNum: 'NaN',
                  qElemNumber: 161,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Exeter',
                  qNum: 'NaN',
                  qElemNumber: 28,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fairmount',
                  qNum: 'NaN',
                  qElemNumber: 218,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fairview',
                  qNum: 'NaN',
                  qElemNumber: 250,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Farmington',
                  qNum: 'NaN',
                  qElemNumber: 176,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Flint',
                  qNum: 'NaN',
                  qElemNumber: 62,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fort Collins',
                  qNum: 'NaN',
                  qElemNumber: 88,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fort Smith',
                  qNum: 'NaN',
                  qElemNumber: 118,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fort Worth',
                  qNum: 'NaN',
                  qElemNumber: 69,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Framingham',
                  qNum: 'NaN',
                  qElemNumber: 247,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Frederick',
                  qNum: 'NaN',
                  qElemNumber: 191,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fredericksburg',
                  qNum: 'NaN',
                  qElemNumber: 233,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fresno',
                  qNum: 'NaN',
                  qElemNumber: 213,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ft Collins',
                  qNum: 'NaN',
                  qElemNumber: 58,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gardena',
                  qNum: 'NaN',
                  qElemNumber: 180,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Garner',
                  qNum: 'NaN',
                  qElemNumber: 216,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Glen Burnie',
                  qNum: 'NaN',
                  qElemNumber: 244,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Goodlettsville',
                  qNum: 'NaN',
                  qElemNumber: 98,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Grand Rapids',
                  qNum: 'NaN',
                  qElemNumber: 143,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Greenville',
                  qNum: 'NaN',
                  qElemNumber: 263,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Greenwood',
                  qNum: 'NaN',
                  qElemNumber: 50,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gretna',
                  qNum: 'NaN',
                  qElemNumber: 230,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ham Lake',
                  qNum: 'NaN',
                  qElemNumber: 257,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Hamel',
                  qNum: 'NaN',
                  qElemNumber: 59,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Hammond',
                  qNum: 'NaN',
                  qElemNumber: 128,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Hayward',
                  qNum: 'NaN',
                  qElemNumber: 167,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 100,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: 'Akron',
                  qNum: 'NaN',
                  qElemNumber: 265,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Albany',
                  qNum: 'NaN',
                  qElemNumber: 258,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Alexandria',
                  qNum: 'NaN',
                  qElemNumber: 162,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Amarillo',
                  qNum: 'NaN',
                  qElemNumber: 120,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Anchorage',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Andover',
                  qNum: 'NaN',
                  qElemNumber: 111,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Appleton',
                  qNum: 'NaN',
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Atlanta',
                  qNum: 'NaN',
                  qElemNumber: 45,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Attica',
                  qNum: 'NaN',
                  qElemNumber: 173,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Auburn',
                  qNum: 'NaN',
                  qElemNumber: 35,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Augusta',
                  qNum: 'NaN',
                  qElemNumber: 146,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Aurora',
                  qNum: 'NaN',
                  qElemNumber: 194,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Baton Rouge',
                  qNum: 'NaN',
                  qElemNumber: 102,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Beaumont',
                  qNum: 'NaN',
                  qElemNumber: 261,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Beaverton',
                  qNum: 'NaN',
                  qElemNumber: 60,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bedford',
                  qNum: 'NaN',
                  qElemNumber: 109,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bedford Hills',
                  qNum: 'NaN',
                  qElemNumber: 235,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Benicia',
                  qNum: 'NaN',
                  qElemNumber: 89,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bensonville',
                  qNum: 'NaN',
                  qElemNumber: 138,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Billings',
                  qNum: 'NaN',
                  qElemNumber: 42,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Birmingham',
                  qNum: 'NaN',
                  qElemNumber: 110,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Boise',
                  qNum: 'NaN',
                  qElemNumber: 72,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bozeman',
                  qNum: 'NaN',
                  qElemNumber: 181,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brea',
                  qNum: 'NaN',
                  qElemNumber: 82,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Breckenridge',
                  qNum: 'NaN',
                  qElemNumber: 63,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bremorton',
                  qNum: 'NaN',
                  qElemNumber: 267,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brookfield',
                  qNum: 'NaN',
                  qElemNumber: 170,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brookhaven',
                  qNum: 'NaN',
                  qElemNumber: 253,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brownsville',
                  qNum: 'NaN',
                  qElemNumber: 252,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Buda',
                  qNum: 'NaN',
                  qElemNumber: 255,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Buffalo',
                  qNum: 'NaN',
                  qElemNumber: 175,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Buffdale',
                  qNum: 'NaN',
                  qElemNumber: 186,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Burnsville',
                  qNum: 'NaN',
                  qElemNumber: 262,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Calhoun',
                  qNum: 'NaN',
                  qElemNumber: 30,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Canton',
                  qNum: 'NaN',
                  qElemNumber: 119,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cape Girardeau',
                  qNum: 'NaN',
                  qElemNumber: 46,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Casper',
                  qNum: 'NaN',
                  qElemNumber: 140,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cass City',
                  qNum: 'NaN',
                  qElemNumber: 174,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Charlotte',
                  qNum: 'NaN',
                  qElemNumber: 124,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Chattanooga',
                  qNum: 'NaN',
                  qElemNumber: 20,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Chicago',
                  qNum: 'NaN',
                  qElemNumber: 187,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Chippewa Falls',
                  qNum: 'NaN',
                  qElemNumber: 169,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cincinnati',
                  qNum: 'NaN',
                  qElemNumber: 130,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Clackamas',
                  qNum: 'NaN',
                  qElemNumber: 43,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Clemson',
                  qNum: 'NaN',
                  qElemNumber: 23,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cleveland',
                  qNum: 'NaN',
                  qElemNumber: 106,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Coldwater',
                  qNum: 'NaN',
                  qElemNumber: 38,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Colorado Springs',
                  qNum: 'NaN',
                  qElemNumber: 99,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Columbia',
                  qNum: 'NaN',
                  qElemNumber: 87,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Columbiana',
                  qNum: 'NaN',
                  qElemNumber: 66,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Columbus',
                  qNum: 'NaN',
                  qElemNumber: 57,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Compton',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Corona',
                  qNum: 'NaN',
                  qElemNumber: 64,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Costa Mesa',
                  qNum: 'NaN',
                  qElemNumber: 243,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cramerton',
                  qNum: 'NaN',
                  qElemNumber: 67,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Creedmoor',
                  qNum: 'NaN',
                  qElemNumber: 123,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Crestwood',
                  qNum: 'NaN',
                  qElemNumber: 220,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cypress',
                  qNum: 'NaN',
                  qElemNumber: 93,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dallas',
                  qNum: 'NaN',
                  qElemNumber: 34,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dearborn',
                  qNum: 'NaN',
                  qElemNumber: 48,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Depere',
                  qNum: 'NaN',
                  qElemNumber: 76,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Des Moines',
                  qNum: 'NaN',
                  qElemNumber: 236,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dover',
                  qNum: 'NaN',
                  qElemNumber: 152,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Duluth',
                  qNum: 'NaN',
                  qElemNumber: 85,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Eagan',
                  qNum: 'NaN',
                  qElemNumber: 81,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'East Providence',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Eau Claire',
                  qNum: 'NaN',
                  qElemNumber: 208,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'El Cajon',
                  qNum: 'NaN',
                  qElemNumber: 256,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'El Paso',
                  qNum: 'NaN',
                  qElemNumber: 101,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Elizabethtown',
                  qNum: 'NaN',
                  qElemNumber: 84,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Elkhart',
                  qNum: 'NaN',
                  qElemNumber: 73,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Elma',
                  qNum: 'NaN',
                  qElemNumber: 241,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Enumclaw',
                  qNum: 'NaN',
                  qElemNumber: 219,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Eugene',
                  qNum: 'NaN',
                  qElemNumber: 49,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Evansville',
                  qNum: 'NaN',
                  qElemNumber: 161,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Exeter',
                  qNum: 'NaN',
                  qElemNumber: 28,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fairmount',
                  qNum: 'NaN',
                  qElemNumber: 218,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fairview',
                  qNum: 'NaN',
                  qElemNumber: 250,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Farmington',
                  qNum: 'NaN',
                  qElemNumber: 176,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Flint',
                  qNum: 'NaN',
                  qElemNumber: 62,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fort Collins',
                  qNum: 'NaN',
                  qElemNumber: 88,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fort Smith',
                  qNum: 'NaN',
                  qElemNumber: 118,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fort Worth',
                  qNum: 'NaN',
                  qElemNumber: 69,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Framingham',
                  qNum: 'NaN',
                  qElemNumber: 247,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Frederick',
                  qNum: 'NaN',
                  qElemNumber: 191,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fredericksburg',
                  qNum: 'NaN',
                  qElemNumber: 233,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fresno',
                  qNum: 'NaN',
                  qElemNumber: 213,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ft Collins',
                  qNum: 'NaN',
                  qElemNumber: 58,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gardena',
                  qNum: 'NaN',
                  qElemNumber: 180,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Garner',
                  qNum: 'NaN',
                  qElemNumber: 216,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Glen Burnie',
                  qNum: 'NaN',
                  qElemNumber: 244,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Goodlettsville',
                  qNum: 'NaN',
                  qElemNumber: 98,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Grand Rapids',
                  qNum: 'NaN',
                  qElemNumber: 143,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Greenville',
                  qNum: 'NaN',
                  qElemNumber: 263,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Greenwood',
                  qNum: 'NaN',
                  qElemNumber: 50,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gretna',
                  qNum: 'NaN',
                  qElemNumber: 230,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ham Lake',
                  qNum: 'NaN',
                  qElemNumber: 257,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Hamel',
                  qNum: 'NaN',
                  qElemNumber: 59,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Hammond',
                  qNum: 'NaN',
                  qElemNumber: 128,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Hayward',
                  qNum: 'NaN',
                  qElemNumber: 167,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 100,
            },
          },
        ];
      },
    },
    // listbox object Month
    {
      getLayout() {
        return {
          qInfo: {
            qId: '75554930-f33a-4624-a1dd-0ae1087fd8ce',
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
              cId: 'GVSEmP',
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
          layoutOptions: {
            dense: true,
          },
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
    // listbox object Basket product line desc
    {
      getLayout() {
        return {
          qInfo: {
            qId: '781ac9fd-7e80-4e98-a177-3dd12cab3f7f',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 2,
            },
            qDimensionInfo: {
              qFallbackTitle: 'Basket Product Line Desc',
              qApprMaxGlyphCount: 5,
              qCardinal: 2,
              qSortIndicator: 'A',
              qGroupFallbackTitles: ['Basket Product Line Desc'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 2,
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
              qGroupFieldDefs: ['Basket Product Line Desc'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 2,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              qLibraryId: '20c2b97b-1309-4210-b13c-af30b4bee211',
              title: 'Basket Product Line Desc',
              autoSort: true,
              cId: 'ERCzup',
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
          title: 'Basket Product Line Desc',
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
                  qText: 'Drink',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Food',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 2,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: 'Drink',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Food',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 2,
            },
          },
        ];
      },
    },
    // listbox object Basket Product Group Desc
    {
      getLayout() {
        return {
          qInfo: {
            qId: '7430973a-2401-4221-9797-97d22cfb7fbf',
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
              qSortIndicator: 'A',
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
              qLibraryId: 'af474ee7-aa28-4870-9ffb-790f201c1cc3',
              title: 'Basket Product Group Desc',
              autoSort: true,
              cId: 'mBtMjm',
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
          title: 'Basket Product Group Desc',
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
                  qText: 'Alcoholic Beverages',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Baked Goods',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Baking Goods',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Beverages',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Breakfast Foods',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Canned Foods',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Canned Products',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dairy',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Deli',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Eggs',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Frozen Foods',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Meat',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Produce',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Seafood',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Snack Foods',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Snacks',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Starchy Foods',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
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
                  qText: 'Alcoholic Beverages',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Baked Goods',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Baking Goods',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Beverages',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Breakfast Foods',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Canned Foods',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Canned Products',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dairy',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Deli',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Eggs',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Frozen Foods',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Meat',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Produce',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Seafood',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Snack Foods',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Snacks',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Starchy Foods',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
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
    // listbox object Customer
    {
      getLayout() {
        return {
          qInfo: {
            qId: 'e1393956-bc49-447c-b901-839c26a5a7de',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 347,
            },
            qDimensionInfo: {
              qFallbackTitle: 'Customer',
              qApprMaxGlyphCount: 36,
              qCardinal: 347,
              qSortIndicator: 'A',
              qGroupFallbackTitles: ['Customer'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 347,
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
              qGroupFieldDefs: ['Customer'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 347,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              qLibraryId: '05778c9f-aef0-4078-a577-4cfffd8ebfbe',
              title: 'Customer',
              autoSort: true,
              cId: 'HPYRyY',
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
          title: 'Customer',
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
                  qText: 'A-ARVIN Laser Resources',
                  qNum: 'NaN',
                  qElemNumber: 293,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'A&R Partners',
                  qNum: 'NaN',
                  qElemNumber: 159,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'a2i',
                  qNum: 'NaN',
                  qElemNumber: 199,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'A2Z Solutions',
                  qNum: 'NaN',
                  qElemNumber: 22,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'AA-Wizard',
                  qNum: 'NaN',
                  qElemNumber: 92,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Aaron D. Meyer & Associates',
                  qNum: 'NaN',
                  qElemNumber: 236,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Aaron Products',
                  qNum: 'NaN',
                  qElemNumber: 21,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Abacus Niagara',
                  qNum: 'NaN',
                  qElemNumber: 112,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Abbotsbury',
                  qNum: 'NaN',
                  qElemNumber: 242,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Abbott',
                  qNum: 'NaN',
                  qElemNumber: 254,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ACS',
                  qNum: 'NaN',
                  qElemNumber: 222,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ACS  Shop',
                  qNum: 'NaN',
                  qElemNumber: 318,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ACT Laboratory',
                  qNum: 'NaN',
                  qElemNumber: 106,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ActionWorld',
                  qNum: 'NaN',
                  qElemNumber: 33,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Active Data',
                  qNum: 'NaN',
                  qElemNumber: 186,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Active Network Systems',
                  qNum: 'NaN',
                  qElemNumber: 154,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Active Voice',
                  qNum: 'NaN',
                  qElemNumber: 118,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'activeDesign',
                  qNum: 'NaN',
                  qElemNumber: 231,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Age',
                  qNum: 'NaN',
                  qElemNumber: 275,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bechtel Corporation',
                  qNum: 'NaN',
                  qElemNumber: 103,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ben and Jerry’s',
                  qNum: 'NaN',
                  qElemNumber: 300,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Benedict',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Berkeley Design',
                  qNum: 'NaN',
                  qElemNumber: 215,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Betacorp',
                  qNum: 'NaN',
                  qElemNumber: 333,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bigelow Sandford',
                  qNum: 'NaN',
                  qElemNumber: 238,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'BigJobs',
                  qNum: 'NaN',
                  qElemNumber: 163,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bitstream',
                  qNum: 'NaN',
                  qElemNumber: 239,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bizmarts',
                  qNum: 'NaN',
                  qElemNumber: 174,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'BizNet Equity Management Trust (BEMT)',
                  qNum: 'NaN',
                  qElemNumber: 218,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'BL Trading',
                  qNum: 'NaN',
                  qElemNumber: 214,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brinco Ltd.',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'C & C  Design',
                  qNum: 'NaN',
                  qElemNumber: 64,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'C & J Engineering',
                  qNum: 'NaN',
                  qElemNumber: 85,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'C & M Distributors',
                  qNum: 'NaN',
                  qElemNumber: 104,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CAF Systemhaus',
                  qNum: 'NaN',
                  qElemNumber: 84,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cam-Built Prpgramming Plus',
                  qNum: 'NaN',
                  qElemNumber: 232,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CAM Group',
                  qNum: 'NaN',
                  qElemNumber: 295,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cambio',
                  qNum: 'NaN',
                  qElemNumber: 291,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Canter',
                  qNum: 'NaN',
                  qElemNumber: 138,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CAPCON',
                  qNum: 'NaN',
                  qElemNumber: 182,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Capitola Works',
                  qNum: 'NaN',
                  qElemNumber: 253,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Capitolnet Marketing Group (CMG)',
                  qNum: 'NaN',
                  qElemNumber: 343,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Caprica  Resources',
                  qNum: 'NaN',
                  qElemNumber: 228,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CAPTA',
                  qNum: 'NaN',
                  qElemNumber: 225,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Caravelle',
                  qNum: 'NaN',
                  qElemNumber: 183,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Carden Jennings Publishing',
                  qNum: 'NaN',
                  qElemNumber: 195,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Caribian Specialties',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Central Soya Company',
                  qNum: 'NaN',
                  qElemNumber: 336,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Chas T. Main, Inc.',
                  qNum: 'NaN',
                  qElemNumber: 108,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'City Fresh Foods',
                  qNum: 'NaN',
                  qElemNumber: 44,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Clearout',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'David L. Babson & Co., Inc.',
                  qNum: 'NaN',
                  qElemNumber: 46,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'David Spencer Ltd.',
                  qNum: 'NaN',
                  qElemNumber: 151,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dayton Malleable Inc.',
                  qNum: 'NaN',
                  qElemNumber: 28,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DC-Works',
                  qNum: 'NaN',
                  qElemNumber: 132,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DCS International',
                  qNum: 'NaN',
                  qElemNumber: 88,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DCS Laboratory',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DDR',
                  qNum: 'NaN',
                  qElemNumber: 324,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'De La Rue (Thomas) and Company',
                  qNum: 'NaN',
                  qElemNumber: 226,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DEAC',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Deak-Perera Group.',
                  qNum: 'NaN',
                  qElemNumber: 50,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Debenhams Ltd.',
                  qNum: 'NaN',
                  qElemNumber: 83,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Debian',
                  qNum: 'NaN',
                  qElemNumber: 245,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Del Monte Corporation',
                  qNum: 'NaN',
                  qElemNumber: 294,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dellovade, A.C./Dick Corp/Kendall',
                  qNum: 'NaN',
                  qElemNumber: 51,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'e-MDs',
                  qNum: 'NaN',
                  qElemNumber: 227,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'E Corp.',
                  qNum: 'NaN',
                  qElemNumber: 29,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Earth',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'East',
                  qNum: 'NaN',
                  qElemNumber: 259,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'EDGE Systems',
                  qNum: 'NaN',
                  qElemNumber: 332,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Edify',
                  qNum: 'NaN',
                  qElemNumber: 297,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'eDistrict',
                  qNum: 'NaN',
                  qElemNumber: 188,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ediSys',
                  qNum: 'NaN',
                  qElemNumber: 229,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'edit.nl',
                  qNum: 'NaN',
                  qElemNumber: 123,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Editor',
                  qNum: 'NaN',
                  qElemNumber: 75,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Edna Design',
                  qNum: 'NaN',
                  qElemNumber: 257,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Edorex Informatik',
                  qNum: 'NaN',
                  qElemNumber: 63,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'EDP',
                  qNum: 'NaN',
                  qElemNumber: 165,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'EDS',
                  qNum: 'NaN',
                  qElemNumber: 292,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ethyl Corporation',
                  qNum: 'NaN',
                  qElemNumber: 38,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'F. & R. Lazarus and Company',
                  qNum: 'NaN',
                  qElemNumber: 212,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Farr Alpaca Company',
                  qNum: 'NaN',
                  qElemNumber: 283,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Felidae Enterprises',
                  qNum: 'NaN',
                  qElemNumber: 121,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ferst',
                  qNum: 'NaN',
                  qElemNumber: 329,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'FIBERWORKS',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fibronics',
                  qNum: 'NaN',
                  qElemNumber: 130,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fill It',
                  qNum: 'NaN',
                  qElemNumber: 169,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Filmotype',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Finishing',
                  qNum: 'NaN',
                  qElemNumber: 97,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fins',
                  qNum: 'NaN',
                  qElemNumber: 322,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fokas',
                  qNum: 'NaN',
                  qElemNumber: 135,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gartner Group',
                  qNum: 'NaN',
                  qElemNumber: 116,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Garza Industries',
                  qNum: 'NaN',
                  qElemNumber: 162,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gastown space',
                  qNum: 'NaN',
                  qElemNumber: 335,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gate',
                  qNum: 'NaN',
                  qElemNumber: 314,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'GDSS',
                  qNum: 'NaN',
                  qElemNumber: 177,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'GE Fanuc Automation',
                  qNum: 'NaN',
                  qElemNumber: 164,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Geac',
                  qNum: 'NaN',
                  qElemNumber: 67,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gemini Controls',
                  qNum: 'NaN',
                  qElemNumber: 55,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gulf and Western Industries',
                  qNum: 'NaN',
                  qElemNumber: 278,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 100,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: 'A-ARVIN Laser Resources',
                  qNum: 'NaN',
                  qElemNumber: 293,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'A&R Partners',
                  qNum: 'NaN',
                  qElemNumber: 159,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'a2i',
                  qNum: 'NaN',
                  qElemNumber: 199,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'A2Z Solutions',
                  qNum: 'NaN',
                  qElemNumber: 22,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'AA-Wizard',
                  qNum: 'NaN',
                  qElemNumber: 92,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Aaron D. Meyer & Associates',
                  qNum: 'NaN',
                  qElemNumber: 236,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Aaron Products',
                  qNum: 'NaN',
                  qElemNumber: 21,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Abacus Niagara',
                  qNum: 'NaN',
                  qElemNumber: 112,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Abbotsbury',
                  qNum: 'NaN',
                  qElemNumber: 242,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Abbott',
                  qNum: 'NaN',
                  qElemNumber: 254,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ACS',
                  qNum: 'NaN',
                  qElemNumber: 222,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ACS  Shop',
                  qNum: 'NaN',
                  qElemNumber: 318,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ACT Laboratory',
                  qNum: 'NaN',
                  qElemNumber: 106,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ActionWorld',
                  qNum: 'NaN',
                  qElemNumber: 33,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Active Data',
                  qNum: 'NaN',
                  qElemNumber: 186,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Active Network Systems',
                  qNum: 'NaN',
                  qElemNumber: 154,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Active Voice',
                  qNum: 'NaN',
                  qElemNumber: 118,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'activeDesign',
                  qNum: 'NaN',
                  qElemNumber: 231,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Age',
                  qNum: 'NaN',
                  qElemNumber: 275,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bechtel Corporation',
                  qNum: 'NaN',
                  qElemNumber: 103,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ben and Jerry’s',
                  qNum: 'NaN',
                  qElemNumber: 300,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Benedict',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Berkeley Design',
                  qNum: 'NaN',
                  qElemNumber: 215,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Betacorp',
                  qNum: 'NaN',
                  qElemNumber: 333,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bigelow Sandford',
                  qNum: 'NaN',
                  qElemNumber: 238,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'BigJobs',
                  qNum: 'NaN',
                  qElemNumber: 163,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bitstream',
                  qNum: 'NaN',
                  qElemNumber: 239,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Bizmarts',
                  qNum: 'NaN',
                  qElemNumber: 174,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'BizNet Equity Management Trust (BEMT)',
                  qNum: 'NaN',
                  qElemNumber: 218,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'BL Trading',
                  qNum: 'NaN',
                  qElemNumber: 214,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Brinco Ltd.',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'C & C  Design',
                  qNum: 'NaN',
                  qElemNumber: 64,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'C & J Engineering',
                  qNum: 'NaN',
                  qElemNumber: 85,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'C & M Distributors',
                  qNum: 'NaN',
                  qElemNumber: 104,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CAF Systemhaus',
                  qNum: 'NaN',
                  qElemNumber: 84,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cam-Built Prpgramming Plus',
                  qNum: 'NaN',
                  qElemNumber: 232,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CAM Group',
                  qNum: 'NaN',
                  qElemNumber: 295,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Cambio',
                  qNum: 'NaN',
                  qElemNumber: 291,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Canter',
                  qNum: 'NaN',
                  qElemNumber: 138,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CAPCON',
                  qNum: 'NaN',
                  qElemNumber: 182,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Capitola Works',
                  qNum: 'NaN',
                  qElemNumber: 253,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Capitolnet Marketing Group (CMG)',
                  qNum: 'NaN',
                  qElemNumber: 343,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Caprica  Resources',
                  qNum: 'NaN',
                  qElemNumber: 228,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CAPTA',
                  qNum: 'NaN',
                  qElemNumber: 225,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Caravelle',
                  qNum: 'NaN',
                  qElemNumber: 183,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Carden Jennings Publishing',
                  qNum: 'NaN',
                  qElemNumber: 195,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Caribian Specialties',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Central Soya Company',
                  qNum: 'NaN',
                  qElemNumber: 336,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Chas T. Main, Inc.',
                  qNum: 'NaN',
                  qElemNumber: 108,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'City Fresh Foods',
                  qNum: 'NaN',
                  qElemNumber: 44,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Clearout',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'David L. Babson & Co., Inc.',
                  qNum: 'NaN',
                  qElemNumber: 46,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'David Spencer Ltd.',
                  qNum: 'NaN',
                  qElemNumber: 151,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dayton Malleable Inc.',
                  qNum: 'NaN',
                  qElemNumber: 28,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DC-Works',
                  qNum: 'NaN',
                  qElemNumber: 132,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DCS International',
                  qNum: 'NaN',
                  qElemNumber: 88,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DCS Laboratory',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DDR',
                  qNum: 'NaN',
                  qElemNumber: 324,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'De La Rue (Thomas) and Company',
                  qNum: 'NaN',
                  qElemNumber: 226,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'DEAC',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Deak-Perera Group.',
                  qNum: 'NaN',
                  qElemNumber: 50,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Debenhams Ltd.',
                  qNum: 'NaN',
                  qElemNumber: 83,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Debian',
                  qNum: 'NaN',
                  qElemNumber: 245,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Del Monte Corporation',
                  qNum: 'NaN',
                  qElemNumber: 294,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Dellovade, A.C./Dick Corp/Kendall',
                  qNum: 'NaN',
                  qElemNumber: 51,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'e-MDs',
                  qNum: 'NaN',
                  qElemNumber: 227,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'E Corp.',
                  qNum: 'NaN',
                  qElemNumber: 29,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Earth',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'East',
                  qNum: 'NaN',
                  qElemNumber: 259,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'EDGE Systems',
                  qNum: 'NaN',
                  qElemNumber: 332,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Edify',
                  qNum: 'NaN',
                  qElemNumber: 297,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'eDistrict',
                  qNum: 'NaN',
                  qElemNumber: 188,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ediSys',
                  qNum: 'NaN',
                  qElemNumber: 229,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'edit.nl',
                  qNum: 'NaN',
                  qElemNumber: 123,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Editor',
                  qNum: 'NaN',
                  qElemNumber: 75,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Edna Design',
                  qNum: 'NaN',
                  qElemNumber: 257,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Edorex Informatik',
                  qNum: 'NaN',
                  qElemNumber: 63,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'EDP',
                  qNum: 'NaN',
                  qElemNumber: 165,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'EDS',
                  qNum: 'NaN',
                  qElemNumber: 292,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ethyl Corporation',
                  qNum: 'NaN',
                  qElemNumber: 38,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'F. & R. Lazarus and Company',
                  qNum: 'NaN',
                  qElemNumber: 212,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Farr Alpaca Company',
                  qNum: 'NaN',
                  qElemNumber: 283,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Felidae Enterprises',
                  qNum: 'NaN',
                  qElemNumber: 121,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Ferst',
                  qNum: 'NaN',
                  qElemNumber: 329,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'FIBERWORKS',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fibronics',
                  qNum: 'NaN',
                  qElemNumber: 130,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fill It',
                  qNum: 'NaN',
                  qElemNumber: 169,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Filmotype',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Finishing',
                  qNum: 'NaN',
                  qElemNumber: 97,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fins',
                  qNum: 'NaN',
                  qElemNumber: 322,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Fokas',
                  qNum: 'NaN',
                  qElemNumber: 135,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gartner Group',
                  qNum: 'NaN',
                  qElemNumber: 116,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Garza Industries',
                  qNum: 'NaN',
                  qElemNumber: 162,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gastown space',
                  qNum: 'NaN',
                  qElemNumber: 335,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gate',
                  qNum: 'NaN',
                  qElemNumber: 314,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'GDSS',
                  qNum: 'NaN',
                  qElemNumber: 177,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'GE Fanuc Automation',
                  qNum: 'NaN',
                  qElemNumber: 164,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Geac',
                  qNum: 'NaN',
                  qElemNumber: 67,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gemini Controls',
                  qNum: 'NaN',
                  qElemNumber: 55,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Gulf and Western Industries',
                  qNum: 'NaN',
                  qElemNumber: 278,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 100,
            },
          },
        ];
      },
    },
    // listbox object Family Class Desc
    {
      getLayout() {
        return {
          qInfo: {
            qId: '3792fa55-e93b-470f-abb5-26eff5a82e55',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 33,
            },
            qDimensionInfo: {
              qFallbackTitle: 'Family Class Desc',
              qApprMaxGlyphCount: 30,
              qCardinal: 33,
              qSortIndicator: 'A',
              qGroupFallbackTitles: ['Family Class Desc'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 33,
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
              qGroupFieldDefs: ['Family Class Desc'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 33,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              autoSort: true,
              cId: 'VaPnTC',
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
          title: 'Family Class Desc',
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
                  qText: '4X Flares',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '4X Truck Lights',
                  qNum: 'NaN',
                  qElemNumber: 20,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ATV Winch 1700 - 2000',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ATV Winch 2500 - 3000',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ATV Winch Accessories',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Classic',
                  qNum: 'NaN',
                  qElemNumber: 22,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Combo',
                  qNum: 'NaN',
                  qElemNumber: 21,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Enforcer',
                  qNum: 'NaN',
                  qElemNumber: 23,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'External Mount Hubs',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Flange Mount Hubs',
                  qNum: 'NaN',
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Floating Axle Systems',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Front Hub Conversions',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Internal Mount Hubs',
                  qNum: 'NaN',
                  qElemNumber: 18,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Jeep Bumpers / Armor',
                  qNum: 'NaN',
                  qElemNumber: 25,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Kia Hubs',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Mounting Plate Kit',
                  qNum: 'NaN',
                  qElemNumber: 27,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Multi-Mount Frame',
                  qNum: 'NaN',
                  qElemNumber: 26,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Nissan Hubs',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'OEM Service Hubs',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Rio Grande Systems',
                  qNum: 'NaN',
                  qElemNumber: 24,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SDB Lights',
                  qNum: 'NaN',
                  qElemNumber: 19,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Series Electric Hoist',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Series Electric Winch',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Series Hydraulic Winch',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Thinline Flares',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Tier 1 Hubs',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Trail Flares',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Trans4mer Systems',
                  qNum: 'NaN',
                  qElemNumber: 28,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Truck Large Frame Winch 12 K +',
                  qNum: 'NaN',
                  qElemNumber: 29,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Truck Mid Frame Winch 6 K +',
                  qNum: 'NaN',
                  qElemNumber: 30,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Truck Winch Accessories',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Utility /Trailer Winch',
                  qNum: 'NaN',
                  qElemNumber: 31,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Works Electric Winch',
                  qNum: 'NaN',
                  qElemNumber: 32,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 33,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: '4X Flares',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '4X Truck Lights',
                  qNum: 'NaN',
                  qElemNumber: 20,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ATV Winch 1700 - 2000',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ATV Winch 2500 - 3000',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ATV Winch Accessories',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Classic',
                  qNum: 'NaN',
                  qElemNumber: 22,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Combo',
                  qNum: 'NaN',
                  qElemNumber: 21,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Enforcer',
                  qNum: 'NaN',
                  qElemNumber: 23,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'External Mount Hubs',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Flange Mount Hubs',
                  qNum: 'NaN',
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Floating Axle Systems',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Front Hub Conversions',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Internal Mount Hubs',
                  qNum: 'NaN',
                  qElemNumber: 18,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Jeep Bumpers / Armor',
                  qNum: 'NaN',
                  qElemNumber: 25,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Kia Hubs',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Mounting Plate Kit',
                  qNum: 'NaN',
                  qElemNumber: 27,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Multi-Mount Frame',
                  qNum: 'NaN',
                  qElemNumber: 26,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Nissan Hubs',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'OEM Service Hubs',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Rio Grande Systems',
                  qNum: 'NaN',
                  qElemNumber: 24,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SDB Lights',
                  qNum: 'NaN',
                  qElemNumber: 19,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Series Electric Hoist',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Series Electric Winch',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Series Hydraulic Winch',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Thinline Flares',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Tier 1 Hubs',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Trail Flares',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Trans4mer Systems',
                  qNum: 'NaN',
                  qElemNumber: 28,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Truck Large Frame Winch 12 K +',
                  qNum: 'NaN',
                  qElemNumber: 29,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Truck Mid Frame Winch 6 K +',
                  qNum: 'NaN',
                  qElemNumber: 30,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Truck Winch Accessories',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Utility /Trailer Winch',
                  qNum: 'NaN',
                  qElemNumber: 31,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'Works Electric Winch',
                  qNum: 'NaN',
                  qElemNumber: 32,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 33,
            },
          },
        ];
      },
    },
    // listbox object Item Branch Category
    {
      getLayout() {
        return {
          qInfo: {
            qId: '873dc0a0-8d78-4536-8347-b7b016f01faf',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 19,
            },
            qDimensionInfo: {
              qFallbackTitle: 'Item Branch Category Code 6',
              qApprMaxGlyphCount: 4,
              qCardinal: 19,
              qSortIndicator: 'A',
              qGroupFallbackTitles: ['Item Branch Category Code 6'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 19,
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
              qGroupFieldDefs: ['Item Branch Category Code 6'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 19,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              autoSort: true,
              cId: 'pCUUhCF',
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
          title: 'Item Branch Category Code 6',
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
                  qText: '1005',
                  qNum: 1005,
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1010',
                  qNum: 1010,
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1015',
                  qNum: 1015,
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1020',
                  qNum: 1020,
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1025',
                  qNum: 1025,
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1030',
                  qNum: 1030,
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1035',
                  qNum: 1035,
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1040',
                  qNum: 1040,
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1045',
                  qNum: 1045,
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1050',
                  qNum: 1050,
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1055',
                  qNum: 1055,
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1060',
                  qNum: 1060,
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1065',
                  qNum: 1065,
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1075',
                  qNum: 1075,
                  qElemNumber: 18,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1080',
                  qNum: 1080,
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1085',
                  qNum: 1085,
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1090',
                  qNum: 1090,
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1095',
                  qNum: 1095,
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '5020',
                  qNum: 5020,
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 19,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: '1005',
                  qNum: 1005,
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1010',
                  qNum: 1010,
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1015',
                  qNum: 1015,
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1020',
                  qNum: 1020,
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1025',
                  qNum: 1025,
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1030',
                  qNum: 1030,
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1035',
                  qNum: 1035,
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1040',
                  qNum: 1040,
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1045',
                  qNum: 1045,
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1050',
                  qNum: 1050,
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1055',
                  qNum: 1055,
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1060',
                  qNum: 1060,
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1065',
                  qNum: 1065,
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1075',
                  qNum: 1075,
                  qElemNumber: 18,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1080',
                  qNum: 1080,
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1085',
                  qNum: 1085,
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1090',
                  qNum: 1090,
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '1095',
                  qNum: 1095,
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: '5020',
                  qNum: 5020,
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 19,
            },
          },
        ];
      },
    },
    // listbox object Item Branch G/L Category
    {
      getLayout() {
        return {
          qInfo: {
            qId: '3c005fab-1e1c-4764-a141-4157a1027f5a',
            qType: 'listbox',
          },
          qMeta: {
            privileges: ['read', 'update', 'delete'],
          },
          qSelectionInfo: {},
          qListObject: {
            qSize: {
              qcx: 1,
              qcy: 19,
            },
            qDimensionInfo: {
              qFallbackTitle: 'Item Branch G/L Category',
              qApprMaxGlyphCount: 4,
              qCardinal: 19,
              qSortIndicator: 'A',
              qGroupFallbackTitles: ['Item Branch G/L Category'],
              qGroupPos: 0,
              qStateCounts: {
                qLocked: 0,
                qSelected: 0,
                qOption: 19,
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
              qGroupFieldDefs: ['Item Branch G/L Category'],
              qMin: 0,
              qMax: 0,
              qAttrExprInfo: [],
              qAttrDimInfo: [],
              qCardinalities: {
                qCardinal: 19,
                qHypercubeCardinal: 0,
                qAllValuesCardinal: -1,
              },
              autoSort: true,
              cId: 'NGJPCad',
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
          title: 'Item Branch G/L Category',
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
                  qText: 'ACCE',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'AFAB',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ATVW',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'AXLE',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CHUB',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'GKN',
                  qNum: 'NaN',
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'IWE',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'KIA',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'MKTG',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'NISS',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SHUB',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SMWN',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SRCW',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SUZU',
                  qNum: 'NaN',
                  qElemNumber: 18,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'TFAB',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'THUB',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'TIER',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'TMTG',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'UTIW',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 19,
            },
          },
          {
            qMatrix: [
              [
                {
                  qText: 'ACCE',
                  qNum: 'NaN',
                  qElemNumber: 2,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'AFAB',
                  qNum: 'NaN',
                  qElemNumber: 6,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'ATVW',
                  qNum: 'NaN',
                  qElemNumber: 10,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'AXLE',
                  qNum: 'NaN',
                  qElemNumber: 3,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'CHUB',
                  qNum: 'NaN',
                  qElemNumber: 14,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'GKN',
                  qNum: 'NaN',
                  qElemNumber: 17,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'IWE',
                  qNum: 'NaN',
                  qElemNumber: 11,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'KIA',
                  qNum: 'NaN',
                  qElemNumber: 16,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'MKTG',
                  qNum: 'NaN',
                  qElemNumber: 5,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'NISS',
                  qNum: 'NaN',
                  qElemNumber: 8,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SHUB',
                  qNum: 'NaN',
                  qElemNumber: 12,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SMWN',
                  qNum: 'NaN',
                  qElemNumber: 9,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SRCW',
                  qNum: 'NaN',
                  qElemNumber: 1,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'SUZU',
                  qNum: 'NaN',
                  qElemNumber: 18,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'TFAB',
                  qNum: 'NaN',
                  qElemNumber: 7,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'THUB',
                  qNum: 'NaN',
                  qElemNumber: 4,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'TIER',
                  qNum: 'NaN',
                  qElemNumber: 15,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'TMTG',
                  qNum: 'NaN',
                  qElemNumber: 0,
                  qState: 'O',
                },
              ],
              [
                {
                  qText: 'UTIW',
                  qNum: 'NaN',
                  qElemNumber: 13,
                  qState: 'O',
                },
              ],
            ],
            qTails: [],
            qArea: {
              qLeft: 0,
              qTop: 0,
              qWidth: 1,
              qHeight: 19,
            },
          },
        ];
      },
    },
  ],
});

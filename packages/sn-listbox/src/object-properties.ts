const properties = {
  qListObjectDef: {
    qShowAlternatives: true,
    frequencyEnabled: false,
    qFrequencyMode: 'N',
    qDef: {
      autoSort: true,
      textAlign: { auto: true, align: 'left' },
      qSortCriterias: [
        {
          qSortByState: 1,
          qSortByAscii: 1,
          qSortByNumeric: 1,
          qSortByLoadOrder: 1,
        },
      ],
    },
    qInitialDataFetch: [
      {
        qTop: 0,
        qLeft: 0,
        qWidth: 0,
        qHeight: 0,
      },
    ],
  },
  checkboxes: false,
  wildCardSearch: false,
  searchEnabled: true,
  histogram: false, // note that histogram will not show as long as qFrequencyMode == 'N'
  layoutOptions: {
    dense: false,
    dataLayout: 'singleColumn',
    layoutOrder: 'row',
    maxVisibleRows: {
      auto: true,
      maxRows: 3,
    },
    maxVisibleColumns: {
      auto: true,
      maxColumns: 3,
    },
  },
  title: '',
  showTitle: true,
  showTitles: false,
  subtitle: '',
  footnote: '',
  disableNavMenu: true,
  showDetails: false,
  showDetailsExpression: false,
  qStateName: '',
  qInfo: {
    qType: 'listbox',
  },
  // visualization: 'listbox',
  targets: [],
};

export default properties;

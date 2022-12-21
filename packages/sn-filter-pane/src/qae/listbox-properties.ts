const defaultListboxProps = {
  qListObjectDef: {
    frequencyEnabled: false,
    qFrequencyMode: 'N',
    qDef: {
      qSortCriterias: [
        {
          qSortByState: 1,
          qSortByAscii: 1,
          qSortByNumeric: 1,
          qSortByLoadOrder: 1,
        },
      ],
    },
    qShowAlternatives: true,
    qInitialDataFetch: [
      {
        qTop: 0,
        qLeft: 0,
        qWidth: 0,
        qHeight: 0,
      },
    ],
  },
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
  checkboxes: false,
  histogram: false, // note that histogram will not show as long as qFrequencyMode == 'N'
  showTitles: false,
  // title: 'Dim1',
  subtitle: '',
  footnote: '',
  disableNavMenu: false,
  showDetails: false,
  showDetailsExpression: false,
  qStateName: '',
  qInfo: {
    qType: 'listbox',
  },
  // visualization: 'listbox',
  targets: [],
};

export default defaultListboxProps;

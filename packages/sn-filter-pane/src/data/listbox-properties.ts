const defaultListboxProps = {
  qListObjectDef: {
    frequencyEnabled: false,
    qFrequencyMode: 'P',
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
  checkboxes: true,
  histogram: true, // note that histogram will only show if qFrequencyMode != 'N'
  showTitles: true,
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

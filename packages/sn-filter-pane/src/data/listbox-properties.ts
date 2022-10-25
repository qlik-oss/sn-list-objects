export const defaultListboxProps = {
  qListObjectDef: {
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

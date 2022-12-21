const properties = {
  qListObjectDef: {
    qShowAlternatives: true,
    frequencyEnabled: false,
    qFrequencyMode: 'N',
    // qInitialDataFetch: [],
    qDef: {
      autoSort: true,
      textAlign: { auto: true, align: 'left' },
    },
  },
  checkboxes: false,
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
  subtitle: '',
  footnote: '',
};

export default properties;

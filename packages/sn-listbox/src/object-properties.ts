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
  histogram: false, // note that histogram will only show if qFrequencyMode != 'N'
  layoutOptions: {
    dense: false,
    dataLayout: 'grid',
    layoutOrder: 'column',
    maxVisibleRows: {
      auto: true,
      maxRows: 3,
    },
    maxVisibleColumns: {
      auto: false,
      maxColumns: 3,
    },
  },
  title: '',
  subtitle: '',
  footnote: '',
};

export default properties;

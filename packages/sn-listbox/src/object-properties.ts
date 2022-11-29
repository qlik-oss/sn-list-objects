const properties = {
  qListObjectDef: {
    qShowAlternatives: true,
    frequencyEnabled: false, // TODO: look at this in listbox in nebula?
    qFrequencyMode: 'N',
    // qInitialDataFetch: [],
    qDef: {
      autoSort: true,
      textAlign: { auto: true },
    },
    layoutOptions: {
      dataLayout: 'singleColumn',
      layoutOrder: 'row',
      maxVisibleRows: {
        auto: true,
        maxRows: 3,
      },
      maxVisibleColumns: {
        auto: false,
        maxColumns: 3,
      },
    },
  },
  title: '',
  subtitle: '',
  footnote: '',
};

export default properties;

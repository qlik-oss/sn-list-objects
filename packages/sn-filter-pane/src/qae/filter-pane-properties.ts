const properties = {
  showTitles: false,
  title: '',
  subtitle: '',
  footnote: '',
  histogram: false,
  checkboxes: false,
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
  qChildListDef: {
    qDef: {
      qListObjectDef: {
        qLibraryId: undefined,
        qFrequencyMode: 'N',
        qDef: {
          cId: '',
          autoSort: true,
          qFieldDefs: [],
          textAlign: {
            auto: true,
            align: 'left',
          },
          qSortCriterias: [],
          qChildListDef: {
            qData: {
              info: '/qInfo',
            },
          },
        },
      },
    },
  },
};

export default properties;

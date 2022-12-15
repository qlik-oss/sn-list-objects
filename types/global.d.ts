export interface IListLayout extends EngineAPI.IGenericListLayout {
  title: string;
  qStateName: string;
  qInfo: {
    qId: string;
  },
  layoutOptions?: {
    dense: boolean,
  }
}

// Missing properties in EngineAPI.IGenericListProperties are added in this interface until
// EngineAPI.IGenericListProperties is updated
export interface IGenericListPropertiesMissing {
  qListObjectDef?: {
    layouting: {
      dataLayout: string,
      layoutOrder: string,
      maxVisibleRows: {
        auto: boolean,
      },
      maxVisibleColumns: {
        auto: boolean,
      }
    },
    frequencyEnabled: boolean,
    qDef?: {
      qSortCriterias: EngineAPI.ISortCriteria[],
      autoSort: boolean,
      title: string,
      textAlign?: {
        auto?: boolean
      }
    }
  }
}

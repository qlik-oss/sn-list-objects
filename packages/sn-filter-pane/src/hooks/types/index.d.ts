export interface IContainerElement extends HTMLDivElement {
  current: HTMLElement
}

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

interface ISessionModel {
  [key]: unknown;
}

export interface IListBoxOptions {
  title?: string;
  direction?: stardust.Direction;
  listLayout?: stardust.ListLayout;
  frequencyMode?: stardust.FrequencyMode;
  histogram?: boolean;
  search?: stardust.SearchMode;
  toolbar?: boolean;
  checkboxes?: boolean;
  dense?: boolean;
  dqEnabled?: boolean;
  sessionModel?: ISessionModel;
  stateName?: string;
  properties?: object;
  update?: () => void;
  __DO_NOT_USE__?: {
    selectDisabled?: () => boolean;
  };
}

export interface IFilterPaneLayout {
  qChildList?: {
    qItems: { qInfo: { qId: string } }[];
  };
  layoutOptions?: {
    compactData?: boolean,
  }
}

export interface IListboxResource {
  id: string;
  model: GenericObjectModel;
  layout: IListLayout;
  properties: EngineAPI.IGenericObjectProperties;
  height: string;
  expand: boolean;
  cardinal: number;
  responsiveMode: string;
  fullyExpanded: boolean;
  dense: boolean;
}

export type ListboxResourcesArr = array & IListboxResource[];

// Missing properties in EngineAPI.IGenericListProperties are added in this interface until
// EngineAPI.IGenericListProperties is updated
export interface IGenericListPropertiesMissing {
  qListObjectDef?: {
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

// Missing properties in EngineAPI.INxDimensionMissing are added in this interface until
// EngineAPI.INxDimensionMissing is updated
export interface INxDimensionMissing {
  qDef: {
    title: string
  }
}

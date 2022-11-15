export interface IContainerElement extends HTMLDivElement {
  current: HTMLElement
}

export interface IListLayout extends EngineAPI.IGenericListLayout {
  title: string;
  qStateName: string;
  qInfo: {
    qId: string;
  }
}

interface ISessionModel {
  [key]: any;
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
  layoutOptions?:{
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
}

export type ListboxResourcesArr = array & IListboxResource[];

export interface IUseOptions {
  listboxOptions?: IListBoxOptions;
}

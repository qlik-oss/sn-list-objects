import { IListLayout as GlobalIListLayout, IGenericListPropertiesMissing as IGenericListPropertiesMissingGlobal, INxAppLayoutGlobal } from '../../../../../types/global';

export type IListLayout = GlobalIListLayout;
export type IGenericListPropertiesMissing = IGenericListPropertiesMissingGlobal;
export type INxAppLayout = INxAppLayoutGlobal;

export type IPage = {
  qArea: object;
  qMatrix: object[];
};

export interface IContainerElement extends HTMLObjectElement {
  current: HTMLElement
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
    showGray?: boolean;
    focusSearch?: boolean;
    postProcessPages?: (pages: IPage[]) => IPage[];
    calculatePagesHeight?: boolean;
  };
}

export interface IFilterPaneLayout {
  qChildList?: {
    qItems: { qInfo: { qId: string } }[];
  };
  layoutOptions?: {
    compactData?: boolean,
  }
  components?: object[],
}

export interface IListboxResource {
  id: string;
  model: GenericObjectModel;
  layout: IListLayout;
  height: string;
  expand: boolean;
  cardinal: number;
  responsiveMode: string;
  fullyExpanded: boolean;
  dense: boolean;
  hiddenHeader: boolean;
}

export type ListboxResourcesArr = array & IListboxResource[];

// Missing properties in EngineAPI.INxDimensionMissing are added in this interface until
// EngineAPI.INxDimensionMissing is updated
export interface INxDimensionMissing {
  qDef: {
    title: string
  }
}

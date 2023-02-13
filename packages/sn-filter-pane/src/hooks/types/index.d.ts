import { IListLayout as GlobalIListLayout, IGenericListPropertiesMissing as IGenericListPropertiesMissingGlobal } from '../../../../../types/global';

export type IListLayout = GlobalIListLayout;
export type IGenericListPropertiesMissing = IGenericListPropertiesMissingGlobal;

export interface IContainerElement extends HTMLDivElement {
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

// Missing properties in EngineAPI.INxDimensionMissing are added in this interface until
// EngineAPI.INxDimensionMissing is updated
export interface INxDimensionMissing {
  qDef: {
    title: string
  }
}

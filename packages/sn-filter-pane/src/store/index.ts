import { stardust } from '@nebula.js/stardust';
import {
  IFilterPaneLayout,
  IListBoxOptions,
  IListboxResource,
} from '../hooks/types';
import { IEnv } from '../types/types';
import { RenderTrackerService } from '../services/render-tracker';
import createStore from './state-store';
import { ISize } from '../components/ListboxGrid/interfaces';
import { IStyles } from '../hooks/types/components';

export interface IStoreState {
  app?: EngineAPI.IApp;
  model?: EngineAPI.IGenericObject;
  fpLayout?: IFilterPaneLayout;
  options: IListBoxOptions;
  constraints?: stardust.Constraints;
  translator?: stardust.Translator;
  env?: IEnv;
  directQueryEnabled?: boolean;
  embed?: stardust.Embed;
  styles?: IStyles;
  selections?: stardust.ObjectSelections;
  keyboard?: stardust.Keyboard;
  renderTracker?: RenderTrackerService;
  containerSize?: ISize;
}

export type Listener = () => void;

export interface IStore {
  getState: () => IStoreState;
  setState: (obj: IStoreState) => void;
  subscribe: (listener: Listener) => void;
}

interface ResourceState {
  resources: IListboxResource[];
}

const initStoreState: IStoreState = {
  options: {},
};

const initResourcesState: ResourceState = {
  resources: [],
};

export const create = () => ({
  store: createStore(() => initStoreState),
  resourceStore: createStore(() => initResourcesState),
});

export type IStores = ReturnType<typeof create>;

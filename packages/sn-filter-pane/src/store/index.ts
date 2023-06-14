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

export interface IStore {
  app?: EngineAPI.IApp;
  model?: EngineAPI.IGenericObject;
  fpLayout?: IFilterPaneLayout;
  options: IListBoxOptions;
  constraints?: stardust.Constraints;
  translator?: stardust.Translator;
  env?: IEnv;
  directQueryEnabled?: boolean;
  embed?: stardust.Embed;
  stardustTheme?: stardust.Theme;
  selections?: stardust.ObjectSelections;
  keyboard?: stardust.Keyboard;
  renderTracker?: RenderTrackerService;
  containerSize?: ISize;
}

interface ResourceState {
  resources: IListboxResource[];
}

const initStoreState: IStore = {
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

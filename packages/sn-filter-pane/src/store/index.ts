import { stardust } from '@nebula.js/stardust';
import createVanilla from 'zustand/vanilla';
import create from 'zustand';
import { IFilterPaneLayout, IListBoxOptions, IListboxResource, } from '../hooks/types';
import { ISense } from '../types/types';

export interface IStore {
  app?: EngineAPI.IApp;
  model?: EngineAPI.IGenericObject;
  isSmallDevice?: (() => void);
  fpLayout?: IFilterPaneLayout;
  options: IListBoxOptions;
  constraints?: stardust.Constraints;
  translator?: stardust.Translator;
  sense?: ISense;
  embed?: stardust.Embed;
  stardustTheme?: stardust.Theme;
}

export const store = createVanilla<IStore>(() => ({
  app: undefined,
  model: undefined,
  isSmallDevice: undefined,
  fpLayout: undefined,
  options: {},
  constraints: undefined,
  translator: undefined,
  sense: undefined,
  embed: undefined,
}));

interface ResourceState {
  resources: IListboxResource[];
}

export const useResourceStore = create<ResourceState>(() => ({
  resources: [],
}));

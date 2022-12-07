import { stardust } from '@nebula.js/stardust';
import createVanilla from 'zustand/vanilla';
import create from 'zustand';
import { IFilterPaneLayout, IListboxResource, IUseOptions } from '../hooks/types';
import { ISense } from '../types/types';

export interface IStore {
  app?: EngineAPI.IApp;
  model?: EngineAPI.IGenericObject;
  isSmallDevice?: (() => void);
  fpLayout?: IFilterPaneLayout;
  options: IUseOptions;
  constraints?: stardust.Constraints;
  translator?: stardust.Translator;
  sense?: ISense;
  embed?: stardust.Embed;
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

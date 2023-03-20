import { stardust } from '@nebula.js/stardust';
import createVanilla from 'zustand/vanilla';
import createHook from 'zustand';
import { IFilterPaneLayout, IListBoxOptions, IListboxResource } from '../hooks/types';
import { ISense } from '../types/types';

export interface IStore {
  app?: EngineAPI.IApp;
  model?: EngineAPI.IGenericObject;
  fpLayout?: IFilterPaneLayout;
  options: IListBoxOptions;
  constraints?: stardust.Constraints;
  translator?: stardust.Translator;
  sense?: ISense;
  embed?: stardust.Embed;
  stardustTheme?: stardust.Theme;
  selections?: stardust.ObjectSelections;
  keyboard?: stardust.Keyboard;
  renderTracker?: any;
}

interface ResourceState {
  resources: IListboxResource[];
}

export const create = () => ({
  store: createVanilla<IStore>(() => ({
    app: undefined,
    model: undefined,
    fpLayout: undefined,
    options: {},
    constraints: undefined,
    translator: undefined,
    sense: undefined,
    embed: undefined,
    renderTracker: undefined,
  })),
  useResourceStore: createHook<ResourceState>(() => ({
    resources: [],
  })),
});

export type IStores = ReturnType<typeof create>;

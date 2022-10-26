import { stardust } from '@nebula.js/stardust';
import createVanilla from 'zustand/vanilla';
import { IFilterPaneLayout, IUseOptions } from '../hooks/types';
import { ISense } from '../types/types';

export interface IStore {
  app?: EngineAPI.IApp | undefined;
  setApp?: (app: EngineAPI.IApp) => Function;
}

// import create from 'zustand';
// export const useStore = create((set) => ({
//   app: undefined,
//   setApp: (app: EngineAPI.IApp) => set(() => ({ app })),
// }));

export const store = createVanilla(() => ({
  app: <EngineAPI.IApp | undefined>undefined,
  model: <EngineAPI.IGenericObject | undefined>undefined,
  isSmallDevice: <(() => boolean) | undefined>undefined,
  fpLayout: <IFilterPaneLayout | undefined>undefined,
  options: <IUseOptions>{},
  constraints: <stardust.Constraints | undefined>undefined,
  translator: <stardust.Translator | undefined>undefined,
  sense: <ISense | undefined>undefined,
  embed: <stardust.Embed | undefined>undefined,
}));

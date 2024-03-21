import {
  IComponent, ISelectionsComponent, IThemeComponent,
} from '../types/components';

export type IComponentOverrides = {
  theme?: IThemeComponent;
  selections?: ISelectionsComponent;
};

export interface ICreateStylingArgs {
  app?: EngineAPI.IApp,
  components?: IComponent[];
}

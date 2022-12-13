import {
  useEmbed, useApp, useLayout, useModel, useOptions, useConstraints, useTranslator, useTheme,
} from '@nebula.js/stardust';
import { store } from '../store';
import { IEnv } from '../types/types';
import { IFilterPaneLayout, IListBoxOptions } from './types';

export default function useSetup({ sense }: IEnv) {
  const options = useOptions() as IListBoxOptions;
  const fpLayout = useLayout() as IFilterPaneLayout;
  const constraints = useConstraints();
  const translator = useTranslator();
  const app = useApp() as EngineAPI.IApp;
  const model = useModel();
  const embed = useEmbed();
  const stardustTheme = useTheme();

  store.setState({
    app,
    model,
    fpLayout,
    sense,
    options,
    constraints,
    translator,
    embed,
    stardustTheme,
  });
}

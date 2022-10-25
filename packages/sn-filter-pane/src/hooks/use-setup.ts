import {
  useEmbed, useApp, useLayout, useModel, useOptions, useConstraints, useTranslator, useSelections,
} from '@nebula.js/stardust';
import { store } from '../store';
import { IEnv } from '../types/types';
import { IFilterPaneLayout, IUseOptions } from './types';

export default function useSetup({ sense }: IEnv) {
  const options = useOptions() as IUseOptions;
  const constraints = useConstraints();
  const translator = useTranslator();
  const app = useApp() as EngineAPI.IApp;
  const model = useModel();
  const fpLayout = useLayout() as IFilterPaneLayout;
  const selectionsApi = useSelections();
  const embed = useEmbed();

  store.setState({
    app,
    model,
    fpLayout,
    sense,
    options,
    constraints,
    translator,
    selectionsApi: sense ? selectionsApi : undefined,
    embed,
  });
}

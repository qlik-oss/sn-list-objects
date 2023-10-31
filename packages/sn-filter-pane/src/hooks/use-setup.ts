import {
  useEmbed, useApp, useLayout, useModel, useOptions, useConstraints, useState, useTranslator, useSelections, useKeyboard, useAppLayout,
} from '@nebula.js/stardust';
import { create } from '../store';
import { IEnv } from '../types/types';
import { IFilterPaneLayout, IListBoxOptions, INxAppLayout } from './types';
import useRenderTrackerService from '../services/render-tracker';
import isDirectQueryEnabled from './direct-query/is-direct-query-enabled';
import useStyling from './use-styling';

export default function useSetup(env: IEnv) {
  const [stores] = useState(() => create());

  const { store } = stores;
  const options = useOptions() as IListBoxOptions;
  const fpLayout = useLayout() as IFilterPaneLayout;
  const appLayout = useAppLayout() as INxAppLayout;
  const constraints = useConstraints();
  const translator = useTranslator();
  const app = useApp() as EngineAPI.IApp;
  const model = useModel();
  const embed = useEmbed();
  const styles = useStyling({ components: fpLayout?.components });
  const selections = useSelections();
  const keyboard = useKeyboard();
  const renderTracker = useRenderTrackerService();

  const directQueryEnabled: boolean = isDirectQueryEnabled({ env, appLayout });

  store.setState({
    ...store.getState(),
    app,
    model,
    fpLayout,
    env,
    directQueryEnabled,
    options,
    constraints,
    translator,
    embed,
    styles,
    selections,
    keyboard,
    renderTracker,
  });

  return stores;
}

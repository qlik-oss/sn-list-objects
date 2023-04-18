import {
  useEmbed, useApp, useLayout, useModel, useOptions, useConstraints, useState, useTranslator, useTheme, useSelections, useKeyboard, useAppLayout,
} from '@nebula.js/stardust';
import { create } from '../store';
import { IEnv } from '../types/types';
import { IFilterPaneLayout, IListBoxOptions, INxAppLayout } from './types';
import useRenderTrackerService from '../services/render-tracker';

export default function useSetup(env: IEnv) {
  const [stores] = useState(() => create());

  const { flags } = env;
  const { store } = stores;
  const options = useOptions() as IListBoxOptions;
  const fpLayout = useLayout() as IFilterPaneLayout;
  const appLayout = useAppLayout() as INxAppLayout;
  const constraints = useConstraints();
  const translator = useTranslator();
  const app = useApp() as EngineAPI.IApp;
  const model = useModel();
  const embed = useEmbed();
  const stardustTheme = useTheme();
  const selections = useSelections();
  const keyboard = useKeyboard();
  const renderTracker = useRenderTrackerService();

  const { isEnabled = () => false } = flags || {};
  const directQueryEnabled = !!(appLayout?.qIsDirectQueryMode && (isEnabled('CLIENT_DIRECT_QUERY_EAP') || isEnabled('CLIENT_DIRECT_QUERY_GA')));

  store.setState({
    app,
    model,
    fpLayout,
    env,
    directQueryEnabled,
    options,
    constraints,
    translator,
    embed,
    stardustTheme,
    selections,
    keyboard,
    renderTracker,
  });

  return stores;
}

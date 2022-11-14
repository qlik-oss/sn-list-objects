import {
  useEmbed, useApp, useLayout, useModel, useOptions, useConstraints, useTranslator,
} from '@nebula.js/stardust';
import { store } from '../store';
import { IEnv } from '../types/types';
import { IFilterPaneLayout, IUseOptions } from './types';

const evaluateOptions = (options: IUseOptions, fpLayout: IFilterPaneLayout) => {
  const evaluatedOptions = { ...options };
  evaluatedOptions.listboxOptions = {
    dense: fpLayout.layoutOptions?.compactData ?? options.listboxOptions?.dense,
  };
  return evaluatedOptions;
};

export default function useSetup({ sense }: IEnv) {
  let options = useOptions() as IUseOptions;
  const fpLayout = useLayout() as IFilterPaneLayout;
  options = evaluateOptions(options, fpLayout);
  const constraints = useConstraints();
  const translator = useTranslator();
  const app = useApp() as EngineAPI.IApp;
  const model = useModel();
  const embed = useEmbed();

  store.setState({
    app,
    model,
    fpLayout,
    sense,
    options,
    constraints,
    translator,
    embed,
  });
}

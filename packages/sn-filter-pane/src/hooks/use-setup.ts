import {
  useEmbed, useApp, useLayout, useModel, useOptions, useConstraints, useState, useTranslator, useTheme, useSelections, useKeyboard, usePromise, useEffect,
} from '@nebula.js/stardust';
import { create } from '../store';
import { IEnv } from '../types/types';
import { IFilterPaneLayout, IListBoxOptions } from './types';

const useRenderTracker = () => {
  const [renderTracker, setRenderTracker] = useState<any>(undefined);

  usePromise(
    () => new Promise<void>((resolve) => {
      const tracker = {
        numberOfListboxes: undefined as (undefined | number),
        setNumberOfListboxes(listboxCount: number): void {
          this.numberOfListboxes = listboxCount;
        },
        itemsRendered: 0,
        fullyRendered: false,
        renderedItemKeys: {} as {[key: string]: boolean},
        renderedCallback(key: string) {
          if (!this.fullyRendered) {
            this.renderedItemKeys[key] = true;
            this.itemsRendered = Object.keys(this.renderedItemKeys).length;
            this.fullyRendered = this.itemsRendered === this.numberOfListboxes;
            if (this.fullyRendered) {
              resolve();
            }
          }
        },
      };

      setRenderTracker(tracker);
    }),
    [],
  );

  return renderTracker;
};

export default function useSetup({ sense }: IEnv) {
  const [stores] = useState(() => create());
  const { store } = stores;
  const options = useOptions() as IListBoxOptions;
  const fpLayout = useLayout() as IFilterPaneLayout;
  const constraints = useConstraints();
  const translator = useTranslator();
  const app = useApp() as EngineAPI.IApp;
  const model = useModel();
  const embed = useEmbed();
  const stardustTheme = useTheme();
  const selections = useSelections();
  const keyboard = useKeyboard();
  const renderTracker = useRenderTracker();

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
    selections,
    keyboard,
    renderTracker,
  });

  return stores;
}

import { useEffect, useElement, useState } from '@nebula.js/stardust';
import type { IStores } from '../store';
import getListBoxResources from './listbox/get-listbox-resources';
import { IContainerElement, ListboxResourcesArr } from './types';
import { render, teardown } from '../components/root';

export default function useRender(stores: IStores) {
  const { store, resourceStore } = stores;
  const [resourcesReady, setResourcesReady] = useState<boolean>(false);

  const { app, fpLayout, env } = store.getState();
  const containerElement = <IContainerElement>useElement();

  if (app && fpLayout) {
    getListBoxResources(app, fpLayout).then((resArr: ListboxResourcesArr) => {
      // setState will trigger a re-render of ListboxGrid, needed if a Listbox changes size (eg. dense mode)
      resourceStore.setState({ resources: resArr });
      setResourcesReady(true);
    });
  }

  // Trigger a re-render only when components have changed in the filterpane layout.
  // (Note that useEffect equality check is shallow and therefore requires a hash.)
  const componentsHash = env?.flags?.isEnabled('IM_4073_FILTERPANE_STYLING') ? (fpLayout?.components || []).map((c: object) => JSON.stringify(c)).join(',') : undefined;

  useEffect(() => {
    if (!fpLayout || !app || !resourcesReady) {
      return undefined;
    }
    const root = render(containerElement, stores);
    return (() => {
      teardown(root);
    });
  }, [resourcesReady, componentsHash]);
}

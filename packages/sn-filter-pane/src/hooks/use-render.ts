import { useEffect, useElement } from '@nebula.js/stardust';
import type { IStores } from '../store';
import useListBoxResources from './listbox/get-listbox-resources';
import { IContainerElement } from './types';
import { render, teardown } from '../components/root';

export default function useRender(stores: IStores) {
  const { store } = stores;

  const { app, fpLayout } = store.getState();
  const containerElement = <IContainerElement>useElement();

  const { resourcesReady } = useListBoxResources(stores);

  // Trigger a re-render only when components have changed in the filterpane layout.
  // (Note that useEffect equality check is shallow and therefore requires a hash.)
  const componentsHash = (fpLayout?.components || []).sort().map((c: object) => JSON.stringify(c)).join(',');

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

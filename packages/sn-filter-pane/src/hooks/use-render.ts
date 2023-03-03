import { useEffect, useElement, useState } from '@nebula.js/stardust';
import type { IStores } from '../store';
import getListBoxResources from './listbox/get-listbox-resources';
import { IContainerElement, ListboxResourcesArr } from './types';
import { render, teardown } from '../components/root';

export default function useRender(stores: IStores) {
  const { store, useResourceStore } = stores;
  const [resourcesReady, setResourcesReady] = useState<boolean>(false);

  const {
    app, fpLayout, constraints,
  } = store.getState();

  // Create a string representation of the dim identities so that only a
  // change to these identities will trigger a re-render (fixes issue #7).
  const listboxIdsString = fpLayout?.qChildList?.qItems.map((qItem) => qItem?.qInfo?.qId).join(',');

  const containerElement = <IContainerElement>useElement();

  if (app && fpLayout) {
    getListBoxResources(app, fpLayout).then((resArr: ListboxResourcesArr) => {
      useResourceStore.setState({ resources: resArr });
      setResourcesReady(true);
    });
  }

  useEffect(() => {
    if (!fpLayout || !app || !resourcesReady) {
      return undefined;
    }
    const root = render(containerElement, stores);
    return (() => {
      teardown(root);
    });
  }, [constraints, listboxIdsString, resourcesReady]);
}

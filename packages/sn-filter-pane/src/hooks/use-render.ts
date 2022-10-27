import { useEffect, useElement, useState } from '@nebula.js/stardust';
import { store } from '../store';
import getListBoxResources from './listbox/get-listbox-resources';
import {
  IContainerElement, IListboxResource, ListboxResourcesArr,
} from './types';
import { render, teardown } from '../components/root';
import './style.scss';

export default function useRender() {
  const [resourcesArr, setResourcesArr] = useState<IListboxResource[] | undefined>(undefined);

  const {
    app, fpLayout, options, constraints,
  } = store.getState();

  // Create a string representation of the dim identities so that only a 
  // change to these identities will trigger a re-render (fixes issue #7).
  const listboxIdsString = fpLayout?.qChildList?.qItems.map(qItem => qItem?.qInfo?.qId).join(',');

  const containerElement = <IContainerElement>useElement();

  useEffect(() => {
    if (!app || !fpLayout) {
      return;
    }
    getListBoxResources(app, fpLayout).then((resArr: ListboxResourcesArr) => {
      setResourcesArr(resArr || []);
    });
  }, [listboxIdsString]);

  useEffect(() => {
    if (!resourcesArr?.length || !app) {
      return undefined;
    }
    const root = render(
      containerElement,
      {
        listboxOptions: options.listboxOptions ?? {},
        resources: resourcesArr,
      },
    );
    return (() => {
      teardown(root);
    });
  }, [resourcesArr, constraints]);
}

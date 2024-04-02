import { useState } from '@nebula.js/stardust';
import { IStores } from '../../store';
import { IFilterPaneLayout, IListLayout, ListboxResourcesArr } from '../types';


class ChildObjectLayoutFetcher {
  private app: EngineAPI.IApp;
  private onUpdate: (resources: ListboxResourcesArr) => void;
  private childIds: string[] = [];
  private childStates: Record<string, ChildState> = {};

  constructor(app: EngineAPI.IApp, onUpdate: (resources: ListboxResourcesArr) => void) {
    this.app = app;
    this.onUpdate = onUpdate;
  }

  maybeTriggerUpdate() {
    const allLayoutsAreReady = this.childIds.every((id) => this.childStates[id].layout !== undefined);
    if (allLayoutsAreReady) {
      const resources = this.childIds.map((id) => ({
        id,
        model: this.childStates[id].model!,
        layout: this.childStates[id].layout!,
      }));
      this.onUpdate(resources);
    }
  }

  updateLayout(id: string, layout: IListLayout) {
    const state = this.childStates[id];
    if (!state) {
      return;
    }
    state.layout = layout;
    this.maybeTriggerUpdate();
  }

  removeChild(id: string) {
    const state = this.childStates[id];
    if(!state) {
      return;
    }
    this.childIds = this.childIds.filter(childId => childId !== id);
    delete this.childStates[id];
    state.destroy();
  }

  async addChild(id: string) {
    this.childStates[id] = {
      model: undefined,
      layout: undefined,
      destroy: () => {},
    }
    const model = await this.app.getObject(id);
    const state = this.childStates[id];
    if (!state) {
      return;
    }
    state.model = model;
    const onChanged = async () => {
      const layout = await model.getLayout() as unknown as IListLayout;
      this.updateLayout(id, layout);
    };
    model.on('changed', onChanged);
    const stopListen = () => {
      // @ts-expect-error removeListener missing frm enigma types
      model.removeListener('changed', onChanged);
    };
    state.destroy = stopListen;

    onChanged();
  }

  updateChildren(newChildIds: string[]) {
    const addedIds = newChildIds.filter(id => !this.childIds.includes(id));
    const removedId = this.childIds.filter(id => !newChildIds.includes(id));
    this.childIds = newChildIds;
    for(const id of removedId) {
      this.removeChild(id);
    }
    for(const id of addedIds) {
      this.addChild(id);
    }
  }

  update(fpLayout: IFilterPaneLayout) {
    const childIds = fpLayout?.qChildList?.qItems.map((item) => item.qInfo.qId);
    if (!childIds) {
      return;
    }
    this.updateChildren(childIds);

    // trigger extra update (even if no child object layout changes)
    // currently needed to rerender ListboxGrid for any other type of change
    // TODO: refactor to make update flows more easy to understand
    this.maybeTriggerUpdate();
  }
}

function useRef<T>() {
  const [ref] = useState<{ current: undefined | T }>({ current: undefined });
  return ref;
}

export default function useListBoxResources(stores: IStores) {
  const [resourcesReady, setResourcesReady] = useState<boolean>(false);
  const { store, resourceStore } = stores;
  const { app, fpLayout } = store.getState();
  const childObjectLayoutFetcherRef = useRef<ChildObjectLayoutFetcher>();
  if (!childObjectLayoutFetcherRef.current && app && resourceStore) {
    childObjectLayoutFetcherRef.current = new ChildObjectLayoutFetcher(app, (resources) => {
      resourceStore.setState({ resources })
      setResourcesReady(true);
    })
  }
  if (childObjectLayoutFetcherRef.current && fpLayout) {
    childObjectLayoutFetcherRef.current.update(fpLayout)
  }
  return { resourcesReady };
}

interface ChildState {
  model: EngineAPI.IGenericObject | undefined;
  layout: IListLayout | undefined;
  destroy(): void;
}

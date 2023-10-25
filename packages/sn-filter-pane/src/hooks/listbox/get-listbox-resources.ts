import { IFilterPaneLayout, ListboxResourcesArr } from '../types';

async function getListboxResourcesFromIds(app: EngineAPI.IApp, ids: string[]): Promise<ListboxResourcesArr> {
  const models = await Promise.all(ids.map((id) => app.getObject(id)));
  const layouts = await Promise.all(models.map((model) => model.getLayout() as unknown as EngineAPI.IGenericListLayout)) || [];

  return ids.map((id: string, index: number) => ({
    id,
    model: models[index],
    layout: layouts[index],
  }));
}

export default async function getListBoxResources(app: EngineAPI.IApp, fpLayout: IFilterPaneLayout): Promise<ListboxResourcesArr> {
  const childIds = fpLayout?.qChildList?.qItems.map((item) => item.qInfo.qId) || [];
  return getListboxResourcesFromIds(app, childIds);
}

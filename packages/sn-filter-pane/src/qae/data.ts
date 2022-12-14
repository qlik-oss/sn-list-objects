import extend from 'extend';
import { store } from '../store';
import defaultListboxProps from './listbox-properties';
import { IConfig, IEnv } from '../types/types';
import { INxDimensionMissing } from '../hooks/types';

export default function getData(env: IEnv) {
  const { translator } = env;

  return {
    dimensions: {
      min: 1,
      max: 1000,
    },
    measures: { min: 0, max: 0 },
    targets: [
      {
        path: '/qChildListDef/qDef/qListObjectDef',
        measures: { min: 0, max: 0 },
        dimensions: {
          min: 0,
          max: 1000,
          add(dimension: EngineAPI.INxDimension & INxDimensionMissing, data: EngineAPI.IGenericObjectProperties /* , handler */) {
            const { model: filterPaneModel } = store.getState();

            // Create a Listbox child, using these properties (overriding each other in this order):
            //  - default listbox properties
            //  - dimension properties
            const listboxProps = extend(true, {}, defaultListboxProps, dimension, {
              title: dimension.qDef?.title || dimension.qDef?.qFieldLabels?.[0] || dimension.qDef?.qFieldDefs?.[0],
              qListObjectDef: {
                qDef: dimension.qDef,
              },
            });

            filterPaneModel?.createChild(listboxProps, data);
          },
          remove(_dimension: EngineAPI.INxDimension, data: EngineAPI.IGenericObjectProperties, index: number) {
            const { fpLayout, model: filterPaneModel } = store.getState();

            const { qItems = [] } = fpLayout?.qChildList || {};
            const layoutDim = qItems[index];
            if (layoutDim) {
              const { qId } = qItems[index].qInfo;
              filterPaneModel?.destroyChild(qId, data);
            }
          },
          description(_: unknown, __: unknown, config: IConfig): string {
            const translationProperty = config && config.type === 'rows' ? 'Visualizations.Descriptions.Row' : 'Visualizations.Descriptions.Column';
            return translator.get(translationProperty);
          },
        },
      },
    ],
  };
}

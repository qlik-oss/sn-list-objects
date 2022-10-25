import extend from 'extend';
import { store } from '../store';
import { defaultListboxProps } from './listbox-properties';

export default function getData(env) {
  const { translator } = env;

  return {
    dimensions: {
      min: 1,
      max: 1000,
    },
    measures: { min: 0, max: 0 },
    // qListObjectDef: {
    //   qShowAlternatives: true,
    //   qInitialDataFetch: [
    //     {
    //       qLeft: 0,
    //       qWidth: 1,
    //       qTop: 0,
    //       qHeight: 100,
    //     },
    //   ],
    // },
    targets: [
      {
        path: '/qChildListDef/qDef/qListObjectDef',
        measures: { min: 0, max: 0 },
        dimensions: {
          min: 0,
          max: 1000,
          add(dimension: EngineAPI.INxDimension, data: EngineAPI.IGenericObjectProperties /* , handler */) {
            const { model: filterPaneModel } = store.getState();

            const listboxProps = extend(true, {}, defaultListboxProps, {
              ...dimension,
              title: dimension.qDef?.title || dimension.qDef?.qFieldLabels?.[0] || dimension.qDef?.qFieldDefs?.[0],
              qListObjectDef: {
                qDef: dimension.qDef,
                // cId: `listbox-${uid()}`, // <-- This will be generated automatically in lo-handler in Nebula.js
              },
            });

            filterPaneModel?.createChild(listboxProps, data);
          },
          move(/* dimension, data */) {
            // setMoveSort(data);
            // setColorVars(data);
            // customTooltipUtils.moveCallbackCustomTooltip(data, dimension);
          },
          remove(dimension, data, index) {
            const { fpLayout, model: filterPaneModel } = store.getState();

            const { qItems = [] } = fpLayout?.qChildList || {};
            const layoutDim = qItems[index];
            if (layoutDim) {
              const { qId } = qItems[index].qInfo;
              filterPaneModel?.destroyChild(qId, data);
            }
          },
          replace(/* dimension, oldDimension, index, data */) {
            console.log('replace dimension');
          },
          description(_: unknown, __: unknown, config: Config): string {
            const translationProperty = config && config.type === 'rows' ? 'Visualizations.Descriptions.Row' : 'Visualizations.Descriptions.Column';
            return translator.get(translationProperty);
          },
        },
      },
    ],
  };
}

/* eslint-disable no-param-reassign */
import { IEnv } from '../../../types/types';
import getDataPanelItems from './data-panel';

export default function getData(env: IEnv) {
  const dataProperties = {
    classification: {
      section: 'data',
      tags: ['simple'],
    },
    type: 'array',
    component: 'filterpane-data',
    translation: 'Common.Data',
    titleTranslation: 'Common.Fields',
    addTranslation: 'DataManager.GridEditor.AddField',
    allowAdd: true,
    allowRemove: true,
    allowMove: true,
    showInSidePanel: true,
    grouped: false,
    schemaIgnore: true,
    ref: 'qChildListDef.qDef.qListObjectDef',
    items: getDataPanelItems(env),
  };

  return dataProperties;
}

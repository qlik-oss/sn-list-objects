import settings from './settings';
import { IEnv } from '../../types/types';
import getData from './data';
import simpleSorting from './simple-sorting';
import getSettings from './settings';

export default function pp(env: IEnv) {
  const out = {
    type: 'items',
    component: 'accordion',
    items: {
      data: getData(env),
      simpleSorting,
      settings: getSettings(env),
    },
  };
  return out;
}

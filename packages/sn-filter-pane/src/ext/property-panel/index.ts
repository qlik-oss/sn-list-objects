import settings from './settings';
import { IEnv } from '../../types/types';
import getData from './data';
import simpleSorting from './simple-sorting';

export default function pp(env: IEnv) {
  const out = {
    type: 'items',
    component: 'accordion',
    items: {
      data: getData(env),
      simpleSorting,
      settings,
    },
  };
  return out;
}

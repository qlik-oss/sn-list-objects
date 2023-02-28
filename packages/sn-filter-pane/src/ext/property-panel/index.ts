import settings from './settings';
import { IEnv } from '../../types/types';
import getData from './data';

export default function pp(env: IEnv) {
  const out = {
    type: 'items',
    component: 'accordion',
    items: {
      data: getData(env),
      settings,
    },
  };
  return out;
}

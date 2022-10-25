import sorting from './sorting';
// import simpleSorting from "./simple-sorting";
import settings from './settings';
import getData from './data';
import { IEnv } from '../../types/types';

export default function pp(env: IEnv) {
  const out = {
    type: 'items',
    component: 'accordion',
    items: {
      data: getData(env),
      sorting,
      // simpleSorting,
      settings,
    },
  };
  return out;
}

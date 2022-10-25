import pp from './property-panel';
import { IEnv } from '../types/types';

export default function ext(env: IEnv) {
  return {
    usePropertyHandler: 'filterpane-data',
    definition: <object>pp(env),
    support: {
      snapshot: true,
      export: true,
      exportData: true,
      sharing: false,
      viewData: true,
    },
  };
}

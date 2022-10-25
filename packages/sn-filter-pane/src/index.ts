import properties from './object-properties';
import getData from './data';

import useSetup from './hooks/use-setup';
import useRender from './hooks/use-render';
import ext from './ext';
import { IEnv } from './types/types';

export default function supernova(env: IEnv) {
  return {
    ext: ext(env),
    qae: {
      properties,
      data: getData(env),
    },
    component() {
      useSetup({ ...env });
      useRender();
    },
  };
}

/* eslint-disable react-hooks/rules-of-hooks */
import properties from './qae/filter-pane-properties';
import getData from './qae/data';

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
      const stores = useSetup({ ...env });
      useRender(stores);
    },
  };
}

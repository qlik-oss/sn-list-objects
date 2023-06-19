/* eslint-disable react-hooks/rules-of-hooks */
import objectDefinition from './qae/object-definition';
import getData from './qae/data';

import useSetup from './hooks/use-setup';
import useRender from './hooks/use-render';
import useContextMenu from './hooks/use-context-menu';
import ext from './ext';
import { IEnv } from './types/types';

export default function supernova(env: IEnv) {
  return {
    ext: ext(env),
    qae: {
      properties: objectDefinition(),
      data: getData(env),
    },
    component() {
      const stores = useSetup(env);
      useContextMenu();
      useRender(stores);
    },
  };
}

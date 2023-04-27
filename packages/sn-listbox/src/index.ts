/* eslint-disable react-hooks/rules-of-hooks */
import {
  useApp, useModel, useElement, useStaleLayout, useState, useEffect, useOptions, usePromise, useEmbed, stardust, useConstraints,
} from '@nebula.js/stardust';
import properties from './object-properties';
import data from './data';
import pp from './ext/property-panel';
import { IListLayout } from '../../../types/global';
import { IEnv } from './types/types';

const hasDimension = (layout: IListLayout) => !!layout?.qListObject.qDimensionInfo.qGroupFieldDefs.length;

const listboxOptions = {
  search: false,
  toolbar: false,
  direction: 'ltr' as stardust.Direction,
};

export default function supernova(env: IEnv) {
  return {
    qae: {
      properties,
      data,
    },
    ext: {
      definition: pp(),
    },
    component() {
      const app = useApp();
      const model = useModel();
      const layout = useStaleLayout() as unknown as IListLayout;
      const constraints = useConstraints();
      const element = useElement();
      const [listboxInstance, setListboxInstance] = useState<stardust.FieldInstance | undefined>(undefined);
      const options = useOptions();
      const embed = useEmbed();

      const { flags } = env || {};

      usePromise(async () => {
        if (!hasDimension(layout) || !app || !model) {
          return;
        }

        const inst = await embed.field(layout.qInfo);
        setListboxInstance(inst);
      }, []);

      useEffect(() => {
        if (!listboxInstance || !element || !model) {
          return undefined;
        }

        const allowSelect = !constraints?.select && !constraints?.active;

        listboxInstance.mount(element, {
          ...options,
          ...listboxOptions,
          // @ts-ignore
          __DO_NOT_USE__: {
            selectDisabled: () => !allowSelect, // can we hook this into the selections api?
            flags,
          },
        });
        // TODO: signal when rendering is done?

        return () => {
          listboxInstance.unmount();
        };
      }, [listboxInstance, options, constraints]);
    },
  };
}

/* eslint-disable react-hooks/rules-of-hooks */
import {
  useApp, useModel, useElement, useStaleLayout, useState, useEffect, useOptions, usePromise, useEmbed, stardust,
} from '@nebula.js/stardust';
import properties from './object-properties';
import data from './data';
import pp from './ext/property-panel';
import { IListLayout } from '../../../types/global';

const hasDimension = (layout: IListLayout) => !!layout?.qListObject.qDimensionInfo.qGroupFieldDefs.length;

const listboxOptions = {
  search: false,
  toolbar: false,
  direction: 'ltr' as stardust.Direction,
};

export default function supernova() {
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
      const element = useElement();
      const [listboxInstance, setListboxInstance] = useState<stardust.FieldInstance | undefined>(undefined);
      const options = useOptions();
      const embed = useEmbed();

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

        listboxInstance.mount(element, { ...options, ...listboxOptions });
        // TODO: signal when rendering is done?

        return () => {
          listboxInstance.unmount();
        };
      }, [listboxInstance, options]);
    },
  };
}

import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { stardust } from '@nebula.js/stardust';
import { IListBoxOptions, IListLayout } from '../hooks/types';
import { IConstraints } from '../types/types';
import { store } from '../store';

interface ListboxContainerProps {
  layout: IListLayout;
  app?: EngineAPI.IApp;
  listboxOptions: IListBoxOptions;
  constraints?: IConstraints;
  borderBottom?: boolean;
}

const ListboxContainer = ({
  layout, app, constraints, listboxOptions, borderBottom,
}: ListboxContainerProps) => {
  const [listboxInstance, setListboxInstance] = useState<stardust.FieldInstance>();
  const elRef = useRef<HTMLElement>();

  const { embed, model, selectionsApi } = store.getState();

  useEffect(() => {
    if (!layout || !embed) {
      return;
    }
    embed.field(layout.qInfo).then((inst) => {
      setListboxInstance(inst);
    });
  }, []);

  useEffect(() => {
    if (!elRef.current || !listboxInstance || !model) {
      return undefined;
    }

    const allowSelect = !constraints?.select && !constraints?.active;

    listboxInstance.mount(elRef.current, {
      __DO_NOT_USE__: {
        selectionsApi,
        selectDisabled: () => !allowSelect,
      },
      ...listboxOptions,
      dense: false,
    });
    return () => {
      listboxInstance.unmount();
    };
  }, [elRef.current, listboxInstance, constraints]);

  return (
    <>
      <Box
        height='100%'
        border='1px solid #d9d9d9'
        borderBottom={borderBottom ? '1px solid #d9d9d9' : 0}
        borderRadius='4px'
        ref={elRef}
      />
    </>
  );
};

export default ListboxContainer;

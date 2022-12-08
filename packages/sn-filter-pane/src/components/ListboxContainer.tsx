import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { stardust } from '@nebula.js/stardust';
import { IListLayout } from '../hooks/types';
import { store } from '../store';

interface ListboxContainerProps {
  layout: IListLayout;
  borderBottom?: boolean;
}

const ListboxContainer = ({
  layout, borderBottom,
}: ListboxContainerProps) => {
  const [listboxInstance, setListboxInstance] = useState<stardust.FieldInstance>();
  const elRef = useRef<HTMLElement>();

  const {
    embed,
    model,
    constraints,
    options,
  } = store.getState();

  options.listboxOptions = { direction: options?.direction || 'ltr' };

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
        selectDisabled: () => !allowSelect, // can we hook this into the selections api?
      },
      ...options.listboxOptions,
    });
    return () => {
      listboxInstance.unmount();
    };
  }, [elRef.current, listboxInstance, constraints, options?.direction]);

  return (
    <>
      <Box
        height='100%'
        border='1px solid #d9d9d9'
        borderBottom={borderBottom ? '1px solid #d9d9d9' : 0}
        borderRadius='4px'
        overflow='hidden'
        ref={elRef}
      />
    </>
  );
};

export default ListboxContainer;

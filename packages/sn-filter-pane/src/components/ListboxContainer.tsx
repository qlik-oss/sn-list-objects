import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { stardust } from '@nebula.js/stardust';
import { IListBoxOptions, IListLayout } from '../hooks/types';
import { store } from '../store';

interface ListboxContainerProps {
  layout: IListLayout;
  borderBottom?: boolean;
  disableSearch?: boolean;
  handleActive?: (id: string, active: boolean) => void;
}

const ListboxContainer = ({
  layout, borderBottom, disableSearch = false, handleActive,
}: ListboxContainerProps) => {
  const [listboxInstance, setListboxInstance] = useState<stardust.FieldInstance>();
  const elRef = useRef<HTMLElement>();

  const {
    embed,
    model,
    constraints,
    options,
  } = store.getState();

  useEffect(() => {
    if (!layout || !embed) {
      return;
    }
    embed.field(layout.qInfo).then((inst) => {
      setListboxInstance(inst as stardust.FieldInstance);
    });
  }, []);

  useEffect(() => {
    if (!elRef.current || !listboxInstance || !model) {
      return undefined;
    }

    const allowSelect = !constraints?.select && !constraints?.active;
    const listboxOptions = {
      __DO_NOT_USE__: {
        selectDisabled: () => !allowSelect, // can we hook this into the selections api?
      },
      direction: options?.direction,
      search: disableSearch ? false : 'inSelection' as stardust.SearchMode,
    };

    listboxInstance.mount(elRef.current, listboxOptions);
    return () => {
      listboxInstance.unmount();
    };
  }, [elRef.current, listboxInstance, constraints, options?.direction]);

  useEffect(() => {
    if (!listboxInstance) {
      return undefined;
    }
    const handleActivate = () => handleActive?.(layout.qInfo.qId, true);
    const handleDeactivate = () => handleActive?.(layout.qInfo.qId, false);
    listboxInstance.on?.('selectionActivated', handleActivate);
    listboxInstance.on?.('selectionDeactivated', handleDeactivate);

    return () => {
      listboxInstance.removeListener?.('selectionActivated', handleActivate);
      listboxInstance.removeListener?.('selectionDeactivated', handleDeactivate);
    };
  }, [listboxInstance]);

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
